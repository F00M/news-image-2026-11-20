// Equal Earth world map for the front page.
// Reads a TopoJSON world atlas (world-atlas@2.0.2 countries-110m.json, Natural Earth,
// public domain) and turns it into SVG path strings, one per country, plus a
// projection function so story pins land on the right spot.

import { readFileSync } from "node:fs";

const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796;
const M = Math.sqrt(3) / 2;
const X_MAX = 2.7063;

function equalEarth(lonDeg, latDeg) {
  const lam = (lonDeg * Math.PI) / 180;
  const phi = (latDeg * Math.PI) / 180;
  const th = Math.asin(M * Math.sin(phi));
  const t2 = th * th, t6 = t2 * t2 * t2;
  const x = (lam * Math.cos(th)) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2)));
  const y = th * (A1 + A2 * t2 + t6 * (A3 + A4 * t2));
  return [x, y];
}

// Decode the quantised, delta-encoded arcs of a TopoJSON topology.
function decodeArcs(topo) {
  const [sx, sy] = topo.transform.scale;
  const [tx, ty] = topo.transform.translate;
  return topo.arcs.map((arc) => {
    let x = 0, y = 0;
    return arc.map(([dx, dy]) => {
      x += dx; y += dy;
      return [x * sx + tx, y * sy + ty];
    });
  });
}

function ringPoints(arcs, ring) {
  const pts = [];
  for (const i of ring) {
    const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
    // consecutive arcs share their joining point
    pts.push(...(pts.length ? a.slice(1) : a));
  }
  return pts;
}

/**
 * Build the map for a box of the given pixel size.
 * latTop / latBottom crop the poles (Antarctica is dropped).
 */
export function buildMap(atlasPath, { width, latTop = 83, latBottom = -57, lonShift = 0 }) {
  const topo = JSON.parse(readFileSync(atlasPath, "utf8"));
  const arcs = decodeArcs(topo);
  const k = width / (2 * X_MAX);
  const yTop = equalEarth(0, latTop)[1];
  const yBottom = equalEarth(0, latBottom)[1];
  const height = Math.round((yTop - yBottom) * k);

  const project = (lon, lat) => {
    let l = lon - lonShift;
    if (l > 180) l -= 360;
    if (l < -180) l += 360;
    const [x, y] = equalEarth(l, lat);
    return [width / 2 + x * k, (yTop - y) * k];
  };

  const countries = [];
  for (const g of topo.objects.countries.geometries) {
    if (g.properties.name === "Antarctica" || g.id === "260") continue;
    const polys = g.type === "Polygon" ? [g.arcs] : g.arcs;
    let d = "";
    for (const poly of polys) {
      for (const ring of poly) {
        const pts = ringPoints(arcs, ring);
        let prev = null;
        pts.forEach(([lon, lat], j) => {
          const [x, y] = project(lon, lat);
          // break the line where a ring jumps across the map edge
          const jump = prev && Math.abs(x - prev[0]) > width / 2;
          d += (j === 0 || jump ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1);
          prev = [x, y];
        });
        d += "Z";
      }
    }
    countries.push({ id: g.id, name: g.properties.name, d });
  }

  // graticule-free outline of the projected globe, for the sea
  const outline = [];
  for (let lat = latBottom; lat <= latTop; lat += 2) outline.push(project(-180 + lonShift + 0.001, lat));
  for (let lat = latTop; lat >= latBottom; lat -= 2) outline.push(project(180 + lonShift - 0.001, lat));
  const sea = "M" + outline.map(([x, y]) => x.toFixed(1) + " " + y.toFixed(1)).join("L") + "Z";

  return { width, height, countries, project, sea };
}
