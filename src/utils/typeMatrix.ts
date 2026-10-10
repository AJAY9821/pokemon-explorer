/**
 * Elemental Type Multiplier Chart for Pokémon
 * Returns weakness (> 1x), resistance (< 1x), and immunity (0x) matrix
 */

export interface TypeEffectiveness {
  weaknesses: { type: string; multiplier: number }[];
  resistances: { type: string; multiplier: number }[];
  immunities: string[];
  normal: string[];
}

const ALL_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "steel", "fairy", "dark"
];

// Attack type vs Defender type multiplier matrix (1.0 default)
const TYPE_CHART: Record<string, Record<string, number>> = {
  normal:   { rock: 0.5, ghost: 0, steel: 0.5 },
  fire:     { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water:    { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass:    { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice:      { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison:   { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground:   { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying:   { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic:  { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug:      { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock:     { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost:    { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon:   { dragon: 2, steel: 0.5, fairy: 0 },
  steel:    { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy:    { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
  dark:     { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 }
};

export function getPokemonTypeEffectiveness(types: string[]): TypeEffectiveness {
  const normalizedTypes = types.map((t) => t.toLowerCase());
  const multipliers: Record<string, number> = {};

  // Default all to 1x
  ALL_TYPES.forEach((atkType) => {
    multipliers[atkType] = 1;
  });

  // Calculate cumulative multiplier across defender's types
  normalizedTypes.forEach((defType) => {
    ALL_TYPES.forEach((atkType) => {
      const chart = TYPE_CHART[atkType];
      if (chart && chart[defType] !== undefined) {
        multipliers[atkType] *= chart[defType];
      }
    });
  });

  const weaknesses: { type: string; multiplier: number }[] = [];
  const resistances: { type: string; multiplier: number }[] = [];
  const immunities: string[] = [];
  const normal: string[] = [];

  Object.entries(multipliers).forEach(([atkType, mult]) => {
    if (mult === 0) {
      immunities.push(atkType);
    } else if (mult > 1) {
      weaknesses.push({ type: atkType, multiplier: mult });
    } else if (mult < 1) {
      resistances.push({ type: atkType, multiplier: mult });
    } else {
      normal.push(atkType);
    }
  });

  // Sort weaknesses highest first (4x then 2x)
  weaknesses.sort((a, b) => b.multiplier - a.multiplier);
  // Sort resistances lowest first (0.25x then 0.5x)
  resistances.sort((a, b) => a.multiplier - b.multiplier);

  return { weaknesses, resistances, immunities, normal };
}
