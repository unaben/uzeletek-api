/**
 * The data only stores the city in `cim` (e.g. "Szeged, Kárász utca 5."),
 * there is no postcode column. To support /irsz/{p} we map postcode ranges
 * to cities. Extend the table as needed.
 */
const RANGES: { from: number; to: number; city: string }[] = [
  { from: 1000, to: 1239, city: "Budapest" },
  { from: 4024, to: 4034, city: "Debrecen" },
  { from: 6720, to: 6729, city: "Szeged" },
  { from: 7621, to: 7636, city: "Pécs" },
  { from: 9021, to: 9028, city: "Győr" },
];

export function cityForIrsz(irsz: string): string | null {
  if (!/^\d{4}$/.test(irsz)) return null;
  const n = Number(irsz);
  return RANGES.find((r) => n >= r.from && n <= r.to)?.city ?? null;
}
