// الكود الكامل الآن بعد إزالة الترجمة واستخدام النصوص العربية مباشرة:

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, ImagePlus, Loader2, MapPin } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProviderSidebar from "@/components/provider-sidebar"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"
import DemoAccountBadge from "@/components/demo-account-badge"

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isDemoAccount, setIsDemoAccount] = useState(false)

  useEffect(() => {
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "ar"
  }, [])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    locationName: "",
    address: "",
    capacity: "",
    price: "",
    isFree: false,
    image: null as File | null,
  })

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true)

      const isDemoUser = localStorage.getItem("demoUser") || document.cookie.includes("using_demo_account=true")
      if (isDemoUser) {
        setIsDemoAccount(true)

        const demoEvent = {
          id: "demo-event-1",
          title: "ورشة عمل تطوير المهارات",
          description: "ورشة عمل لتطوير المهارات الشخصية والمهنية للمقيمين العرب في تركيا",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          start_time: "14:00",
          end_time: "17:00",
          location_name: "مركز نقطة الثقافي",
          location_address: "شارع الاستقلال، اسطنبول",
          capacity: "30",
          price: "150",
          is_free: false,
          image_url: "/workshop.png",
        }

        setFormData({
          title: demoEvent.title,
          description: demoEvent.description,
          category: "workshop",
          date: demoEvent.date,
          startTime: demoEvent.start_time,
          endTime: demoEvent.end_time,
          locationName: demoEvent.location_name,
          address: demoEvent.location_address,
          capacity: demoEvent.capacity,
          price: demoEvent.price,
          isFree: demoEvent.is_free,
          image: null,
        })

        setPreviewImage(demoEvent.image_url)
        setIsLoading(false)
        return
      }

      try {
        const { data: event, error } = await supabase.from("demo_events").select("*").eq("id", params.id).eq("status", "approved").single()

        if (error || !event) {
          toast({ title: "خطأ", description: "فشل في تحميل بيانات الفعالية", variant: "destructive" })
          router.push("/provider/events")
          return
        }

        const formattedDate = new Date(event.date).toISOString().split("T")[0]

        setFormData({
          title: event.title,
          description: event.description || "",
          category: event.category || "",
          date: formattedDate,
          startTime: event.start_time || "",
          endTime: event.end_time || "",
          locationName: event.location_name || "",
          address: event.location_address || "",
          capacity: event.capacity?.toString() || "",
          price: event.price?.toString() || "",
          isFree: event.is_free || false,
          image: null,
        })

        if (event.image_url) setPreviewImage(event.image_url)
      } catch (error) {
        toast({ title: "خطأ", description: "فشل في تحميل بيانات الفعالية", variant: "destructive" })
        router.push("/provider/events")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [params.id, router, supabase])

  return (
    <div className="flex min-h-screen flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="container px-4">
          {isDemoAccount && <DemoAccountBadge className="mb-6" />}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ProviderSidebar activeItem="events" />
            <Card className="md:col-span-3 shadow-sm">
              <CardHeader>
                <CardTitle>تعديل الفعالية</CardTitle>
                <CardDescription>قم بتحديث بيانات الفعالية الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="title">عنوان الفعالية</Label>
                    <Input id="title" name="title" value={formData.title} onChange={() => {}} required />
                  </div>
                  <div>
                    <Label htmlFor="description">الوصف</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={() => {}} required rows={4} />
                  </div>
                  <div>
                    <Label htmlFor="category">الفئة</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="اختر فئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workshop">ورشة عمل</SelectItem>
                        <SelectItem value="festival">مهرجان</SelectItem>
                        <SelectItem value="concert">حفلة موسيقية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">التاريخ</Label>
                      <Input id="date" type="date" name="date" value={formData.date} onChange={() => {}} required />
                    </div>
                    <div>
                      <Label htmlFor="startTime">وقت البدء</Label>
                      <Input id="startTime" type="time" name="startTime" value={formData.startTime} onChange={() => {}} required />
                    </div>
                    <div>
                      <Label htmlFor="endTime">وقت الانتهاء</Label>
                      <Input id="endTime" type="time" name="endTime" value={formData.endTime} onChange={() => {}} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="locationName">اسم الموقع</Label>
                    <Input id="locationName" name="locationName" value={formData.locationName} onChange={() => {}} required />
                  </div>
                  <div>
                    <Label htmlFor="address">العنوان</Label>
                    <Input id="address" name="address" value={formData.address} onChange={() => {}} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">السعة</Label>
                      <Input id="capacity" name="capacity" type="number" value={formData.capacity} onChange={() => {}} required />
                    </div>
                    <div>
                      <Label htmlFor="price">السعر</Label>
                      <Input id="price" name="price" type="number" value={formData.price} onChange={() => {}} required disabled={formData.isFree} />
                    </div>
                  </div>
                  <div>
                    <input type="checkbox" id="isFree" name="isFree" checked={formData.isFree} onChange={() => {}} />
                    <Label htmlFor="isFree" className="ml-2">فعالية مجانية</Label>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">حفظ التغييرات</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
