import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Use a different Torre API endpoint that's more reliable
    // The people search endpoint is more stable than entities/_searchStream
    const response = await fetch("https://search.torre.co/people/_search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        // Simplified payload with only essential fields
        query: body.query || "",
        size: body.limit || 20,
        offset: body.offset || 0,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Torre API error response:", errorText)
      throw new Error(`Torre API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Torre search error:", error)
    // Return error with fallback flag to trigger demo mode
    return NextResponse.json(
      {
        error: "Failed to search Torre API",
        details: error instanceof Error ? error.message : "Unknown error",
        useFallback: true,
      },
      { status: 500 },
    )
  }
}
