"use client"

import { useEffect } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa"

export default function JoinAsProviderPage() {
  useEffect(() => {
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "ar"
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4 py-20">
      <Card className="w-full max-w-xl text-center shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-700 font-bold mb-2">الانضمام كمزود خدمة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700">
          <p>
            إذا كنت تقدم خدمات مميزة وترغب بالانضمام إلى منصة نقطة كمزود خدمة، تواصل معنا وسنقوم بعرض خدماتك للزوار.
          </p>

          {/* social icons row */}
          <div className="flex justify-center gap-4 pt-2">
            <a
              href="https://wa.me/905551234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-20 flex items-center justify-center rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition"
            >
              <FaWhatsapp className="w-7 h-7" />
            </a>
            <a
              href="https://instagram.com/nuqta.ist"
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-20 flex items-center justify-center rounded-lg bg-pink-100 text-pink-500 hover:bg-pink-200 transition"
            >
              <FaInstagram className="w-7 h-7" />
            </a>
            <a
              href="https://facebook.com/nuqta.ist"
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-20 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
            >
              <FaFacebook className="w-7 h-7" />
            </a>
          </div>

          <div className="space-y-4 text-right pt-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-teal-600" />
              <span>info@nuqta.ist</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600" />
              <span>اسطنبول، تركيا</span>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" asChild>
              <Link href="/">العودة للصفحة الرئيسية</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
