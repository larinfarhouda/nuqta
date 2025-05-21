import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-no-cookies"
import { debugLog } from "@/lib/utils/debug-logger"

export async function GET() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("demo_profiles")
      .select("id, email, category, profile_image_url, address")
      .limit(3)

    if (error) {
      debugLog("Error fetching featured providers:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    debugLog("Unexpected error in featured providers API:", error)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
