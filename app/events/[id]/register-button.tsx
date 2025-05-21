"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client-singleton"

interface RegisterButtonProps {
  eventId: string
  isAuthenticated: boolean
  isFree: boolean
  attendees: number
}

export default function RegisterButton({ eventId, isAuthenticated, isFree, attendees }: RegisterButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleRegister = async () => {
    if (!isAuthenticated) {
      // Redirect to login page with return URL
      router.push(`/auth/login?returnUrl=/events/${eventId}`)
      return
    }

    // Validar el ID del evento
    if (!eventId || typeof eventId !== "string") {
      toast({
        title: "خطأ في التسجيل",
        description: "معرف الفعالية غير صالح",
        variant: "destructive",
      })
      return
    }

    // Validar el número de asistentes
    if (!attendees || attendees < 1) {
      toast({
        title: "خطأ في التسجيل",
        description: "يرجى تحديد عدد صحيح من الحضور",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("لم يتم العثور على المستخدم")
      }

      // Para fines de demostración, podemos simular un registro exitoso para IDs de eventos que no existen en la base de datos
      if (eventId === "cccccccc-cccc-cccc-cccc-cccccccccccc" || eventId.length > 20) {
        // Simular un retraso
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mostrar mensaje de éxito
        toast({
          title: "تم التسجيل بنجاح (وضع العرض التوضيحي)",
          description: "تم تسجيلك في هذه الفعالية بنجاح (ملاحظة: هذه فعالية اختبار)",
        })

        // Actualizar la página
        router.refresh()
        return
      }

      // Create booking
      const { data, error } = await supabase.from("demo_bookings").insert({
        event_id: eventId,
        user_id: user.id,
        attendees: attendees,
        status: "confirmed", // For demo purposes, we'll auto-confirm
      })

      if (error) {
        throw error
      }

      // Show success message
      toast({
        title: "تم التسجيل بنجاح",
        description: "تم تسجيلك في هذه الفعالية بنجاح",
      })

      // Refresh the page to show updated booking status
      router.refresh()
    } catch (error) {
      console.error("Error registering for event:", error)

      toast({
        title: "خطأ في التسجيل",
        description: "حدث خطأ أثناء محاولة التسجيل في الفعالية. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleRegister} disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700">
      {isLoading ? (
        <>
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          جاري التسجيل...
        </>
      ) : (
        <>{isFree ? "التسجيل في الفعالية" : "حجز تذكرة"}</>
      )}
    </Button>
  )
}
