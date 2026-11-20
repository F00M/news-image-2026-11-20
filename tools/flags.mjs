// Tiny hand-drawn flags (simplified, 3:2) for the one-line stories.
// Windows has no colour flag emoji, so each flag is a few SVG shapes.

const W = 30, H = 20;

const h = (...cs) => cs.map((c, i) =>
  `<rect x="0" y="${(i * H) / cs.length}" width="${W}" height="${H / cs.length + 0.2}" fill="${c}"/>`).join("");
const v = (...cs) => cs.map((c, i) =>
  `<rect x="${(i * W) / cs.length}" y="0" width="${W / cs.length + 0.2}" height="${H}" fill="${c}"/>`).join("");
const disc = (cx, cy, r, c) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/>`;
const star = (cx, cy, r, c) => {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.42 : r;
    p.push((cx + rr * Math.cos(a)).toFixed(2) + "," + (cy + rr * Math.sin(a)).toFixed(2));
  }
  return `<polygon points="${p.join(" ")}" fill="${c}"/>`;
};
const crescent = (cx, cy, r, c, bg) => disc(cx, cy, r, c) + disc(cx + r * 0.32, cy, r * 0.8, bg);

const F = {
  UA: () => h("#0057b7", "#ffd700"),
  PL: () => h("#ffffff", "#dc143c"),
  EE: () => h("#0072ce", "#000000", "#ffffff"),
  RU: () => h("#ffffff", "#0039a6", "#d52b1e"),
  DE: () => h("#000000", "#dd0000", "#ffce00"),
  FR: () => v("#0055a4", "#ffffff", "#ef4135"),
  IT: () => v("#009246", "#ffffff", "#ce2b37"),
  // Vatican: yellow and white halves, with a small gold key mark on the white
  VA: () => `<rect width="15" height="20" fill="#ffe000"/><rect x="15" width="15" height="20" fill="#fff"/><circle cx="22.5" cy="10" r="3.2" fill="none" stroke="#c9a227" stroke-width="1.4"/>`,
  ES: () => h("#aa151b", "#f1bf00", "#f1bf00", "#aa151b"),
  DK: () => `<rect width="30" height="20" fill="#c8102e"/><rect x="9" width="4" height="20" fill="#fff"/><rect y="8" width="30" height="4" fill="#fff"/>`,
  GB: () => `<rect width="30" height="20" fill="#012169"/>
    <path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/>
    <path d="M0 0L30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.6"/>
    <path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="6"/>
    <path d="M15 0V20M0 10H30" stroke="#c8102e" stroke-width="3.4"/>`,
  EU: () => `<rect width="30" height="20" fill="#003399"/>` +
    Array.from({ length: 12 }, (_, i) => star(15 + 6 * Math.cos((i * Math.PI) / 6), 10 + 6 * Math.sin((i * Math.PI) / 6), 1.25, "#ffcc00")).join(""),
  UN: () => `<rect width="30" height="20" fill="#4b92db"/><circle cx="15" cy="10" r="5.2" fill="none" stroke="#fff" stroke-width="1.3"/><path d="M15 4.8V15.2M9.8 10H20.2" stroke="#fff" stroke-width="0.9"/>`,
  TR: () => `<rect width="30" height="20" fill="#e30a17"/>` + crescent(12, 10, 5, "#fff", "#e30a17") + star(18.5, 10, 2.3, "#fff"),
  US: () => Array.from({ length: 7 }, (_, i) => `<rect y="${(i * 20) / 6.5}" width="30" height="${20 / 13}" fill="#b22234"/>`).join("") +
    `<rect width="30" height="20" fill="#fff" opacity="0"/><rect width="13" height="10.8" fill="#3c3b6e"/>` +
    [2.5, 6.5, 10.5].flatMap((x) => [2.6, 5.4, 8.2].map((y) => disc(x, y, 0.7, "#fff"))).join(""),
  CA: () => v("#d52b1e", "#ffffff", "#ffffff", "#d52b1e") + star(15, 10, 4.4, "#d52b1e"),
  MX: () => v("#006847", "#ffffff", "#ce1126") + disc(15, 10, 2.6, "#8c6a2f"),
  BR: () => `<rect width="30" height="20" fill="#009c3b"/><polygon points="15,2.5 27,10 15,17.5 3,10" fill="#ffdf00"/>` + disc(15, 10, 4.4, "#002776"),
  AR: () => h("#74acdf", "#ffffff", "#74acdf") + disc(15, 10, 2.2, "#f6b40e"),
  CO: () => `<rect width="30" height="10" fill="#fcd116"/><rect y="10" width="30" height="5" fill="#003893"/><rect y="15" width="30" height="5" fill="#ce1126"/>`,
  PE: () => v("#d91023", "#ffffff", "#d91023"),
  PA: () => `<rect width="30" height="20" fill="#fff"/><rect x="15" width="15" height="10" fill="#d21034"/><rect y="10" width="15" height="10" fill="#005293"/>` + star(7.5, 5, 2.6, "#005293") + star(22.5, 15, 2.6, "#d21034"),
  HT: () => h("#00209f", "#d21034"),
  IN: () => h("#ff9933", "#ffffff", "#138808") + `<circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width="0.9"/>`,
  PK: () => `<rect width="30" height="20" fill="#01411c"/><rect width="7.5" height="20" fill="#fff"/>` + crescent(18.5, 10, 5, "#fff", "#01411c") + star(21.5, 7.6, 1.8, "#fff"),
  NP: () => `<polygon points="2,1 22,9.5 9,9.5 22,19 2,19" fill="#dc143c" stroke="#003893" stroke-width="1.4"/>` + disc(8, 8, 1.6, "#fff") + disc(8, 15, 1.9, "#fff"),
  BD: () => `<rect width="30" height="20" fill="#006a4e"/>` + disc(13.5, 10, 5.6, "#f42a41"),
  MM: () => h("#fecb00", "#34b233", "#ea2839") + star(15, 10.6, 6.4, "#fff"),
  CN: () => `<rect width="30" height="20" fill="#de2910"/>` + star(6, 5.5, 3.4, "#ffde00") + star(11.5, 2.6, 1.1, "#ffde00") + star(13.3, 5, 1.1, "#ffde00") + star(13.3, 8.2, 1.1, "#ffde00") + star(11.5, 10.4, 1.1, "#ffde00"),
  TW: () => `<rect width="30" height="20" fill="#fe0000"/><rect width="15" height="10" fill="#000095"/>` + star(7.5, 5, 3.2, "#fff") + disc(7.5, 5, 1.7, "#000095") + disc(7.5, 5, 1.3, "#fff"),
  HK: () => `<rect width="30" height="20" fill="#de2910"/>` + [0, 1, 2, 3, 4].map((i) => disc(15 + 3 * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / 5), 10 + 3 * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / 5), 1.9, "#fff")).join(""),
  JP: () => `<rect width="30" height="20" fill="#fff"/>` + disc(15, 10, 6, "#bc002d"),
  KR: () => `<rect width="30" height="20" fill="#fff"/><path d="M10 10a5 5 0 0 1 10 0z" fill="#cd2e3a"/><path d="M10 10a5 5 0 0 0 10 0z" fill="#0047a0"/>` +
    `<path d="M3.5 4.5l3.5-2.5M4.5 5.8l3.5-2.5M23 2l3.5 2.5M22 3.3l3.5 2.5M3.5 15.5l3.5 2.5M4.5 14.2l3.5 2.5M23 18l3.5-2.5M22 16.7l3.5-2.5" stroke="#000" stroke-width="0.9"/>`,
  IQ: () => h("#ce1126", "#ffffff", "#000000") + `<path d="M10 10.3h10" stroke="#007a3d" stroke-width="1.6" stroke-dasharray="2 1"/>`,
  YE: () => h("#ce1126", "#ffffff", "#000000"),
  SA: () => `<rect width="30" height="20" fill="#006c35"/><path d="M8 8.2h14" stroke="#fff" stroke-width="1.4" stroke-dasharray="1.6 0.8"/><path d="M8.5 13h13" stroke="#fff" stroke-width="1.1"/>`,
  IR: () => h("#239f40", "#ffffff", "#da0000") + disc(15, 10, 1.6, "#da0000"),
  IL: () => `<rect width="30" height="20" fill="#fff"/><rect y="2.4" width="30" height="2.6" fill="#0038b8"/><rect y="15" width="30" height="2.6" fill="#0038b8"/>
    <path d="M15 6.4l3.2 5.5h-6.4zM15 13.6l-3.2-5.5h6.4z" fill="none" stroke="#0038b8" stroke-width="0.9"/>`,
  PS: () => h("#000000", "#ffffff", "#007a3d") + `<polygon points="0,0 12,10 0,20" fill="#ce1126"/>`,
  LB: () => `<rect width="30" height="20" fill="#fff"/><rect width="30" height="5" fill="#ed1c24"/><rect y="15" width="30" height="5" fill="#ed1c24"/><polygon points="15,6 19,14 11,14" fill="#00a651"/>`,
  KE: () => h("#000000", "#ffffff", "#bb0000", "#bb0000", "#ffffff", "#006600").replace(/height="3.5333333333333332"/g, 'height="3.6"') +
    `<ellipse cx="15" cy="10" rx="3.2" ry="6.2" fill="#bb0000" stroke="#fff" stroke-width="0.6"/>`,
  NG: () => v("#008751", "#ffffff", "#008751"),
  SN: () => v("#00853f", "#fdef42", "#e31b23") + star(15, 10, 3, "#00853f"),
  SO: () => `<rect width="30" height="20" fill="#4189dd"/>` + star(15, 10.4, 5.2, "#fff"),
  SL: () => h("#006d21", "#ffffff", "#d21034") + star(15, 10, 2.2, "#000"),
  ZA: () => `<rect width="30" height="20" fill="#fff"/><rect width="30" height="7" fill="#e03c31"/><rect y="13" width="30" height="7" fill="#001489"/>
    <path d="M0 0L13 10L0 20" fill="none" stroke="#007749" stroke-width="5"/><polygon points="0,3 9,10 0,17" fill="#000"/><path d="M13 10H30" stroke="#007749" stroke-width="4.6"/>`,
  MW: () => h("#000000", "#ce1126", "#339e35") + `<path d="M9 6.7a6 4 0 0 1 12 0z" fill="#ce1126"/>`,
  ZW: () => h("#319208", "#ffd200", "#de2010", "#000000", "#de2010", "#ffd200", "#319208") + `<polygon points="0,0 12,10 0,20" fill="#fff" stroke="#000" stroke-width="0.7"/>` + star(4.5, 10, 2.4, "#de2010"),
  AU: () => `<rect width="30" height="20" fill="#012169"/>` + star(7.5, 15, 2.6, "#fff") + star(22.5, 4.5, 1.4, "#fff") + star(19.5, 9.5, 1.4, "#fff") + star(25.5, 9, 1.4, "#fff") + star(22.5, 16, 1.4, "#fff") +
    `<rect width="15" height="10" fill="#012169"/><path d="M0 0L15 10M15 0L0 10" stroke="#fff" stroke-width="2"/><path d="M7.5 0V10M0 5H15" stroke="#fff" stroke-width="3"/><path d="M7.5 0V10M0 5H15" stroke="#c8102e" stroke-width="1.6"/>`,
  NZ: () => `<rect width="30" height="20" fill="#012169"/>` + [[22, 5], [19, 10], [25, 9.5], [22, 16]].map(([x, y]) => star(x, y, 1.6, "#c8102e")).join("") +
    `<rect width="15" height="10" fill="#012169"/><path d="M0 0L15 10M15 0L0 10" stroke="#fff" stroke-width="2"/><path d="M7.5 0V10M0 5H15" stroke="#fff" stroke-width="3"/><path d="M7.5 0V10M0 5H15" stroke="#c8102e" stroke-width="1.6"/>`,
  GL: () => h("#ffffff", "#d00c33") + `<path d="M7 10a5.5 5.5 0 0 1 11 0z" fill="#d00c33"/><path d="M7 10a5.5 5.5 0 0 0 11 0z" fill="#fff"/>`,
  VE: () => h("#ffcc00", "#00247d", "#cf142b"),
  GLOBE: () => `<rect width="30" height="20" fill="#e8e1d2"/><circle cx="15" cy="10" r="7.5" fill="#5b8fc7"/><path d="M11 6.5c2 0 3 1.5 2.5 3s-2 1.6-1.4 3.4M17 5.5c1.6 1 2.6 2.4 2 4.3M16 13.5c1.3.4 2.4 1.2 2.8 2.2" stroke="#3f8a4f" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
};

export function flag(code, size = 13) {
  const draw = F[code] || F.GLOBE;
  const w = Math.round(size * 1.5);
  return `<svg class="flag" width="${w}" height="${size}" viewBox="0 0 30 20"><g>${draw()}</g>` +
    `<rect x="0.25" y="0.25" width="29.5" height="19.5" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="0.5"/></svg>`;
}

export const FLAG_CODES = Object.keys(F);
