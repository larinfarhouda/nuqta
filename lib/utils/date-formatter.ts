import { format, parseISO } from "date-fns"
import { ar, enUS } from "date-fns/locale"

/**
 * Normaliza una cadena de fecha a formato ISO
 * @param dateString La cadena de fecha a normalizar
 * @returns Una cadena de fecha en formato ISO o la cadena original si no se puede normalizar
 */
function normalizeDate(dateString: string): string {
  if (!dateString) return dateString

  try {
    // Detectar y corregir el formato inválido con doble T (como 2025-05-11T00:00:00ZT08:00:00)
    if (dateString.includes("ZT")) {
      console.warn("Detected invalid date format with ZT:", dateString)
      // Tomar solo la primera parte hasta la Z
      dateString = dateString.split("Z")[0] + "Z"
    }

    // Si ya es una fecha ISO válida, devolverla tal cual
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateString)) {
      return dateString
    }

    // Intentar convertir la fecha a formato ISO
    const date = new Date(dateString)
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString()
    }

    // Si es una fecha simple YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return `${dateString}T00:00:00Z`
    }

    return dateString
  } catch (e) {
    console.error("Error normalizing date:", e, dateString)
    return dateString
  }
}

export function formatDate(dateString: string, localeCode = "ar"): string {
  if (!dateString) return ""

  try {
    // Normalizar la fecha antes de parsearla
    const normalizedDate = normalizeDate(dateString)
    const date = parseISO(normalizedDate)
    const locale = localeCode === "en" ? enUS : ar

    // Check if date is valid
    if (Number.isNaN(date.getTime())) {
      console.error("Invalid date after normalization:", dateString, normalizedDate)
      return dateString
    }

    // Format date in specified locale
    return format(date, "PPP", { locale })
  } catch (error) {
    console.error("Error formatting date:", error, dateString)
    return dateString
  }
}

/**
 * Format a date to show relative time (e.g., "2 days ago", "in 3 hours")
 * @param dateString The date string to format
 * @param localeCode The locale code ("ar" for Arabic, "en" for English)
 * @returns Formatted relative time string
 */
export function formatRelativeTime(dateString: string, localeCode = "ar"): string {
  if (!dateString) return ""

  try {
    const date = parseISO(dateString)

    // Check if date is valid
    if (Number.isNaN(date.getTime())) {
      return dateString
    }

    const now = new Date()
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000)
    const absDiffInSeconds = Math.abs(diffInSeconds)

    // Define time units in seconds
    const minute = 60
    const hour = minute * 60
    const day = hour * 24
    const week = day * 7
    const month = day * 30
    const year = day * 365

    // Format in specified locale
    const rtf = new Intl.RelativeTimeFormat(localeCode, { numeric: "auto" })

    // Determine the appropriate unit
    if (absDiffInSeconds < minute) {
      return rtf.format(Math.sign(diffInSeconds) * Math.floor(absDiffInSeconds), "second")
    } else if (absDiffInSeconds < hour) {
      return rtf.format(Math.sign(diffInSeconds) * Math.floor(absDiffInSeconds / minute), "minute")
    } else if (absDiffInSeconds < day) {
      return rtf.format(Math.sign(diffInSeconds) * Math.floor(absDiffInSeconds / hour), "hour")
    } else if (absDiffInSeconds < week) {
      return rtf.format(Math.sign(diffInSeconds) * Math.floor(absDiffInSeconds / day), "day")
    } else if (absDiffInSeconds < month) {
      return rtf.format(Math.sign(diffInSeconds) * Math.floor(absDiffInSeconds / week), "week")
    } else if (absDiffInSeconds < year) {
      return rtf.format(Math.sign(diffInSeconds) * Math.floor(absDiffInSeconds / month), "month")
    } else {
      return rtf.format(Math.sign(diffInSeconds) * Math.floor(absDiffInSeconds / year), "year")
    }
  } catch (error) {
    console.error("Error formatting relative time:", error)
    return dateString
  }
}
