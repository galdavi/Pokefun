export const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/" as const;
export const POKEMON_SPECIES_API_URL = "https://pokeapi.co/api/v2/pokemon-species/" as const; 
export const NATIONAL_POKEDEX_API_URL = "https://pokeapi.co/api/v2/pokedex/1/" as const;

export const POKEMON_GENERATIONS = {
    "generation-i": 1,
    "generation-ii": 2,
    "generation-iii": 3,
    "generation-iv": 4,
    "generation-v": 5,
    "generation-vi": 6,
    "generation-vii": 7,
    "generation-viii": 8,
    "generation-ix": 9,
 } as const;

export const TYPE_COLORS = {
  normal: "bg-zinc-500",
  fire: "bg-red-600",
  fighting: "bg-orange-400",
  water: "bg-blue-500",
  flying: "bg-indigo-600",
  grass: "bg-green-600",
  poison: "bg-purple-400",
  electric: "bg-yellow-400",
  ground: "bg-amber-700",
  psychic: "bg-pink-500",
  rock: "bg-stone-400",
  ice: "bg-sky-400",
  bug: "bg-lime-600",
  dragon: "bg-blue-600",
  ghost: "bg-purple-800",
  dark: "bg-taupe-700",
  steel: "bg-cyan-700",
  fairy: "bg-fuchsia-500",
} as const;


export type PokemonTypeName = keyof typeof TYPE_COLORS;
export type PokemonGeneration = keyof typeof POKEMON_GENERATIONS;