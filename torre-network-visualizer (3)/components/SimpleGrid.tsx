"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Building, Zap, ExternalLink, Users } from "lucide-react"
import type { NetworkNode } from "@/types/torre"
import Image from "next/image"

interface SimpleGridProps {
  nodes: NetworkNode[]
  onNodeClick: (node: NetworkNode) => void
  selectedNode: NetworkNode | null
}

export default function SimpleGrid({ nodes, onNodeClick, selectedNode }: SimpleGridProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div className="text-center">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-50 text-indigo-400" />
          <p className="text-lg mb-2 text-indigo-200 font-bold">Start exploring professionals</p>
          <p className="text-sm text-white">Search for professionals to see their profiles</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 h-full overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodes.map((node) => (
          <Card
            key={node.id}
            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedNode?.id === node.id
                ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/50 shadow-xl ring-2 ring-yellow-400/30"
                : hoveredNode === node.id
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/50 shadow-lg"
                  : "bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-600/30"
            }`}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => onNodeClick(node)}
          >
            <CardContent className="p-4">
              {/* Header with Profile Picture and Name */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400 p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                    <Image
                      src={node.picture || "/placeholder.svg?height=48&width=48"}
                      alt={node.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm truncate">{node.name}</h3>
                  <p className="text-slate-300 text-xs truncate">@{node.username}</p>
                </div>
              </div>

              {/* Location */}
              {node.location && node.location !== "Not specified" && (
                <div className="flex items-center gap-2 text-slate-300 mb-3">
                  <MapPin className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  <span className="text-xs truncate">{node.location}</span>
                </div>
              )}

              {/* Skills Preview */}
              {node.skills && node.skills.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-1 mb-2">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-white text-xs font-semibold">Top Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {node.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-200 border border-blue-400/30"
                      >
                        {skill}
                      </span>
                    ))}
                    {node.skills.length > 3 && (
                      <span className="text-xs text-slate-400">+{node.skills.length - 3}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Companies Preview */}
              {node.companies && node.companies.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-1 mb-2">
                    <Building className="w-3 h-3 text-green-400" />
                    <span className="text-white text-xs font-semibold">Companies</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {node.companies.slice(0, 2).join(", ")}
                    {node.companies.length > 2 && ` +${node.companies.length - 2} more`}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(`https://torre.ai/${node.username}`, "_blank")
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200"
              >
                <ExternalLink className="w-3 h-3" />
                View Profile
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
