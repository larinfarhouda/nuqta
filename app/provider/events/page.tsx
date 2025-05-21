// صفحة الفعاليات بدون ترجمة

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Plus, Trash2, Edit, Eye } from "lucide-react"
import ProviderSidebar from "@/components/provider-sidebar"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"
import type { Event } from "@/lib/supabase/database.types"
import { formatDate } from "@/lib/utils/date-formatter"
import DemoAccountBadge from "@/components/demo-account-badge"

export default function ProviderEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDemoAccount, setIsDemoAccount] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)

      const isDemoUser = localStorage.getItem("demoUser") || document.cookie.includes("using_demo_account=true")
      if (isDemoUser) {
        setIsDemoAccount(true)
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
              category: "",
              category_id: 1,
              is_free: false
          },
          {
              id: "demo-event-2",
              title: "معرض الفنون العربية",
              description: "معرض للفنون العربية المعاصرة في تركيا",
              date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
              start_time: "10:00",
              end_time: "20:00",
              location_name: "قاعة الفنون",
              address: "منطقة بيوغلو، اسطنبول",
              capacity: 100,
              price: 50,
              image_url: "/art-exhibition.png",
              provider_id: "demo-user",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              category: "",
              category_id: 1,
              is_free: false
          },
        ])
        setIsLoading(false)
        return
      }

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        const { data, error } = await supabase
          .from("demo_events")
          .select("*")
          .eq("provider_id", user.id)
          .eq("status", "approved")
          .order("date", { ascending: true })

        if (error) {
          toast({ title: "خطأ", description: "فشل في تحميل الفعاليات", variant: "destructive" })
          return
        }

        setEvents(data || [])
      } catch (error) {
        toast({ title: "خطأ", description: "فشل في تحميل الفعاليات", variant: "destructive" })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [supabase])

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("هل أنت متأكد أنك تريد حذف هذه الفعالية؟")) return

    try {
      if (isDemoAccount) {
        setEvents(events.filter((event) => event.id !== eventId))
        toast({ title: "تم الحذف", description: "تم حذف الفعالية بنجاح" })
        return
      }

      const { error } = await supabase.from("demo_events").delete().eq("id", eventId)

      if (error) {
        toast({ title: "خطأ", description: "فشل في حذف الفعالية", variant: "destructive" })
        return
      }

      setEvents(events.filter((event) => event.id !== eventId))
      toast({ title: "تم الحذف", description: "تم حذف الفعالية بنجاح" })
    } catch (error) {
      toast({ title: "خطأ", description: "فشل في حذف الفعالية", variant: "destructive" })
    }
  }

  const currentDate = new Date()
  const upcomingEvents = events.filter((event) => new Date(event.date) >= currentDate)
  const pastEvents = events.filter((event) => new Date(event.date) < currentDate)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        <span className="mr-3 text-teal-600">جاري التحميل...</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
      <ProviderSidebar activeItem="events" />
      <div className="md:col-span-3 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">فعالياتي</h1>
          <Button className="bg-teal-600 hover:bg-teal-700" asChild>
            <Link href="/provider/events/create">
              <Plus className="h-4 w-4 ml-1" />إضافة فعالية
            </Link>
          </Button>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-gray-500 mb-4">لا توجد فعاليات حتى الآن</div>
            <Button className="bg-teal-600 hover:bg-teal-700" asChild>
              <Link href="/provider/events/create">
                <Plus className="h-4 w-4 ml-1" />إنشاء أول فعالية
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">الفعاليات القادمة</h2>
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 relative h-48 md:h-auto">
                    <Image src={event.image_url || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  </div>
                  <CardContent className="md:w-3/4 p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 ml-2 text-teal-600" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 ml-2 text-teal-600" />
                            <span>{event.start_time} - {event.end_time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 ml-2 text-teal-600" />
                            <span>{event.location_name}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="ml-2 text-teal-600 font-bold">{event.capacity} مقعد</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2">
                        <Button variant="outline" size="sm" className="border-teal-600 text-teal-600 hover:bg-teal-50" asChild>
                          <Link href={`/events/${event.id}`}><Eye className="h-4 w-4 ml-1" />عرض</Link>
                        </Button>
                        <Button variant="outline" size="sm" className="border-teal-600 text-teal-600 hover:bg-teal-50" asChild>
                          <Link href={`/provider/events/${event.id}/edit`}><Edit className="h-4 w-4 ml-1" />تعديل</Link>
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="h-4 w-4 ml-1" />حذف
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 
