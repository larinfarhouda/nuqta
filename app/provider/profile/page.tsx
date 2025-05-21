"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Mail, Phone, Globe, Edit } from "lucide-react"
import ProviderSidebar from "@/components/provider-sidebar"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"
import DemoAccountBadge from "@/components/demo-account-badge"
import type { Profile } from "@/lib/supabase/database.types"

export default function ProviderProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "ar"
  }, [])

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        const { data: demoData } = await supabase.from("demo_profiles").select("*").eq("user_id", user.id).single()
        setIsDemo(!!demoData)

        const { data, error } = await supabase.from("demo_profiles").select("*").eq("id", user.id).single()

        if (error) {
          toast({ title: "خطأ", description: "فشل في تحميل الملف الشخصي", variant: "destructive" })
          return
        }

        setProfile(data)
      } catch (error) {
        toast({ title: "خطأ", description: "فشل في تحميل الملف الشخصي", variant: "destructive" })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [supabase])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        <span className="mr-3 text-teal-600">جاري التحميل...</span>
      </div>
    )
  }

  return (
    <>
      {isDemo && <DemoAccountBadge className="mb-4" />}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <ProviderSidebar activeItem="profile" />

        <div className="md:col-span-3 space-y-6">
          {/* صورة الغلاف واسم النشاط */}
          <div className="relative rounded-xl overflow-hidden bg-white shadow">
            <div className="h-48 relative">
              <Image
                src={profile?.cover_image_url || "/placeholder.svg"}
                alt={profile?.business_name || "صورة الغلاف"}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white" asChild>
                  <Link href="/provider/profile/edit">
                    <Edit className="h-4 w-4 ml-1" /> تعديل الملف الشخصي
                  </Link>
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative w-24 h-24 -mt-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={profile?.profile_image_url || "/placeholder.svg"}
                    alt={profile?.business_name || "الصورة الشخصية"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{profile?.business_name}</h1>
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full text-xs">
                      {profile?.category || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* عن المزود */}
          <Card>
            <CardHeader>
              <CardTitle>عن المزود</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{profile?.description || "لم يتم إضافة وصف بعد."}</p>
            </CardContent>
          </Card>

          {/* معلومات التواصل */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات التواصل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-teal-600 mt-0.5 ml-3" />
                  <div>
                    <h3 className="font-medium">العنوان</h3>
                    <p className="text-gray-600">{profile?.address || "لم يتم تحديد العنوان."}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-teal-600 mt-0.5 ml-3" />
                  <div>
                    <h3 className="font-medium">البريد الإلكتروني</h3>
                    <p className="text-gray-600">{profile?.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-teal-600 mt-0.5 ml-3" />
                  <div>
                    <h3 className="font-medium">رقم الجوال</h3>
                    <p className="text-gray-600">{profile?.phone || "لم يتم إدخال رقم."}</p>
                  </div>
                </div>

                {profile?.business_name && (
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-teal-600 mt-0.5 ml-3" />
                    <div>
                      <h3 className="font-medium">رابط الموقع</h3>
                      <a
                        href={profile.business_name.startsWith("http") ? profile.business_name : `https://${profile.business_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:underline"
                      >
                        {profile.business_name}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
