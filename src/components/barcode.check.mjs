/**
 * Self-check for the Code 128 encoder: `node src/components/barcode.check.mjs`.
 * Strips the TSX types so the encoder runs in plain node, then asserts the
 * pattern table's module widths and a hand-computed check character.
 */
import { readFileSync } from "node:fs";
import assert from "node:assert";

const src = readFileSync(new URL("./barcode.tsx", import.meta.url), "utf8");
const body = src.slice(0, src.indexOf("export function Barcode"));
const { encode } = await import(
  "data:text/javascript," +
    encodeURIComponent(
      body.replace(/: string/g, "").replace(/<number\[\]>/g, ""),
    )
);

const patterns = body
  .slice(body.indexOf("const PATTERNS"), body.indexOf("];"))
  .match(/"\d{6,7}"/g)
  .map((s) => s.slice(1, -1));

// Table shape: 107 values (0..106), each 11 modules wide except STOP at 13.
assert.equal(patterns.length, 107, "pattern count");
assert.equal(new Set(patterns).size, 107, "patterns unique");
patterns.forEach((pattern, value) => {
  const modules = [...pattern].reduce((sum, run) => sum + +run, 0);
  assert.equal(modules, value === 106 ? 13 : 11, `value ${value} module width`);
  assert.equal(pattern.length, value === 106 ? 7 : 6, `value ${value} runs`);
});

// "PJJ123C" in subset B: values 48,42,42,17,18,19,35.
// Checksum = (104 + 48*1 + 42*2 + 42*3 + 17*4 + 18*5 + 19*6 + 35*7) % 103
//          = 879 % 103 = 55, whose pattern is "311321".
const expectedCheck =
  (104 + 48 * 1 + 42 * 2 + 42 * 3 + 17 * 4 + 18 * 5 + 19 * 6 + 35 * 7) % 103;
assert.equal(expectedCheck, 55, "checksum arithmetic");
assert.equal(patterns[expectedCheck], "311321", "check character pattern");

const runs = encode("PJJ123C");
assert.equal(
  runs.length,
  9 * 6 + 7,
  "run count: START + 7 data + check + STOP",
);
assert.deepEqual(runs.slice(0, 6), [2, 1, 1, 2, 1, 4], "START B = 211214");
assert.deepEqual(runs.slice(-7), [2, 3, 3, 1, 1, 1, 2], "STOP = 2331112");
assert.deepEqual(
  runs.slice(-13, -7),
  [...patterns[expectedCheck]].map(Number),
  "check character 55",
);

// A bar opens the symbol, so even indices are bars: 31 of the 61 runs.
assert.equal(runs.filter((_, i) => i % 2 === 0).length, 31, "bar count");

// Characters outside subset B (CJK, control codes) fall back to a space rather
// than indexing past the table and rendering NaN-width bars. Built from
// codepoints so no source-file encoding can change what is being tested.
const cjk = String.fromCodePoint(0x65e5, 0x672c);
assert.equal(cjk.length, 2, "test string is two characters");
const outside = encode(cjk);
assert.equal(outside.length, 4 * 6 + 7, "unsupported characters fall back");
assert.ok(
  outside.every(Number.isInteger),
  "no NaN run widths for unsupported characters",
);

// Real card values encode without gaps in the run list.
const card = encode("CLARITY-01");
assert.equal(card.length, 12 * 6 + 7, "project label encodes");
assert.ok(card.every(Number.isInteger), "no NaN run widths");

console.log("barcode encoder OK");
