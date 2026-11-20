// Friday 20 November 2026 in one image (Node 22, standard library only).
//
// The page is drawn ahead of time by tools/build.mjs (HTML + inline SVG rendered by headless Chrome)
// and committed as entry.png. This program checks that the file is a whole PNG the gate accepts
// (at most 1 MiB and 1024×1024) and copies it, byte for byte, to /output/entry.png.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const png = readFileSync(new URL('./entry.png', import.meta.url));

const SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
if (!SIGNATURE.every((b, i) => png[i] === b)) throw new Error('entry.png is not a PNG');
if (png.length > 1024 * 1024) throw new Error(`entry.png is ${png.length} bytes, over 1 MiB`);

// IHDR is the first chunk: width and height are big-endian at bytes 16 and 20
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width > 1024 || height > 1024) throw new Error(`entry.png is ${width}×${height}, over 1024×1024`);

// a whole file ends with the IEND chunk
if (png.subarray(png.length - 8, png.length - 4).toString('latin1') !== 'IEND') throw new Error('entry.png is cut short');

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.png'), png);
console.log(`wrote ${join(out, 'entry.png')}: ${width}×${height}, ${png.length} bytes`);
