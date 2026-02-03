import Link from "next/link";

type Language = {
  name: string;
};

type FlavorTextEntry = {
  flavor_text: string;
  language: Language;
};

type PokemonType = {
  type: {
    name: string;
  };
};

type PokemonAbility = {
  ability: {
    name: string;
  };
};

type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type PokemonAPI = {
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};

type PokemonSpeciesAPI = {
  name: string;
  flavor_text_entries: FlavorTextEntry[];
};

async function getPokemon(id: string) {
  const pokemonRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
    { cache: "no-store" }
  );

  if (!pokemonRes.ok) {
    throw new Error("Pokémon no encontrado");
  }

  const pokemon: PokemonAPI = await pokemonRes.json();

  const speciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    { cache: "no-store" }
  );

  if (!speciesRes.ok) {
    throw new Error("Especie no encontrada");
  }

  const species: PokemonSpeciesAPI = await speciesRes.json();

  const descripcion =
    species.flavor_text_entries.find(
      (entry) => entry.language.name === "es"
    )?.flavor_text.replace(/\n|\f/g, " ") ??
    "No hay descripción disponible en español.";

  return {
    nombre: species.name,
    imagen:
      pokemon.sprites.other["official-artwork"].front_default,
    tipos: pokemon.types.map((t) => t.type.name),
    altura: pokemon.height / 10,
    peso: pokemon.weight / 10,
    descripcion,
    habilidades: pokemon.abilities.map(
      (a) => a.ability.name
    ),
    stats: pokemon.stats.map((s) => ({
      nombre: s.stat.name,
      valor: s.base_stat,
    })),
  };
}

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const poke = await getPokemon(id);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      
      {/* 🔙 FLECHA PARA VOLVER */}
      <Link
        href="/pokes"
        className="inline-flex items-center mb-6 text-slate-700 hover:text-slate-900 font-semibold transition"
      >
        ← Volver al menú
      </Link>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-slate-900">
        <h1 className="text-3xl font-bold text-center capitalize mb-4">
          {poke.nombre}
        </h1>

        <img
          src={poke.imagen}
          alt={poke.nombre}
          className="w-64 mx-auto"
        />

        <p className="mt-4 text-slate-700">
          {poke.descripcion}
        </p>

        <p className="mt-4 font-semibold">
          🧬 Tipos: {poke.tipos.join(", ")}
        </p>

        <p>📏 Altura: {poke.altura} m</p>
        <p>⚖️ Peso: {poke.peso} kg</p>

        <p className="mt-4 font-semibold">
          ✨ Habilidades:
        </p>
        <ul className="list-disc list-inside">
          {poke.habilidades.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <p className="mt-4 font-semibold">
          📊 Estadísticas:
        </p>
        <ul>
          {poke.stats.map((s) => (
            <li key={s.nombre}>
              {s.nombre}: {s.valor}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
