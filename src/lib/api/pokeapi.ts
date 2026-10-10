import { POKEAPI_BASE_URL, DEFAULT_PAGE_LIMIT } from "../constants";
import {
  PokemonCardData,
  PokemonDetail,
  PokemonListResponse,
  PokemonSpecies,
  EvolutionNode,
} from "@/types/pokemon";

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

export async function fetchPokemonSpecies(idOrName: number | string): Promise<PokemonSpecies> {
  const res = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${idOrName}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch species data");
  }

  const data = await res.json();

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

export async function fetchPokemonByType(typeName: string): Promise<PokemonCardData[]> {
  try {
    const res = await fetch(`${POKEAPI_BASE_URL}/type/${typeName.toLowerCase()}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const pokemonEntries: Array<{ pokemon: { name: string; url: string } }> = data.pokemon || [];

    const topEntries = pokemonEntries.slice(0, 36);

    const listPromises = topEntries.map(async (entry) => {
      const urlParts = entry.pokemon.url.split("/").filter(Boolean);
      const id = parseInt(urlParts[urlParts.length - 1], 10);
      try {
        const detail = await fetchPokemonDetailBasic(entry.pokemon.name);
        return {
          id: detail.id,
          name: detail.name,
          image:
            detail.sprites.other?.["official-artwork"]?.front_default ||
            detail.sprites.other?.home?.front_default ||
            detail.sprites.front_default ||
            "",
          animatedImage: detail.sprites.other?.showdown?.front_default,
          types: detail.types.map((t) => t.type.name),
        };
      } catch {
        return {
          id,
          name: entry.pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          types: [typeName],
        };
      }
    });

    return await Promise.all(listPromises);
  } catch (error) {
    console.error("Error in fetchPokemonByType:", error);
    return [];
  }
}
