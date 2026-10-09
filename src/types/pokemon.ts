export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface EvolutionNode {
  speciesName: string;
  speciesId: number;
  image: string;
  minLevel?: number;
  triggerName?: string;
  item?: string;
}

export interface PokemonSpecies {
  flavorText: string;
  genus: string;
  genderRate: number; // -1 genderless, otherwise eighths female
  captureRate: number;
  baseHappiness: number;
  hatchCounter: number;
  eggGroups: string[];
  evolutionChainUrl?: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny?: string;
    other?: {
      showdown?: {
        front_default?: string;
        front_shiny?: string;
      };
      "official-artwork"?: {
        front_default: string;
        front_shiny?: string;
      };
      home?: {
        front_default: string;
        front_shiny?: string;
      };
    };
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  species?: PokemonSpecies;
  evolutionChain?: EvolutionNode[];
}

export interface PokemonCardData {
  id: number;
  name: string;
  image: string;
  animatedImage?: string;
  types: string[];
}
