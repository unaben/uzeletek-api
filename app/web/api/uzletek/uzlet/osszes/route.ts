import { getUzletek, withRelations } from "@/lib/db";
import { json } from "@/lib/http";

export async function GET() {
  return json(await withRelations(await getUzletek()));
}
