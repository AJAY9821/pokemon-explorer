/**
 * Formats raw Pokemon names (e.g. "bulbasaur" -> "Bulbasaur", "mr-mime" -> "Mr. Mime")
 */
export function formatPokemonName(name: string): string {
  if (!name) return "";
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
