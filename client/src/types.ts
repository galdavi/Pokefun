export type Pokemon = {
  id: number;
  name: string;
  types: Array<{
    slot: number;
    type: {
      name: PokemonType;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: string };
  }>;
  cries: {
    latest: string;
    legacy: string;
  };
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }>;
  base_experience: number;

  sprites: {
    front_default: string;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string;
        front_female: string | null;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string | null;
      };
    };
  };
};

export type PokedexEntry = {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  };
  genera: Array<{
    genus: string;
    language: {
      name: string;
    };
  }>;
  capture_rate: number;
  base_happiness: number;
  growth_rate: {
    name: string;
  };
  egg_groups: Array<{
    name: string;
  }>;
  hatch_counter: number;
  gender_rate: number;
  has_gender_differences: boolean;
  shape: {
    name: string;
    url: string;
  };
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
};

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

export type Content = Array<{ label: string; value: React.ReactNode }>;
