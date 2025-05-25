import { createClient } from "@/lib/supabase/server"
import { handleSupabaseError } from "./error-handler"
import { debugLog } from "./debug-logger"

/**
 * Normaliza una cadena de fecha a formato ISO estándar
 */
function normalizeDate(date: any): string {
  if (!date) return ""

  try {
    if (typeof date === "string") {
      // Si ya es una fecha ISO válida, devolverla
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(date)) {
        return date
      }

      // Si es una fecha simple YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return `${date}T00:00:00Z`
      }

      // Intentar convertir cualquier otro formato
      const parsedDate = new Date(date)
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString()
      }
    } else if (date instanceof Date) {
      return date.toISOString()
    }

    return String(date)
  } catch (e) {
    console.error("Error normalizing date:", e, date)
    return String(date)
  }
}

/**
 * Normaliza las fechas en un objeto de evento
 */
function normalizeEventDates(event: any): any {
  if (!event) return event

  try {
    if (event.date) {
      event.date = normalizeDate(event.date)
    }

    if (event.start_time) {
      event.start_time = normalizeDate(event.start_time)
    }

    if (event.end_time) {
      event.end_time = normalizeDate(event.end_time)
    }

    if (event.created_at) {
      event.created_at = normalizeDate(event.created_at)
    }

    if (event.updated_at) {
      event.updated_at = normalizeDate(event.updated_at)
    }
  } catch (e) {
    console.error("Error normalizing event dates:", e)
  }

  return event
}

/**
 * Fetches featured events from Supabase
 */
export async function fetchFeaturedEvents() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("demo_events")
      .select("id, title, date, location_name, image_url, category")
      .order("date", { ascending: true })
      .eq("status", "approved")
      .limit(3)

    if (error) {
      debugLog("Error fetching featured events:", error)
      return { data: [], error: handleSupabaseError(error) }
    }

    // Normalizar fechas en los datos
    const normalizedData = data?.map(normalizeEventDates) || []

    return { data: normalizedData, error: null }
  } catch (error) {
    debugLog("Unexpected error fetching featured events:", error)
    return { data: [], error: handleSupabaseError(error) }
  }
}

/**
 * Fetches all events from Supabase
 */
export async function fetchAllEvents() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("demo_events")
      .select("id, title, description, category, image_url, date, location_name, address, price")
      .eq("status", "approved")
      .order("date", { ascending: true })

    if (error) {
      debugLog("Error fetching all events:", error)
      return { data: null, error: handleSupabaseError(error) }
    }

    // Normalizar fechas en los datos
    const normalizedData = data?.map(normalizeEventDates) || null

    return { data: normalizedData, error: null }
  } catch (error) {
    debugLog("Unexpected error fetching all events:", error)
    return { data: null, error: handleSupabaseError(error) }
  }
}

/**
 * Fetches a single event by ID
 */
export async function fetchEventById(id: string) {
  try {
    const supabase = createClient()

    // First, check if the event exists
    const { data: eventExists, error: checkError } = await supabase
      .from("demo_events")
      .select("id")
      .eq("status", "approved")
      .eq("id", id)
      .single()

    if (checkError) {
      // If the error is a "not found" error, provide a clearer message
      if (checkError.code === "PGRST116") {
        return {
          data: null,
          error: `الفعالية برقم المعرف ${id} غير موجودة. يرجى التحقق من الرابط والمحاولة مرة أخرى.`,
        }
      }

      debugLog(`Error checking if event with ID ${id} exists:`, checkError)
      return { data: null, error: handleSupabaseError(checkError) }
    }

    // If the event exists, fetch its details
    const { data, error } = await supabase
      .from("demo_events")
      .select("*, demo_profiles(email, profile_image_url, business_name, phone)")
      .eq("status", "approved")
      .eq("id", id)
      .single()

    if (error) {
      debugLog(`Error fetching event with ID ${id}:`, error)
      return { data: null, error: handleSupabaseError(error) }
    }

    // Normalizar fechas en los datos
    const normalizedData = normalizeEventDates(data)

    return { data: normalizedData, error: null }
  } catch (error) {
    debugLog(`Unexpected error fetching event with ID ${id}:`, error)
    return {
      data: null,
      error: `حدث خطأ غير متوقع أثناء محاولة جلب بيانات الفعالية. ${error instanceof Error ? error.message : ""}`,
    }
  }
}

/**
 * Fetches events by provider ID
 */
export async function fetchEventsByProviderId(providerId: string) {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("demo_events")
      .select("id, title, date, location_name, image_url, category")
      .eq("provider_id", providerId)
      .eq("status", "approved")
      .order("date", { ascending: true })

    if (error) {
      debugLog(`Error fetching events for provider ${providerId}:`, error)
      return { data: null, error: handleSupabaseError(error) }
    }

    // Normalize dates in the data
    const normalizedData = data?.map(normalizeEventDates) || []

    return { data: normalizedData, error: null }
  } catch (error) {
    debugLog(`Unexpected error fetching events for provider ${providerId}:`, error)
    return { data: null, error: handleSupabaseError(error) }
  }
}

// El resto de las funciones se mantienen igual...
export async function fetchFeaturedProviders() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("demo_profiles")
      .select("id, email, category, profile_image_url, address, business_name, full_name, avg_rating, review_count")
      .limit(3)

    if (error) {
      debugLog("Error fetching featured providers:", error)
      return { data: [], error: handleSupabaseError(error) }
    }

    return { data: data || [], error: null }
  } catch (error) {
    debugLog("Unexpected error fetching featured providers:", error)
    return { data: [], error: handleSupabaseError(error) }
  }
}

/**
 * Fetches all providers from Supabase
 */
export async function fetchAllProviders() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("demo_profiles")
      .select("id, business_name, full_name, category, profile_image_url, address, avg_rating, review_count")
      // Eliminamos el filtro por is_provider ya que la columna no existe
      .order("business_name", { ascending: true })

    if (error) {
      debugLog("Error fetching all providers:", error)
      return { data: null, error: handleSupabaseError(error) }
    }

    return { data: data || [], error: null }
  } catch (error) {
    debugLog("Unexpected error fetching all providers:", error)
    return { data: null, error: handleSupabaseError(error) }
  }
}

/**
 * Fetches a single provider by ID
 */
export async function fetchProviderById(id: string) {
  try {
    const supabase = createClient()

    // First, check if the provider exists
    const { data: providerExists, error: checkError } = await supabase
      .from("demo_profiles")
      .select("id")
      .eq("id", id)
      .single()

    if (checkError) {
      // If the error is a "not found" error, provide a clearer message
      if (checkError.code === "PGRST116") {
        return {
          data: null,
          error: `The provider with ID ${id} does not exist. Please check the URL and try again.`,
        }
      }

      debugLog(`Error checking if provider with ID ${id} exists:`, checkError)
      return { data: null, error: handleSupabaseError(checkError) }
    }

    // If the provider exists, fetch its details
    const { data, error } = await supabase.from("demo_profiles").select("*").eq("id", id).single()

    if (error) {
      debugLog(`Error fetching provider with ID ${id}:`, error)
      return { data: null, error: handleSupabaseError(error) }
    }

    return { data, error: null }
  } catch (error) {
    debugLog(`Unexpected error fetching provider with ID ${id}:`, error)
    return {
      data: null,
      error: `An unexpected error occurred while trying to fetch provider data. ${error instanceof Error ? error.message : ""}`,
    }
  }
}

export async function fetchEventCategories() {
  // Implementación existente...
}

export async function fetchServiceCategories() {
  // Implementación existente...
}

export async function fetchBookingsForEvent(eventId: string) {
  // Implementación existente...
}

export async function fetchBookingsForUser(userId: string) {
  // Implementación existente...
}





// احضار كل المقالات
export async function fetchAllPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?select=*`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
    cache: "no-store",
  });
  return res.json();
}

// احضار مقالة واحدة بالسلاق
export async function fetchPostBySlug(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${slug}&select=*`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
    cache: "no-store",
  });
  const data = await res.json();
  return data[0] || null;
}

export async function fetchAllCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?select=category`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
    cache: "no-store",
  });
  const raw = await res.json();
  const uniqueCategories = [...new Set(raw.map((r: { category: any }) => r.category).filter(Boolean))];
  return uniqueCategories;
}

