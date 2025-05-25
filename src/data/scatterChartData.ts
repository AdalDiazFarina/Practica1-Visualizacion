import pokedex from "./pokedex.json"

export const scatterChartData = pokedex.map(pokemon => ({
  name: pokemon.name.english,
  type: pokemon.type[0],
  all_types: pokemon.type,
  attack: Number(pokemon.base?.Attack),
  defense: Number(pokemon.base?.Defense)
}))