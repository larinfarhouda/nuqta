"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, AlertCircle, Info } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { signIn } from "@/app/auth/actions"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [suggestDemo, setSuggestDemo] = useState(false)
  const [isDemoAccount, setIsDemoAccount] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuggestDemo(false)
    setIsDemoAccount(false)

    try {
      const formDataObj = new FormData()
      formDataObj.append("email", formData.email)
      formDataObj.append("password", formData.password)

      const result = await signIn(formDataObj)

      if (result.error) {
        setError(result.error)
        if (result.suggestDemo) setSuggestDemo(true)
        toast({ title: "فشل تسجيل الدخول", description: result.error, variant: "destructive" })
      } else {
        if (result.demoAccount) {
          setIsDemoAccount(true)
          toast({ title: "حساب تجريبي", description: "تم تسجيل الدخول بالحساب التجريبي." })
        } else {
          toast({ title: "تم تسجيل الدخول", description: "تم تسجيل دخولك بنجاح." })
        }
        setTimeout(() => router.push("/provider/dashboard"), 1000)
      }
    } catch (error: any) {
      setError(error.message || "حدث خطأ غير متوقع")
      toast({ title: "فشل تسجيل الدخول", description: "حدث خطأ غير متوقع. حاول مرة أخرى.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithDemo = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const formDataObj = new FormData()
      formDataObj.append("email", "demo@nuqta.com")
      formDataObj.append("password", "demo123")

      const result = await signIn(formDataObj)

      if (result.error) {
        setError("فشل تسجيل الدخول التجريبي. حاول مرة أخرى أو استخدم حسابًا عاديًا.")
        toast({ title: "فشل الدخول التجريبي", description: result.error, variant: "destructive" })
      } else {
        setIsDemoAccount(true)
        toast({ title: "حساب تجريبي", description: "تم تسجيل الدخول بالحساب التجريبي." })
        setTimeout(() => router.push("/provider/dashboard"), 1000)
      }
    } catch (error: any) {
      setError(error.message || "حدث خطأ غير متوقع")
      toast({ title: "فشل الدخول التجريبي", description: "حدث خطأ غير متوقع. حاول مرة أخرى.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col rtl">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-md px-4">
          <Card className="border-teal-100 shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
              <CardDescription>يرجى إدخال بيانات الدخول الخاصة بك</CardDescription>
              <div className="mt-4 text-sm text-gray-600">مرحبًا بعودتك إلى منصتنا</div>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>خطأ</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {suggestDemo && (
                <Alert className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>جرب الحساب التجريبي</AlertTitle>
                  <AlertDescription>
                    يمكنك استخدام الحساب التجريبي لتجربة المنصة.
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="text-teal-600" onClick={loginWithDemo}>
                        تسجيل الدخول بالحساب التجريبي
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {isDemoAccount && (
                <Alert className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>حساب تجريبي</AlertTitle>
                  <AlertDescription>
                    تم تسجيل الدخول بحساب تجريبي. هذا الحساب محدود الوظائف.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Link href="/auth/forgot-password" className="text-xs text-teal-600 hover:underline">
                      نسيت كلمة المرور؟
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <Label htmlFor="rememberMe" className="text-sm font-normal">
                    تذكرني
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري تسجيل الدخول...
                    </>
                  ) : (
                    "تسجيل الدخول"
                  )}
                </Button>
              </form>

              <div className="mt-6 flex flex-col items-center gap-4">
                <div className="text-sm text-gray-500">- أو -</div>
                <Button
                  variant="outline"
                  className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
                  onClick={loginWithDemo}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  تسجيل الدخول كمستخدم تجريبي
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-6">
              <div className="text-center text-sm">
                ليس لديك حساب؟{" "}
                <Link href="/auth/register" className="text-teal-600 hover:underline">
                  إنشاء حساب جديد
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
