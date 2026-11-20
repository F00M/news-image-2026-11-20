// Original flat illustrations, drawn in SVG for this page.
// Leads are 330×128, cards 160×60. Every picture carries one short caption chip
// so the story reads even at thumbnail size.

const INK = "#1d1d1f", PAPER = "#f4efe4", RED = "#c62f2f", GOLD = "#f2b134";

const chip = (x, y, text, { bg = RED, fg = "#fff", size = 11, anchor = "start", w } = {}) => {
  const width = w ?? Math.round(text.length * size * 0.58 + 10);
  const x0 = anchor === "end" ? x - width : anchor === "middle" ? x - width / 2 : x;
  return `<rect x="${x0}" y="${y}" width="${width}" height="${size + 7}" rx="2" fill="${bg}"/>` +
    `<text x="${x0 + width / 2}" y="${y + size + 2}" font-size="${size}" font-weight="700" fill="${fg}" text-anchor="middle" font-family="Bahnschrift, 'Segoe UI', sans-serif">${text}</text>`;
};

const boom = (x, y, r) =>
  `<circle cx="${x}" cy="${y}" r="${r * 1.7}" fill="#ff8a1f" opacity=".25"/>` +
  `<path d="${Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6, rr = i % 2 ? r * 0.55 : r;
    return (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1);
  }).join("")}Z" fill="#ffb02e"/><circle cx="${x}" cy="${y}" r="${r * 0.38}" fill="#fff3c4"/>`;

const person = (x, y, s = 1, c = INK) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><circle cx="0" cy="-17" r="4"/><path d="M-5 -12h10l2 12h-3l-1 12h-6l-1-12h-3z"/></g>`;

const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">${body}</svg>`;

export const ART = {
  // 1. Kyiv: three bridges over the Dnipro at night, missile trails coming in
  kyiv: () => svg(330, 128, `
    <defs><linearGradient id="kn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1b3a"/><stop offset="1" stop-color="#2a3f6e"/></linearGradient></defs>
    <rect width="330" height="128" fill="url(#kn)"/>
    ${[[30, 14], [62, 30], [118, 10], [210, 22], [280, 12], [300, 34], [160, 28]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="#fff" opacity=".7"/>`).join("")}
    <path d="M250 -4 Q200 30 150 62" stroke="#ffd27a" stroke-width="1.6" fill="none" stroke-dasharray="4 3" opacity=".9"/>
    <path d="M330 4 Q280 30 245 66" stroke="#ffd27a" stroke-width="1.6" fill="none" stroke-dasharray="4 3" opacity=".9"/>
    <path d="M200 -4 Q120 20 62 68" stroke="#ffd27a" stroke-width="1.6" fill="none" stroke-dasharray="4 3" opacity=".9"/>
    <path d="M0 72 L0 50 l10 0 l0 -6 l6 -8 l6 8 l0 6 l8 0 l0 -10 l5 -9 l5 9 l0 10 l12 0 L52 72Z" fill="#081022"/>
    <circle cx="16" cy="34" r="3" fill="#e0b54a"/><circle cx="40" cy="29" r="3" fill="#e0b54a"/>
    <rect x="0" y="72" width="330" height="56" fill="#1c3f6b"/>
    <path d="M0 84 Q80 78 165 86 T330 82" stroke="#3a6aa0" stroke-width="2" fill="none"/>
    <path d="M0 100 Q90 94 170 102 T330 98" stroke="#3a6aa0" stroke-width="2" fill="none"/>
    <!-- arch bridge -->
    <path d="M20 74 h90" stroke="#c9d3e6" stroke-width="3.5"/><path d="M28 74 Q65 46 102 74" stroke="#c9d3e6" stroke-width="3" fill="none"/>
    ${[38, 50, 62, 74, 86].map((x) => `<path d="M${x} 74 V${x < 65 ? 74 - (x - 28) * 0.62 : 74 - (102 - x) * 0.62}" stroke="#c9d3e6" stroke-width="1"/>`).join("")}
    <!-- girder bridge -->
    <path d="M128 76 h82" stroke="#c9d3e6" stroke-width="3.5"/>${[134, 152, 170, 188, 204].map((x) => `<path d="M${x} 76 v14" stroke="#c9d3e6" stroke-width="3"/>`).join("")}
    <!-- cable-stayed bridge -->
    <path d="M226 74 h100" stroke="#c9d3e6" stroke-width="3.5"/><path d="M276 74 V30" stroke="#c9d3e6" stroke-width="4"/>
    ${[232, 244, 256, 296, 308, 320].map((x) => `<path d="M276 34 L${x} 74" stroke="#c9d3e6" stroke-width="0.9"/>`).join("")}
    ${boom(64, 68, 11)}${boom(158, 72, 10)}${boom(250, 66, 11)}
    ${chip(8, 98, "KYIV · 3 BRIDGES HIT", { size: 15 })}${chip(322, 6, "400+ drones & missiles", { bg: "#0b1328", anchor: "end", size: 10 })}`),

  // 2. Cyclone Akvan: coastline of south Odisha with the storm's track ashore
  akvan: () => svg(330, 128, `
    <rect width="330" height="128" fill="#2f7fb8"/>
    <path d="M0 0 H330 V0 L330 0 Q250 18 210 40 Q170 62 150 90 Q132 112 120 128 H0Z" fill="#e8d9b0"/>
    <path d="M0 0 H330 Q250 18 210 40 Q170 62 150 90 Q132 112 120 128" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>
    <path d="M40 30 Q90 60 70 110" stroke="#9ec7a6" stroke-width="10" fill="none" opacity=".6"/>
    <path d="M318 122 Q290 104 260 92 Q230 80 200 62" stroke="#fff" stroke-width="2" stroke-dasharray="5 4" fill="none"/>
    <g transform="translate(196 60)">
      <circle r="26" fill="#ffffff" opacity=".18"/>
      <path d="M0 0 m-20 0 a20 20 0 0 1 20 -20 M0 0 m20 0 a20 20 0 0 1 -20 20 M0 0 m0 -12 a12 12 0 0 1 12 12 M0 0 m0 12 a12 12 0 0 1 -12 -12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle r="4" fill="${RED}"/>
    </g>
    <circle cx="174" cy="76" r="3.5" fill="${INK}"/><text x="168" y="80" font-size="11" font-weight="700" text-anchor="end" fill="${INK}" font-family="Bahnschrift, sans-serif">Gopalpur</text>
    <circle cx="232" cy="30" r="3" fill="${INK}"/><text x="226" y="34" font-size="10" text-anchor="end" fill="${INK}" font-family="Bahnschrift, sans-serif">Puri</text>
    <circle cx="205" cy="14" r="3" fill="${INK}"/><text x="199" y="18" font-size="10" text-anchor="end" fill="${INK}" font-family="Bahnschrift, sans-serif">Bhubaneswar</text>
    <text x="40" y="26" font-size="12" font-weight="700" fill="#6b5a2e" font-family="Bahnschrift, sans-serif" letter-spacing="2">ODISHA</text>
    <text x="268" y="84" font-size="10" fill="#d8ecf8" font-family="Bahnschrift, sans-serif" letter-spacing="1">BAY OF BENGAL</text>
    ${chip(8, 98, "AKVAN · LANDFALL", { size: 15 })}${chip(322, 104, "440,000 sheltered", { bg: "#0f3d63", anchor: "end", size: 10 })}`),

  // 3. Asia's AI sell-off: a falling line over a closing-prices board
  selloff: () => svg(330, 128, `
    <rect width="330" height="128" fill="#13161d"/>
    ${[20, 44, 68, 92].map((y) => `<path d="M0 ${y} H170" stroke="#2a2f3a" stroke-width="1"/>`).join("")}
    <path d="M6 30 L26 26 L44 34 L60 28 L78 44 L96 40 L112 62 L128 58 L146 84 L162 96" stroke="#ff4d4d" stroke-width="3" fill="none" stroke-linejoin="round"/>
    <path d="M162 96 l-10 -2 l6 -8z" fill="#ff4d4d"/>
    <rect x="176" y="8" width="146" height="94" rx="4" fill="#1e232d"/>
    ${[["TAIWAN", "−6.2%"], ["KOSPI", "−5.2%"], ["NIKKEI", "−5.1%"], ["HANG SENG", "−1.9%"]].map(([n, v], i) =>
      `<text x="186" y="${30 + i * 21}" font-size="12.5" fill="#e6e8ee" font-weight="700" font-family="Bahnschrift, sans-serif">${n}</text>` +
      `<text x="314" y="${30 + i * 21}" font-size="13" fill="#ff5a5a" font-weight="700" text-anchor="end" font-family="Bahnschrift, sans-serif">▼ ${v}</text>`).join("")}
    <g transform="translate(20 76)"><rect width="34" height="22" rx="3" fill="#2d3442" stroke="#566177"/>
    ${[4, 10, 16, 22, 28].map((x) => `<path d="M${x + 1} -4v4M${x + 1} 22v4" stroke="#566177" stroke-width="2"/>`).join("")}
    <text x="17" y="15" font-size="9" fill="#cfd6e4" text-anchor="middle" font-family="Bahnschrift, sans-serif" font-weight="700">AI</text></g>
    ${chip(8, 98, "AI SELL-OFF · FRIDAY", { size: 15 })}`),

  ukeu: () => svg(160, 60, `
    <rect width="160" height="60" fill="#e9eef7"/>
    <g transform="translate(6 8)"><svg width="54" height="36" viewBox="0 0 30 20"><rect width="30" height="20" fill="#012169"/><path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0L30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.6"/><path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="6"/><path d="M15 0V20M0 10H30" stroke="#c8102e" stroke-width="3.4"/></svg></g>
    <g transform="translate(100 8)"><rect width="54" height="36" fill="#003399"/>${Array.from({ length: 12 }, (_, i) => `<circle cx="${27 + 11 * Math.cos((i * Math.PI) / 6)}" cy="${18 + 11 * Math.sin((i * Math.PI) / 6)}" r="1.8" fill="#ffcc00"/>`).join("")}</g>
    <path d="M52 40 Q66 30 80 34 L92 30 Q100 32 108 40" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M62 34 L82 28 L98 34" stroke="#f1c7a3" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${chip(80, 40, "100,000 YOUTH PLACES", { size: 11, anchor: "middle" })}`),

  cop: () => svg(160, 60, `
    <rect width="160" height="60" fill="#e3f0e6"/>
    <circle cx="34" cy="32" r="22" fill="#4f8fd1"/><path d="M20 22c6-2 10 2 8 7s-6 4-4 9M38 14c5 2 9 7 7 12M36 40c4 0 8 3 9 7" stroke="#3d9a50" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="86" cy="30" r="17" fill="#fff" stroke="${INK}" stroke-width="2.5"/><path d="M86 30V18M86 30l8 4" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="112" y="12" width="40" height="34" rx="2" fill="#fff" stroke="#9aa"/>
    ${[18, 24, 30].map((y) => `<path d="M117 ${y}h30" stroke="#bbb" stroke-width="2"/>`).join("")}
    <path d="M117 38h30" stroke="${RED}" stroke-width="2.5"/><path d="M114 34l36 8" stroke="${RED}" stroke-width="2"/>
    ${chip(4, 40, "NO ‘FOSSIL FUELS’", { size: 11 })}`),

  poland: () => svg(160, 60, `
    <rect width="160" height="60" fill="#cfe3f2"/><rect y="34" width="160" height="26" fill="#9cc26a"/>
    ${[40, 46, 52, 58].map((y) => `<path d="M0 ${y} Q80 ${y - 4} 160 ${y}" stroke="#86ad57" stroke-width="1.5" fill="none"/>`).join("")}
    <ellipse cx="92" cy="44" rx="26" ry="6" fill="#6b4f2a"/>
    <g transform="rotate(-12 90 38)"><rect x="66" y="34" width="44" height="7" rx="3.5" fill="#6d7680"/><path d="M110 34l8 3.5l-8 3.5z" fill="#4a525b"/><path d="M70 34l-6-6h6l4 6zM70 41l-6 6h6l4-6z" fill="#4a525b"/><path d="M86 34l2-5h4l-1 5z" fill="#4a525b"/></g>
    <path d="M24 34V10" stroke="#555" stroke-width="2"/><rect x="25" y="10" width="22" height="7" fill="#fff"/><rect x="25" y="17" width="22" height="7" fill="#dc143c"/>
    ${chip(156, 3, "Kh-101", { size: 11, anchor: "end", bg: INK })}`),

  estonia: () => svg(160, 60, `
    <rect width="160" height="60" fill="#dfe7ee"/><path d="M40 60 L66 22 H94 L120 60Z" fill="#7d858e"/><path d="M80 24v8M80 38v8M80 52v8" stroke="#fff" stroke-width="2"/>
    <rect x="40" y="30" width="80" height="6" fill="${RED}"/>${[48, 64, 80, 96, 112].map((x) => `<rect x="${x}" y="30" width="8" height="6" fill="#fff"/>`).join("")}
    <rect x="36" y="26" width="6" height="22" fill="${INK}"/><rect x="118" y="26" width="6" height="22" fill="${INK}"/>
    <g transform="translate(6 6)"><rect width="24" height="16" fill="#0072ce"/><rect y="5.3" width="24" height="5.4" fill="#000"/><rect y="10.7" width="24" height="5.3" fill="#fff"/></g>
    <g transform="translate(130 6)"><rect width="24" height="16" fill="#fff"/><rect y="5.3" width="24" height="5.4" fill="#0039a6"/><rect y="10.7" width="24" height="5.3" fill="#d52b1e"/></g>
    ${chip(80, 40, "CLOSED FROM 1 DEC", { size: 11, anchor: "middle", bg: INK })}`),

  italy: () => svg(160, 60, `
    <rect width="160" height="60" fill="#f6e3d6"/>
    ${[[18, 56, 1], [36, 58, 1.1], [56, 56, 1], [76, 58, 1.15], [98, 56, 1], [118, 58, 1.1], [140, 56, 1]].map(([x, y, s], i) => person(x, y, s, i % 2 ? "#3a2f2a" : "#5b4038")).join("")}
    <path d="M30 26V8M88 24V6M128 26V10" stroke="#5a4636" stroke-width="2"/>
    <rect x="31" y="8" width="18" height="11" fill="${RED}"/><rect x="129" y="10" width="18" height="11" fill="${RED}"/>
    <rect x="60" y="6" width="58" height="16" fill="#fff" stroke="${RED}" stroke-width="1.5"/>
    <text x="89" y="18" font-size="10" font-weight="700" fill="${RED}" text-anchor="middle" font-family="Bahnschrift, sans-serif">SCIOPERO</text>`),

  presser: () => svg(160, 60, `
    <rect width="160" height="60" fill="#dfe6f0"/>
    <path d="M6 44 H96 V28 L51 16 L6 28Z" fill="#fff" stroke="#9aa6b5"/>${[16, 28, 40, 52, 64, 76, 86].map((x) => `<rect x="${x}" y="30" width="3" height="14" fill="#c3ccd8"/>`).join("")}
    <rect x="0" y="44" width="160" height="16" fill="#b9c3cf"/>
    <path d="M38 60 L42 36 H60 L64 60Z" fill="#7a4f2b"/><circle cx="51" cy="43" r="4" fill="#c9a24a"/><path d="M48 36 l-3 -8 M54 36 l3 -8" stroke="${INK}" stroke-width="1.5"/>
    <path d="M100 8 H156 V36 H118 L110 44 V36 H100Z" fill="#fff" stroke="${INK}" stroke-width="1.5"/>
    <text x="128" y="20" font-size="8.5" font-weight="700" fill="${RED}" text-anchor="middle" font-family="Bahnschrift, sans-serif">IRAN OFFER</text>
    <text x="128" y="31" font-size="8.5" font-weight="700" fill="${INK}" text-anchor="middle" font-family="Bahnschrift, sans-serif">“UNACCEPTABLE”</text>`),

  iraq: () => svg(160, 60, `
    <rect width="160" height="60" fill="#f3dfb2"/><rect y="42" width="160" height="18" fill="#d9bd85"/>
    ${[[16, 40], [140, 38]].map(([x, y]) => `<path d="M${x} ${y} v-22" stroke="#7a5a2e" stroke-width="3"/><path d="M${x} ${y - 22} q-10 -2 -14 6 M${x} ${y - 22} q10 -2 14 6 M${x} ${y - 22} q-6 -8 -12 -6 M${x} ${y - 22} q6 -8 12 -6" stroke="#4f8a3a" stroke-width="3" fill="none"/>`).join("")}
    ${[34, 74].map((x) => `<g transform="translate(${x} 30)"><rect width="34" height="14" rx="2" fill="#6f7a4a"/><rect x="24" y="-6" width="10" height="8" fill="#6f7a4a"/><circle cx="7" cy="16" r="4" fill="${INK}"/><circle cx="27" cy="16" r="4" fill="${INK}"/></g>`).join("")}
    <g transform="translate(116 8)"><rect width="30" height="7" fill="#ce1126"/><rect y="7" width="30" height="7" fill="#fff"/><rect y="14" width="30" height="7" fill="#000"/></g>
    ${chip(4, 3, "ARMY MOVES IN", { size: 11 })}`),

  yemen: () => svg(160, 60, `
    <rect width="160" height="60" fill="#d8e4ea"/><rect y="40" width="160" height="20" fill="#3d7ea6"/>
    <rect x="10" y="30" width="90" height="10" fill="#8a8f96"/>
    ${[22, 52, 80].map((x) => `<path d="M${x} 30 V10 H${x + 22}" stroke="#d9822b" stroke-width="3" fill="none"/><path d="M${x + 18} 10 v8" stroke="#555" stroke-width="1"/>`).join("")}
    <path d="M60 30 q-8 -16 4 -24 q4 10 14 6 q-2 12 -10 18z" fill="#5b5b5b" opacity=".75"/>
    ${boom(66, 28, 7)}
    <g transform="translate(118 12) rotate(-14)"><path d="M0 6 L30 4 L36 6 L30 8Z" fill="#4a5560"/><path d="M14 5 L8 -4 H12 L20 5 M14 7 L8 16 H12 L20 7" fill="#4a5560"/></g>
    ${chip(4, 40, "HODEIDAH", { size: 11, bg: INK })}`),

  japan: () => svg(160, 60, `
    <rect width="160" height="60" fill="#fbf3ee"/><circle cx="34" cy="30" r="20" fill="#bc002d"/>
    ${[[70, 34], [86, 30], [102, 32], [118, 24], [134, 16]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="12" height="${50 - y}" fill="${i === 4 ? RED : "#c9b8ad"}"/>`).join("")}
    <path d="M66 50 H152" stroke="${INK}" stroke-width="1.5"/>
    ${chip(156, 3, "2.3% IN OCTOBER", { size: 11, anchor: "end", bg: INK })}`),

  children: () => svg(160, 60, `
    <rect width="160" height="60" fill="#fdebd8"/>
    ${[0, 1, 2, 3].map((i) => `<g transform="translate(${26 + i * 30} 50) scale(${1.15})" fill="${i === 3 ? RED : "#8f7f73"}"><circle cx="0" cy="-22" r="5"/><path d="M-6 -16h12l2 13h-4l-1 10h-6l-1-10h-4z"/></g>`).join("")}
    ${chip(152, 2, "1 IN 4", { size: 11, anchor: "end" })}`),

  quake: () => svg(160, 60, `
    <rect width="160" height="60" fill="#fff4dc"/>
    <path d="M0 40 H26 L30 34 L34 46 L38 22 L42 56 L46 12 L50 52 L54 30 L58 44 L62 36 L66 40 H160" stroke="${RED}" stroke-width="2" fill="none" stroke-linejoin="round"/>
    ${[[100, 26, 10, 22], [114, 18, 12, 30], [130, 28, 9, 20], [143, 22, 11, 26]].map(([x, y, w, hh]) => `<rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="#5a6b80"/>`).join("")}
    <path d="M88 48 v-20" stroke="#6b4f2a" stroke-width="2"/><path d="M88 28 q-7 -1 -9 4 M88 28 q7 -1 9 4 M88 28 q-3 -6 -8 -5 M88 28 q3 -6 8 -5" stroke="#3d8a4f" stroke-width="2.2" fill="none"/>
    <rect x="0" y="48" width="160" height="12" fill="#e2d2ad"/>
    ${chip(4, 2, "M4.2", { size: 11, bg: INK })}`),

  sco: () => svg(160, 60, `
    <rect width="160" height="60" fill="#f6e7cf"/>
    <path d="M20 60 V24 H140 V60Z" fill="#b5653b"/><path d="M20 24 h120" stroke="#8d4a27" stroke-width="3"/>
    ${[30, 50, 70, 90, 110, 128].map((x) => `<rect x="${x}" y="18" width="6" height="6" fill="#b5653b"/>`).join("")}
    <path d="M64 60 V40 Q80 24 96 40 V60Z" fill="#3b2516"/><path d="M34 46 v14 h12 v-14 q-6 -8 -12 0zM114 46 v14 h12 v-14 q-6 -8 -12 0z" fill="#5b3a24"/>
    ${["#ff9933", "#de2910", "#01411c", "#0039a6", "#00afca"].map((c, i) => `<path d="M${36 + i * 22} 18 v-14" stroke="#555" stroke-width="1"/><rect x="${37 + i * 22}" y="4" width="10" height="6" fill="${c}"/>`).join("")}
    ${chip(80, 40, "SCO · NEW DELHI", { size: 11, anchor: "middle", bg: INK })}`),
};
