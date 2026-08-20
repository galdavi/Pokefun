export const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/" as const;
export const POKEMON_SPECIES_API_URL =
  "https://pokeapi.co/api/v2/pokemon-species/" as const;
export const NATIONAL_POKEDEX_API_URL =
  "https://pokeapi.co/api/v2/pokedex/1/" as const;

export const GEN_API_URL = "https://pokeapi.co/api/v2/generation/" as const;

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

export const EVOLUTION_TRIGGERS = {
  "level-up": "Level up",
  trade: "Trade this pokemon",
  "use-item": "Use a",
  shed: "Level 20, empty spot in party, Pokéball in bag",
  spin: "Spin around holding Sweet",
  "tower-of-darkness": "Train in the Tower of Darkness",
  "tower-of-waters": "Train in the Tower of Waters",
  "three-critical-hits": "Land three critical hits in a battle",
  "take-damage": "Go to Dusty Bowl after taking damage",
  other: "RNG based evoultion",
  "agile-style-move": "Use move in agile style",
  "strong-style-move": "Use move in strong style",
  "recoil-damage": "Take recoil damage",
  "use-move": "Use move:",
  "three-defeated-bisharp": "Defeat three Bisharp that hold a Leader's Crest",
  "gimmighoul-coins": "Collect 999 Gimmighoul Coins",
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

export const cardSizeClasses = "h-60 w-28 shrink-0 sm:w-36 lg:w-44";
