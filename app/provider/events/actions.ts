"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import type { Database } from "@/lib/supabase/database.types"

export async function createEvent(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { error: "Not authenticated" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const date = formData.get("date") as string
  const startTime = formData.get("startTime") as string
  const endTime = formData.get("endTime") as string
  const locationName = formData.get("locationName") as string
  const address = formData.get("address") as string
  const capacity = Number.parseInt(formData.get("capacity") as string)
  const price = Number.parseFloat(formData.get("price") as string)
  const isFree = formData.get("isFree") === "true"

  // Create the event
  const { data, error } = await supabase
    .from("demo_events")
    .insert({
      provider_id: session.user.id,
      title,
      description,
      category,
      date,
      start_time: startTime,
      end_time: endTime,
      location_name: locationName,
      address,
      capacity,
      price: isFree ? 0 : price,
      is_free: isFree,
      status: "pending",
    })
    .select()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/provider/events")
  return { success: true, data }
}

export async function getProviderEvents() {
  const supabase = createServerActionClient<Database>({ cookies })

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { error: "Not authenticated" }
  }

  const { data, error } = await supabase
    .from("demo_events")
    .select("*")
    .eq("provider_id", session.user.id)
    .eq("status", "approved")
    .order("date", { ascending: true })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getEventById(id: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  const { data, error } = await supabase.from("demo_events").select("*").eq("id", id).single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function updateEvent(id: string, formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { error: "Not authenticated" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const date = formData.get("date") as string
  const startTime = formData.get("startTime") as string
  const endTime = formData.get("endTime") as string
  const locationName = formData.get("locationName") as string
  const address = formData.get("address") as string
  const capacity = Number.parseInt(formData.get("capacity") as string)
  const price = Number.parseFloat(formData.get("price") as string)
  const isFree = formData.get("isFree") === "true"

  // Update the event
  const { data, error } = await supabase
    .from("demo_events")
    .update({
      title,
      description,
      category,
      date,
      start_time: startTime,
      end_time: endTime,
      location_name: locationName,
      address,
      capacity,
      price: isFree ? 0 : price,
      is_free: isFree,
      status: "pending",
    })
    .eq("id", id)
    .select()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/provider/events")
  return { success: true, data }
}

export async function deleteEvent(id: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("demo_events").delete().eq("id", id).eq("provider_id", session.user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/provider/events")
  return { success: true }
}