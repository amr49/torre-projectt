"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, MapPin, Building, Zap, ExternalLink, User } from "lucide-react"
import type { NetworkNode } from "@/types/torre"
import Image from "next/image"

interface PersonDetailsProps {
  node: NetworkNode
  onClose: () => void
}

export default function PersonDetails({ node, onClose }: PersonDetailsProps) {
  return (
    <Card className="bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 backdrop-blur-sm border-violet-500/30 shadow-xl h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-violet-400 to-fuchsia-400 p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                <Image
                  src={node.picture || "/placeholder.svg?height=64&width=64"}
                  alt={node.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <CardTitle className="text-white text-xl font-bold">{node.name}</CardTitle>
              <p className="text-violet-200 text-sm">@{node.username}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-red-500/20 hover:text-red-200 border border-white/20 hover:border-red-400/50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 overflow-y-auto custom-scrollbar">
        {/* Location */}
        {node.location && node.location !== "Not specified" && (
          <div className="flex items-center gap-3 text-violet-200 bg-white/5 rounded-lg p-3">
            <MapPin className="w-5 h-5 text-violet-400" />
            <span className="font-medium">{node.location}</span>
          </div>
        )}

        {/* Skills */}
        {node.skills && node.skills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-violet-400" />
              <span className="text-white font-bold text-lg">Skills</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {node.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-violet-100 border border-violet-400/30 rounded-lg p-3"
                >
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Companies */}
        {node.companies && node.companies.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building className="w-5 h-5 text-fuchsia-400" />
              <span className="text-white font-bold text-lg">Experience</span>
            </div>
            <div className="space-y-3">
              {node.companies.map((company, index) => (
                <div key={index} className="text-violet-200 bg-white/5 rounded-lg p-3 font-medium">
                  {company}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If no additional info */}
        {(!node.skills || node.skills.length === 0) && (!node.companies || node.companies.length === 0) && (
          <div className="text-center py-8">
            <User className="w-12 h-12 mx-auto mb-4 text-violet-400 opacity-50" />
            <p className="text-violet-200">No additional information available</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => window.open(`https://torre.ai/${node.username}`, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Full Profile
          </Button>
          <Button variant="outline" onClick={onClose} className="border-red-400/50 text-red-200 hover:bg-red-500/20">
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
