import { getUzletek, withRelations } from "@/lib/db";
import { badRequest, decode, json, norm } from "@/lib/http";
import { cityForIrsz } from "@/lib/irsz";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ p: string }> }
) {
  const irsz = decode((await params).p).trim();
  if (!/^\d{4}$/.test(irsz)) {
    return badRequest("Az irányítószám 4 számjegyű kell legyen.");
  }

  const city = cityForIrsz(irsz);
  const uzletek = (await getUzletek()).filter(
    (u) =>
      u.cim.includes(irsz) || // in case the address contains the postcode
      (city !== null && norm(u.cim.split(",")[0]) === norm(city))
  );

  return json(await withRelations(uzletek));
}
