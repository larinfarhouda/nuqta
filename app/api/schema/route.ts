import { NextResponse } from "next/server"
import { fetchAllTableSchemas } from "@/lib/utils/schema-fetcher"

export async function GET() {
  try {
    const { schemas, error } = await fetchAllTableSchemas()

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch database schemas",
          error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      schemas,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching database schemas",
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
