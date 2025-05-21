"use server"

import { createClient as createServerClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/database.types"

export type Category = {
  id: string
  name: string
  name_ar: string
  slug: string
  created_at: string
  updated_at: string
}

const createServiceRoleClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createServerClient<Database>(supabaseUrl, supabaseServiceRoleKey)
}

export async function getCategories(): Promise<Category[]> {
  try {
    console.log("Getting categories from database...")
    const supabaseAdmin = createServiceRoleClient()

    const { data, error } = await supabaseAdmin.from("service_categories").select("*").order("name_ar", { ascending: true })

    if (error) {
      console.error("Error fetching categories:", error)
      throw new Error("Failed to fetch categories")
    }

    console.log(`Successfully retrieved ${data?.length || 0} categories`)
    return data || []
  } catch (error) {
    console.error("Unexpected error in getCategories:", error)
    throw error
  }
}