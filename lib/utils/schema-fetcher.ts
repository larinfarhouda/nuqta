import { createClient } from "@/lib/supabase/server-no-cookies"
import { errorLog } from "./debug-logger"

/**
 * Fetches the schema information for all tables
 */
export async function fetchAllTableSchemas() {
  try {
    const supabase = createClient()
    const tables = [
      "demo_bookings",
      "demo_events",
      "demo_profiles",
      "demo_reviews",
      "event_categories",
      "newsletter_subscribers",
      "service_categories",
    ]

    const schemas = {}

    for (const table of tables) {
      const { data, error } = await supabase.rpc("get_table_columns", { table_name: table })

      if (error) {
        errorLog(`Error fetching schema for table ${table}:`, error)
        schemas[table] = { error: error.message }
      } else {
        schemas[table] = { columns: data || [] }
      }
    }

    return { schemas, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    errorLog("Unexpected error fetching schemas:", error)
    return { schemas: {}, error: errorMessage }
  }
}
