export type Pokemon = {
    id: number;
    name: string;
    types?: Array<{
        slot: number;
        type: {
            name: PokemonType;
            url: string;
        }
    }>;
}

export const TYPE_COLORS = {
  normal: "#A1A1A1",
  fire: "#D43A30",
  fighting: "#F08833",
  water: "#4C79BC",
  flying: "#8FB8E4",
  grass: "#5D9D3C",
  poison: "#6D4B97",
  electric: "#F2C341",
  ground: "#895229",
  psychic: "#DC4D79",
  rock: "#ADA984",
  ice: "#78CCF0",
  bug: "#95A135",
  dragon: "#4C60A9",
  ghost: "#6B426E",
  dark: "#4E403F",
  steel: "#74A2B9",
  fairy: "#BA7FB5",
} as const;

export type PokemonType = keyof typeof TYPE_COLORS;