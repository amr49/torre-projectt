"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, MapPin, Building, Zap, User, ExternalLink } from "lucide-react"
import type { NetworkNode } from "@/types/torre"
import Image from "next/image"

interface ProfilePanelProps {
  node: NetworkNode
  onClose: () => void
}

export default function ProfilePanel({ node, onClose }: ProfilePanelProps) {
  return (
    <Card className="bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 backdrop-blur-sm border-violet-500/30 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-violet-400 to-fuchsia-400 p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                <Image
                  src={node.picture || "/placeholder.svg?height=48&width=48"}
                  alt={node.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <CardTitle className="text-white text-lg font-bold">{node.name || "Not specified"}</CardTitle>
              <p className="text-violet-200 text-sm">@{node.username || "Not specified"}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10 hover:text-violet-200"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Location */}
        {node.location && node.location !== "Not specified" && (
          <div className="flex items-center gap-2 text-violet-200 bg-white/5 rounded-lg p-2">
            <MapPin className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium">{node.location}</span>
          </div>
        )}

        {/* Skills */}
        {node.skills && node.skills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-violet-400" />
              <span className="text-white font-semibold text-sm">Top Skills</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {node.skills.slice(0, 8).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 text-violet-100 border border-violet-400/30 shadow-sm"
                >
                  {skill}
                </span>
              ))}
              {node.skills.length > 8 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-violet-400/50 text-violet-200 bg-white/5">
                  +{node.skills.length - 8} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Companies */}
        {node.companies && node.companies.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building className="w-4 h-4 text-fuchsia-400" />
              <span className="text-white font-semibold text-sm">Companies</span>
            </div>
            <div className="space-y-2">
              {node.companies.slice(0, 5).map((company, index) => (
                <div key={index} className="text-violet-200 text-sm bg-white/5 rounded-lg p-2 font-medium">
                  {company}
                </div>
              ))}
              {node.companies.length > 5 && (
                <div className="text-violet-300 text-xs bg-white/5 rounded-lg p-2">
                  +{node.companies.length - 5} more companies
                </div>
              )}
            </div>
          </div>
        )}

        {/* If no skills or companies */}
        {(!node.skills || node.skills.length === 0) && (!node.companies || node.companies.length === 0) && (
          <div className="text-center py-4">
            <User className="w-8 h-8 mx-auto mb-2 text-violet-400 opacity-50" />
            <p className="text-violet-200 text-sm">No additional information available</p>
          </div>
        )}

        <Button
          variant="outline"
          className="w-full border-violet-400/50 text-violet-200 hover:bg-violet-500/20 hover:border-violet-300 hover:text-white"
          onClick={() => window.open(`https://torre.ai/${node.username}`, "_blank")}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Full Profile
        </Button>
      </CardContent>
    </Card>
  )
}
