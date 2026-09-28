import { json } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return json({
    endpoints: {
      GET: {
        "~/uzlet/osszes": "az összes nyilvántartott üzlet összes adatának listája",
        "~/uzlet/azon/{id}": "a megadott azonosítójú üzlet összes adata",
        "~/uzlet/irsz/{p}": "a megadott irányítószámon található üzletek összes adata",
        "~/uzlet/funkcio/{p}": "minden olyan üzlet, amely a megadott funkciót teljesíti",
        "~/uzlet/nyitvatartas/{id}": "a megadott azonosítójú üzlet nyitvatartása",
      },
      POST: ["még nincs kész"],
    },
  });
}
