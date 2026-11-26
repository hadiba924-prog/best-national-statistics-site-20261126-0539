// NusaData — packer for the make.fun "best national statistics site" entry.
//
// What this script does, in order:
//   1. Takes the finished site in app/ (next to this file) and the
//      screenshots/ folder, when it exists, and stages them in the output
//      directory named by MAKEFUN_OUTPUT_DIR (default /output).
//   2. Asks ./vendor/makefun-frontend.ts to build the entry dossier from
//      that staged copy and writes it as dossier.json in the output dir.
//
// The output directory is a mount point on the grader, so it is never
// removed itself: only its children are cleared, one by one. Symlinks are
// never followed anywhere in the copy — a linked entry is simply skipped —
// and every directory walk runs in sorted order, so two runs over the same
// input produce byte-identical output.

import { copyFileSync, lstatSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildDossier } from './vendor/makefun-frontend.ts';

// The folder this script lives in; app/ and screenshots/ sit beside it.
const ENTRY_DIR = dirname(fileURLToPath(import.meta.url));
const APP_DIR = join(ENTRY_DIR, 'app');
const SCREENSHOTS_DIR = join(ENTRY_DIR, 'screenshots');

// Where the staged site and dossier.json go.
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The bounty caps handed to buildDossier.
const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
} as const;

/** Stop the run with a clear message on stderr and exit code 1. */
function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

/**
 * Clear a directory's contents without ever removing the directory itself.
 * Each child is deleted on its own, so a mount point used as the output
 * directory stays put (deleting the mount point itself fails with
 * "Device or resource busy"). A child that is a symlink is removed as a
 * link; its target is never touched.
 */
function clearChildrenOnly(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

/**
 * Copy a directory tree file by file, in sorted (code-unit) order so the
 * walk is identical on every run. Symlinks are skipped, never followed,
 * and non-file entries (sockets, devices, fifos) are skipped too.
 */
function copyTree(sourceDir: string, destDir: string): void {
  mkdirSync(destDir, { recursive: true });
  for (const name of readdirSync(sourceDir).sort()) {
    const source = join(sourceDir, name);
    const dest = join(destDir, name);
    const stat = lstatSync(source);
    if (stat.isSymbolicLink()) continue;
    if (stat.isDirectory()) {
      copyTree(source, dest);
    } else if (stat.isFile()) {
      copyFileSync(source, dest);
    }
  }
}

/** True only for a real directory — a symlink to one does not count. */
function isRealDirectory(path: string): boolean {
  try {
    return lstatSync(path).isDirectory();
  } catch {
    return false;
  }
}

function main(): void {
  // Never let a mis-set output directory wipe the entry itself: refuse
  // when it points at this script's own folder or at the site source.
  const outResolved = resolve(OUTPUT_DIR);
  if (outResolved === resolve(ENTRY_DIR) || outResolved === resolve(APP_DIR)) {
    fail(`MAKEFUN_OUTPUT_DIR must not be the entry or app directory: ${OUTPUT_DIR}`);
  }

  // The site itself must be present and usable before anything is staged.
  if (!isRealDirectory(APP_DIR)) {
    fail(`app/ is missing or is not a directory: ${APP_DIR}`);
  }
  const indexHtml = join(APP_DIR, 'index.html');
  let indexStat;
  try {
    indexStat = lstatSync(indexHtml);
  } catch {
    fail(`app/index.html is missing: ${indexHtml}`);
  }
  if (indexStat.isSymbolicLink() || !indexStat.isFile()) {
    fail(`app/index.html is not a regular file: ${indexHtml}`);
  }

  // Stage a clean copy of the site (and screenshots, when present).
  clearChildrenOnly(OUTPUT_DIR);
  copyTree(APP_DIR, join(OUTPUT_DIR, 'app'));
  if (isRealDirectory(SCREENSHOTS_DIR)) {
    copyTree(SCREENSHOTS_DIR, join(OUTPUT_DIR, 'screenshots'));
  }

  // Build the dossier from the staged copy and write it out.
  const dossier = buildDossier(OUTPUT_DIR, DOSSIER_CAPS);
  writeFileSync(join(OUTPUT_DIR, 'dossier.json'), dossier);
  console.log(`dossier.json written: ${dossier.length} bytes`);
}

try {
  main();
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
