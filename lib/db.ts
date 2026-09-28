import { promises as fs } from "fs";
import path from "path";
import type {
  Dolgozo,
  Munkanyilvantartas,
  Nyitvatartas,
  Uzlet,
  UzletReszletes,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

async function readJson<T>(file: string): Promise<T> {
  const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

export const getDolgozok = () => readJson<Dolgozo[]>("dolgozo.json");
export const getUzletek = () => readJson<Uzlet[]>("uzlet.json");
export const getMunkanyilvantartas = () =>
  readJson<Munkanyilvantartas[]>("munkanyilvantartas.json");
export const getNyitvatartas = () =>
  readJson<Nyitvatartas[]>("nyitvatartas.json");

/**
 * Resolves the foreign keys:
 *  uzlet 1─* nyitvatartas       (nyitvatartas.uzletid → uzlet.uzletid)
 *  uzlet 1─* munkanyilvantartas (munkanyilvantartas.uzletid → uzlet.uzletid)
 *  munkanyilvantartas *─1 dolgozo (munkanyilvantartas.dolgozoid → dolgozo.dolgozoid)
 */
export async function withRelations(
  uzletek: Uzlet[]
): Promise<UzletReszletes[]> {
  const [dolgozok, munka, nyitva] = await Promise.all([
    getDolgozok(),
    getMunkanyilvantartas(),
    getNyitvatartas(),
  ]);

  const dolgozoById = new Map(dolgozok.map((d) => [d.dolgozoid, d]));

  return uzletek.map((u) => ({
    ...u,
    nyitvatartas: nyitva
      .filter((n) => n.uzletid === u.uzletid)
      .map(({ uzletid: _u, ...rest }) => rest),
    munkanyilvantartas: munka
      .filter((m) => m.uzletid === u.uzletid)
      .map(({ uzletid: _u, ...rest }) => ({
        ...rest,
        dolgozo: dolgozoById.get(rest.dolgozoid) ?? null,
      })),
  }));
}
