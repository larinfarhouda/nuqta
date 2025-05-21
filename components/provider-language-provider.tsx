"use client"

import { useEffect, createContext, useContext, type ReactNode } from "react"
import { useLocale } from "@/app/i18n/client"

// Arabic translations for the provider dashboard
export const arabicTranslations = {
  dashboard: {
    overview: "نظرة عامة",
    events: "الفعاليات",
    reviews: "التقييمات",
    totalEvents: "إجمالي الفعاليات",
    upcomingEvents: "الفعاليات القادمة",
    upcomingEventsDesc: "الفعاليات المقبلة المجدولة",
    averageRating: "متوسط التقييم",
    totalReviews: "إجمالي التقييمات",
    yourEvents: "فعالياتك",
    yourReviews: "تقييماتك",
    noUpcomingEvents: "لا توجد فعاليات قادمة",
    noEvents: "لم تقم بإنشاء أي فعاليات بعد",
    noReviews: "لم تتلق أي تقييمات بعد",
    viewAllEvents: "عرض جميع الفعاليات",
    viewAllReviews: "عرض جميع التقييمات",
    recentReviews: "أحدث التقييمات",
    recentReviewsDesc: "آخر التقييمات من العملاء",
    editProfile: "تعديل الملف الشخصي",
    addEvent: "إضافة فعالية",
    createFirstEvent: "إنشاء أول فعالية",
    manageEvent: "إدارة الفعالية",
    capacity: "سعة",
  },
  sidebar: {
    dashboard: "لوحة التحكم",
    profile: "الملف الشخصي",
    events: "الفعاليات",
    reviews: "التقييمات",
    messages: "الرسائل",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
  },
  profile: {
    editProfile: "تعديل الملف الشخصي",
    editProfileDesc: "قم بتحديث معلومات ملفك الشخصي وصورك",
    images: "الصور",
    coverImage: "صورة الغلاف",
    uploadCoverImage: "رفع صورة الغلاف",
    coverImageDesc: "يوصى بصورة بأبعاد 1200×400 بكسل",
    profileImage: "الصورة الشخصية",
    uploadProfileImage: "رفع صورة",
    profileImageDesc: "يوصى بصورة مربعة بأبعاد 300×300 بكسل",
    workImages: "صور الأعمال",
    workImagesDesc: "أضف صور لأعمالك السابقة لعرضها للعملاء",
    addWorkImage: "إضافة صورة",
    workImagesLimit: "يمكنك إضافة حتى 10 صور",
    basicInfo: "المعلومات الأساسية",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "أدخل اسمك الكامل",
    businessName: "اسم النشاط التجاري",
    businessNamePlaceholder: "أدخل اسم نشاطك التجاري",
    phone: "رقم الهاتف",
    phonePlaceholder: "أدخل رقم هاتفك",
    category: "الفئة",
    categoryPlaceholder: "اختر فئة خدمتك",
    description: "الوصف",
    descriptionPlaceholder: "اكتب وصفاً لخدماتك",
    contactInfo: "معلومات الاتصال",
    address: "العنوان",
    addressPlaceholder: "أدخل عنوانك",
    website: "الموقع الإلكتروني",
    websitePlaceholder: "أدخل رابط موقعك الإلكتروني",
    cancel: "إلغاء",
    saving: "جاري الحفظ...",
    saveChanges: "حفظ التغييرات",
    about: "نبذة عن",
    noDescription: "لا يوجد وصف",
    noAddress: "لا يوجد عنوان",
    email: "البريد الإلكتروني",
    noPhone: "لا يوجد رقم هاتف",
    loading: "جاري التحميل...",
    validationRequired: "هذا الحقل مطلوب",
    validationEmail: "يرجى إدخال بريد إلكتروني صحيح",
    validationPhone: "يرجى إدخال رقم هاتف صحيح",
    validationUrl: "يرجى إدخال رابط صحيح",
    uploadFailed: "فشل في تحميل الصورة",
    updateSuccess: "تم تحديث الملف الشخصي بنجاح",
    updateFailed: "فشل في تحديث الملف الشخصي",
    demoRestriction: "لا يمكن تحديث الملف الشخصي في الحساب التجريبي",
  },
  events: {
    title: "الفعاليات",
    addEvent: "إضافة فعالية",
    createTitle: "إنشاء فعالية جديدة",
    createDescription: "أضف تفاصيل الفعالية الجديدة",
    basicInfo: "المعلومات الأساسية",
    title: "العنوان",
    titlePlaceholder: "أدخل عنوان الفعالية",
    description: "الوصف",
    descriptionPlaceholder: "اكتب وصفاً للفعالية",
    category: "الفئة",
    categoryPlaceholder: "اختر فئة الفعالية",
    image: "صورة الفعالية",
    imageRequirements: "يوصى بصورة بأبعاد 800×600 بكسل",
    uploadImage: "رفع صورة",
    dateAndTime: "التاريخ والوقت",
    date: "التاريخ",
    startTime: "وقت البدء",
    endTime: "وقت الانتهاء",
    locationInfo: "معلومات الموقع",
    locationName: "اسم الموقع",
    locationNamePlaceholder: "أدخل اسم موقع الفعالية",
    address: "العنوان",
    addressPlaceholder: "أدخل عنوان الفعالية",
    additionalInfo: "معلومات إضافية",
    capacity: "السعة",
    capacityPlaceholder: "أدخل عدد المشاركين المسموح به",
    price: "السعر",
    pricePlaceholder: "أدخل سعر التذكرة",
    isFree: "الفعالية مجانية",
    cancel: "إلغاء",
    creating: "جاري الإنشاء...",
    createEvent: "إنشاء الفعالية",
    upcomingEvents: "الفعاليات القادمة",
    pastEvents: "الفعاليات السابقة",
    noEvents: "لم تقم بإنشاء أي فعاليات بعد",
    noUpcomingEvents: "ليس لديك فعاليات قادمة",
    createFirstEvent: "إنشاء أول فعالية",
    view: "عرض",
    edit: "تعديل",
    delete: "حذف",
    confirmDelete: "هل أنت متأكد من رغبتك في حذف هذه الفعالية؟",
  },
  reviews: {
    title: "التقييمات",
    noReviews: "لم تتلق أي تقييمات بعد",
    rating: "التقييم",
    date: "التاريخ",
    comment: "التعليق",
    noComment: "لا يوجد تعليق",
    user: "المستخدم",
  },
  common: {
    loading: "جاري التحميل...",
    reviews: "تقييمات",
    noComment: "لا يوجد تعليق",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    view: "عرض",
    search: "بحث",
    filter: "تصفية",
    all: "الكل",
    active: "نشط",
    inactive: "غير نشط",
    success: "تم بنجاح",
    error: "خطأ",
    warning: "تحذير",
    info: "معلومات",
  },
  toast: {
    signedOut: "تم تسجيل الخروج",
    signedOutDesc: "تم تسجيل خروجك بنجاح",
    error: "خطأ",
    errorDesc: "حدث خطأ ما",
    success: "تم بنجاح",
    successDesc: "تمت العملية بنجاح",
  },
  serviceCard: {
    photography: "التصوير",
    beauty: "التجميل",
    food: "الطعام",
    eventPlanning: "تنظيم الفعاليات",
    cleaning: "التنظيف",
    maintenance: "الصيانة",
  },
}

// Create context for Arabic translations
const ProviderLanguageContext = createContext<{
  t: (key: string) => string
}>({
  t: (key) => key,
})

export const useProviderTranslation = () => useContext(ProviderLanguageContext)

export function ProviderLanguageProvider({ children }: { children: ReactNode }) {
  const { locale, changeLocale } = useLocale()

  // Force Arabic locale
  useEffect(() => {
    if (locale !== "ar") {
      changeLocale("ar")
      // Force RTL direction
      document.documentElement.dir = "rtl"
      document.documentElement.lang = "ar"
    }
  }, [locale, changeLocale])

  // Translations helper
  const t = (key: string) => {
    const keys = key.split(".")
    let result = arabicTranslations as any

    for (const k of keys) {
      if (result && result[k]) {
        result = result[k]
      } else {
        return key // Fallback to key if translation not found
      }
    }

    return result
  }

  return <ProviderLanguageContext.Provider value={{ t }}>{children}</ProviderLanguageContext.Provider>
}