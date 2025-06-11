"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Users, AlertCircle, Sparkles } from "lucide-react"
import SimpleGrid from "./SimpleGrid"
import PersonDetails from "./PersonDetails"
import FilterPanel from "./FilterPanel"
import type { NetworkNode, NetworkLink } from "@/types/torre"
import { demoNodes, demoLinks } from "./DemoData"

export default function NetworkVisualizer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [nodes, setNodes] = useState<NetworkNode[]>([])
  const [links, setLinks] = useState<NetworkLink[]>([])
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [searchAttempted, setSearchAttempted] = useState(false)
  const [filters, setFilters] = useState({
    minConnections: 1,
    skillFilter: "",
    locationFilter: "",
    connectionType: "all",
  })

  // Load demo data on initial render
  useEffect(() => {
    loadDemoData()
  }, [])

  const loadDemoData = () => {
    setNodes(demoNodes)
    setLinks(demoLinks)
    setSearchQuery("Demo Network")
    setApiError(null)
    setSearchAttempted(false)
  }

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node)
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setApiError(null)
    setSearchAttempted(true)

    try {
      // Search for initial users
      const searchResponse = await fetch("/api/torre/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchQuery,
          limit: 15,
        }),
      })

      const searchData = await searchResponse.json()

      if (searchData.error) {
        console.error("Search error:", searchData.error)
        setApiError(`Search failed in Torre API. Showing demo data instead.`)
        loadDemoData()
        return
      }

      console.log("Search response:", searchData)

      const results = searchData.results || []

      if (results.length > 0) {
        await buildNetwork(results)
      } else {
        setApiError("No results found. Try a different search term or use the demo data.")
        loadDemoData()
      }
    } catch (error) {
      console.error("Search error:", error)
      setApiError("Search failed. Showing demo data instead.")
      loadDemoData()
    } finally {
      setIsLoading(false)
    }
  }

  const buildNetwork = async (users: any[]) => {
    const networkNodes: NetworkNode[] = []
    const processedUsers = new Set<string>()

    console.log("Processing users:", users.length)

    for (const user of users.slice(0, 12)) {
      const username = user.username || user.id

      if (username && !processedUsers.has(username)) {
        try {
          const genomeResponse = await fetch(`/api/torre/genome/${username}`)
          const genomeData = await genomeResponse.json()

          if (genomeData && !genomeData.error && genomeData.person) {
            const node: NetworkNode = {
              id: username,
              username: username,
              name: genomeData.person.name || user.name || username,
              picture: genomeData.person.picture || user.picture,
              skills: (genomeData.strengths || [])
                .slice(0, 15)
                .map((s: any) => s.name)
                .filter(Boolean),
              companies: (genomeData.experiences || [])
                .filter((e: any) => e.category === "jobs")
                .slice(0, 8)
                .map((e: any) => e.organizations?.[0]?.name)
                .filter(Boolean),
              location: genomeData.person.location?.name || "Not specified",
            }

            networkNodes.push(node)
            processedUsers.add(username)

            await new Promise((resolve) => setTimeout(resolve, 300))
          }
        } catch (error) {
          console.error(`Error fetching genome for ${username}:`, error)
        }
      }
    }

    if (networkNodes.length < 3) {
      setApiError("Not enough profile data found. Showing demo data instead.")
      loadDemoData()
      return
    }

    setNodes(networkNodes)
    setLinks([]) // No links needed for simple grid
  }

  const filteredNodes = nodes.filter((node) => {
    if (
      filters.skillFilter &&
      !node.skills.some((skill) => skill.toLowerCase().includes(filters.skillFilter.toLowerCase()))
    ) {
      return false
    }

    if (filters.locationFilter && !node.location?.toLowerCase().includes(filters.locationFilter.toLowerCase())) {
      return false
    }

    return true
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Search and Controls */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm border-indigo-500/30 shadow-xl">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 w-4 h-4" />
                  <Input
                    placeholder="Search professionals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 bg-white/10 border-indigo-400/50 text-white placeholder:text-indigo-200 focus:border-indigo-300 focus:ring-indigo-300"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {apiError && (
                <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-400/50 shadow-lg">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 text-red-200">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Alert</p>
                        <p className="text-xs opacity-90">{apiError}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-white font-bold mb-2 w-full flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  Try these examples:
                </span>
                {["JavaScript developer", "Product Manager", "UX Designer", "Data Scientist"].map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(example)
                      setTimeout(() => handleSearch(), 100)
                    }}
                    className="text-sm font-semibold border-2 border-white/60 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/80 transition-all duration-200"
                  >
                    {example}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={loadDemoData}
                  className="w-full mt-3 border-2 border-emerald-400/70 text-white bg-emerald-500/20 hover:bg-emerald-500/30 hover:border-emerald-300 font-bold text-sm"
                >
                  🚀 Load Demo Network
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full border-2 border-indigo-400/70 text-white bg-indigo-500/20 hover:bg-indigo-500/30 hover:border-indigo-300 font-semibold"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {showFilters && <FilterPanel filters={filters} onFiltersChange={setFilters} />}

        {/* Network Stats */}
        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-sm border-emerald-500/30 shadow-xl">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white">
                <Users className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-medium">{filteredNodes.length} Professionals</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Person Details */}
        {selectedNode && <PersonDetails node={selectedNode} onClose={() => setSelectedNode(null)} />}
      </div>

      {/* Professionals Grid */}
      <div className="lg:col-span-3">
        <Card className="bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-indigo-900/30 backdrop-blur-sm border-blue-500/20 shadow-2xl h-full">
          <CardContent className="p-0 h-full">
            <SimpleGrid nodes={filteredNodes} onNodeClick={handleNodeClick} selectedNode={selectedNode} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
