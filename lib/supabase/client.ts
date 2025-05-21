import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Export the createClient function to match imports in other files
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey)
}
