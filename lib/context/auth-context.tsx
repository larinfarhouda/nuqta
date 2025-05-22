// "use client"

// import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
// import type { Session, User } from "@supabase/supabase-js"
// import { createClient } from "@/lib/supabase/client-singleton"
// import { errorLog } from "@/lib/utils/debug-logger"

// interface AuthContextType {
//   user: User | null
//   session: Session | null
//   isLoading: boolean
//   isAuthenticated: boolean
//   isProvider: boolean
//   signOut: () => Promise<void>
//   refreshSession: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [session, setSession] = useState<Session | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isProvider, setIsProvider] = useState(false)

//   useEffect(() => {
//     const supabase = createClient()

//     // Get initial session
//     const initializeAuth = async () => {
//       try {
//         setIsLoading(true)
//         const { data, error } = await supabase.auth.getSession()

//         if (error) {
//           errorLog("Error getting auth session:", error)
//           return
//         }

//         setSession(data.session)
//         setUser(data.session?.user || null)

//         if (data.session?.user) {
//           // Check if user is a provider
//           const { data: profile, error: profileError } = await supabase
//             .from("demo_profiles")
//             .select("id")
//             .eq("id", data.session.user.id)
//             .single()

//           if (profileError) {
//             errorLog("Error fetching user profile:", profileError)
//             setIsProvider(false)
//           } else {
//             // Si existe un perfil, consideramos que es un proveedor
//             setIsProvider(!!profile)
//           }
//         }
//       } catch (err) {
//         errorLog("Unexpected error initializing auth:", err)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     initializeAuth()

//     // Set up auth state change listener
//     const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
//       setSession(newSession)
//       setUser(newSession?.user || null)

//       if (newSession?.user) {
//         // Check if user is a provider
//         const { data: profile, error: profileError } = await supabase
//           .from("demo_profiles")
//           .select("id")
//           .eq("id", newSession.user.id)
//           .single()

//         if (profileError) {
//           errorLog("Error fetching user profile on auth change:", profileError)
//         } else {
//           setIsProvider(!!profile)
//         }
//       } else {
//         setIsProvider(false)
//       }
//     })

//     return () => {
//       authListener.subscription.unsubscribe()
//     }
//   }, [])

//   const signOut = async () => {
//     try {
//       const supabase = createClient()
//       const { error } = await supabase.auth.signOut()

//       if (error) {
//         errorLog("Error signing out:", error)
//         throw error
//       }
//     } catch (err) {
//       errorLog("Unexpected error signing out:", err)
//       throw err
//     }
//   }

//   const refreshSession = async () => {
//     try {
//       setIsLoading(true)
//       const supabase = createClient()
//       const { data, error } = await supabase.auth.getSession()

//       if (error) {
//         errorLog("Error refreshing session:", error)
//         return
//       }

//       setSession(data.session)
//       setUser(data.session?.user || null)

//       if (data.session?.user) {
//         // Check if user is a provider
//         const { data: profile, error: profileError } = await supabase
//           .from("demo_profiles")
//           .select("id")
//           .eq("id", data.session.user.id)
//           .single()

//         if (profileError) {
//           errorLog("Error fetching user profile on refresh:", profileError)
//         } else {
//           setIsProvider(!!profile)
//         }
//       }
//     } catch (err) {
//       errorLog("Unexpected error refreshing session:", err)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         session,
//         isLoading,
//         isAuthenticated: !!user,
//         isProvider,
//         signOut,
//         refreshSession,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }
