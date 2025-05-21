"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ImagePlus, Loader2, X, Plus } from "lucide-react"
import ProviderSidebar from "@/components/provider-sidebar"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"
import DemoAccountBadge from "@/components/demo-account-badge"
import type { Profile } from "@/lib/supabase/database.types"

export default function EditProfilePage() {
  const router = useRouter()
  const supabase = createClient()

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [workImages, setWorkImages] = useState<string[]>([])
  const [workImageFiles, setWorkImageFiles] = useState<File[]>([])
  const [workImagePreviews, setWorkImagePreviews] = useState<string[]>([])

  const profileImageRef = useRef<HTMLInputElement>(null)
  const coverImageRef = useRef<HTMLInputElement>(null)
  const workImageRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    phone: "",
    category: "",
    description: "",
    address: "",
    website: "",
    profileImage: null as File | null,
    coverImage: null as File | null,
  })

  useEffect(() => {
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "ar"
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, coverImage: file }))

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, profileImage: file }))

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleWorkImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles = Array.from(files)
    setWorkImageFiles((prev) => [...prev, ...newFiles])

    const newPreviews: string[] = []

    newFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result as string)
        if (newPreviews.length === newFiles.length) {
          setWorkImagePreviews((prev) => [...prev, ...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })

    if (workImageRef.current) {
      workImageRef.current.value = ""
    }
  }

  const removeWorkImage = (index: number) => {
    if (index < workImages.length) {
      setWorkImages(workImages.filter((_, i) => i !== index))
    } else {
      const newFileIndex = index - workImages.length
      setWorkImageFiles(workImageFiles.filter((_, i) => i !== newFileIndex))
    }
    setWorkImagePreviews(workImagePreviews.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isDemo && <DemoAccountBadge className="mb-4" />}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <ProviderSidebar activeItem="profile" />

        <div className="md:col-span-3">
          <Card className="border-teal-100 shadow-sm">
            <CardHeader>
              <CardTitle>تعديل الملف الشخصي</CardTitle>
              <CardDescription>يمكنك تعديل بياناتك الأساسية والصور الخاصة بك هنا</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={() => {}} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">الصور</h3>

                  <div className="space-y-2">
                    <Label>صورة الغلاف</Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                      ref={coverImageRef}
                      disabled={isDemo}
                    />
                    {coverImagePreview && (
                      <Image src={coverImagePreview} alt="صورة الغلاف" width={400} height={200} className="rounded" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>الصورة الشخصية</Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      ref={profileImageRef}
                      disabled={isDemo}
                    />
                    {profileImagePreview && (
                      <Image src={profileImagePreview} alt="الصورة الشخصية" width={120} height={120} className="rounded-full" />
                    )}
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label>صور من أعمالك</Label>
                    <p className="text-sm text-gray-600 mb-2">ارفع صورًا لأعمالك السابقة لتظهر في ملفك</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleWorkImageChange}
                      ref={workImageRef}
                      disabled={isDemo}
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {workImagePreviews.map((src, index) => (
                        <div key={index} className="relative">
                          <Image src={src} alt={`صورة عمل ${index + 1}`} width={160} height={160} className="rounded border" />
                          <button
                            type="button"
                            onClick={() => removeWorkImage(index)}
                            className="absolute top-1 left-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            disabled={isDemo}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}