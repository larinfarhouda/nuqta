import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"

type EventData = {
    title: string
    description: string
    category: string
    date: string
    start_time: string
    end_time: string
    location_name: string
    address: string
    capacity: number
    price: number
    is_free: boolean
    image_url: string
    status: string
    provider_id: string
  }
  

export async function createEvent(eventData: EventData) {
  const supabase = createClient()

  const { data, error } = await supabase.from("demo_events").insert([eventData])
  return { data, error }
}
