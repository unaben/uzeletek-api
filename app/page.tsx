import Link from "next/link";

export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h1>Üzletek API</h1>
      <p>
        <Link href="/web/api/uzletek">/web/api/uzletek</Link>
      </p>
    </main>
  );
}
