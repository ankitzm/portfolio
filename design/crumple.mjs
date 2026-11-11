// Bakes the hero card's crumpled-paper shading (two multiply layers):
//   public/crumple-fine.webp  seamless tile of small crinkles, repeated
//   public/crumple.webp       a few big folds across the card, so the tile's
//                             repeat never reads
// Paper is simulated as a stack of folds: each fold is a short crease, a sharp
// V (mountain or valley) that relaxes flat away from the line and fades out
// along it. Summed slopes give the surface normal; each pixel is lit from the
// top-left. Run: node design/crumple.mjs (needs sharp, bundled with Next).
import sharp from "sharp";

let s = 11;
const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;

const L = [-1, -1, 1.5].map((c, _, v) => c / Math.hypot(...v));
const SHADOW = [0x6b, 0x5b, 0x45]; // ink-faded: shade warm, never grey

/**
 * size: output px; scale: px per CSS px (2 for retina); wrap: tile seamlessly.
 * Fold dimensions are in CSS px.
 */
async function bake(
  file,
  { w, h, scale, wrap, count, len, width, slope, gain },
) {
  const folds = Array.from({ length: count }, () => {
    const t = rand() * Math.PI;
    return {
      x: rand() * w,
      y: rand() * h,
      nx: -Math.sin(t),
      ny: Math.cos(t),
      tx: Math.cos(t),
      ty: Math.sin(t),
      len: len[0] + rand() * (len[1] - len[0]),
      r: width[0] + rand() * (width[1] - width[0]),
      // Mostly gentle, a few hard creases; random mountain/valley.
      a: slope * -Math.log(1 - rand() * 0.95) * (rand() < 0.5 ? -1 : 1),
    };
  });

  const W = w * scale;
  const H = h * scale;
  const px = Buffer.alloc(W * H * 3);
  for (let j = 0; j < H; j++)
    for (let i = 0; i < W; i++) {
      const x = i / scale;
      const y = j / scale;
      let gx = 0;
      let gy = 0;
      for (const f of folds) {
        let dx = x - f.x;
        let dy = y - f.y;
        if (wrap) {
          dx -= w * Math.round(dx / w);
          dy -= h * Math.round(dy / h);
        }
        const along = (dx * f.tx + dy * f.ty) / f.len;
        if (along > 2.5 || along < -2.5) continue;
        const d = dx * f.nx + dy * f.ny;
        const g =
          f.a * Math.sign(d) * Math.exp(-Math.abs(d) / f.r - along * along);
        gx += g * f.nx;
        gy += g * f.ny;
      }
      const n = Math.hypot(gx, gy, 1);
      const lit = (-gx * L[0] - gy * L[1] + L[2]) / n;
      const k = Math.max(0, Math.min(0.7, 0.07 + (L[2] - lit) * gain));
      const o = (j * W + i) * 3;
      for (let c = 0; c < 3; c++) px[o + c] = 255 - k * (255 - SHADOW[c]);
    }

  await sharp(px, { raw: { width: W, height: H, channels: 3 } })
    .webp({ quality: 80 })
    .toFile(new URL(`../public/${file}`, import.meta.url).pathname);
  console.log(file, `${W}x${H}`);
}

// Small crinkles: many short, tight creases.
await bake("crumple-fine.webp", {
  w: 480,
  h: 480,
  scale: 2,
  wrap: true,
  count: 480,
  len: [8, 40],
  width: [2, 7],
  slope: 0.16,
  gain: 1.1,
});

// Big folds: few long, soft creases across the whole card. Soft, so 1x is enough.
await bake("crumple.webp", {
  w: 1200,
  h: 800,
  scale: 1,
  wrap: false,
  count: 14,
  len: [150, 450],
  width: [40, 110],
  slope: 0.1,
  gain: 1,
});
