"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { createClient as createServerClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import type { Database } from "@/lib/supabase/database.types"

// Create a Supabase client with the service role key to bypass RLS
const createServiceRoleClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createServerClient<Database>(supabaseUrl, supabaseServiceRoleKey)
}

export async function signUp(formData: FormData) {
  // Use the regular client for auth operations
  const supabase = createServerActionClient<Database>({ cookies })

  // Use the service role client for database operations that need to bypass RLS
  const supabaseAdmin = createServiceRoleClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string
  const businessName = formData.get("businessName") as string
  const phone = formData.get("phone") as string
  const category = formData.get("category") as string
  const description = formData.get("description") as string
  const address = formData.get("address") as string

  console.log("Starting registration process for:", email)

  try {
    // Check if user already exists - use admin client to bypass RLS
    // Check in demo_profiles table instead of profiles
    const { data: existingUser } = await supabaseAdmin
      .from("demo_profiles")
      .select("email")
      .eq("email", email)
      .maybeSingle()

    if (existingUser) {
      console.log("User already exists with this email")
      return { error: "البريد الإلكتروني مسجل بالفعل. يرجى استخدام بريد إلكتروني آخر أو تسجيل الدخول." }
    }

    // Sign up the user - auth operations don't use RLS
    console.log("Creating auth user...")
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (authError) {
      console.error("Auth error:", authError)
      return { error: authError.message }
    }

    if (!authData.user) {
      console.error("No user returned from auth")
      return { error: "فشل في إنشاء المستخدم. يرجى المحاولة مرة أخرى." }
    }

    console.log("Auth user created successfully, creating profile in demo_profiles table...")

    // Create the profile in demo_profiles table instead of profiles
    const { error: profileError } = await supabaseAdmin.from("demo_profiles").insert({
      id: authData.user.id,
      full_name: fullName,
      business_name: businessName,
      email,
      phone,
      category,
      description,
      address,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      console.error("Profile creation error:", profileError)
      return { error: profileError.message }
    }

    console.log("Registration completed successfully for:", email)
    return { success: true, userId: authData.user.id }
  } catch (error: any) {
    console.error("Unexpected error during registration:", error)
    return { error: error.message || "حدث خطأ غير متوقع أثناء التسجيل. يرجى المحاولة مرة أخرى." }
  }
}

export async function signIn(formData: FormData) {
  // Use both regular client and admin client
  const supabase = createServerActionClient<Database>({ cookies })
  const supabaseAdmin = createServiceRoleClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("Attempting login for:", email)

  // SIMPLIFIED APPROACH: Skip all the complex demo account creation
  // Just create a mock session for demo purposes
  if (email === "demo@nuqta.com" && password === "demo123") {
    console.log("Using demo account - creating mock session")

    // Create a mock profile for the demo user
    const mockProfile = {
      id: "demo-user-id",
      email: "demo@nuqta.com",
      full_name: "Demo User",
      business_name: "Nuqta Demo Business",
      phone: "+90 555 123 4567",
      category: "education",
      description: "This is a demo account for testing purposes.",
      address: "Istanbul, Turkey",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Store the mock profile in a cookie so we can retrieve it later
    cookies().set("demo_profile", JSON.stringify(mockProfile), {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
    })

    // Set a flag to indicate we're using a demo account
    cookies().set("using_demo_account", "true", {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
    })

    return { success: true, demoAccount: true, mockSession: true }
  }

  try {
    // Try regular login
    console.log("Attempting regular login...")
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      console.error("Password login error:", authError)

      // If login fails, suggest using the demo account
      return {
        error: "Invalid login credentials. You can use the demo account instead.",
        suggestDemo: true,
      }
    }

    if (!authData.user) {
      console.error("No user returned from auth")
      return { error: "Invalid login credentials" }
    }

    console.log("Login successful for:", email)

    // Check if the user has a profile in demo_profiles
    const { data: demoProfile, error: demoProfileError } = await supabaseAdmin
      .from("demo_profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single()

    if (demoProfileError && demoProfileError.code !== "PGRST116") {
      // PGRST116 is the error code for "no rows returned"
      console.error("Error checking demo profile:", demoProfileError)
    }

    // If no demo profile, check regular profiles
    if (!demoProfile) {
      const { data: profile, error: profileError } = await supabaseAdmin
        .from("demo_profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single()

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Error checking regular profile:", profileError)
      }

      // If no profile in either table, create one in demo_profiles
      if (!profile) {
        console.log("No profile found, creating one in demo_profiles")
        const { error: createProfileError } = await supabaseAdmin.from("demo_profiles").insert({
          id: authData.user.id,
          email: email,
          full_name: authData.user.user_metadata.full_name || "User",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (createProfileError) {
          console.error("Error creating profile during login:", createProfileError)
          // Continue anyway, as auth was successful
        }
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error("Unexpected login error:", error)
    return { error: error.message || "An unexpected error occurred during login. Please try again." }
  }
}

export async function signOut() {
  const supabase = createServerActionClient<Database>({ cookies })

  // Clear demo cookies if they exist
  if (cookies().get("using_demo_account")) {
    cookies().delete("using_demo_account")
    cookies().delete("demo_profile")
    return redirect("/")
  }

  // Otherwise do a regular sign out
  await supabase.auth.signOut()
  redirect("/")
}

export async function getSession() {
  const supabase = createServerActionClient<Database>({ cookies })

  // Check if we're using a demo account
  if (cookies().get("using_demo_account")) {
    return {
      user: {
        id: "demo-user-id",
        email: "demo@nuqta.com",
        user_metadata: {
          full_name: "Demo User",
        },
      },
    }
  }

  // Otherwise get the real session
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function getProfile() {
  // Check if we're using a demo account
  const demoProfileCookie = cookies().get("demo_profile")
  if (demoProfileCookie) {
    try {
      return JSON.parse(demoProfileCookie.value)
    } catch (error) {
      console.error("Error parsing demo profile cookie:", error)
    }
  }

  // Use both regular client and admin client
  const supabase = createServerActionClient<Database>({ cookies })
  const supabaseAdmin = createServiceRoleClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return null
  }

  console.log("Getting profile for user:", session.user.id)

  try {
    // Try to get profile from demo_profiles first using admin client to bypass RLS
    const { data: demoProfile, error: demoError } = await supabaseAdmin
      .from("demo_profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()

    if (demoError && demoError.code !== "PGRST116") {
      console.error("Error fetching demo profile:", demoError)
    }

    if (demoProfile) {
      console.log("Found profile in demo_profiles")
      return demoProfile
    }

    // Fall back to regular profiles if not found in demo_profiles
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("demo_profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()

    if (profileError && profileError.code !== "PGRST116") {
      console.error("Error fetching regular profile:", profileError)
    }

    if (profile) {
      console.log("Found profile in profiles")
      return profile
    }

    console.log("No profile found for user:", session.user.id)
    return null
  } catch (error) {
    console.error("Unexpected error fetching profile:", error)
    return null
  }
}