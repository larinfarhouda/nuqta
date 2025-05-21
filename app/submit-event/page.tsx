

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Calendar, Clock, ImagePlus, Loader2, MapPin } from "lucide-react"
// import ProviderSidebar from "@/components/provider-sidebar"
// import { createEvent } from "@/lib/supabase/events"
// import { toast } from "@/components/ui/use-toast"
// import GoogleMapProvider from "@/components/GoogleMapProvider"


// import { createClient } from "@/lib/supabase/client"

// const supabase = createClient()


// import { Autocomplete } from "@react-google-maps/api"
// import { useRef } from "react"








// export default function CreateEventPage() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [previewImage, setPreviewImage] = useState<string | null>(null)
//   const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

// const handlePlaceChanged = () => {
//   if (autocompleteRef.current) {
//     const place = autocompleteRef.current.getPlace()
//     const name = place.name || ""
//     const address = place.formatted_address || ""

//     setFormData((prev) => ({
//       ...prev,
//       locationName: name,
//       address: address,
//     }))
//   }
// }







//   const [isDemoAccount, setIsDemoAccount] = useState(() => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("demoUser") || document.cookie.includes("using_demo_account=true")
//     }
//     return false
//   })

//   useEffect(() => {
//     document.documentElement.dir = "rtl"
//     document.documentElement.lang = "ar"
//   }, [])

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     date: "",
//     startTime: "",
//     endTime: "",
//     locationName: "",
//     address: "",
//     capacity: "",
//     price: "",
//     isFree: false,
//     image: null as File | null,
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target

//     if (type === "checkbox") {
//       const checkbox = e.target as HTMLInputElement
//       setFormData((prev) => ({
//         ...prev,
//         [name]: checkbox.checked,
//         ...(name === "isFree" && checkbox.checked ? { price: "0" } : {}),
//       }))
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }))
//     }
//   }

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null
//     setFormData((prev) => ({ ...prev, image: file }))

//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string)
//       }
//       reader.readAsDataURL(file)
//     } else {
//       setPreviewImage(null)
//     }
//   }



//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
  
//     try {
//       if (isDemoAccount) {
//         await new Promise((resolve) => setTimeout(resolve, 1000))
//         toast({ title: "تم إنشاء الفعالية", description: "تم إنشاء الفعالية بنجاح." })
//         router.push("/provider/events")
//         return
//       }
  
//       let imageUrl = ""
  
//       // 👇 رفع الصورة إلى Supabase Storage
//       if (formData.image) {
//         const file = formData.image
//         const fileExt = file.name.split(".").pop()
//         const fileName = `${Date.now()}.${fileExt}`
//         const filePath = `events/${fileName}`
  
//         const { error: uploadError } = await supabase.storage
//           .from("event-images") // اسم البكت
//           .upload(filePath, file)
  
//         if (uploadError) {
//           toast({
//             title: "فشل رفع الصورة",
//             description: uploadError.message,
//             variant: "destructive",
//           })
//           setIsLoading(false)
//           return
//         }
  
//         // 👇 استخراج رابط الصورة
//         const { data: publicUrlData } = supabase.storage.from("event-images").getPublicUrl(filePath)
//         imageUrl = publicUrlData.publicUrl
//       }
  
//       // 👇 إعداد البيانات للإرسال كـ object
//       const eventData = {
//         title: formData.title,
//         description: formData.description,
//         category: formData.category,
//         date: formData.date,
//         start_time: formData.startTime, // ✅
//         end_time: formData.endTime,     // ✅
//         location_name: formData.locationName, // ✅
//         address: formData.address,
//         capacity: parseInt(formData.capacity),
//         price: parseFloat(formData.price),
//         is_free: formData.isFree,
//         image_url: imageUrl,
//         provider_id: "11111111-1111-1111-1111-111111111111", 
//         status: "pending",
//       }
      
//       console.log("🚨 eventData to be submitted:", eventData)

//       // 👇 إرسال البيانات لدالة Supabase
//       const result = await createEvent(eventData)
  
//       if (result.error) {
//         toast({
//           title: "فشل إنشاء الفعالية",
//           description: result.error.message,
//           variant: "destructive",
//         })
//       } else {
//         setShowSuccessPopup(true)
//       }
  
//     } catch (error) {
//       console.error("Event creation error:", error)
//       toast({
//         title: "فشل إنشاء الفعالية",
//         description: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }
  

//   return (
//     <GoogleMapProvider>
//     <div className="flex min-h-screen flex-col" dir="rtl">
// <main className="flex-1 min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4 sm:px-6 lg:px-8 py-16">
// <div className="w-full max-w-3xl">

        
// {showSuccessPopup && (
//   <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//     <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm text-center space-y-4 animate-popup transition-all duration-300 ease-out">
//       <h2 className="text-xl font-bold text-teal-700">🎉 تم إرسال الفعالية</h2>
//       <p className="text-sm text-gray-600">
//         سيتم مراجعتها من قبل الإدارة، وفي حال الموافقة سيتم نشرها على المنصة.
//       </p>

//       <div className="space-y-2">
//         <Button
//           className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-md"
//           onClick={() => router.push("/")}
//         >
//           العودة للصفحة الرئيسية
//         </Button>

//         <Button
//           variant="outline"
//           className="w-full"
//           onClick={() => {
//             setShowSuccessPopup(false)
//             setFormData({
//               title: "",
//               description: "",
//               category: "",
//               date: "",
//               startTime: "",
//               endTime: "",
//               locationName: "",
//               address: "",
//               capacity: "",
//               price: "",
//               isFree: false,
//               image: null,
//             })
//             setPreviewImage(null)
//           }}
//         >
//           أضف فعالية أخرى
//         </Button>
//       </div>
//     </div>
//   </div>
// )}


// <div className="w-full flex justify-center">
//   <Card className="w-full max-w-2xl shadow-sm border border-gray-200 rounded-xl bg-white">


//               <CardHeader>
//                 <CardTitle>إنشاء فعالية جديدة</CardTitle>
//                 <CardDescription>يرجى تعبئة النموذج التالي لإنشاء فعالية</CardDescription>
//               </CardHeader>
//               <CardContent>
//   <form onSubmit={handleSubmit} className="space-y-8">
    
//     {/* القسم الأول: معلومات أساسية */}
//     <div className="space-y-4 border-b pb-6">
//       <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//         <Calendar className="w-5 h-5 text-teal-600" />
//         تفاصيل الفعالية
//       </h3>

//       <div className="space-y-2">
//         <Label htmlFor="title">اسم الفعالية</Label>
//         <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="description">وصف الفعالية</Label>
//         <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="category">نوع الفعالية</Label>
//         <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
//           <SelectTrigger id="category" className="bg-gray-50">
//             <SelectValue placeholder="اختر نوع الفعالية" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="workshop">ورشة عمل</SelectItem>
//             <SelectItem value="festival">مهرجان</SelectItem>
//             <SelectItem value="concert">حفلة موسيقية</SelectItem>
//             <SelectItem value="meetup">لقاء</SelectItem>
//             <SelectItem value="networking">تواصل مهني</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>

//     {/* القسم الثاني: التاريخ والوقت */}
//     <div className="space-y-4 border-b pb-6">
//       <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//         <Clock className="w-5 h-5 text-teal-600" />
//         التاريخ والوقت
//       </h3>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="date">تاريخ الفعالية</Label>
//           <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="startTime">وقت البداية</Label>
//           <Input id="startTime" name="startTime" type="time" value={formData.startTime} onChange={handleChange} required />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="endTime">وقت النهاية</Label>
//           <Input id="endTime" name="endTime" type="time" value={formData.endTime} onChange={handleChange} required />
//         </div>
//       </div>
//     </div>

//     {/* القسم الثالث: الموقع */}
//     <div className="space-y-4 border-b pb-6">
//       <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//         <MapPin className="w-5 h-5 text-teal-600" />
//         معلومات الموقع
//       </h3>

//       <Label htmlFor="autocomplete">اختر موقع الفعالية</Label>
// <Autocomplete
//   onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
//   onPlaceChanged={handlePlaceChanged}
//   options={{
//     componentRestrictions: { country: "tr" }
//   }}
// >
//   <Input
//     id="autocomplete"
//     placeholder="ابحث عن الموقع..."
//     className="bg-gray-50"
//   />
// </Autocomplete>


//       <div className="space-y-2">
//         <Label htmlFor="address">العنوان التفصيلي</Label>
//         <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
//       </div>
//     </div>

//     {/* القسم الرابع: السعة والسعر */}
//     <div className="space-y-4 border-b pb-6">
//       <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//         💰 التفاصيل المالية
//       </h3>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="capacity">العدد المسموح</Label>
//           <Input id="capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="price">السعر</Label>
//           <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} disabled={formData.isFree} />
//         </div>

//         <div className="flex items-end gap-2 pt-6">
//           <input id="isFree" name="isFree" type="checkbox" checked={formData.isFree} onChange={handleChange} className="w-5 h-5 mt-1" />
//           <Label htmlFor="isFree" className="text-sm">فعالية مجانية</Label>
//         </div>
//       </div>
//     </div>

//     {/* القسم الخامس: الصورة */}
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//         <ImagePlus className="w-5 h-5 text-teal-600" />
//         صورة الفعالية
//       </h3>

//       <div className="space-y-2">
//         <Label htmlFor="image">ارفع صورة</Label>
//         <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
//         {previewImage && <Image src={previewImage} alt="معاينة" width={200} height={200} className="rounded-md mt-2" />}
//       </div>
//     </div>

//     {/* الأزرار */}
//     <div className="flex justify-end gap-4 pt-4">
//       <Button type="button" variant="outline" onClick={() => router.back()}>
//         إلغاء
//       </Button>
//       <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
//         {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> جارٍ الحفظ...</> : "إنشاء الفعالية"}
//       </Button>
//     </div>
//   </form>
// </CardContent>

//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//     </GoogleMapProvider>
//   )
// }


"use client"

import { useEffect } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa"

export default function SubmitEventContactPage() {
  useEffect(() => {
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "ar"
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4 py-20">
      <Card className="w-full max-w-xl text-center shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-700 font-bold mb-2">إضافة فعالية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700">
          <p>
            لإضافة فعالية جديدة على منصة نقطة، يرجى التواصل معنا عبر أحد وسائل التواصل أدناه، وسنقوم بمراجعة التفاصيل وإضافتها نيابةً عنك.
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

