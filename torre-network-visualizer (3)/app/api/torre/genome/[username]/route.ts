import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params

    // Use the public bios endpoint
    const response = await fetch(`https://bio.torre.co/api/bios/${username}`, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      const errorText = await response.text()
      console.error("Torre genome error response:", errorText)
      throw new Error(`Torre API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Torre genome error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch user genome",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
