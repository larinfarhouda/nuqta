import type { PostgrestError } from "@supabase/supabase-js"
import { errorLog } from "./debug-logger"

/**
 * Handles Supabase errors and returns a user-friendly message
 */
export function handleSupabaseError(error: PostgrestError | null | unknown): string {
  if (!error) return ""

  // Handle PostgrestError
  if (typeof error === "object" && error !== null && "message" in error && "code" in error) {
    const pgError = error as PostgrestError
    errorLog("Supabase error:", pgError)

    // Return user-friendly message based on error code
    switch (pgError.code) {
      case "PGRST116":
        return "Resource not found"
      case "42P01":
        return "Database table not found"
      case "23505":
        return "This record already exists"
      case "23503":
        return "This operation would violate referential integrity"
      default:
        return pgError.message || "An unexpected database error occurred"
    }
  }

  // Handle other types of errors
  if (error instanceof Error) {
    errorLog("Application error:", error)
    return error.message
  }

  // Handle unknown errors
  errorLog("Unknown error:", error)
  return "An unexpected error occurred"
}

/**
 * Creates a data fetcher with error handling
 */
export function createFetcher<T>(
  fetcher: () => Promise<{ data: T | null; error: PostgrestError | null }>,
): () => Promise<{ data: T | null; error: string | null }> {
  return async () => {
    try {
      const { data, error } = await fetcher()
      if (error) {
        return { data: null, error: handleSupabaseError(error) }
      }
      return { data, error: null }
    } catch (err) {
      return { data: null, error: handleSupabaseError(err) }
    }
  }
}
