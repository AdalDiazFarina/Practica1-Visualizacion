import { useRef, useEffect } from "react"
import * as d3 from "d3"
import { typeColors } from "@/interfaces/type-colors.type"
import { typeEmojis } from "@/interfaces/type-emojis.type"
import { scatterChartData } from "@/data/scatterChartData"
import type { ScatterChartData } from "@/interfaces/scatter-chart-data.interface"

type ScatterChartProps = {
  onHover?: (
    data: ScatterChartData,
    position: { x: number; y: number }
  ) => void
  onLeave?: () => void
}

export function ScatterChart({ onHover, onLeave }: ScatterChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    // Tamaño desde el DOM
    // Se utiliza el tamaño del componente padre para que el SVG ocupe todo el espacio disponible
    if (!svgRef.current) return

    const svgWidth = svgRef.current.clientWidth
    const svgHeight = svgRef.current.clientHeight
    const margin = { top: 30, right: 40, bottom: 50, left: 60 }
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom

    // Crear el canvas SVG
    const svg = d3.select(svgRef.current)
    svg.html("")

    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // Escalas X e Y
    const x = d3.scaleLinear()
      .domain([0, d3.max(scatterChartData, d => d.defense)!])
      .range([0, width])

    const y = d3.scaleLinear()
      .domain([0, d3.max(scatterChartData, d => d.attack)!])
      .nice()
      .range([height, 0])

    chart.append("text")
      .attr("x", svgWidth / 2)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("class", "text-lg font-semibold")
      .text("Relación entre Ataque y Defensa")

    // Subtítulo
    chart.append("text")
      .attr("x", svgWidth / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("class", "text-sm text-gray-500")
      .text("Comparativa de atributos ofensivos y defensivos en Pokémon de la Pokédex")

    chart.append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", height + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#444")
      .text("Defensa")

    chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2 - margin.top)
      .attr("y", -35)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#444")
      .text("Ataque")

    // Añadir los ejes
    // Dibuja el texto de los ejes
    chart.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .text(function (d) {
        return `${typeEmojis[d as string] || ""} ${d}`
      })
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end")

    chart.append("g")
      .call(d3.axisLeft(y))

    // Dibujar los puntos
    const points = chart.selectAll("circle")
      .data(scatterChartData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.defense))
      .attr("cy", d => y(d.attack))
      .attr("r", 0)
      .attr("fill", d => typeColors[d.type])
      .style("cursor", "pointer")
      .attr("opacity", 0);

    points
      .transition()
      .duration(800)
      .delay((_d, i) => i * 2)
      .attr("r", 5)
      .attr("opacity", 0.8);

    points
      // Al hacerle hover sobre la barra se utiliza el onHover para asignar los valores del tooltip
      .on("mousemove", function (
        this: SVGCircleElement,
        event: MouseEvent,
        d: { name: string; type: string; all_types: string[]; attack: number; defense: number; }
      ) {
        onHover?.(d, { x: event.clientX + 10, y: event.clientY - 20 })
      })
  }, [onHover, onLeave])

  return <svg ref={svgRef} className="w-full h-full"></svg>
}