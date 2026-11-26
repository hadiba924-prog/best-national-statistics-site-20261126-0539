// NusaData — page logic: hash routing, the year toggle, province explorer,
// sortable and searchable region table, and chart-type toggles.

import {
  YEARS,
  NATIONAL,
  NATIONAL_SOURCES,
  POPULATION_TREND,
  GDP_TREND,
  EMPLOYMENT_SECTORS,
  RELIGION_MIX,
  PROVINCES,
  HEALTH,
  EDUCATION,
  LABOUR,
  ENVIRONMENT,
  islandTotals,
  densityOf,
  shareOf,
} from "./data.js";
import { barChart, lineChart, donutChart } from "./charts.js";

const ROUTES = ["overview", "population", "economy", "health", "education", "regions", "environment"];
const state = { year: 2024, trendMetric: "population", donutSet: "employment", barSort: "pop" };

const $ = (id) => document.getElementById(id);
const fmt = (n, digits = 1) => Number(n).toFixed(digits);

function routeFromHash() {
  const raw = location.hash.replace(/^#\/?/, "").split("/")[0];
  return ROUTES.includes(raw) ? raw : "overview";
}

function showRoute(route) {
  for (const r of ROUTES) {
    const section = $("page-" + r);
    if (section) section.hidden = r !== route;
  }
  document.querySelectorAll(".nav-link").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === route);
    if (a.dataset.route === route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  const titles = {
    overview: "Overview",
    population: "Population",
    economy: "Economy",
    health: "Health",
    education: "Education",
    regions: "Regions",
    environment: "Environment",
  };
  document.title = `NusaData — ${titles[route]} · Statistik Indonesia`;
  window.scrollTo(0, 0);
}

// ----- Overview: KPI cards for the selected year -----
function renderKpis() {
  const n = NATIONAL[state.year];
  const cards = [
    { label: "Population", value: `${fmt(n.population)} million`, hint: NATIONAL_SOURCES.population },
    { label: "GDP (nominal)", value: `$${fmt(n.gdpUsd, 2)} trillion`, hint: NATIONAL_SOURCES.gdpUsd },
    { label: "GDP growth", value: `${fmt(n.growth, 2)}%`, hint: NATIONAL_SOURCES.growth },
    { label: "Inflation", value: `${fmt(n.inflation, 2)}%`, hint: NATIONAL_SOURCES.inflation },
    { label: "Unemployment", value: `${fmt(n.unemployment, 2)}%`, hint: NATIONAL_SOURCES.unemployment },
    { label: "Poverty rate", value: `${fmt(n.poverty, 2)}%`, hint: NATIONAL_SOURCES.poverty },
    { label: "Life expectancy", value: `${fmt(n.lifeExpectancy)} years`, hint: NATIONAL_SOURCES.lifeExpectancy },
    { label: "Human Development Index", value: fmt(n.hdi), hint: NATIONAL_SOURCES.hdi },
  ];
  $("kpi-grid").innerHTML = cards
    .map(
      (c) => `<article class="kpi"><p class="kpi-label">${c.label}</p>
        <p class="kpi-value">${c.value}</p>
        <p class="kpi-source">${state.year} · ${c.hint}</p></article>`,
    )
    .join("");
  $("year-note").textContent = `Showing ${state.year} figures. Sources: BPS (Statistics Indonesia) and Bank Indonesia.`;
  document.querySelectorAll(".year-btn").forEach((b) => {
    b.classList.toggle("active", Number(b.dataset.year) === state.year);
    b.setAttribute("aria-pressed", String(Number(b.dataset.year) === state.year));
  });
}

function renderTrendChart() {
  const isPop = state.trendMetric === "population";
  const points = isPop ? POPULATION_TREND : GDP_TREND;
  $("trend-chart").innerHTML = lineChart(points, {
    format: (v) => (isPop ? v.toFixed(1) : `$${v.toFixed(2)}T`),
  });
  $("trend-caption").textContent = isPop
    ? "Mid-year population estimate, millions of people, 2019–2024. Source: BPS."
    : "Nominal GDP, trillion US dollars, 2019–2024. Source: BPS / Bank Indonesia.";
  document.querySelectorAll(".trend-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.metric === state.trendMetric);
  });
}

function renderDonut() {
  const isEmp = state.donutSet === "employment";
  $("donut-box").innerHTML = donutChart(isEmp ? EMPLOYMENT_SECTORS : RELIGION_MIX, {
    centre: isEmp ? "152.1m" : "281.6m",
    sub: isEmp ? "workers, 2024" : "people, 2024",
  });
  $("donut-caption").textContent = isEmp
    ? "Share of employed workers by sector, August 2024. Source: BPS."
    : "Share of the population by religion, 2024, rounded. Source: BPS / Ministry of Religious Affairs.";
  document.querySelectorAll(".donut-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.set === state.donutSet);
  });
}

// ----- Population page: top-province bars + island totals -----
function renderPopulationBars() {
  const top = [...PROVINCES].sort((a, b) => (state.barSort === "name" ? a.name.localeCompare(b.name) : b.pop - a.pop)).slice(0, 10);
  $("province-bars").innerHTML = barChart(
    top.map((p) => ({ label: p.name, value: p.pop })),
    { labelWidth: 230 },
  );
  $("province-bars-caption").textContent =
    state.barSort === "name"
      ? "Ten provinces shown alphabetically, population in millions, 2024. Source: BPS."
      : "The ten most populous provinces, population in millions, 2024. Source: BPS.";
  document.querySelectorAll(".barsort-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.sort === state.barSort);
  });
  $("island-list").innerHTML = islandTotals()
    .map(
      (g) => `<li><span>${g.island}</span><span><strong>${fmt(g.pop)}m</strong> · ${g.count} provinces</span></li>`,
    )
    .join("");
}

// ----- Regions page: province explorer + table -----
function renderProvinceDetail(name) {
  const p = PROVINCES.find((x) => x.name === name) ?? PROVINCES[0];
  $("province-detail").innerHTML = `<h3>${p.name}</h3>
    <dl class="detail-grid">
      <div><dt>Capital</dt><dd>${p.capital}</dd></div>
      <div><dt>Island group</dt><dd>${p.island}</dd></div>
      <div><dt>Population (2024)</dt><dd>${fmt(p.pop)} million</dd></div>
      <div><dt>Share of Indonesia</dt><dd>${shareOf(p)}%</dd></div>
      <div><dt>Land area (approx.)</dt><dd>${fmt(p.area, 1)} thousand km²</dd></div>
      <div><dt>Density (approx.)</dt><dd>${densityOf(p).toLocaleString("en-US")} people / km²</dd></div>
    </dl>
    <p class="fineprint">Population: BPS 2024 rounded estimate. Area rounded; density is approximate.</p>`;
}

function renderRegionsTable() {
  const query = $("region-search").value.trim().toLowerCase();
  const sortKey = $("region-sort").value;
  let rows = PROVINCES.filter(
    (p) => !query || p.name.toLowerCase().includes(query) || p.capital.toLowerCase().includes(query) || p.island.toLowerCase().includes(query),
  );
  const by = {
    pop: (a, b) => b.pop - a.pop,
    name: (a, b) => a.name.localeCompare(b.name),
    density: (a, b) => densityOf(b) - densityOf(a),
  };
  rows = rows.sort(by[sortKey] ?? by.pop);
  $("region-count").textContent = `${rows.length} of ${PROVINCES.length} provinces`;
  $("regions-body").innerHTML = rows.length
    ? rows
        .map(
          (p) => `<tr>
            <td>${p.name}</td><td>${p.capital}</td><td>${p.island}</td>
            <td class="num">${fmt(p.pop)}</td><td class="num">${densityOf(p).toLocaleString("en-US")}</td>
            <td class="num">${shareOf(p)}%</td></tr>`,
        )
        .join("")
    : `<tr><td colspan="6" class="empty">No province matches “${$("region-search").value.trim()}”. Try another name, capital or island.</td></tr>`;
}

function renderIndicatorList(elementId, items) {
  $(elementId).innerHTML = items
    .map(
      (d) => `<article class="fact"><p class="fact-label">${d.label}</p>
        <p class="fact-value">${d.value}</p>
        <p class="fact-source">${d.year} · ${d.source}</p></article>`,
    )
    .join("");
}

// ----- Wire up -----
function init() {
  document.querySelectorAll(".year-btn").forEach((b) =>
    b.addEventListener("click", () => {
      state.year = Number(b.dataset.year);
      renderKpis();
    }),
  );
  document.querySelectorAll(".trend-btn").forEach((b) =>
    b.addEventListener("click", () => {
      state.trendMetric = b.dataset.metric;
      renderTrendChart();
    }),
  );
  document.querySelectorAll(".donut-btn").forEach((b) =>
    b.addEventListener("click", () => {
      state.donutSet = b.dataset.set;
      renderDonut();
    }),
  );
  document.querySelectorAll(".barsort-btn").forEach((b) =>
    b.addEventListener("click", () => {
      state.barSort = b.dataset.sort;
      renderPopulationBars();
    }),
  );
  const select = $("province-select");
  select.innerHTML = PROVINCES.map((p) => `<option value="${p.name}">${p.name}</option>`).join("");
  select.addEventListener("change", () => renderProvinceDetail(select.value));
  $("region-search").addEventListener("input", renderRegionsTable);
  $("region-sort").addEventListener("change", renderRegionsTable);

  renderKpis();
  renderTrendChart();
  renderDonut();
  renderPopulationBars();
  renderProvinceDetail("Jawa Barat");
  renderRegionsTable();
  renderIndicatorList("health-grid", HEALTH);
  renderIndicatorList("education-grid", EDUCATION);
  renderIndicatorList("labour-grid", LABOUR);
  renderIndicatorList("environment-grid", ENVIRONMENT);
  showRoute(routeFromHash());
  window.addEventListener("hashchange", () => showRoute(routeFromHash()));
}

init();
