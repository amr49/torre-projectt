"use client"

import { useEffect, useState } from "react"
import { X, MapPin, Building, Zap, ExternalLink } from "lucide-react"
import type { NetworkNode } from "@/types/torre"
import Image from "next/image"

interface NodePopupProps {
  node: NetworkNode | null
  position: { x: number; y: number } | null
  onClose: () => void
}

export default function NodePopup({ node, position, onClose }: NodePopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (node && position) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [node, position])

  if (!node || !position || !isVisible) return null

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x + 20,
        top: position.y - 10,
        transform: "translateY(-50%)",
      }}
    >
      <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-sm border border-slate-600/50 rounded-xl shadow-2xl p-4 max-w-sm pointer-events-auto animate-in slide-in-from-left-2 duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400 p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                <Image
                  src={node.picture || "/placeholder.svg?height=40&width=40"}
                  alt={node.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-white text-sm font-bold">{node.name}</h3>
              <p className="text-slate-300 text-xs">@{node.username}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-red-500/20 rounded-full p-1 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Location */}
        {node.location && node.location !== "Not specified" && (
          <div className="flex items-center gap-2 text-slate-300 mb-3">
            <MapPin className="w-3 h-3 text-blue-400" />
            <span className="text-xs">{node.location}</span>
          </div>
        )}

        {/* Top Skills */}
        {node.skills && node.skills.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-1 mb-2">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-white text-xs font-semibold">Skills</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {node.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-200 border border-blue-400/30"
                >
                  {skill}
                </span>
              ))}
              {node.skills.length > 4 && <span className="text-xs text-slate-400">+{node.skills.length - 4} more</span>}
            </div>
          </div>
        )}

        {/* Companies */}
        {node.companies && node.companies.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-1 mb-2">
              <Building className="w-3 h-3 text-green-400" />
              <span className="text-white text-xs font-semibold">Companies</span>
            </div>
            <div className="space-y-1">
              {node.companies.slice(0, 3).map((company, index) => (
                <div key={index} className="text-xs text-slate-300 bg-slate-700/30 rounded px-2 py-1">
                  {company}
                </div>
              ))}
              {node.companies.length > 3 && (
                <div className="text-xs text-slate-400">+{node.companies.length - 3} more</div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => window.open(`https://torre.ai/${node.username}`, "_blank")}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200"
        >
          <ExternalLink className="w-3 h-3" />
          View Full Profile
        </button>
      </div>
    </div>
  )
}
