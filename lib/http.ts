import { NextResponse } from "next/server";

export const json = <T>(data: T, status = 200) =>
  NextResponse.json(data, { status });

export const notFound = (message: string) =>
  NextResponse.json({ error: message }, { status: 404 });

export const badRequest = (message: string) =>
  NextResponse.json({ error: message }, { status: 400 });

export const decode = (v: string) => {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};

/** case- and accent-insensitive comparison key ("Élelmiszer" == "elelmiszer") */
export const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
