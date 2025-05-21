import { ReactNode } from "react"

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      demo_bookings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          status: string | null
          attendees: number | null
          user_id: string | null
          event_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          status?: string | null
          attendees?: number | null
          user_id?: string | null
          event_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          status?: string | null
          attendees?: number | null
          user_id?: string | null
          event_id?: string | null
        }
      }
      demo_events: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          date: string
          start_time: string | null
          end_time: string | null
          location_name: string
          address: string | null
          category: string
          category_id: number | null
          image_url: string | null
          provider_id: string | null
          capacity: number | null
          price: number | null
          is_free: boolean | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          date: string
          start_time?: string | null
          end_time?: string | null
          location_name: string
          address?: string | null
          category: string
          category_id?: number | null
          image_url?: string | null
          provider_id?: string | null
          capacity?: number | null
          price?: number | null
          is_free?: boolean | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          date?: string
          start_time?: string | null
          end_time?: string | null
          location_name?: string
          address?: string | null
          category?: string
          category_id?: number | null
          image_url?: string | null
          provider_id?: string | null
          capacity?: number | null
          price?: number | null
          is_free?: boolean | null
        }
      }
      demo_profiles: {
        Row: {
          id: string
          email: string
          phone: string | null
          category: string | null
          description: string | null
          address: string | null
          profile_image_url: string | null
          cover_image_url: string | null
          business_name: string
          full_name: string | null
          avg_rating: number | null
          review_count: number | null
          // Eliminamos is_provider ya que no existe en la base de datos
        }
        Insert: {
          id: string
          email: string
          phone?: string | null
          category?: string | null
          description?: string | null
          address?: string | null
          profile_image_url?: string | null
          cover_image_url?: string | null
          business_name: string
          full_name?: string | null
          avg_rating?: number | null
          review_count?: number | null
          // Eliminamos is_provider ya que no existe en la base de datos
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          category?: string | null
          description?: string | null
          address?: string | null
          profile_image_url?: string | null
          cover_image_url?: string | null
          business_name?: string
          full_name?: string | null
          avg_rating?: number | null
          review_count?: number | null
          // Eliminamos is_provider ya que no existe en la base de datos
        }
      }
      demo_reviews: {
        Row: {
          rating: number
          comment: ReactNode
          created_at: string | number | Date
          // Placeholder for demo_reviews - schema details were not provided
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
      }
      event_categories: {
        Row: {
          // Placeholder for event_categories - schema details were not provided
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          // Placeholder for newsletter_subscribers - schema details were not provided
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
      }
      service_categories: {
        Row: {
          // Placeholder for service_categories - schema details were not provided
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_table_columns: {
        Args: {
          table_name: string
        }
        Returns: {
          column_name: string
          data_type: string
          is_nullable: boolean
          column_default: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Profile = Database["public"]["Tables"]["demo_profiles"]["Row"]
export type Event = Database["public"]["Tables"]["demo_events"]["Row"]
export type Review = Database["public"]["Tables"]["demo_reviews"]["Row"]
export type NewsletterSubscriber = Database["public"]["Tables"]["newsletter_subscribers"]["Row"]