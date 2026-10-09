import { POKEAPI_BASE_URL, DEFAULT_PAGE_LIMIT } from "../constants";
import {
  PokemonCardData,
  PokemonDetail,
  PokemonListResponse,
  PokemonSpecies,
  EvolutionNode,
} from "@/types/pokemon";

/**
 * Fetch a paginated list of Pokemon with summary card data
 */
export async function fetchPokemonList(
  limit: number = DEFAULT_PAGE_LIMIT,
  offset: number = 0
): Promise<{ count: number; pokemonList: PokemonCardData[] }> {
  try {
    const res = await fetch(
      `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch Pokemon list (Status: ${res.status})`);
    }

    const data: PokemonListResponse = await res.json();

    const pokemonListPromises = data.results.map(async (item) => {
      const detail = await fetchPokemonDetailBasic(item.name);
      return {
        id: detail.id,
        name: detail.name,
        image:
          detail.sprites.other?.["official-artwork"]?.front_default ||
          detail.sprites.other?.home?.front_default ||
          detail.sprites.front_default ||
          "",
        types: detail.types.map((t) => t.type.name),
      };
    });

    const pokemonList = await Promise.all(pokemonListPromises);

    return {
      count: data.count,
      pokemonList,
    };
  } catch (error) {
    console.error("Error in fetchPokemonList:", error);
    throw error;
  }
}

/**
 * Basic fetch for single Pokemon raw object
 */

export async function fetchPokemonDetailBasic(idOrName: string): Promise<PokemonDetail> {
  const cleanIdOrName = String(idOrName).trim().toLowerCase();
  const res = await fetch(`${POKEAPI_BASE_URL}/pokemon/${cleanIdOrName}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Pokemon "${idOrName}" not found.`);
  }

  return res.json();
}

/**
 * Fetch full details for a Pokemon including species flavor text and evolution chain
 */
export async function fetchPokemonDetail(idOrName: string): Promise<PokemonDetail> {
  const detail = await fetchPokemonDetailBasic(idOrName);

  try {
    const species = await fetchPokemonSpecies(detail.id);
    detail.species = species;

    if (species.evolutionChainUrl) {
      const chain = await fetchEvolutionChain(species.evolutionChainUrl);
      detail.evolutionChain = chain;
    }
  } catch (err) {
    console.warn("Species/Evolution fetch warning:", err);
  }

  return detail;
}

/**
 * Fetch Species data (flavor text, genus, egg groups, gender rate, evolution chain URL)
 */
export async function fetchPokemonSpecies(idOrName: number | string): Promise<PokemonSpecies> {
  const res = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${idOrName}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch species data");
  }

  const data = await res.json();

  // Find first English flavor text entry & clean formatting characters
  const englishFlavor = data.flavor_text_entries?.find(
    (f: { language: { name: string }; flavor_text: string }) => f.language.name === "en"
  );
  const flavorText = englishFlavor
    ? englishFlavor.flavor_text.replace(/[\f\n\r]/g, " ")
    : "No description available.";

  const englishGenus = data.genera?.find(
    (g: { language: { name: string }; genus: string }) => g.language.name === "en"
  );

  return {
    flavorText,
    genus: englishGenus ? englishGenus.genus : "Pokémon",
    genderRate: data.gender_rate,
    captureRate: data.capture_rate,
    baseHappiness: data.base_happiness,
    hatchCounter: data.hatch_counter,
    eggGroups: data.egg_groups?.map((e: { name: string }) => e.name) || [],
    evolutionChainUrl: data.evolution_chain?.url,
  };
}

/**
 * Parse PokeAPI evolution chain tree recursively
 */
export async function fetchEvolutionChain(url: string): Promise<EvolutionNode[]> {
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return [];

  const data = await res.json();
  const nodes: EvolutionNode[] = [];

  async function parseChainNode(chain: any) {
    if (!chain) return;

    const speciesName = chain.species.name;
    const urlParts = chain.species.url.split("/").filter(Boolean);
    const speciesId = parseInt(urlParts[urlParts.length - 1], 10);

    const details = chain.evolution_details?.[0];
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`;

    nodes.push({
      speciesName,
      speciesId,
      image,
      minLevel: details?.min_level,
      triggerName: details?.trigger?.name,
      item: details?.item?.name,
    });

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      for (const nextNode of chain.evolves_to) {
        await parseChainNode(nextNode);
      }
    }
  }

  await parseChainNode(data.chain);
  return nodes;
}
