import Image from "next/image";
import Link from "next/link";

/*TIPOS*/
type PokemonListItem = {
  name: string;
  url: string;
};

type PokeAPIResponse = {
  results: PokemonListItem[];
};

/*FETCH*/
async function getPokes(): Promise<PokeAPIResponse> {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=50",
    { cache: "no-store" }
  );

  return res.json();
}


export default async function PokesPage() {
  const data = await getPokes();

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-100 to-yellow-100 p-8">

      {/* TÍTULO */}
      <h1 className="text-4xl font-bold text-center mb-10 text-red-600">
        Catálogo de Pokémones
      </h1>

      {/* GRID DE CARDS */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {data.results.map((poke, index) => {
          const id = index + 1;

          return (
            <Link
              key={poke.name}
              href={`/pokes/${id}`}
              className="
                bg-white rounded-2xl shadow-md p-6 text-center
                hover:scale-105 hover:shadow-xl
                transition-all duration-300
              "
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={poke.name}
                width={96}
                height={96}
                className="mx-auto"
              />

              <p className="capitalize text-lg font-semibold text-gray-800 mt-3">
                {poke.name}
              </p>
            </Link>
          );
        })}
      </section>

    </main>
  );
}
