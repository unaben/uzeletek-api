export type Nap =
  | "hétfő"
  | "kedd"
  | "szerda"
  | "csütörtök"
  | "péntek"
  | "szombat"
  | "vasárnap";

/** Raw table rows (mirror the SQL schema) */
export interface Dolgozo {
  dolgozoid: number;
  dnev: string;
  szuldatum: string;
  belepesdatum: string;
  oraber: number;
  neme: "1" | "2";
}

export interface Uzlet {
  uzletid: string;
  unev: string;
  cim: string;
  funkcio: string;
  logourl: string | null;
}

export interface Munkanyilvantartas {
  dolgozoid: number;
  uzletid: string;
  nap: Nap;
  kezdes: string;
  befejezes: string;
}

export interface Nyitvatartas {
  uzletid: string;
  nap: Nap;
  nyitas: string;
  zaras: string;
}

/** Resolved relations */

/** munkanyilvantartas -> dolgozo (many-to-one) */
export interface MunkaBeosztas extends Munkanyilvantartas {
  dolgozo: Dolgozo | null;
}

/** uzlet -> nyitvatartas (one-to-many), uzlet -> munkanyilvantartas (one-to-many) */
export interface UzletReszletes extends Uzlet {
  nyitvatartas: Omit<Nyitvatartas, "uzletid">[];
  munkanyilvantartas: (Omit<Munkanyilvantartas, "uzletid"> & {
    dolgozo: Dolgozo | null;
  })[];
}
