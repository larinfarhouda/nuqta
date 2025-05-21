"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, Home, LogOut, MessageSquare, Settings, Star, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

interface ProviderSidebarProps {
  activeItem: string
}

export default function ProviderSidebar({ activeItem }: ProviderSidebarProps) {
  const router = useRouter()
  const supabase = createClient()

  const menuItems = [
    { id: "dashboard", label: "لوحة التحكم", href: "/provider/dashboard", icon: Home },
    { id: "profile", label: "الملف الشخصي", href: "/provider/profile", icon: User },
    { id: "events", label: "الفعاليات", href: "/provider/events", icon: Calendar },
    { id: "reviews", label: "التقييمات", href: "/provider/reviews", icon: Star },
    { id: "messages", label: "الرسائل", href: "/provider/messages", icon: MessageSquare },
    { id: "settings", label: "الإعدادات", href: "/provider/settings", icon: Settings },
  ]

  const handleSignOut = async () => {
    try {
      const isDemoUser = localStorage.getItem("demoUser") || document.cookie.includes("using_demo_account=true")

      if (isDemoUser) {
        localStorage.removeItem("demoUser")
        document.cookie = "using_demo_account=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

        toast({
          title: "تم تسجيل الخروج",
          description: "تم تسجيل خروجك بنجاح",
        })

        router.push("/")
        return
      }

      await supabase.auth.signOut()
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تسجيل الخروج",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 h-fit" dir="rtl">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeItem === item.id
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`h-5 w-5 ml-2 flex-shrink-0 ${activeItem === item.id ? "text-teal-600" : "text-gray-500"}`}
              />
              {item.label}
            </Link>
          )
        })}
        <div className="pt-4 mt-4 border-t border-gray-200">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5 ml-2 flex-shrink-0" />
            تسجيل الخروج
          </button>
        </div>
      </nav>
    </div>
  )
}
