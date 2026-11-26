[![Bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/hadiba924-prog/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/hadiba924-prog/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# NusaData — Statistik Indonesia

An independent national statistics portal for Indonesia: population, economy,
health, education, regions and environment — real figures, with the source and
year on every number. Built for the make.fun bounty
“Make the best national statistics site”.

## What it is

A static site with no build step and no network requests. Open `app/index.html`
in any browser (desktop or phone) and it just works — every script, stylesheet
and chart is a file under `app/`, and every chart is hand-drawn inline SVG.

## Sections (all reached from the top navigation)

- **Overview** — eight headline indicators for 2022, 2023 or 2024 (year toggle),
  a 2019–2024 trend chart (population / GDP toggle) and a donut chart
  (employment / religion toggle).
- **Population** — bar chart of the ten most populous provinces (largest-first
  or A–Z toggle) and population by island group.
- **Economy** — year-by-year table (GDP, growth, inflation, poverty) and the
  labour market: 152.1 million workers, 4.76% unemployment (BPS, August 2024).
- **Health** — life expectancy 74.1 years, stunting 19.8% (2024), and how
  BPJS Kesehatan covers 270+ million people.
- **Education** — literacy ≈ 96%, 9.0 mean years of schooling (BPS, 2024).
- **Regions** — a province explorer (all 38 provinces, with capital, island,
  population, share and density) plus a searchable, sortable full table.
- **Environment** — forest cover ≈ 95.6 million ha (2023), renewables ≈ 19%
  of the energy mix (2024), 55 national parks.

## Figures

Population 281.6 million (BPS, 2024), GDP $1.40 trillion (BPS / Bank
Indonesia, 2024), growth 5.03% (2024), inflation 1.57% (2024), poverty
8.57% (2024). Provincial populations are rounded BPS 2024 estimates; where a
precise decimal is not published in the sources used, the value is marked
approximate and the fact is labelled as such. Sources: BPS (Statistics
Indonesia), Bank Indonesia, Ministry of Health, Ministry of Environment and
Forestry, World Bank, WHO.

## Run it

```sh
# serve app/ locally (any static server works)
python3 -m http.server 8080 --directory app
# then open http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored
`vendor/makefun-frontend.ts` library.

## Layout

```
main.ts                  hand-in program (Node 22, stdlib only)
vendor/makefun-frontend.ts   kit library, unchanged
app/
  index.html             all seven sections, hash-routed
  style.css              the portal's look (system fonts only)
  data.js                figures, provinces, indicators
  charts.js              pure-SVG bar / line / donut builders
  main.js                routing, toggles, explorer, table
screenshots/            renders of the finished site
LICENSE                  MIT
```
