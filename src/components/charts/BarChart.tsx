import { useRef, useEffect } from "react"
import * as d3 from "d3"
import { barChartData } from "@/data/barChartData"
import { typeColors } from "@/interfaces/type-colors.type"

export function BarChart() {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    // Tamaño desde el DOM
    if (!svgRef.current) return

    const svgWidth = svgRef.current.clientWidth
    const svgHeight = svgRef.current.clientHeight
    const margin = { top: 30, right: 40, bottom: 50, left: 60 }
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom

    // Crear el canvas SVG
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Escalas X e Y
    const x = d3.scaleBand()
      .domain(barChartData.map(d => d.tipo))
      .range([margin.left, width])
      .padding(0.2)

    const y = d3.scaleLinear()
      .domain([0, d3.max(barChartData, d => d.cantidad)!])
      .nice()
      .range([height, 0])

    // Añadir los ejes
    svg.append("g")
      .attr("transform", "translate(0, 370)")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end")

    svg.append("g")
      .attr("transform", "translate(60,0)")
      .call(d3.axisLeft(y))

    // Dibujar las barras
    svg.append("g")
      .selectAll("rect")
      .data(barChartData)
      .enter()
      .append("rect")
      .attr("x", d => x(d.tipo)!)
      .attr("y", d => y(d.cantidad))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.cantidad))
      .attr("fill", d => typeColors[d.tipo] || "#60a5fa")
  }, [])

  return <svg ref={svgRef} className="w-full h-[450px]"></svg>
}