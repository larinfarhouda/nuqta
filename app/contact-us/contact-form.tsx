"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<{
    status: "idle" | "loading" | "success" | "error"
    message: string
  }>({
    status: "idle",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({
        status: "error",
        message: "يرجى ملء جميع الحقول المطلوبة",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        status: "error",
        message: "يرجى إدخال بريد إلكتروني صحيح",
      })
      return
    }

    setFormStatus({
      status: "loading",
      message: "جاري إرسال رسالتك...",
    })

    // Simulate API call
    try {
      // In a real application, you would send the form data to your API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful response
      setFormStatus({
        status: "success",
        message: "تم إرسال رسالتك بنجاح! سنقوم بالرد عليك في أقرب وقت ممكن.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      setFormStatus({
        status: "error",
        message: "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.",
      })
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {formStatus.status === "success" ? (
        <div className="text-center py-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-4">تم إرسال رسالتك بنجاح!</h3>
          <p className="text-gray-700 mb-6">شكرًا لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.</p>
          <Button
            onClick={() => setFormStatus({ status: "idle", message: "" })}
            className="bg-teal-600 hover:bg-teal-700"
          >
            إرسال رسالة أخرى
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {formStatus.status === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formStatus.message}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                الاسم <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </Label>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="أدخل رقم هاتفك"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">
                الموضوع <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.subject} onValueChange={handleSelectChange} required>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="اختر موضوع الرسالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">استفسار عام</SelectItem>
                  <SelectItem value="support">الدعم الفني</SelectItem>
                  <SelectItem value="feedback">اقتراحات وملاحظات</SelectItem>
                  <SelectItem value="partnership">شراكات وتعاون</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              الرسالة <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="اكتب رسالتك هنا..."
              rows={6}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700"
            disabled={formStatus.status === "loading"}
          >
            {formStatus.status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              "إرسال الرسالة"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
