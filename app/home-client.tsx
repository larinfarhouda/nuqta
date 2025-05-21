"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ImageWithFallback from "@/components/image-with-fallback"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface HomeClientProps {
  featuredEvents?: any[]
  featuredProviders?: any[]
  eventsError?: string | null
  providersError?: string | null
}

export default function HomeClient({
  featuredEvents = [],
  featuredProviders = [],
  eventsError = null,
  providersError = null,
}: HomeClientProps) {
  const hasErrors = eventsError || providersError

  return (
    <>
      {hasErrors && (
        <div className="container mx-auto px-4 py-4">
          <Alert variant="destructive">
            <AlertDescription>{eventsError || providersError}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-teal-50 py-20 md:py-28">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-[5%] w-64 h-64 rounded-full bg-teal-100/30 blur-3xl"></div>
          <div className="absolute bottom-20 right-[2%] w-72 h-72 rounded-full bg-teal-200/20 blur-3xl"></div>
          <div className="absolute top-1/4 right-[15%] w-6 h-6 rounded-full bg-teal-400/30"></div>
          <div className="absolute top-3/4 left-[20%] w-4 h-4 rounded-full bg-teal-500/40"></div>
          <div className="absolute bottom-1/3 left-[15%] w-8 h-8 rounded-full bg-teal-300/50"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 z-10">
              <div className="inline-block px-4 py-1 rounded-full bg-teal-100 text-teal-800 font-medium text-sm mb-6">
                المنصة العربية الأولى في إسطنبول
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                اكتشف <span className="text-teal-600">الفعاليات والخدمات</span> العربية في إسطنبول
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
              منصة نقطة تخليك دايما في قلب الحدث و توصلك بالي تحتاجة في ثواني. دور، اكتشف، تواصل... وانطلق! 💥              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 rounded-xl px-8 py-6 text-lg" asChild>
                  <Link href="/providers">استكشف الخدمات</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-teal-600 text-teal-600 rounded-xl px-8 py-6 text-lg hover:bg-teal-50" asChild>
                  <Link href="/join-us">انضم كمزود خدمة</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 z-10">
              <div className="relative flex items-center justify-center p-8">
                <ImageWithFallback
                  src="/nuqta_logo_transparent.png"
                  alt="شعار نقطة"
                  width={400}
                  height={400}
                  className="object-contain"
                  priority
                  fallbackSrc="/abstract-logo.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


{/* Events Section */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">فعاليات قادمة</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">اكتشف الفعاليات المحلية القادمة وشارك فيها</p>
    </div>

    {featuredEvents.length === 0 ? (
      <p className="text-center text-gray-500">لا توجد فعاليات حالياً.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="relative h-48">
              <ImageWithFallback
                src={event.image_url || "/event-placeholder.png"}
                alt={event.title}
                fill
                className="object-cover"
                fallbackSrc="/community-event.png"
              />
              <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.category || "فعالية"}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString("ar-EG")}</p>
              <p className="text-gray-600 mb-4">{event.location_name}</p>
              <Button className="w-full bg-teal-600 hover:bg-teal-700" asChild>
                <Link href={`/events/${event.id}`}>عرض التفاصيل</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    )}

    <div className="text-center mt-12">
      <Button size="lg" className="bg-teal-600 hover:bg-teal-700" asChild>
        <Link href="/events">عرض جميع الفعاليات</Link>
      </Button>
    </div>
  </div>
</section>

{/* Providers Section */}
<section className="py-16">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">خدمات مميزة</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        اكتشف مجموعة متنوعة من الخدمات المحلية عالية الجودة
      </p>
    </div>

    {featuredProviders.length === 0 ? (
      <p className="text-center text-gray-500">لا توجد خدمات مميزة حالياً.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProviders.map((provider) => (
          <div key={provider.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="relative h-48">
              <ImageWithFallback
                src={provider.profile_image_url || "/provider-placeholder.png"}
                alt={provider.business_name || provider.full_name || "مزود خدمة"}
                fill
                className="object-cover"
                fallbackSrc="/provider-abstract.png"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{provider.business_name || provider.full_name}</h3>
              <p className="text-gray-600 mb-4">{provider.address}</p>
              <Button variant="outline" className="w-full border-teal-600 text-teal-600" asChild>
                <Link href={`/providers/${provider.id}`}>عرض المزيد</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    )}

    <div className="text-center mt-12">
      <Button size="lg" className="bg-teal-600 hover:bg-teal-700" asChild>
        <Link href="/providers">عرض جميع الخدمات</Link>
      </Button>
    </div>
  </div>
</section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تعمل منصة نقطة</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              خطوات بسيطة للعثور على الخدمات المحلية أو الانضمام كمزود خدمة
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">ابحث</h3>
              <p className="text-gray-600">عن الخدمات أو الفعاليات في منطقتك</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">اختر</h3>
              <p className="text-gray-600">الخدمة أو الفعالية المناسبة لك</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">تواصل</h3>
              <p className="text-gray-600">واحجز أو اطلب الخدمة بكل سهولة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">انضم إلينا كمزود خدمة</h2>
              <p className="text-xl mb-6">وسع أعمالك واصل لعملاء جدد من خلال منصة نقطة</p>
              <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
                <Link href="/join-us">سجل الآن</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <ImageWithFallback
                src="/vibrant-community-gathering.png"
                alt="انضم إلى نقطة"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
                fallbackSrc="/community-event.png"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
