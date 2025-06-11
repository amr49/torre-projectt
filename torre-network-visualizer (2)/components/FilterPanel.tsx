"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sliders } from "lucide-react"

interface FilterPanelProps {
  filters: {
    minConnections: number
    skillFilter: string
    locationFilter: string
    connectionType: string
  }
  onFiltersChange: (filters: any) => void
}

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  return (
    <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-sm border-cyan-500/30 shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Sliders className="w-5 h-5 text-cyan-400" />
          Filters
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <label className="text-white text-sm mb-2 block font-medium">
            Min Connection Strength: {filters.minConnections}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={filters.minConnections}
            onChange={(e) => updateFilter("minConnections", Number.parseInt(e.target.value))}
            className="w-full h-2 bg-cyan-800/30 rounded-lg appearance-none cursor-pointer slider"
          />
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              height: 18px;
              width: 18px;
              border-radius: 50%;
              background: linear-gradient(45deg, #06b6d4, #3b82f6);
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            .slider::-moz-range-thumb {
              height: 18px;
              width: 18px;
              border-radius: 50%;
              background: linear-gradient(45deg, #06b6d4, #3b82f6);
              cursor: pointer;
              border: none;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
          `}</style>
        </div>

        <div>
          <label className="text-white text-sm mb-2 block font-medium">Filter by Skill</label>
          <Input
            placeholder="e.g. JavaScript, Design..."
            value={filters.skillFilter}
            onChange={(e) => updateFilter("skillFilter", e.target.value)}
            className="bg-white/10 border-cyan-400/50 text-white placeholder:text-white/70 focus:border-cyan-300 focus:ring-cyan-300"
          />
        </div>

        <div>
          <label className="text-white text-sm mb-2 block font-medium">Filter by Location</label>
          <Input
            placeholder="e.g. San Francisco, Remote..."
            value={filters.locationFilter}
            onChange={(e) => updateFilter("locationFilter", e.target.value)}
            className="bg-white/10 border-cyan-400/50 text-white placeholder:text-white/70 focus:border-cyan-300 focus:ring-cyan-300"
          />
        </div>

        <div>
          <label className="text-white text-sm mb-2 block font-medium">Connection Type</label>
          <Select value={filters.connectionType} onValueChange={(value) => updateFilter("connectionType", value)}>
            <SelectTrigger className="bg-white/10 border-cyan-400/50 text-white focus:border-cyan-300 focus:ring-cyan-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-cyan-500/50">
              <SelectItem value="all" className="text-white hover:bg-cyan-600/20">
                All Connections
              </SelectItem>
              <SelectItem value="skill" className="text-white hover:bg-cyan-600/20">
                Skill-based
              </SelectItem>
              <SelectItem value="company" className="text-white hover:bg-cyan-600/20">
                Company-based
              </SelectItem>
              <SelectItem value="location" className="text-white hover:bg-cyan-600/20">
                Location-based
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
