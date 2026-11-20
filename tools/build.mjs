// Builds the front page for Friday 20 November 2026 and renders it to entry.png.
//
//   node tools/build.mjs --atlas <countries-110m.json> [--check]
//
// The page is plain HTML + inline SVG, rendered by a local headless Chrome at
// exactly 1024×1024. --check also reports any text box whose words overflow it.

import { writeFileSync, mkdirSync, copyFileSync, readFileSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildMap } from "./geo.mjs";
import { flag } from "./flags.mjs";
import { DAY, TIMELINE, LEADS, CARDS, BRIEFS, DATE_CHECK, SOURCES } from "../design/stories.mjs";
import { ART } from "../design/art.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const atlas = opt("--atlas") || process.env.WORLD_ATLAS;
if (!atlas) throw new Error("pass --atlas <countries-110m.json>");
const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";

export const REGIONS = {
  EU: { name: "Europe", c: "#2b5aa8" },
  ME: { name: "Middle East", short: "Mideast", c: "#c97a0e" },
  AS: { name: "Asia", c: "#c0392b" },
  AF: { name: "Africa", c: "#2e8b57" },
  AM: { name: "Americas", c: "#7a3fa0" },
  OC: { name: "Oceania", c: "#11898a" },
  GL: { name: "Global", c: "#59606b" },
};

const TAGS = {
  CONFIRMED: "#2e7d4f", OFFICIAL: "#2b5aa8", REPORTED: "#8a6d1d", REPORT: "#8a6d1d", CLAIM: "#b03a2e",
};

// where each numbered story sits on the map (lon, lat)
const PINS = {
  kyiv: [30.5, 50.4], akvan: [84.9, 19.3], selloff: [124, 31], ukeu: [4.4, 50.8], cop: [30.7, 36.9],
  poland: [23.4, 51.0], estonia: [26.5, 59.2], italy: [12.5, 41.9], presser: [-77.0, 38.9],
  iraq: [44.2, 32.9], yemen: [43.0, 14.8], japan: [139.7, 35.7], children: null, quake: [-118.2, 34.0], sco: [77.2, 28.6],
};
const DOTS = {
  Lviv: [24.0, 49.8], Kharkiv: [36.2, 50.0], UK: [-1.5, 52.5], Fairford: [-1.8, 51.7], ECB: [8.7, 50.1],
  Moscow: [37.6, 55.8], Riyadh: [46.7, 24.7], Qeshm: [55.9, 26.8], Gaza: [34.4, 31.4], Israel: [35.0, 32.2],
  Knesset: [35.2, 31.8], Odisha: [85.8, 20.3], Jharkhand: [85.3, 23.4], Rajasthan: [74.2, 27.0], Nepal: [85.3, 27.7],
  Myanmar: [96.1, 19.7], Pakistan: [73.0, 33.7], Senegal: [-17.4, 14.7], Somaliland: [44.1, 9.6],
  "S. Africa": [28.0, -26.2], Malawi: [33.8, -14.0], "New York": [-74.0, 40.7], "Wall St": [-74.0, 40.7],
  NSA: [-76.8, 39.1], Cinemas: [-98, 39], OAS: [-77.0, 38.9], COP31: [30.7, 36.9], UN: [-74.0, 40.7], Trump: [-77, 38.9],
  Turin: [7.7, 45.1], "Las Vegas": [-115.2, 36.2], Brazil: [-47.9, -15.8], Wellington: [174.8, -41.3],
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

function regionCounts() {
  const all = [...LEADS, ...CARDS, ...BRIEFS];
  const n = {};
  for (const s of all) n[s.reg] = (n[s.reg] || 0) + 1;
  return { total: all.length, n };
}

function mapSvg(map) {
  const lands = map.countries.map((c) => `<path d="${c.d}"/>`).join("");
  const dots = BRIEFS.map((b) => DOTS[b.p] && map.project(...DOTS[b.p]))
    .map((p, i) => p ? `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.6" fill="${REGIONS[BRIEFS[i].reg].c}" stroke="#fff" stroke-width=".8"/>` : "").join("");
  // numbered pins; crowded ones (Europe) are pushed apart and keep a thin leader line to the real spot
  const pts = [...LEADS, ...CARDS].map((s, i) => {
    const ll = PINS[s.art];
    if (!ll) return null;
    const [x, y] = map.project(...ll);
    return { i, s, x0: x, y0: y, x: x + (i % 3) * 0.01, y: y + (i % 5) * 0.01, r: i < 3 ? 7.5 : 6.2 };
  }).filter(Boolean);
  for (let it = 0; it < 300; it++) {
    for (const a of pts) for (const b of pts) {
      if (a === b) continue;
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.01, min = a.r + b.r + 1.2;
      if (d < min) { const k = (min - d) / 2 / d; a.x -= dx * k; a.y -= dy * k; b.x += dx * k; b.y += dy * k; }
    }
    for (const p of pts) {
      p.x += (p.x0 - p.x) * 0.02; p.y += (p.y0 - p.y) * 0.02;
      p.x = Math.min(map.width - p.r - 1, Math.max(p.r + 1, p.x));
      p.y = Math.min(map.height - p.r - 1, Math.max(p.r + 1, p.y));
    }
  }
  const f = (v) => v.toFixed(1);
  const lines = pts.filter((p) => Math.hypot(p.x - p.x0, p.y - p.y0) > p.r * 0.8).map((p) =>
    `<line x1="${f(p.x0)}" y1="${f(p.y0)}" x2="${f(p.x)}" y2="${f(p.y)}" stroke="#1d1d1f" stroke-width=".8"/><circle cx="${f(p.x0)}" cy="${f(p.y0)}" r="1.6" fill="#1d1d1f"/>`).join("");
  const pins = [lines, ...pts.map((p) =>
    `<g><circle cx="${f(p.x)}" cy="${f(p.y)}" r="${p.r}" fill="${REGIONS[p.s.reg].c}" stroke="#fff" stroke-width="1.3"/>` +
    `<text x="${f(p.x)}" y="${f(p.y + 3.4)}" font-size="${p.i < 3 ? 10 : 8.5}" font-weight="700" fill="#fff" text-anchor="middle" font-family="Bahnschrift, sans-serif">${p.i + 1}</text></g>`)];
  return `<svg width="${map.width}" height="${map.height}" viewBox="0 0 ${map.width} ${map.height}">
    <path d="${map.sea}" fill="#dfe9f1"/>
    <g fill="#d8cfbd" stroke="#f7f3ea" stroke-width=".5">${lands}</g>
    ${dots}${pins.join("")}</svg>`;
}

function timeline() {
  const W = 1000;
  const x = (h) => 12 + (h / 24) * (W - 24);
  const ticks = [3, 6, 9, 12, 15, 18, 21].map((h) =>
    `<div class="tick" style="left:${x(h)}px">${String(h).padStart(2, "0")}</div>`).join("");
  // labels after 18:00 hang to the left of their marker so they stay on the page
  const ev = TIMELINE.map((e, i) =>
    `<div class="ev ${i % 2 ? "lo" : "hi"}${e.h > 18 ? " r" : ""}" style="left:${x(e.h)}px"><i style="background:${REGIONS[e.reg].c}"></i><b>${esc(e.t)}</b> ${esc(e.txt)}</div>`).join("");
  return `<div class="sky"><div class="band"></div>${ticks}
    <div class="sun" style="left:${x(12) - 7}px"></div><div class="moon" style="left:${x(0.6) - 4}px"></div><div class="moon" style="left:${x(23.4) - 5}px"></div>${ev}</div>`;
}

// stories per region, shown as coloured keys above the map (colours match pins and numbers)
function regionKey() {
  const { n } = regionCounts();
  return `<span class="rk">` + Object.entries(REGIONS).filter(([k]) => n[k]).map(([k, r]) =>
    `<span><i style="background:${r.c}"></i>${r.short || r.name} ${n[k]}</span>`).join("") + `</span>`;
}

function lead(s, i) {
  return `<article class="lead">
    <div class="art">${ART[s.art]()}</div>
    <div class="kick"><span class="num" style="background:${REGIONS[s.reg].c}">${i + 1}</span><span style="color:${REGIONS[s.reg].c}">${esc(s.place)} · ${s.field}</span>
      <span class="tag" style="color:${TAGS[s.tag]};border-color:${TAGS[s.tag]}">${s.tag}</span></div>
    <h2 class="fit">${esc(s.head)}</h2>
    <p class="fit">${esc(s.dek)} <span class="src">${esc(s.src)}</span></p>
  </article>`;
}

function card(s, i) {
  return `<article class="card">
    <div class="art">${ART[s.art]()}</div>
    <div class="kick"><span class="num" style="background:${REGIONS[s.reg].c}">${i + 4}</span><span class="pl fit" style="color:${REGIONS[s.reg].c}">${esc(s.place)}</span></div>
    <h3 class="fit">${esc(s.head)}</h3>
    <div class="foot"><span class="tag" style="color:${TAGS[s.tag]};border-color:${TAGS[s.tag]}">${s.tag}</span><span class="src fit">${esc(s.src)}</span></div>
  </article>`;
}

// how many one-liners sit under the map; the rest fill two columns on the right
const LEFT_BRIEFS = Number(opt("--left") ?? 6);

function briefs() {
  const n0 = LEADS.length + CARDS.length;
  return BRIEFS.map((b, i) => `<li class="fit"><span class="bn">${n0 + i + 1}</span>${flag(b.f, 12)}<b>${esc(b.p)}</b> ${esc(b.t)} <span class="src">${esc(b.s)}</span></li>`);
}

function page(map) {
  const { total, n } = regionCounts();
  const regions = Object.keys(n).length;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:1024px;height:1024px;overflow:hidden;background:#f6f1e6;color:#1d1d1f;font-family:"Segoe UI",Arial,sans-serif}
  .pg{position:relative;width:1024px;height:1024px;padding:0 12px}
  .top{display:flex;justify-content:space-between;align-items:center;height:22px;border-bottom:2px solid #1d1d1f;font:700 11.5px Bahnschrift,"Segoe UI",sans-serif;letter-spacing:.06em;text-transform:uppercase}
  .top .l{color:#c62f2f}
  .top>span{white-space:nowrap}
  h1{font:700 62px/1 Georgia,"Times New Roman",serif;text-align:center;letter-spacing:-.015em;margin-top:3px;white-space:nowrap}
  .dek{font:italic 14.5px/1.2 Georgia,serif;text-align:center;margin-top:3px;color:#333;padding-bottom:5px;border-bottom:1px solid #1d1d1f}
  .sky{position:relative;height:50px;margin-top:5px}
  .band{position:absolute;left:12px;right:12px;top:0;height:13px;border-radius:7px;
    background:linear-gradient(90deg,#0f1d3d 0%,#22345f 18%,#f0a35e 27%,#9cc9ea 38%,#bfe0f5 50%,#9cc9ea 62%,#f0a35e 73%,#22345f 82%,#0f1d3d 100%)}
  .tick{position:absolute;top:1px;transform:translateX(-50%);font:700 9px Bahnschrift,sans-serif;color:#fff;text-shadow:0 0 2px rgba(0,0,0,.6)}
  .sun{position:absolute;top:-1px;width:15px;height:15px;border-radius:50%;background:#ffd23f;box-shadow:0 0 6px #ffcf3a}
  .moon{position:absolute;top:2px;width:9px;height:9px;border-radius:50%;box-shadow:inset -3px 0 0 #f4e7b0}
  .skylabel{display:none}
  .ev{position:absolute;white-space:nowrap;font:12px/1 "Segoe UI",sans-serif;padding-left:9px;border-left:1.5px solid #1d1d1f}
  .ev.hi{top:13px;height:24px;padding-top:11px}
  .ev.lo{top:13px;height:38px;padding-top:25px}
  .ev.r{border-left:0;border-right:1.5px solid #1d1d1f;padding-left:0;padding-right:9px;transform:translateX(-100%)}
  .ev.r i{left:auto;right:-5px}
  .ev i{position:absolute;left:-5px;top:-1px;width:8px;height:8px;border-radius:50%;border:1.5px solid #fff}
  .ev b{font-family:Bahnschrift,sans-serif}
  .regbar{display:flex;height:15px;margin-top:3px;gap:2px}
  .regbar div{color:#fff;font:700 10.5px/15px Bahnschrift,sans-serif;text-align:center;white-space:nowrap;overflow:hidden;letter-spacing:.03em}
  .leads{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:6px}
  .art{overflow:hidden;border-radius:2px}
  .lead .art{height:116px}
  .kick{display:flex;align-items:center;gap:5px;margin-top:5px;font:700 11px Bahnschrift,sans-serif;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}
  .num{display:inline-block;min-width:17px;height:17px;border-radius:9px;color:#fff;font:700 11px/17px Bahnschrift,sans-serif;text-align:center;padding:0 3px}
  .tag{margin-left:auto;border:1.2px solid;border-radius:2px;font:700 9.5px/1 Bahnschrift,sans-serif;padding:2px 4px;letter-spacing:.04em}
  .lead h2{font:700 22px/1.06 Georgia,serif;margin-top:2px;height:47px;overflow:hidden}
  .lead p{font:12.3px/1.28 "Segoe UI",sans-serif;margin-top:2px;height:47px;overflow:hidden;color:#262626}
  .src{color:#777;font-size:.85em;white-space:nowrap}
  .cards{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;margin-top:5px;padding-top:5px;border-top:1px solid #1d1d1f}
  .cards+.cards{border-top:1px solid #cfc6b4}
  .card .art{height:56px}
  .card .kick{font-size:10px;margin-top:4px}
  .card .num{min-width:16px;height:16px;font-size:10px;line-height:16px}
  .card .pl{overflow:hidden;text-overflow:clip}
  .card h3{font:700 13.8px/1.1 Georgia,serif;margin-top:1px;height:46px;overflow:hidden}
  .card .foot{display:flex;align-items:center;gap:4px;margin-top:1px;height:15px}
  .card .foot .tag{margin-left:0;font-size:8.5px;padding:2px 3px}
  .card .foot .src{font-size:10px;overflow:hidden}
  .bottom{display:grid;grid-template-columns:330px minmax(0,1fr);gap:16px;margin-top:5px;padding-top:5px;border-top:2px solid #1d1d1f}
  .sec{font:700 11px Bahnschrift,sans-serif;letter-spacing:.06em;text-transform:uppercase;display:flex;justify-content:space-between;margin-bottom:3px}
  .rk{display:flex;gap:8px;white-space:nowrap;letter-spacing:.02em;font:700 10px Bahnschrift,sans-serif}
  .rk i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:3px;vertical-align:-.5px}
  .legend{display:flex;flex-wrap:wrap;gap:3px 9px;font:10.5px "Segoe UI",sans-serif;margin-top:2px}
  .legend i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:3px}
  .dc{position:absolute;left:12px;right:12px;bottom:18px;border:1.5px solid #b03a2e;background:#fbecea;padding:2px 7px;font:10.5px/1.3 "Segoe UI",sans-serif}
  .dc b.h{font:700 11px Bahnschrift,sans-serif;letter-spacing:.06em;color:#b03a2e;text-transform:uppercase;margin-right:4px}
  .dc em{font-style:normal;font-weight:700;color:#b03a2e}
  .dc .sec{color:#b03a2e;margin-bottom:2px}
  .dc table{width:100%;border-collapse:collapse;font:11px/1.28 "Segoe UI",sans-serif}
  .dc td:last-child{text-align:right;font-weight:700;color:#b03a2e;white-space:nowrap}
  .dc .ny{font:11px/1.25 "Segoe UI",sans-serif;margin-top:2px}
  ol{list-style:none;columns:2;column-gap:16px}
  ol.one{columns:1;margin-top:4px}
  li{font:11px/13.5px "Segoe UI",sans-serif;white-space:nowrap;overflow:hidden;border-bottom:1px dotted #cfc6b4;break-inside:avoid}
  li .flag{vertical-align:-1.5px;margin-right:4px}
  .bn{display:inline-block;width:19px;font:700 10.5px Bahnschrift,sans-serif;color:#777}
  .foot2{position:absolute;left:12px;right:12px;bottom:2px;display:flex;justify-content:space-between;gap:12px;white-space:nowrap;font:10px "Segoe UI",sans-serif;color:#555;border-top:1px solid #1d1d1f;padding-top:2px}
  .ovf{outline:2px solid magenta}
  </style></head><body><div class="pg">
  <div class="top"><span class="l">${esc(DAY.kicker)}</span>${regionKey()}<span>${total} stories · ${regions} regions · all from ${DAY.date.replace(" 2026", "")}</span></div>
  <h1>${DAY.weekday} ${DAY.date}</h1>
  <div class="dek">${esc(DAY.dek)}</div>
  ${timeline()}
  <section class="leads">${LEADS.map(lead).join("")}</section>
  <section class="cards">${CARDS.slice(0, 6).map((c, i) => card(c, i)).join("")}</section>
  <section class="cards">${CARDS.slice(6).map((c, i) => card(c, i + 6)).join("")}</section>
  <section class="bottom">
    <div>
      <div class="sec"><span>Where it happened</span><span style="color:#777">pins = story numbers</span></div>
      ${mapSvg(map)}
      <ol class="one">${briefs().slice(0, LEFT_BRIEFS).join("")}</ol>
    </div>
    <div>
      <div class="sec"><span>Also on ${DAY.weekday} ${DAY.date.replace(" 2026", "")} — ${BRIEFS.length} more stories</span><span style="color:#777">source at line end</span></div>
      <ol>${briefs().slice(LEFT_BRIEFS).join("")}</ol>
    </div>
  </section>
  <div class="dc"><b class="h">Date check</b><em>Left out as Thursday 19 Nov news:</em> ${DATE_CHECK.earlier.map(esc).join(" · ")}. <em>Not yet:</em> ${esc(DATE_CHECK.notYet)}.</div>
  <div class="foot2"><span>Every story happened, or was first reported, on ${DAY.weekday} ${DAY.date} · claims are attributed</span><span>Sources: ${esc(SOURCES)} · drawings: original · map: Natural Earth</span></div>
  </div>
  <script>
  if (location.hash === "#check") {
    const bad = [];
    document.querySelectorAll(".fit,h1,.ev,.regbar div,.top span").forEach((el) => {
      if (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) { el.classList.add("ovf"); bad.push(el.textContent.trim().slice(0, 60)); }
    });
    const pg = document.querySelector(".pg"); const last = document.querySelector(".bottom").getBoundingClientRect();
    bad.push("BOTTOM_EDGE=" + Math.round(last.bottom));
    document.body.setAttribute("data-overflow", JSON.stringify(bad));
  }
  </script></body></html>`;
}

const map = buildMap(atlas, { width: 330, latTop: 70, latBottom: -43, lonShift: 10 });
const out = resolve(ROOT, "build");
mkdirSync(out, { recursive: true });
const html = page(map);
const htmlPath = resolve(out, "page.html");
writeFileSync(htmlPath, html);

const url = pathToFileURL(htmlPath).href;
const png = resolve(out, "entry.png");
execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
  "--window-size=1024,1024", "--default-background-color=00000000", `--screenshot=${png}`, url], { stdio: "ignore" });
console.log("rendered", png, statSync(png).size, "bytes");

if (args.includes("--check")) {
  const dom = execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--window-size=1024,1024", "--virtual-time-budget=3000",
    "--dump-dom", url + "#check"], { encoding: "utf8" });
  const m = dom.match(/data-overflow="([^"]*)"/);
  console.log("overflow:", m ? m[1].replace(/&quot;/g, '"') : "(none reported)");
}
if (args.includes("--publish")) {
  copyFileSync(png, resolve(ROOT, "entry.png"));
  console.log("copied to entry.png");
}
