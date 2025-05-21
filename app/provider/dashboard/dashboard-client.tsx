"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Plus, Star, Users } from "lucide-react"
import ProviderSidebar from "@/components/provider-sidebar"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"
import type { Profile, Event, Review } from "@/lib/supabase/database.types"
import { formatDate, formatRelativeTime } from "@/lib/utils/date-formatter"
import DemoAccountBadge from "@/components/demo-account-badge"
import { Skeleton } from "@/components/ui/skeleton"

function ProviderDashboardClient() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDemoAccount, setIsDemoAccount] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const isDemoUser = localStorage.getItem("demoUser") || document.cookie.includes("using_demo_account=true")

      if (isDemoUser) {
        setIsDemoAccount(true)
        setProfile({
          id: "demo-user",
          business_name: "شركة نقطة للخدمات",
          category: "تنظيم الفعاليات",
          description: "نقدم خدمات تنظيم الفعاليات والمناسبات بأعلى مستويات الجودة في تركيا",
          address: "اسطنبول، تركيا",
          phone: "+90 555 123 4567",
          profile_image_url: "/abstract-profile.png",
          cover_image_url: "/abstract-geometric-cover.png",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: "demo-user",
          email: "demo@nuqta.com",
          full_name: "مستخدم تجريبي",
          avg_rating: null,
          review_count: null,
        } as Profile)

        setEvents([
            {
              id: "demo-event-1",
              title: "ورشة عمل تطوير المهارات",
              description: "ورشة عمل لتطوير المهارات الشخصية والمهنية للمقيمين العرب في تركيا",
              date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              start_time: "14:00",
              end_time: "17:00",
              location_name: "مركز نقطة الثقافي",
              address: "شارع الاستقلال، اسطنبول",
              capacity: 30,
              price: 150,
              image_url: "/workshop.png",
              provider_id: "demo-user",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              category: "تنظيم الفعاليات",
              category_id: 1, // Replace with an appropriate numeric ID
              is_free: false,
            },
          ])
  

          setReviews([
            {
              id: "demo-review-1",
              provider_id: "demo-user",
              user_id: "user-1",
              rating: 5,
              comment: "خدمة ممتازة وفريق عمل محترف، أنصح بالتعامل معهم",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ] as unknown as Review[])

        setIsLoading(false)
        return
      }

      const supabase = createClient()

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        const { data: profileData } = await supabase.from("demo_profiles").select("*").eq("id", user.id).single()
        setProfile(profileData)

        const { data: eventsData } = await supabase
          .from("demo_events")
          .select("*")
          .eq("provider_id", user.id)
          .eq("status", "approved")
          .order("date", { ascending: true })

        setEvents(eventsData || [])

        const { data: reviewsData } = await supabase
          .from("demo_reviews")
          .select("*")
          .eq("provider_id", user.id)
          .order("created_at", { ascending: false })

        setReviews(reviewsData || [])
      } catch (error) {
        toast({
          title: "خطأ",
          description: "فشل في تحميل البيانات",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-teal-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  const averageRating = reviews.length
    ? (reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length).toFixed(1)
    : "0.0"

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {isDemoAccount && <DemoAccountBadge className="mb-4" />}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ProviderSidebar activeItem="dashboard" />

          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>مرحباً، {profile?.full_name}</CardTitle>
                <CardDescription>إليك لمحة عامة عن نشاطك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">عدد الفعاليات</p>
                    <p className="text-xl font-bold">{events.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">متوسط التقييم</p>
                    <p className="text-xl font-bold">{averageRating}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">عدد التقييمات</p>
                    <p className="text-xl font-bold">{reviews.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">نوع الخدمة</p>
                    <p className="text-xl font-bold">{profile?.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>آخر تقييم</CardTitle>
                <CardDescription>تعرف على رأي العملاء</CardDescription>
              </CardHeader>
              <CardContent>
                {reviews.length ? (
                  <div>
                    <p className="font-semibold">{reviews[0].comment}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(reviews[0].created_at).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">لم يتم إضافة تقييمات بعد</p>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-teal-600 hover:bg-teal-700" asChild>
                <Link href="/provider/events/create">
                  <Plus className="h-4 w-4 ml-2" /> إضافة فعالية جديدة
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProviderDashboardPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">جاري تحميل لوحة التحكم...</div>}>
      <ProviderDashboardClient />
    </Suspense>
  )
}

export const dynamic = "force-static";
