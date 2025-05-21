"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ImageWithFallback from "./image-with-fallback"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client-singleton"
import { User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { errorLog } from "@/lib/utils/debug-logger"

// Add named export for Navbar
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isProvider, setIsProvider] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true)
        const supabase = createClient()
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          errorLog("Error checking auth session:", error)
          return
        }

        if (data.session) {
          setIsLoggedIn(true)

          // Check if user is a provider by looking for a profile
          const { data: profile, error: profileError } = await supabase
            .from("demo_profiles")
            .select("*")
            .eq("id", data.session.user.id)
            .single()

          if (profileError) {
            errorLog("Error fetching user profile:", profileError)
          } else {
            setIsProvider(!!profile && profile.is_provider)
          }
        }
      } catch (err) {
        errorLog("Unexpected error checking user:", err)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  const handleSignOut = async () => {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()

      if (error) {
        errorLog("Error signing out:", error)
        return
      }

      setIsLoggedIn(false)
      setIsProvider(false)
      window.location.href = "/"
    } catch (err) {
      errorLog("Unexpected error signing out:", err)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <ImageWithFallback
              src="/nuqta_logo_transparent.png"
              alt="نقطة"
              width={150}
              height={60}
              className="h-12 w-auto"
              priority
              fallbackSrc="/abstract-logo.png"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link href="/" className="text-gray-700 hover:text-teal-600 transition-colors">
              الرئيسية
            </Link>
            {/* Removed Services link since it's consolidated with Providers */}
            <Link href="/events" className="text-gray-700 hover:text-teal-600 transition-colors">
              الفعاليات
            </Link>
            <Link href="/providers" className="text-gray-700 hover:text-teal-600 transition-colors">
              مزودي الخدمات
            </Link>
            <Link href="/about-us" className="text-gray-700 hover:text-teal-600 transition-colors">
              من نحن
            </Link>
            <Link href="/contact-us" className="text-gray-700 hover:text-teal-600 transition-colors">
              اتصل بنا
            </Link>
          </nav>

          {/* Auth Buttons */}
          {/* <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {isLoading ? (
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isProvider && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/provider/dashboard">لوحة التحكم</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/provider/profile">الملف الشخصي</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/provider/events">الفعاليات</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>تسجيل الخروج</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">تسجيل الدخول</Link>
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700" asChild>
                  <Link href="/auth/register">التسجيل</Link>
                </Button>
              </>
            )}
          </div> */}

          {/* Desktop Action Button */}
<div className="hidden md:flex items-center">
  <Button className="bg-teal-600 hover:bg-teal-700" asChild>
    <Link href="/submit-event">أضف فعاليتك</Link>
  </Button>
</div>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              {/* Removed Services link from mobile menu as well */}
              <Link
                href="/events"
                className="text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الفعاليات
              </Link>
              <Link
                href="/providers"
                className="text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                مزودي الخدمات
              </Link>
              <Link
                href="/about-us"
                className="text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                من نحن
              </Link>
              <Link
                href="/contact-us"
                className="text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                اتصل بنا
              </Link>

              {/* Mobile Auth Buttons */}
              {/* <div className="pt-4 border-t border-gray-200">
                {isLoading ? (
                  <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
                ) : isLoggedIn ? (
                  <>
                    {isProvider && (
                      <>
                        <Link
                          href="/provider/dashboard"
                          className="block py-2 text-gray-700 hover:text-teal-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          لوحة التحكم
                        </Link>
                        <Link
                          href="/provider/profile"
                          className="block py-2 text-gray-700 hover:text-teal-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          الملف الشخصي
                        </Link>
                        <Link
                          href="/provider/events"
                          className="block py-2 text-gray-700 hover:text-teal-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          الفعاليات
                        </Link>
                      </>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-right py-2 text-gray-700 hover:text-teal-600 transition-colors"
                    >
                      تسجيل الخروج
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      تسجيل الدخول
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block py-2 text-teal-600 hover:text-teal-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      التسجيل
                    </Link>
                  </>
                )}
              </div> */}

              {/* Mobile Action Button */}
<div className="pt-4 border-t border-gray-200">
  <Link
    href="/submit-event"
    className="block py-2 text-teal-600 hover:text-teal-700 transition-colors"
    onClick={() => setIsMenuOpen(false)}
  >
    أضف فعاليتك
  </Link>
</div>

            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

// Keep the default export for backward compatibility
export default Navbar
