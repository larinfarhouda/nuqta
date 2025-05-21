import { createClient } from "@/lib/supabase/server-no-cookies"
import { errorLog } from "./debug-logger"

/**
 * Checks the connection to Supabase and returns information about available tables
 */
export async function checkSupabaseConnection() {
  try {
    const supabase = createClient()

    // Test the connection by fetching table information
    const { data, error } = await supabase.from("demo_events").select("id").eq("status", "approved").limit(1)

    if (error) {
      errorLog("Error connecting to Supabase:", error)
      return {
        connected: false,
        error: error.message,
        tables: [],
      }
    }

    // Get list of tables
    const { data: tables, error: tablesError } = await supabase
      .from("pg_catalog.pg_tables")
      .select("tablename")
      .eq("schemaname", "public")

    if (tablesError) {
      errorLog("Error fetching tables:", tablesError)
      return {
        connected: true,
        error: null,
        tables: [],
      }
    }

    return {
      connected: true,
      error: null,
      tables: tables?.map((t) => t.tablename) || [],
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    errorLog("Unexpected error checking Supabase connection:", error)
    return {
      connected: false,
      error: errorMessage,
      tables: [],
    }
  }
}
