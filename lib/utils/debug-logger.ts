/**
 * Debug logger utility for development environment
 * Logs messages to the console only in development mode
 */
export function debugLog(...args: any[]): void {
  if (process.env.NODE_ENV === "development") {
    console.log("[DEBUG]", ...args)
  }
}

/**
 * Error logger utility
 * Always logs errors to the console
 */
export function errorLog(...args: any[]): void {
  console.error("[ERROR]", ...args)
}
