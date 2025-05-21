"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "ar"
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4 py-20">
      <Card className="w-full max-w-3xl text-right shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-700 font-bold mb-4">سياسة الخصوصية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 leading-loose">
          <p>
            نحرص في منصة نقطة على حماية خصوصية معلومات مستخدمينا. توضح هذه السياسة كيف نقوم بجمع واستخدام ومشاركة المعلومات التي يتم جمعها من خلال استخدامك لموقعنا.
          </p>

          <h3 className="text-lg font-semibold text-teal-700">المعلومات التي نقوم بجمعها:</h3>
          <ul className="list-disc pr-6 space-y-2">
            <li>معلومات التواصل مثل الاسم، البريد الإلكتروني، ورقم الهاتف عند التواصل معنا أو إرسال نموذج فعالية.</li>
            <li>المعلومات التي يتم جمعها تلقائيًا مثل عنوان IP ونوع الجهاز.</li>
          </ul>

          <h3 className="text-lg font-semibold text-teal-700">كيفية استخدام المعلومات:</h3>
          <ul className="list-disc pr-6 space-y-2">
            <li>للتواصل معك بشأن الفعاليات أو الخدمات التي تقدمها.</li>
            <li>لتحسين تجربة المستخدم وتطوير خدماتنا.</li>
            <li>لإرسال تحديثات أو إشعارات تتعلق بالمنصة.</li>
          </ul>

          <h3 className="text-lg font-semibold text-teal-700">مشاركة المعلومات:</h3>
          <p>لا نقوم ببيع أو مشاركة معلوماتك مع أطراف خارجية إلا في الحالات التالية:</p>
          <ul className="list-disc pr-6 space-y-2">
            <li>بموافقتك الصريحة.</li>
            <li>عند طلب قانوني أو امتثال للوائح القانونية.</li>
          </ul>

          <h3 className="text-lg font-semibold text-teal-700">أمان المعلومات:</h3>
          <p>نتخذ التدابير المناسبة لحماية معلوماتك، ولكننا لا نضمن الأمان المطلق عبر الإنترنت.</p>

          <h3 className="text-lg font-semibold text-teal-700">حقوقك:</h3>
          <p>يحق لك طلب تعديل أو حذف معلوماتك الشخصية عبر التواصل معنا.</p>

          <h3 className="text-lg font-semibold text-teal-700">تحديثات سياسة الخصوصية:</h3>
          <p>قد نقوم بتحديث هذه السياسة من وقت لآخر، وسيتم نشر أي تغييرات على هذه الصفحة.</p>

          <div className="pt-6">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white" asChild>
              <Link href="/">العودة للصفحة الرئيسية</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
