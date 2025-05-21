import { NextResponse } from "next/server"
import { checkSupabaseConnection } from "@/lib/utils/check-connection"

export async function GET() {
  try {
    const connectionInfo = await checkSupabaseConnection()

    if (!connectionInfo.connected) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to connect to Supabase",
          error: connectionInfo.error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Successfully connected to Supabase",
      tables: connectionInfo.tables,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json(
      {
        success: false,
        message: "Error checking connection",
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
