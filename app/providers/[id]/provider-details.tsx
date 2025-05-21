"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, Star, Clock, Share2, MessageCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import ImageWithFallback from "@/components/image-with-fallback"
import EventCard from "@/components/event-card"
import { validateImageUrl } from "@/lib/utils/image-validator"

interface ProviderDetailsProps {
  provider: any // Using any for simplicity, but should be properly typed
  providerEvents?: any[] // Events hosted by this provider
}

const categoryLabels: Record<string, string> = {
  cleaning: "خدمات التنظيف",
  beauty: "خدمات التجميل",
  food: "خدمات الطعام",
  eventPlanning: "تنظيم الفعاليات",
  maintenance: "خدمات الصيانة",
  photography: "خدمات التصوير",
  education: "خدمات تعليمية",
  health: "خدمات صحية",
  legal: "خدمات قانونية",
  technology: "خدمات تقنية",
  business: "خدمات أعمال",
  other: "خدمات أخرى",
}

// Default fallback images
const DEFAULT_PROFILE_IMAGE = "/provider-abstract.png"
const DEFAULT_COVER_IMAGE = "/community-event.png"
const DEFAULT_GALLERY_IMAGE = "/placeholder.png"

export default function ProviderDetails({ provider, providerEvents = [] }: ProviderDetailsProps) {
  const { toast } = useToast()
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock services data - in a real app, this would come from the API
  const services = [
    {
      id: "1",
      name: "الخدمة الأساسية",
      description: "باقة خدمة أساسية مع الميزات الضرورية",
      price: 100,
      duration: "ساعة واحدة",
    },
    {
      id: "2",
      name: "الخدمة المتميزة",
      description: "خدمة محسنة مع ميزات إضافية ودعم ذو أولوية",
      price: 200,
      duration: "ساعتان",
    },
    {
      id: "3",
      name: "باقة ديلوكس",
      description: "باقة خدمة شاملة مع جميع الميزات المتميزة المضمنة",
      price: 300,
      duration: "3 ساعات",
    },
  ]

  // Mock reviews data with safe image paths
  const reviews = [
    {
      id: "1",
      user: "أحمد ك.",
      rating: 5,
      date: "2023-05-15",
      comment: "خدمة ممتازة! محترفة وفي الوقت المناسب.",
      avatar: "/placeholder-zebzp.png",
    },
    {
      id: "2",
      user: "سارة م.",
      rating: 4,
      date: "2023-04-22",
      comment: "خدمة جيدة بشكل عام. أوصي بها.",
      avatar: "/placeholder-yfza6.png",
    },
    {
      id: "3",
      user: "محمد أ.",
      rating: 5,
      date: "2023-03-10",
      comment: "جودة استثنائية واهتمام بالتفاصيل. سأستخدمها مرة أخرى بالتأكيد!",
      avatar: "/placeholder-5b849.png",
    },
  ]

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: provider.business_name,
          text: provider.description,
          url: window.location.href,
        })
        .then(() => console.log("تمت المشاركة بنجاح"))
        .catch((error) => console.log("خطأ في المشاركة:", error))
    } else {
      setIsShareDialogOpen(true)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط مزود الخدمة إلى الحافظة",
    })
    setIsShareDialogOpen(false)
  }

  // Safe image URLs
  const profileImageUrl = validateImageUrl(provider.profile_image_url, DEFAULT_PROFILE_IMAGE)
  const coverImageUrl = validateImageUrl(provider.cover_image_url, DEFAULT_COVER_IMAGE)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/providers" className="text-teal-600 hover:text-teal-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          العودة إلى مزودي الخدمات
        </Link>
      </div>

      {/* Provider Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 w-full bg-gray-200">
          <ImageWithFallback
            src={coverImageUrl || "/placeholder.svg"}
            alt={`صورة غلاف ${provider.business_name}`}
            fill
            className="object-cover"
            fallbackSrc={DEFAULT_COVER_IMAGE}
          />
        </div>

        {/* Provider Info */}
        <div className="p-6 md:p-8 relative">
          {/* Profile Image - Positioned to overlap the cover image */}
          <div className="absolute -top-16 right-6 md:right-8 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <div className="relative h-24 w-24 md:h-32 md:w-32">
              <ImageWithFallback
                src={profileImageUrl || "/placeholder.svg"}
                alt={provider.business_name}
                fill
                className="object-cover"
                fallbackSrc={DEFAULT_PROFILE_IMAGE}
              />
            </div>
          </div>

          {/* Provider Details */}
          <div className="mt-12 md:mt-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{provider.business_name}</h1>
                <div className="flex items-center mb-4">
                  <Badge className="bg-teal-600 hover:bg-teal-700 ml-2">
                    {categoryLabels[provider.category] || provider.category}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="mr-1 text-sm font-medium">{(provider.avg_rating || 0).toFixed(1)}</span>
                    <span className="mx-1 text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{provider.review_count || 0} تقييمات</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 space-x-reverse mt-4 md:mt-0">
                <Button variant="outline" onClick={handleShare} className="flex items-center">
                  <Share2 className="h-4 w-4 ml-2" />
                  مشاركة
                </Button>

{provider?.phone ? (
  <a
    href={`https://wa.me/${provider.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      `مرحبا ، لقيت ملفك الشخصي على منصة نقطه و حاب استفسر عن خدماتك`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button className="bg-teal-600 hover:bg-teal-700 flex items-center">
    <MessageCircle className="h-4 w-4 ml-2" />
     تواصل
    </Button>
  </a>
) : (
  <p className="text-sm text-red-500 mt-2">لا يوجد رقم تواصل لطلب التسجيل</p>
)}
                {/* <Button className="bg-teal-600 hover:bg-teal-700 flex items-center">
                  <MessageCircle className="h-4 w-4 ml-2" />
                  تواصل
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="services">الخدمات</TabsTrigger>
              <TabsTrigger value="events">الفعاليات</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* About Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">عن المزود</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {provider.description || "لا يوجد وصف متاح لهذا المزود."}
                  </p>
                </CardContent>
              </Card>

              {/* Gallery Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">معرض الصور</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Sample gallery images - would be dynamic in a real app */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="relative aspect-square rounded-md overflow-hidden">
                        <ImageWithFallback
                          src={`/placeholder-${i % 3 === 0 ? "zebzp" : i % 3 === 1 ? "yfza6" : "5b849"}.png`}
                          alt={`صورة معرض ${i}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                          fallbackSrc={DEFAULT_GALLERY_IMAGE}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">ساعات العمل</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>الإثنين - الجمعة</span>
                      <span>9:00 صباحًا - 6:00 مساءً</span>
                    </div>
                    <div className="flex justify-between">
                      <span>السبت</span>
                      <span>10:00 صباحًا - 4:00 مساءً</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الأحد</span>
                      <span>مغلق</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <p className="text-gray-600 mt-1">{service.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4 ml-1" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-end">
                        <div className="text-xl font-bold text-teal-600">{service.price} ليرة تركية</div>
                        <Button className="mt-2 bg-teal-600 hover:bg-teal-700">احجز الآن</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">فعاليات المزود</h2>
                    <Button className="bg-teal-600 hover:bg-teal-700">عرض جميع الفعاليات</Button>
                  </div>

                  {providerEvents && providerEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {providerEvents.map((event) => (
                        <Link key={event.id} href={`/events/${event.id}`}>
                          <EventCard
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            imageUrl={event.image_url}
                            location={event.location_name}
                            category={event.category}
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">لا توجد فعاليات قادمة</h3>
                      <p className="text-gray-600">
                        لا يوجد لدى هذا المزود أي فعاليات قادمة في الوقت الحالي. يرجى التحقق مرة أخرى لاحقًا.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">تقييمات العملاء</h2>
                    <Button className="bg-teal-600 hover:bg-teal-700">كتابة تقييم</Button>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id}>
                        <div className="flex items-start">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden ml-4">
                            <ImageWithFallback
                              src={validateImageUrl(review.avatar, DEFAULT_PROFILE_IMAGE) || "/placeholder.svg"}
                              alt={review.user}
                              fill
                              className="object-cover"
                              fallbackSrc={DEFAULT_PROFILE_IMAGE}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{review.user}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center mt-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                        {review.id !== reviews[reviews.length - 1].id && <Separator className="my-6" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Sidebar */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              {/* Contact Information */}
              <h2 className="text-xl font-semibold mb-4">معلومات الاتصال</h2>
              <div className="space-y-4 mb-6">
                {provider.address && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 ml-2 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{provider.address}</span>
                  </div>
                )}
                {provider.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 ml-2 text-teal-600" />
                    <a href={`tel:${provider.phone}`} className="hover:text-teal-600">
                      {provider.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <Mail className="h-5 w-5 ml-2 text-teal-600" />
                  <a href={`mailto:${provider.email}`} className="hover:text-teal-600">
                    {provider.email}
                  </a>
                </div>
              </div>

              {/* Map */}
              <h3 className="text-lg font-medium mb-2">الموقع</h3>
              <div className="h-48 bg-gray-200 rounded-md overflow-hidden mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.1420999309894!2d28.97698731541928!3d41.03419297929894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2zxLBzdGlrbGFsIENkLiwgQmV5b8SfbHUvxLBzdGFuYnVsLCBUdXJrZXk!5e0!3m2!1sen!2sus!4v1620120000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={`موقع ${provider.business_name}`}
                ></iframe>
              </div>
              <p className="text-sm text-gray-500">{provider.address || "الموقع غير محدد"}</p>

              {/* Call to Action */}
              <div className="mt-6">
                {/* <Button className="w-full bg-teal-600 hover:bg-teal-700">تواصل مع المزود</Button> */}
                {provider?.phone ? (
  <a
    href={`https://wa.me/${provider.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      `مرحبا ، لقيت ملفك الشخصي على منصة نقطه و حاب استفسر عن خدماتك`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button className="w-full bg-teal-600 hover:bg-teal-700">
    <MessageCircle className="h-4 w-4 ml-2" />
    تواصل مع المزود على واتس اب
    </Button>
  </a>
) : (
  <p className="text-sm text-red-500 mt-2">لا يوجد رقم تواصل لطلب التسجيل</p>
)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>مشاركة مزود الخدمة</DialogTitle>
            <DialogDescription>انسخ الرابط أدناه لمشاركة مزود الخدمة هذا</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 space-x-reverse">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={window.location.href}
              readOnly
            />
            <Button onClick={copyToClipboard}>نسخ</Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogTrigger asChild>
              <Button variant="outline">إغلاق</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
