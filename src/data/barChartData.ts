import pokedex from "./pokedex.json"

type TipoContador = Record<string, number>

export const barChartData = (() => {
  const counter: TipoContador = {}

  pokedex.forEach(pokemon => {
    pokemon.type.forEach(tipo => {
      counter[tipo] = (counter[tipo] || 0) + 1
    })
  })

  return Object.entries(counter).map(([tipo, cantidad]) => ({
    tipo,
    cantidad
  }))
})()
