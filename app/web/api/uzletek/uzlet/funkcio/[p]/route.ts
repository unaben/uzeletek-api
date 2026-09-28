import { getUzletek, withRelations } from "@/lib/db";
import { decode, json, norm } from "@/lib/http";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ p: string }> }
) {
  const funkcio = norm(decode((await params).p));
  const uzletek = (await getUzletek()).filter(
    (u) => norm(u.funkcio) === funkcio
  );
  return json(await withRelations(uzletek));
}
