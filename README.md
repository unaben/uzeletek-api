# Üzletek API (Next.js + TypeScript)

    npm install
    npm run dev      # http://localhost:3000

Base path: `/web/api/uzletek`

| Endpoint | Description |
|---|---|
| `GET /uzlet/osszes` | all shops |
| `GET /uzlet/azon/{id}` | shop by id, e.g. `U001` |
| `GET /uzlet/irsz/{p}` | shops by postcode, e.g. `1051` |
| `GET /uzlet/funkcio/{p}` | shops by function, e.g. `Elektronika` |
| `GET /uzlet/nyitvatartas/{id}` | opening hours of a shop |

Data is read from `data/*.json`. Shop responses include relations
(`nyitvatartas`, `munkanyilvantartas[].dolgozo`).
