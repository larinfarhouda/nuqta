// "use client"

// import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import { useCallback, useEffect, useState, type ReactNode } from "react"

// // Define a simplified translation function type
// type TranslationFunction = (key: string) => string

// // Create a simple translation object with English and Arabic translations
// const translations: Record<string, Record<string, string>> = {
//   en: {
//     "auth.register.title": "Register as a Service Provider",
//     "auth.register.subtitle": "Join our community of service providers",
//     "auth.register.welcomeMessage": "Fill in the details below to create your provider account",
//     "auth.register.accountInfo": "Account Information",
//     "auth.register.fullName": "Full Name",
//     "auth.register.fullNamePlaceholder": "Enter your full name",
//     "auth.register.email": "Email Address",
//     "auth.register.emailPlaceholder": "Enter your email address",
//     "auth.register.password": "Password",
//     "auth.register.passwordPlaceholder": "Create a strong password",
//     "auth.register.phone": "Phone Number",
//     "auth.register.phonePlaceholder": "Enter your phone number",
//     "auth.register.businessInfo": "Business Information",
//     "auth.register.businessName": "Business Name",
//     "auth.register.businessNamePlaceholder": "Enter your business name",
//     "auth.register.category": "Category",
//     "auth.register.categoryPlaceholder": "Select a category",
//     "auth.register.description": "Description",
//     "auth.register.descriptionPlaceholder": "Describe your services (min 20 characters)",
//     "auth.register.address": "Address",
//     "auth.register.addressPlaceholder": "Enter your business address",
//     "auth.register.agreeToTerms": "I agree to the",
//     "auth.register.termsLink": "terms and conditions",
//     "auth.register.alreadyHaveAccount": "Already have an account?",
//     "auth.register.loginLink": "Sign in",
//     "auth.register.registerButton": "Create Account",
//     "auth.register.registering": "Creating Account...",
//   },
//   ar: {
//     "auth.register.title": "التسجيل كمزود خدمة",
//     "auth.register.subtitle": "انضم إلى مجتمع مزودي الخدمات لدينا",
//     "auth.register.welcomeMessage": "املأ التفاصيل أدناه لإنشاء حساب مزود الخدمة الخاص بك",
//     "auth.register.accountInfo": "معلومات الحساب",
//     "auth.register.fullName": "الاسم الكامل",
//     "auth.register.fullNamePlaceholder": "أدخل اسمك الكامل",
//     "auth.register.email": "البريد الإلكتروني",
//     "auth.register.emailPlaceholder": "أدخل عنوان بريدك الإلكتروني",
//     "auth.register.password": "كلمة المرور",
//     "auth.register.passwordPlaceholder": "إنشاء كلمة مرور قوية",
//     "auth.register.phone": "رقم الهاتف",
//     "auth.register.phonePlaceholder": "أدخل رقم هاتفك",
//     "auth.register.businessInfo": "معلومات العمل",
//     "auth.register.businessName": "اسم العمل التجاري",
//     "auth.register.businessNamePlaceholder": "أدخل اسم عملك التجاري",
//     "auth.register.category": "الفئة",
//     "auth.register.categoryPlaceholder": "حدد فئة",
//     "auth.register.description": "الوصف",
//     "auth.register.descriptionPlaceholder": "صف خدماتك (20 حرفًا على الأقل)",
//     "auth.register.address": "العنوان",
//     "auth.register.addressPlaceholder": "أدخل عنوان عملك",
//     "auth.register.agreeToTerms": "أوافق على",
//     "auth.register.termsLink": "الشروط والأحكام",
//     "auth.register.alreadyHaveAccount": "هل لديك حساب بالفعل؟",
//     "auth.register.loginLink": "تسجيل الدخول",
//     "auth.register.registerButton": "إنشاء حساب",
//     "auth.register.registering": "جاري إنشاء الحساب...",
//   },
// }

// // Create a simple translation function
// const createTranslator = (locale: string): TranslationFunction => {
//   return (key: string) => {
//     return translations[locale]?.[key] || translations.en[key] || key
//   }
// }

// interface LocaleState {
//   locale: string
//   t: TranslationFunction
//   changeLocale: (newLocale: string) => void
// }

// interface PageWrapperProps {
//   children: (props: { locale: LocaleState; router: ReturnType<typeof useRouter> }) => ReactNode
//   initialLocale?: string
// }

// export function PageWrapper({ children, initialLocale = "en" }: PageWrapperProps) {
//   const [locale, setLocale] = useState(initialLocale)
//   const t = createTranslator(locale)
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   const changeLocale = useCallback(
//     (newLocale: string) => {
//       setLocale(newLocale)
//       // Optional: Update URL to reflect locale change
//       // const params = new URLSearchParams(searchParams.toString())
//       // params.set('locale', newLocale)
//       // router.push(`${pathname}?${params.toString()}`)
//     },
//     [pathname, searchParams],
//   )

//   // Initialize locale from URL or localStorage on mount
//   useEffect(() => {
//     const urlLocale = searchParams.get("locale")
//     const storedLocale = typeof window !== "undefined" ? localStorage.getItem("locale") : null

//     if (urlLocale && (urlLocale === "en" || urlLocale === "ar")) {
//       setLocale(urlLocale)
//     } else if (storedLocale && (storedLocale === "en" || storedLocale === "ar")) {
//       setLocale(storedLocale)
//     }
//   }, [searchParams])

//   // Save locale preference to localStorage when it changes
//   useEffect(() => {
//     localStorage.setItem("locale", locale)
//   }, [locale])

//   const localeState: LocaleState = {
//     locale,
//     t,
//     changeLocale,
//   }

//   return children({ locale: localeState, router })
// }