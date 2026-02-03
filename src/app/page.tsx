import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>My Pokédex</h1>
      <Link href="/pokes">Ver Pokémon</Link>
    </main>
  );
}
