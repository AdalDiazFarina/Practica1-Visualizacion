import { useRef, useEffect } from "react"
import * as d3 from "d3"
import { barChartData } from "@/data/barChartData"
import { typeColors } from "@/interfaces/type-colors.type"
import { typeEmojis } from "@/interfaces/type-emojis.type"

type BarChartProps = {
  onHover?: (
    data: { tipo: string; cantidad: number },
    position: { x: number; y: number }
  ) => void
  onLeave?: () => void
}

export function BarChart({ onHover, onLeave }: BarChartProps) {
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
    const x = d3.scaleBand()
      .domain(barChartData.map(d => d.tipo))
      .range([0, width])
      .padding(0.2)

    const y = d3.scaleLinear()
      .domain([0, d3.max(barChartData, d => d.cantidad)!])
      .nice()
      .range([height, 0])

    chart.append("text")
      .attr("x", svgWidth / 2)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("class", "text-lg font-semibold")
      .text("Distribución de Pokémon por Tipo")

    // Subtítulo
    chart.append("text")
      .attr("x", svgWidth / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("class", "text-sm text-gray-500")
      .text("Datos del Pokédex: cantidad total por tipo primario")

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

    // Dibujar las barras
    const bars = chart.selectAll("rect")
      .data(barChartData)
      .enter()
      .append("rect")
      .attr("x", d => x(d.tipo)!)
      .attr("y", height)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", d => typeColors[d.tipo] || "#60a5fa")

    // Esta es la animación inicial de las barras. Empezaoms desde abajo y crecemos hacia arriba.
    // En la parte de arriba se configuro .attr("height", 0) para que las barras empiecen desde abajo
    bars.transition()
      .duration(800)
      .attr("y", d => y(d.cantidad))
      .attr("height", d => height - y(d.cantidad))

    // Al pasar por la barra se le apliaron estilos para resatarla. Hay que tener cuidado por que en este caso
    // con la escala, la escala se calcula en base al origen por lo tanto se desplaza la barra al aumentar su tamaño.
    // Por esa razón se calcula el nuevo ancho y se ajusta la posición X de la barra para que se mantenga centrada.
    bars
      .on("mouseover", function (this: SVGRectElement, event: MouseEvent, d: { tipo: string; cantidad: number }) {
        const currentX = parseFloat(d3.select(this).attr("x"))
        const currentWidth = parseFloat(d3.select(this).attr("width"))
        const zoomFactor = 1.1
        const newWidth = currentWidth * zoomFactor
        const delta = (newWidth - currentWidth) / 2

        d3.select(this)
          .transition()
          .duration(150)
          .attr("x", currentX - delta)
          .attr("width", newWidth)
          .attr("stroke", "#000")
          .attr("stroke-width", 2)
          .attr("cursor", "pointer")
      })
      .on("mouseleave", function (this: SVGRectElement, _event: MouseEvent, d: { tipo: string; cantidad: number }) {
        const originalX = x(d.tipo)!
        const originalWidth = x.bandwidth()

        d3.select(this)
          .transition()
          .duration(300)
          .attr("x", originalX)
          .attr("width", originalWidth)
          .attr("stroke", "none")
          .attr("opacity", 1)

        onLeave?.()
      })

      // Al hacerle hover sobre la barra se utiliza el onHover para asignar los valores del tooltip
      .on("mousemove", function (
        this: SVGRectElement,
        event: MouseEvent,
        d: { tipo: string; cantidad: number }
      ) {
        onHover?.(d, { x: event.clientX + 10, y: event.clientY - 20 })
      })
  }, [onHover, onLeave])

  return <svg ref={svgRef} className="w-full h-[450px]"></svg>
}