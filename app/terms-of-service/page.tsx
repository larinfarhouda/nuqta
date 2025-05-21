"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TermsOfServicePage() {
  useEffect(() => {
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "ar"
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4 py-20">
      <Card className="w-full max-w-3xl text-right shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-700 font-bold mb-4">شروط الاستخدام</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 leading-loose">
          <p>
            باستخدامك لمنصة نقطة، فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءة هذه الشروط بعناية.
          </p>

          <h3 className="text-lg font-semibold text-teal-700">1. استخدام الموقع:</h3>
          <ul className="list-disc pr-6 space-y-2">
            <li>يجب استخدام المنصة فقط للأغراض المشروعة والمتوافقة مع القوانين المحلية.</li>
            <li>يمنع إرسال أو نشر محتوى مسيء أو غير لائق أو احتيالي.</li>
          </ul>

          <h3 className="text-lg font-semibold text-teal-700">2. المحتوى:</h3>
          <ul className="list-disc pr-6 space-y-2">
            <li>تحتفظ نقطة بحق مراجعة أو تعديل أو إزالة أي محتوى مضاف من قبل المستخدمين.</li>
            <li>مقدم الخدمة او الفعاية هو المسؤول عن دقة وصحة المحتوى الذي يقدمه.</li>
          </ul>

          <h3 className="text-lg font-semibold text-teal-700">3. الملكية الفكرية:</h3>
          <p>جميع حقوق الملكية الفكرية المتعلقة بالمنصة ومحتواها مملوكة لنقطة أو لمزودي المحتوى المرخصين.</p>

          <h3 className="text-lg font-semibold text-teal-700">4. التعديلات:</h3>
          <p>تحتفظ نقطة بحق تعديل هذه الشروط في أي وقت. سيتم نشر التحديثات على هذه الصفحة.</p>

          <h3 className="text-lg font-semibold text-teal-700">5. إنهاء الاستخدام:</h3>
          <p>يحق لنا إنهاء أو تعليق وصولك إلى المنصة إذا خالفت هذه الشروط.</p>

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
