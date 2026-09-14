/**
 * Code 128 (subset B) barcode, rendered as bars from real encoded data —
 * a scanner reads the project name off the screen. Widths come from the
 * standard 107-pattern table, each pattern being six run-lengths.
 */
// prettier-ignore
const PATTERNS = [
  "212222", "222122", "222221", "121223", "121322", "131222", "122213",
  "122312", "132212", "221213", "221312", "231212", "112232", "122132",
  "122231", "113222", "123122", "123221", "223211", "221132", "221231",
  "213212", "223112", "312131", "311222", "321122", "321221", "312212",
  "322112", "322211", "212123", "212321", "232121", "111323", "131123",
  "131321", "112313", "132113", "132311", "211313", "231113", "231311",
  "112133", "112331", "132131", "113123", "113321", "133121", "313121",
  "211331", "231131", "213113", "213311", "213131", "311123", "311321",
  "331121", "312113", "312311", "332111", "314111", "221411", "431111",
  "111224", "111422", "121124", "121421", "141122", "141221", "112214",
  "112412", "122114", "122411", "142112", "142211", "241211", "221114",
  "413111", "241112", "134111", "111242", "121142", "121241", "114212",
  "124112", "124211", "411212", "421112", "421211", "212141", "214121",
  "412121", "111143", "111341", "131141", "114113", "114311", "411113",
  "411311", "113141", "114131", "311141", "411131", "211412", "211214",
  "211232", "2331112",
];

const START_B = 104;
const STOP = 106;

/** Run-lengths for the whole symbol: start, data, checksum, stop. */
export function encode(text: string) {
  const values = [...text].map((char) => {
    const code = char.charCodeAt(0);
    // Subset B covers 32..126; anything else becomes a space.
    return code >= 32 && code <= 126 ? code - 32 : 0;
  });
  const checksum =
    values.reduce((sum, value, i) => sum + value * (i + 1), START_B) % 103;

  return [START_B, ...values, checksum, STOP].flatMap((value) =>
    [...PATTERNS[value]].map(Number),
  );
}

export function Barcode({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const runs = encode(value);
  // Running start offset per run; last entry is the total symbol width.
  const offsets = runs.reduce<number[]>(
    (acc, run) => [...acc, acc[acc.length - 1] + run],
    [0],
  );
  const width = offsets[offsets.length - 1];

  // Even runs are bars, odd runs are the gaps between them.
  const bars = runs.map((run, i) =>
    i % 2 === 0 ? (
      <rect key={i} x={offsets[i]} width={run} height={100} />
    ) : null,
  );

  return (
    <svg
      viewBox={`0 0 ${width} 100`}
      preserveAspectRatio="none"
      fill="currentColor"
      role="img"
      aria-label={`Barcode: ${value}`}
      className={className}
    >
      {bars}
    </svg>
  );
}
