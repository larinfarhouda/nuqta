// الكود بعد إزالة الترجمة واستخدام النصوص العربية فقط

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
import { createEvent } from "@/app/provider/events/actions"
import { toast } from "@/components/ui/use-toast"
import DemoAccountBadge from "@/components/demo-account-badge"

export default function CreateEventPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isDemoAccount, setIsDemoAccount] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("demoUser") || document.cookie.includes("using_demo_account=true")
    }
    return false
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement
      setFormData((prev) => ({
        ...prev,
        [name]: checkbox.checked,
        ...(name === "isFree" && checkbox.checked ? { price: "0" } : {}),
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, image: file }))

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewImage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isDemoAccount) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        toast({ title: "تم إنشاء الفعالية", description: "تم إنشاء الفعالية بنجاح." })
        router.push("/provider/events")
        return
      }

      const formDataObj = new FormData()
      formDataObj.append("title", formData.title)
      formDataObj.append("description", formData.description)
      formDataObj.append("category", formData.category)
      formDataObj.append("date", formData.date)
      formDataObj.append("startTime", formData.startTime)
      formDataObj.append("endTime", formData.endTime)
      formDataObj.append("locationName", formData.locationName)
      formDataObj.append("address", formData.address)
      formDataObj.append("capacity", formData.capacity)
      formDataObj.append("price", formData.price)
      formDataObj.append("isFree", String(formData.isFree))

      if (formData.image) {
        formDataObj.append("image", formData.image)
      }

      const result = await createEvent(formDataObj)

      if (result.error) {
        toast({ title: "فشل إنشاء الفعالية", description: result.error, variant: "destructive" })
      } else {
        toast({ title: "تم إنشاء الفعالية", description: "تم إنشاء الفعالية بنجاح." })
        router.push("/provider/events")
      }
    } catch (error) {
      console.error("Event creation error:", error)
      toast({ title: "فشل إنشاء الفعالية", description: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="container px-4">
          {isDemoAccount && <DemoAccountBadge className="mb-4" />}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ProviderSidebar activeItem="events" />
            <Card className="md:col-span-3 shadow-sm">
              <CardHeader>
                <CardTitle>إنشاء فعالية جديدة</CardTitle>
                <CardDescription>يرجى تعبئة النموذج التالي لإنشاء فعالية</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="title">عنوان الفعالية</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleChange} required />

                    <Label htmlFor="description">وصف الفعالية</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />

                    <Label htmlFor="category">نوع الفعالية</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="اختر نوع الفعالية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workshop">ورشة عمل</SelectItem>
                        <SelectItem value="festival">مهرجان</SelectItem>
                        <SelectItem value="concert">حفلة موسيقية</SelectItem>
                        <SelectItem value="meetup">لقاء</SelectItem>
                        <SelectItem value="networking">تواصل مهني</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="date">تاريخ الفعالية</Label>
                    <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />

                    <Label htmlFor="startTime">وقت البداية</Label>
                    <Input id="startTime" name="startTime" type="time" value={formData.startTime} onChange={handleChange} required />

                    <Label htmlFor="endTime">وقت النهاية</Label>
                    <Input id="endTime" name="endTime" type="time" value={formData.endTime} onChange={handleChange} required />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="locationName">اسم الموقع</Label>
                    <Input id="locationName" name="locationName" value={formData.locationName} onChange={handleChange} required />

                    <Label htmlFor="address">العنوان</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="capacity">العدد المسموح</Label>
                    <Input id="capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />

                    <Label htmlFor="price">السعر</Label>
                    <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required disabled={formData.isFree} />

                    <div className="flex items-center gap-2">
                      <input id="isFree" name="isFree" type="checkbox" checked={formData.isFree} onChange={handleChange} />
                      <Label htmlFor="isFree">فعالية مجانية</Label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="image">صورة الفعالية</Label>
                    <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
                    {previewImage && <Image src={previewImage} alt="معاينة" width={200} height={200} className="rounded-md" />}
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                      إلغاء
                    </Button>
                    <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                      {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> جارٍ الحفظ...</> : "إنشاء الفعالية"}
                    </Button>
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
