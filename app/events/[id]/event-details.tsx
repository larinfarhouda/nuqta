"use client"

import { useState } from "react"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { ar, enUS, type Locale } from "date-fns/locale"
import { Calendar, Clock, MapPin, Users, DollarSign, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
//import { useAuth } from "@/lib/context/auth-context"
import ImageWithFallback from "@/components/image-with-fallback"
// import RegisterButton from "./register-button"

interface EventDetailsProps {
  event: any // Using any for simplicity, but should be properly typed
}

const categoryLabels: Record<string, string> = {
  cultural: "ثقافي",
  business: "أعمال",
  entertainment: "ترفيهي",
  education: "تعليمي",
  sports: "رياضي",
  technology: "تقنية",
  health: "صحة",
  other: "أخرى",
}

export default function EventDetails({ event }: EventDetailsProps) {
  //const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [attendees, setAttendees] = useState(1)

  // Mejorar la función formatDateSafely para manejar mejor los formatos de fecha inválidos

  const formatDateSafely = (
    dateString: string | null | undefined,
    formatStr: string,
    localeObj: Locale = enUS,
  ): string => {
    if (!dateString) return "غير محدد" // "No especificado" en árabe

    try {
      // Limpiar la cadena de fecha para eliminar formatos inválidos
      let dateToFormat = dateString

      // Detectar y corregir el formato inválido con doble T (como 2025-05-11T00:00:00ZT08:00:00)
      if (dateString.includes("ZT")) {
        console.warn("Detected invalid date format with ZT:", dateString)
        // Tomar solo la primera parte hasta la Z
        dateToFormat = dateString.split("Z")[0] + "Z"
      }

      // Si la fecha no está en formato ISO, intentar convertirla
      if (!dateToFormat.includes("T")) {
        // Asumir que es una fecha simple YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateToFormat)) {
          dateToFormat = `${dateToFormat}T00:00:00Z`
        }
      }

      const date = parseISO(dateToFormat)

      // Verificar si la fecha es válida
      if (Number.isNaN(date.getTime())) {
        console.error("Invalid date after parsing:", dateString, "->", dateToFormat)
        return "تاريخ غير صالح" // "Fecha no válida" en árabe
      }

      return format(date, formatStr, { locale: localeObj })
    } catch (error) {
      console.error("Error formatting date:", error, dateString)
      return "تاريخ غير صالح" // "Fecha no válida" en árabe
    }
  }

  // Formatear fechas con manejo de errores
  const formattedDate = formatDateSafely(event.date, "EEEE، d MMMM yyyy", ar)
  const formattedDateEn = formatDateSafely(event.date, "EEEE, MMMM d, yyyy", enUS)

  // Formatear horas con manejo de errores
  const formattedStartTime = event.start_time ? formatDateSafely(event.start_time, "h:mm a") : null
  const formattedEndTime = event.end_time ? formatDateSafely(event.end_time, "h:mm a") : null

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error))
    } else {
      setIsShareDialogOpen(true)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط الفعالية إلى الحافظة",
    })
    setIsShareDialogOpen(false)
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/events" className="text-teal-600 hover:text-teal-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          العودة إلى الفعاليات
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Event Image */}
            <div className="relative h-64 md:h-96 w-full">
              <ImageWithFallback
                src={event.image_url || "/community-event.png"}
                alt={event.title}
                fill
                className="object-cover"
                fallbackSrc="/community-event.png"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-teal-600 hover:bg-teal-700">
                  {categoryLabels[event.category] || event.category}
                </Badge>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 ml-2 text-teal-600" />
                  <div>
                    <div>{formattedDate}</div>
                    <div className="text-sm text-gray-500 ltr:text-left" dir="ltr">
                      {formattedDateEn}
                    </div>
                  </div>
                </div>

                {(formattedStartTime || formattedEndTime) && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 ml-2 text-teal-600" />
                    <div>
                      {formattedStartTime && formattedEndTime
                        ? `${formattedStartTime} - ${formattedEndTime}`
                        : formattedStartTime || formattedEndTime}
                    </div>
                  </div>
                )}

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 ml-2 text-teal-600" />
                  <div>
                    <div>{event.location_name}</div>
                    {event.address && <div className="text-sm text-gray-500">{event.address}</div>}
                  </div>
                </div>

                {event.capacity && (
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 ml-2 text-teal-600" />
                    <span>السعة: {event.capacity} شخص</span>
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">عن الفعالية</h2>
                <div className="text-gray-700 whitespace-pre-line">{event.description || "لا يوجد وصف متاح"}</div>
              </div>

              {/* Organizer Info (if available) */}
              {event.demo_profiles && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">المنظم</h2>
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={event.demo_profiles.profile_image_url || "/provider-abstract.png"}
                        alt={event.demo_profiles.business_name || "المنظم"}
                        fill
                        className="object-cover"
                        fallbackSrc="/provider-abstract.png"
                      />
                    </div>
                    <div className="mr-3">
                      <div className="font-medium">{event.demo_profiles.business_name}</div>
                      <Link href={`/providers/${event.provider_id}`} className="text-teal-600 text-sm">
                        عرض الملف الشخصي
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Share Button */}
              <div className="mt-6">
                <Button variant="outline" onClick={handleShare} className="flex items-center">
                  <Share2 className="h-4 w-4 ml-2" />
                  مشاركة الفعالية
                </Button>

                <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>مشاركة الفعالية</DialogTitle>
                      <DialogDescription>انسخ الرابط أدناه لمشاركة هذه الفعالية</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Input value={window.location.href} readOnly />
                      <Button onClick={copyToClipboard}>نسخ</Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogTrigger asChild>
                        <Button variant="outline">إغلاق</Button>
                      </DialogTrigger>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">تفاصيل التسجيل</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">السعر:</span>
                  <span className="font-semibold">
                    {event.is_free || !event.price ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        مجاني
                      </Badge>
                    ) : (
                      <div className="flex items-center">
                        
                        {event.price} ليرة تركية
                      </div>
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">التصنيف:</span>
                  <Badge variant="outline">{categoryLabels[event.category] || event.category}</Badge>
                </div>

                {event.capacity && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">السعة:</span>
                    <span>{event.capacity} شخص</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">التاريخ:</span>
                  <span>{formattedDate}</span>
                </div>

                {(formattedStartTime || formattedEndTime) && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">الوقت:</span>
                    <span>
                      {formattedStartTime && formattedEndTime
                        ? `${formattedStartTime} - ${formattedEndTime}`
                        : formattedStartTime || formattedEndTime}
                    </span>
                  </div>
                )}
              </div>

              {/* Attendees Input */}
              <div className="mb-6">
                <Label htmlFor="attendees">عدد الحضور</Label>
                <Input
                  id="attendees"
                  type="number"
                  min="1"
                  max={event.capacity || 10}
                  value={attendees}
                  onChange={(e) => setAttendees(Number.parseInt(e.target.value) || 1)}
                  className="mt-1"
                />
              </div>

              {/* Register Button */}
              {/* <RegisterButton
                eventId={event.id}
                isAuthenticated={isAuthenticated}
                isFree={event.is_free || !event.price}
                attendees={attendees}
              /> */}


{event.demo_profiles?.phone ? (
  <a
    href={`https://wa.me/${event.demo_profiles.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      `مرحباً، لقيت إعلان فعاليتكم على منصة نقطة وحابب أحجز لعدد ${attendees} شخص في فعالية ${event.title}`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button className="w-full bg-teal-600 hover:bg-teal-700">
      التسجيل في الفعالية
    </Button>
  </a>
) : (
  <p className="text-sm text-red-500 mt-2">لا يوجد رقم تواصل لطلب التسجيل</p>
)}



              {/* Location Map (placeholder) */}
              <div className="mt-6">
  <h3 className="text-lg font-medium mb-2">الموقع</h3>

  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location_name || event.address)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="block h-48 bg-gray-200 rounded-md overflow-hidden"
  >
    <iframe
      src={`https://www.google.com/maps?q=${encodeURIComponent(event.location_name || event.address)}&output=embed`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      title={`موقع ${event.title}`}
    ></iframe>
  </a>

  <p className="text-sm text-gray-500 mt-2">{event.address || event.location_name}</p>
</div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
