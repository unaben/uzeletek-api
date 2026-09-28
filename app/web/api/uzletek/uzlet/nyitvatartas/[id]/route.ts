import { getNyitvatartas, getUzletek } from "@/lib/db";
import { decode, json, notFound } from "@/lib/http";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = decode((await params).id);
  const uzlet = (await getUzletek()).find(
    (u) => u.uzletid.toLowerCase() === id.toLowerCase()
  );
  if (!uzlet) return notFound(`Nincs ilyen üzlet: ${id}`);

  const nyitvatartas = (await getNyitvatartas())
    .filter((n) => n.uzletid === uzlet.uzletid)
    .map(({ uzletid: _u, ...rest }) => rest);

  return json({ uzletid: uzlet.uzletid, unev: uzlet.unev, nyitvatartas });
}
