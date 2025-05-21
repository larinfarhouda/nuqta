import type React from "react"
import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/context/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { GoogleAnalytics } from "@/components/analytics"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
})

export const metadata: Metadata = {
  title: "نقطة - منصة الخدمات والفعاليات العربية في إسطنبول",
  description: "منصة نقطة - اكتشف الفعاليات والخدمات العربية في إسطنبول",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* <AuthProvider> */}
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          {/* </AuthProvider> */}
        </ThemeProvider>
         {/* Add Google Analytics - Replace GA_MEASUREMENT_ID with your actual ID */}
         <GoogleAnalytics gaId="G-BT5RS3V4NK" />
      </body>
    </html>
  )
}
