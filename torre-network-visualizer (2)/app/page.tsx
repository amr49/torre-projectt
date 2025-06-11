import NetworkVisualizer from "@/components/NetworkVisualizer"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Torre Talent Network</h1>
          <p className="text-slate-300 text-lg">
            Discover professional connections through shared skills and experiences
          </p>
        </header>

        <Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
          }
        >
          <NetworkVisualizer />
        </Suspense>
      </div>
    </main>
  )
}
