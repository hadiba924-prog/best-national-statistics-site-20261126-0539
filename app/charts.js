// NusaData — small pure-SVG chart builders. No libraries, no network:
// each function returns an SVG string the page inserts into the document.

function escapeText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function niceMax(values) {
  const top = Math.max(...values);
  const step = top > 100 ? 10 : top > 10 ? 5 : 1;
  return Math.ceil(top / step) * step;
}

// Horizontal bars with value labels. items: [{label, value, colour?}]
export function barChart(items, options = {}) {
  const width = options.width ?? 760;
  const rowH = options.rowHeight ?? 30;
  const labelW = options.labelWidth ?? 210;
  const max = niceMax(items.map((d) => d.value));
  const height = items.length * rowH + 34;
  const barMax = width - labelW - 70;
  const rows = items
    .map((d, i) => {
      const y = 8 + i * rowH;
      const w = Math.max(2, (d.value / max) * barMax);
      const colour = d.colour ?? "#0e7c7b";
      return `<g>
        <text x="0" y="${y + 15}" class="chart-label">${escapeText(d.label)}</text>
        <rect x="${labelW}" y="${y}" width="${w}" height="20" rx="4" fill="${colour}"></rect>
        <text x="${labelW + w + 8}" y="${y + 15}" class="chart-value">${d.value}</text>
      </g>`;
    })
    .join("");
  const ticks = [0, max / 2, max]
    .map((t) => `<text x="${labelW + (t / max) * barMax}" y="${height - 8}" class="chart-tick" text-anchor="middle">${t}</text>`)
    .join("");
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart" class="chart-svg">${rows}${ticks}</svg>`;
}

// Line chart with dots and year labels. points: [{year, value}]
export function lineChart(points, options = {}) {
  const width = options.width ?? 760;
  const height = options.height ?? 300;
  const padL = 56;
  const padR = 20;
  const padT = 18;
  const padB = 34;
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = min - (max - min) * 0.25;
  const hi = max + (max - min) * 0.15;
  const x = (i) => padL + (i * (width - padL - padR)) / (points.length - 1);
  const y = (v) => padT + ((hi - v) / (hi - lo)) * (height - padT - padB);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const grid = [0.25, 0.5, 0.75]
    .map((f) => {
      const gy = padT + f * (height - padT - padB);
      const gv = hi - f * (hi - lo);
      return `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" class="chart-grid"></line>
        <text x="${padL - 8}" y="${gy + 4}" class="chart-tick" text-anchor="end">${options.format ? options.format(gv) : gv.toFixed(1)}</text>`;
    })
    .join("");
  const dots = points
    .map((p, i) => {
      // Keep the end labels clear of the y-axis ticks: anchor the first
      // label to the right of its dot and the last to the left.
      const anchor = i === 0 ? "start" : i === points.length - 1 ? "end" : "middle";
      const lx = i === 0 ? x(i) + 10 : i === points.length - 1 ? x(i) - 10 : x(i);
      return `<circle cx="${x(i)}" cy="${y(p.value)}" r="5" fill="#c98a1b" stroke="#ffffff" stroke-width="2"></circle>
         <text x="${lx}" y="${y(p.value) - 12}" class="chart-value" text-anchor="${anchor}">${options.format ? options.format(p.value) : p.value}</text>
         <text x="${x(i)}" y="${height - 10}" class="chart-tick" text-anchor="middle">${p.year}</text>`;
    })
    .join("");
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart" class="chart-svg">${grid}<path d="${path}" fill="none" stroke="#0e7c7b" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"></path>${dots}</svg>`;
}

// Donut chart with a centre label and a legend list beside it.
export function donutChart(parts, options = {}) {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = 88;
  const inner = 58;
  const total = parts.reduce((s, p) => s + p.value, 0);
  let angle = -Math.PI / 2;
  const slices = parts
    .map((p) => {
      const frac = p.value / total;
      const a0 = angle;
      const a1 = angle + frac * Math.PI * 2;
      angle = a1;
      const large = frac > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi1 = cx + inner * Math.cos(a1);
      const yi1 = cy + inner * Math.sin(a1);
      const xi0 = cx + inner * Math.cos(a0);
      const yi0 = cy + inner * Math.sin(a0);
      return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${p.colour}"></path>`;
    })
    .join("");
  const legend = parts
    .map(
      (p) =>
        `<li><span class="swatch" style="background:${p.colour}"></span>${escapeText(p.label)}<strong>${p.value}%</strong></li>`,
    )
    .join("");
  return `<div class="donut-wrap">
    <svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Donut chart" class="donut-svg">${slices}
      <text x="${cx}" y="${cy - 4}" class="donut-centre" text-anchor="middle">${escapeText(options.centre ?? "")}</text>
      <text x="${cx}" y="${cy + 18}" class="donut-sub" text-anchor="middle">${escapeText(options.sub ?? "")}</text>
    </svg>
    <ul class="donut-legend">${legend}</ul>
  </div>`;
}
