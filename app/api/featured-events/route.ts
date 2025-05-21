import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-no-cookies"
import { debugLog } from "@/lib/utils/debug-logger"

export async function GET() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("demo_events")
      .select("id, title, date, location_name, image_url, category")
      .eq("status", "approved")
      .order("date", { ascending: true })
      .limit(3)

    if (error) {
      debugLog("Error fetching featured events:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    debugLog("Unexpected error in featured events API:", error)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
