"use client"

import { useEffect, useRef } from "react"
import type { NetworkNode, NetworkLink } from "@/types/torre"

// Define D3 types inline to avoid import issues
interface D3Node extends NetworkNode {
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface D3Link extends NetworkLink {
  source: D3Node | string
  target: D3Node | string
}

interface NetworkGraphProps {
  nodes: NetworkNode[]
  links: NetworkLink[]
  onNodeClick: (node: NetworkNode) => void
  selectedNode: NetworkNode | null
}

export default function NetworkGraph({ nodes, links, onNodeClick, selectedNode }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const simulationRef = useRef<any>(null)

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return

    // Dynamically import D3 to avoid SSR issues
    import("d3").then((d3) => {
      const svg = d3.select(svgRef.current!)
      svg.selectAll("*").remove()

      const width = svgRef.current!.clientWidth
      const height = svgRef.current!.clientHeight

      // Create simulation
      const simulation = d3
        .forceSimulation<D3Node>(nodes as D3Node[])
        .force(
          "link",
          d3
            .forceLink<D3Node, D3Link>(links as D3Link[])
            .id((d: any) => d.id)
            .distance((d: any) => 100 - d.strength * 10)
            .strength((d: any) => d.strength * 0.1),
        )
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(30))

      simulationRef.current = simulation

      // Create zoom behavior
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
          container.attr("transform", event.transform)
        })

      svg.call(zoom)

      const container = svg.append("g")

      // Create links with gradient effect
      const link = container
        .append("g")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke", (d: any) => {
          switch (d.type) {
            case "skill":
              return "#8b5cf6" // Purple for skills
            case "company":
              return "#06b6d4" // Cyan for companies
            case "location":
              return "#10b981" // Emerald for locations
            default:
              return "#6b7280"
          }
        })
        .attr("stroke-opacity", 0.7)
        .attr("stroke-width", (d: any) => Math.sqrt(d.strength) * 2)

      // Create nodes
      const node = container
        .append("g")
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .style("cursor", "pointer")
        .call(
          d3
            .drag<SVGGElement, D3Node>()
            .on("start", (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart()
              d.fx = d.x
              d.fy = d.y
            })
            .on("drag", (event, d) => {
              d.fx = event.x
              d.fy = event.y
            })
            .on("end", (event, d) => {
              if (!event.active) simulation.alphaTarget(0)
              d.fx = null
              d.fy = null
            }),
        )

      // Add glow effect filter
      const defs = svg.append("defs")

      const filter = defs
        .append("filter")
        .attr("id", "glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%")

      filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur")

      const feMerge = filter.append("feMerge")
      feMerge.append("feMergeNode").attr("in", "coloredBlur")
      feMerge.append("feMergeNode").attr("in", "SourceGraphic")

      // Add circles for nodes with colorful gradients
      node
        .append("circle")
        .attr("r", 20)
        .attr("fill", (d: any) => {
          // Create a color based on the first letter of the name
          const colors = [
            "#3b82f6", // blue
            "#8b5cf6", // violet
            "#ec4899", // pink
            "#f97316", // orange
            "#06b6d4", // cyan
            "#10b981", // emerald
            "#f59e0b", // amber
            "#ef4444", // red
          ]
          const index = d.name.charCodeAt(0) % colors.length
          return selectedNode?.id === d.id ? "#f59e0b" : colors[index]
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .attr("filter", (d: any) => (selectedNode?.id === d.id ? "url(#glow)" : ""))

      // Add profile pictures
      node
        .append("image")
        .attr("href", (d: any) => d.picture || "/placeholder.svg?height=32&width=32")
        .attr("x", -16)
        .attr("y", -16)
        .attr("width", 32)
        .attr("height", 32)
        .attr("clip-path", "circle(16px)")

      // Add labels
      node
        .append("text")
        .text((d: any) => d.name.split(" ")[0])
        .attr("x", 0)
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("text-shadow", "0 1px 3px rgba(0,0,0,0.7)")

      // Add click handler
      node.on("click", (event, d) => {
        event.stopPropagation()
        onNodeClick(d as NetworkNode)
      })

      // Create tooltip div
      const tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("background", "rgba(30, 41, 59, 0.9)")
        .style("color", "white")
        .style("padding", "10px")
        .style("border-radius", "6px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("z-index", "1000")
        .style("box-shadow", "0 4px 6px rgba(0, 0, 0, 0.1)")
        .style("border", "1px solid rgba(255, 255, 255, 0.2)")

      node
        .on("mouseover", (event, d: any) => {
          tooltip.transition().duration(200).style("opacity", 0.95)
          tooltip
            .html(
              `<div style="font-weight:bold;margin-bottom:4px;font-size:14px;">${d.name}</div>
               <div style="margin-bottom:4px;"><span style="color:#a5b4fc;">Skills:</span> ${d.skills.slice(0, 3).join(", ")}${
                 d.skills.length > 3 ? "..." : ""
               }</div>
               ${d.location ? `<div><span style="color:#a5b4fc;">Location:</span> ${d.location}</div>` : ""}`,
            )
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 28 + "px")
        })
        .on("mouseout", () => {
          tooltip.transition().duration(500).style("opacity", 0)
        })

      // Update positions on simulation tick
      simulation.on("tick", () => {
        link
          .attr("x1", (d: any) => (d.source as D3Node).x!)
          .attr("y1", (d: any) => (d.source as D3Node).y!)
          .attr("x2", (d: any) => (d.target as D3Node).x!)
          .attr("y2", (d: any) => (d.target as D3Node).y!)

        node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      })

      // Cleanup function
      return () => {
        simulation.stop()
        tooltip.remove()
      }
    })
  }, [nodes, links, onNodeClick, selectedNode])

  return <svg ref={svgRef} width="100%" height="100%" className="bg-transparent" />
}
