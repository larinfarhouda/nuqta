import type React from "react"

// List of known problematic images that should be replaced with fallbacks
const PROBLEMATIC_IMAGES = ["/woman-portrait.png", "/middle-eastern-man.png"]

/**
 * Validates an image URL and returns a fallback if invalid
 * @param url The image URL to validate
 * @param fallbackUrl The fallback URL to use if the image URL is invalid
 * @returns A valid image URL
 */
export function validateImageUrl(url: string | null | undefined, fallbackUrl = "/provider-abstract.png"): string {
  // Si la URL es nula o indefinida, devolver inmediatamente la URL de respaldo
  if (!url) return fallbackUrl

  // Si ya es una ruta relativa que comienza con /, es válida
  if (url.startsWith("/")) {
    // Check if the URL is for a specific problematic image
    if (PROBLEMATIC_IMAGES.includes(url)) {
      console.warn("Replacing problematic image URL:", url)
      return fallbackUrl
    }
    return url
  }

  // Si es una URL absoluta, validarla
  if (url.startsWith("http")) {
    try {
      new URL(url) // Esto lanzará un error si la URL no es válida
      return url
    } catch (e) {
      console.error(`Invalid absolute image URL: ${url}`)
      return fallbackUrl
    }
  }

  // Si no es ni una ruta relativa que comienza con / ni una URL absoluta,
  // añadir / para convertirla en una ruta relativa válida
  return `/${url}`
}

/**
 * Creates an error handler for image loading errors
 * @param url The original image URL
 * @param fallbackUrl The fallback URL to use if the image fails to load
 * @returns An error handler function
 */
export function createImageErrorHandler(url: string | null | undefined, fallbackUrl = "/provider-abstract.png") {
  return (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image: ${url || "null or undefined"}`)
    e.currentTarget.src = fallbackUrl
  }
}
