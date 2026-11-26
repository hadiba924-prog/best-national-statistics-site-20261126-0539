// NusaData — hand-in program for the best-national-statistics-site bounty.
// Node 22, standard library only. It copies the site (app/) and its screenshots
// into the output directory and writes the dossier the judge reads, using the
// vendored make.fun library exactly as shipped in the kit.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Without MAKEFUN_OUTPUT_DIR the grader's /output is used. The program runs
// twice and must produce identical bytes both times, so it writes nothing
// time-dependent and never follows symlinks.

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const SOURCE_DIR = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");

const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

const appDir = join(SOURCE_DIR, "app");
const shotsDir = join(SOURCE_DIR, "screenshots");
if (!existsSync(appDir)) fail("app/ is missing next to main.ts");
if (!existsSync(join(appDir, "index.html"))) fail("app/index.html is missing");

// Start from a clean output tree so a second run cannot leave stale files.
rmSync(OUTPUT_DIR, { recursive: true, force: true });
mkdirSync(OUTPUT_DIR, { recursive: true });
cpSync(appDir, join(OUTPUT_DIR, "app"), { recursive: true, dereference: false });
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(OUTPUT_DIR, "screenshots"), { recursive: true, dereference: false });
}

const dossier = buildDossier(OUTPUT_DIR, DOSSIER_CAPS);
writeFileSync(join(OUTPUT_DIR, "dossier.json"), dossier);
console.log(`main.ts: wrote ${OUTPUT_DIR} (dossier.json ${dossier.length} bytes)`);
