// NusaData — figures for Indonesia, compiled from BPS (Statistics Indonesia),
// Bank Indonesia and Ministry of Environment and Forestry releases.
// Every figure carries its source year. Provincial populations are rounded
// estimates, so a column may not sum to the national total exactly.

export const META = {
  country: "Indonesia",
  updated: "26 November 2026",
  currency: "Indonesian rupiah (IDR)",
  note: "Figures are rounded for readability. Where a precise decimal is not "
    + "published in the sources used here, the value is marked approximate.",
};

// National headline indicators by year (BPS / Bank Indonesia).
export const YEARS = [2022, 2023, 2024];

export const NATIONAL = {
  2022: {
    population: 275.8, populationUnit: "juta jiwa",
    gdpUsd: 1.32, gdpIdr: 19599,
    growth: 5.31, inflation: 5.51, unemployment: 5.86,
    poverty: 9.57, lifeExpectancy: 73.5, hdi: 73.9,
  },
  2023: {
    population: 278.7, populationUnit: "juta jiwa",
    gdpUsd: 1.37, gdpIdr: 20892,
    growth: 5.05, inflation: 2.61, unemployment: 5.32,
    poverty: 9.36, lifeExpectancy: 73.9, hdi: 74.4,
  },
  2024: {
    population: 281.6, populationUnit: "juta jiwa",
    gdpUsd: 1.40, gdpIdr: 22139,
    growth: 5.03, inflation: 1.57, unemployment: 4.76,
    poverty: 8.57, lifeExpectancy: 74.1, hdi: 75.0,
  },
};

export const NATIONAL_SOURCES = {
  population: "BPS, mid-year population estimate",
  gdpUsd: "BPS / Bank Indonesia, nominal GDP in US dollars",
  gdpIdr: "BPS, nominal GDP in trillion rupiah",
  growth: "BPS, real GDP growth year on year",
  inflation: "BPS, consumer price index, December year on year",
  unemployment: "BPS, open unemployment rate, August",
  poverty: "BPS, poverty rate, September",
  lifeExpectancy: "BPS, life expectancy at birth",
  hdi: "BPS, Human Development Index",
};

// Population trend, millions (BPS mid-year estimates).
export const POPULATION_TREND = [
  { year: 2019, value: 268.1 },
  { year: 2020, value: 270.2 },
  { year: 2021, value: 272.7 },
  { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];

// Nominal GDP trend, trillion US dollars (BPS / Bank Indonesia).
export const GDP_TREND = [
  { year: 2019, value: 1.12 },
  { year: 2020, value: 1.06 },
  { year: 2021, value: 1.19 },
  { year: 2022, value: 1.32 },
  { year: 2023, value: 1.37 },
  { year: 2024, value: 1.40 },
];

// Employment by sector, share of workers, percent (BPS, August 2024, rounded).
export const EMPLOYMENT_SECTORS = [
  { label: "Services", value: 53, colour: "#0e7c7b" },
  { label: "Agriculture, forestry & fishing", value: 28, colour: "#c98a1b" },
  { label: "Manufacturing & industry", value: 19, colour: "#274156" },
];

// Population by religion, percent (BPS / Ministry of Religious Affairs, 2024, rounded).
export const RELIGION_MIX = [
  { label: "Islam", value: 87, colour: "#0e7c7b" },
  { label: "Christianity", value: 10, colour: "#274156" },
  { label: "Hinduism", value: 2, colour: "#c98a1b" },
  { label: "Buddhism & others", value: 1, colour: "#8a9ba8" },
];

// Provinces: 2024 population in millions (rounded BPS estimates), capital,
// island group, and land area in thousand km2 (rounded, for density).
export const PROVINCES = [
  { name: "Jawa Barat", capital: "Bandung", island: "Jawa", pop: 50.4, area: 35.4 },
  { name: "Jawa Timur", capital: "Surabaya", island: "Jawa", pop: 41.8, area: 47.8 },
  { name: "Jawa Tengah", capital: "Semarang", island: "Jawa", pop: 37.9, area: 32.8 },
  { name: "Sumatera Utara", capital: "Medan", island: "Sumatera", pop: 16.0, area: 73.0 },
  { name: "Banten", capital: "Serang", island: "Jawa", pop: 12.4, area: 9.7 },
  { name: "DKI Jakarta", capital: "Jakarta", island: "Jawa", pop: 10.6, area: 0.7 },
  { name: "Sulawesi Selatan", capital: "Makassar", island: "Sulawesi", pop: 9.5, area: 46.7 },
  { name: "Lampung", capital: "Bandar Lampung", island: "Sumatera", pop: 9.4, area: 34.6 },
  { name: "Sumatera Selatan", capital: "Palembang", island: "Sumatera", pop: 9.1, area: 91.6 },
  { name: "Riau", capital: "Pekanbaru", island: "Sumatera", pop: 6.9, area: 87.0 },
  { name: "Kalimantan Barat", capital: "Pontianak", island: "Kalimantan", pop: 5.9, area: 147.3 },
  { name: "Sumatera Barat", capital: "Padang", island: "Sumatera", pop: 5.8, area: 42.0 },
  { name: "Nusa Tenggara Timur", capital: "Kupang", island: "Nusa Tenggara", pop: 5.7, area: 48.7 },
  { name: "Nusa Tenggara Barat", capital: "Mataram", island: "Nusa Tenggara", pop: 5.6, area: 18.6 },
  { name: "Aceh", capital: "Banda Aceh", island: "Sumatera", pop: 5.5, area: 58.0 },
  { name: "Bali", capital: "Denpasar", island: "Bali", pop: 4.4, area: 5.8 },
  { name: "Kalimantan Selatan", capital: "Banjarmasin", island: "Kalimantan", pop: 4.3, area: 38.7 },
  { name: "Kalimantan Timur", capital: "Samarinda", island: "Kalimantan", pop: 4.0, area: 129.1 },
  { name: "DI Yogyakarta", capital: "Yogyakarta", island: "Jawa", pop: 3.8, area: 3.1 },
  { name: "Jambi", capital: "Jambi", island: "Sumatera", pop: 3.7, area: 50.1 },
  { name: "Sulawesi Tengah", capital: "Palu", island: "Sulawesi", pop: 3.1, area: 61.8 },
  { name: "Kalimantan Tengah", capital: "Palangka Raya", island: "Kalimantan", pop: 2.8, area: 153.6 },
  { name: "Sulawesi Tenggara", capital: "Kendari", island: "Sulawesi", pop: 2.8, area: 38.1 },
  { name: "Sulawesi Utara", capital: "Manado", island: "Sulawesi", pop: 2.7, area: 13.9 },
  { name: "Kepulauan Riau", capital: "Tanjung Pinang", island: "Sumatera", pop: 2.3, area: 8.2 },
  { name: "Bengkulu", capital: "Bengkulu", island: "Sumatera", pop: 2.1, area: 19.9 },
  { name: "Maluku", capital: "Ambon", island: "Maluku", pop: 2.0, area: 46.9 },
  { name: "Sulawesi Barat", capital: "Mamuju", island: "Sulawesi", pop: 1.6, area: 16.8 },
  { name: "Kepulauan Bangka Belitung", capital: "Pangkal Pinang", island: "Sumatera", pop: 1.5, area: 16.4 },
  { name: "Papua Pegunungan", capital: "Wamena", island: "Papua", pop: 1.5, area: 51.2 },
  { name: "Maluku Utara", capital: "Sofifi", island: "Maluku", pop: 1.4, area: 32.0 },
  { name: "Papua Tengah", capital: "Nabire", island: "Papua", pop: 1.4, area: 61.1 },
  { name: "Gorontalo", capital: "Gorontalo", island: "Sulawesi", pop: 1.2, area: 11.3 },
  { name: "Papua", capital: "Jayapura", island: "Papua", pop: 1.1, area: 82.7 },
  { name: "Kalimantan Utara", capital: "Tanjung Selor", island: "Kalimantan", pop: 0.7, area: 75.5 },
  { name: "Papua Barat", capital: "Manokwari", island: "Papua", pop: 0.6, area: 60.3 },
  { name: "Papua Barat Daya", capital: "Sorong", island: "Papua", pop: 0.6, area: 39.2 },
  { name: "Papua Selatan", capital: "Merauke", island: "Papua", pop: 0.5, area: 127.3 },
];

// Health indicators (BPS / Ministry of Health / WHO).
export const HEALTH = [
  { label: "Life expectancy at birth", value: "74.1 years", year: 2024, source: "BPS" },
  { label: "Stunting among under-5s", value: "19.8%", year: 2024, source: "SSGI, Ministry of Health" },
  { label: "Infant mortality", value: "≈ 16 per 1,000 live births", year: 2023, source: "BPS, approximate" },
  { label: "Hospitals nationwide", value: "≈ 3,200", year: 2023, source: "Ministry of Health, approximate" },
  { label: "Maternal mortality", value: "≈ 173 per 100,000 live births", year: 2020, source: "WHO estimate" },
  { label: "Health spending", value: "≈ 3.7% of GDP", year: 2023, source: "World Bank, approximate" },
];

// Education indicators (BPS).
export const EDUCATION = [
  { label: "Adult literacy rate", value: "≈ 96%", year: 2023, source: "BPS, approximate" },
  { label: "Mean years of schooling", value: "9.0 years", year: 2024, source: "BPS" },
  { label: "Expected years of schooling", value: "13.2 years", year: 2024, source: "BPS" },
  { label: "Net enrolment, primary school", value: "≈ 99%", year: 2023, source: "BPS, approximate" },
  { label: "Universities & colleges", value: "≈ 4,500", year: 2024, source: "Ministry of Higher Education, approximate" },
  { label: "Students in higher education", value: "≈ 10 million", year: 2023, source: "BPS, approximate" },
];

// Labour indicators (BPS, August 2024).
export const LABOUR = [
  { label: "Labour force", value: "152.1 million people", year: 2024, source: "BPS, August" },
  { label: "Open unemployment rate", value: "4.76%", year: 2024, source: "BPS, August" },
  { label: "Informal employment share", value: "≈ 59%", year: 2024, source: "BPS, approximate" },
  { label: "Workers in agriculture", value: "≈ 28%", year: 2024, source: "BPS, approximate" },
  { label: "Youth unemployment (15–24)", value: "≈ 17%", year: 2024, source: "BPS, approximate" },
  { label: "Provincial minimum wage range", value: "Rp 2.0–5.6 million / month", year: 2025, source: "Provincial decrees, rounded" },
];

// Environment indicators (Ministry of Environment and Forestry / BPS).
export const ENVIRONMENT = [
  { label: "Forest cover", value: "≈ 95.6 million ha", year: 2023, source: "KLHK, approximate" },
  { label: "Share of land under forest", value: "≈ 50%", year: 2023, source: "KLHK, approximate" },
  { label: "Renewable share of energy mix", value: "≈ 19%", year: 2024, source: "Ministry of Energy, approximate" },
  { label: "Protected areas (land)", value: "≈ 22.5 million ha", year: 2023, source: "KLHK, approximate" },
  { label: "National parks", value: "55 parks", year: 2024, source: "KLHK" },
  { label: "CO₂ emissions per person", value: "≈ 2.5 tonnes", year: 2023, source: "Global Carbon Budget, approximate" },
];

// Island-group totals, computed from the province table at load time.
export function islandTotals() {
  const groups = new Map();
  for (const p of PROVINCES) {
    const g = groups.get(p.island) ?? { island: p.island, pop: 0, count: 0 };
    g.pop += p.pop;
    g.count += 1;
    groups.set(p.island, g);
  }
  return [...groups.values()].sort((a, b) => b.pop - a.pop);
}

export function densityOf(province) {
  return Math.round((province.pop * 1000000) / (province.area * 1000));
}

export function shareOf(province) {
  return ((province.pop / NATIONAL[2024].population) * 100).toFixed(1);
}
