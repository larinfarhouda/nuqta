"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"
import { signUp } from "@/app/auth/actions"
import { getCategories, type Category } from "@/app/auth/category-actions"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [registrationError, setRegistrationError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    businessName: "",
    category: "",
    description: "",
    address: "",
    agreeToTerms: false,
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        toast({
          title: "خطأ في تحميل الفئات",
          description: "حدث خطأ أثناء تحميل فئات الخدمة",
          variant: "destructive",
        })
      }
    }
    fetchCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setRegistrationError(null)

    try {
      if (!formData.category) throw new Error("يرجى اختيار فئة الخدمة")
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, String(value))
      })
      const result = await signUp(formDataObj)

      if (result.error) {
        setRegistrationError(result.error)
        toast({
          title: "فشل التسجيل",
          description: result.error,
          variant: "destructive",
        })
      } else {
        setRegistrationComplete(true)
        toast({
          title: "تم التسجيل بنجاح",
          description: "تم إنشاء حسابك. يمكنك الآن تسجيل الدخول.",
        })
      }
    } catch (error: any) {
      setRegistrationError(error.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.")
      toast({
        title: "فشل التسجيل",
        description: error.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (registrationComplete) {
    return (
      <div className="flex min-h-screen flex-col rtl">
        <main className="flex-1 py-10">
          <div className="container max-w-3xl px-4">
            <Card className="border-green-100 shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-700">تم التسجيل بنجاح!</CardTitle>
                <CardDescription className="text-lg">تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول واستخدام منصتنا.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6 text-gray-600">سيتم إرسال بريد إلكتروني للتحقق. يرجى التحقق من بريدك الإلكتروني وتأكيد الحساب.</p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button onClick={() => router.push("/auth/login")} className="bg-teal-600 hover:bg-teal-700">تسجيل الدخول</Button>
                  <Button variant="outline" onClick={() => router.push("/")}>العودة إلى الصفحة الرئيسية</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col rtl">
      <main className="flex-1 py-10">
        <div className="container max-w-3xl px-4">
          <Card className="border-teal-100 shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
              <CardDescription>يرجى تعبئة البيانات التالية لإنشاء حسابك</CardDescription>
            </CardHeader>
            <CardContent>
              {registrationError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>خطأ في التسجيل</AlertTitle>
                  <AlertDescription>{registrationError}</AlertDescription>
                </Alert>
              )}

              {/* Add the Arabic-only form fields here as needed */}
              {/* This portion can now be filled with hardcoded Arabic labels instead of t() calls */}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
