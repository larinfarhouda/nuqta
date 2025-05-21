import type { Metadata } from "next"
import { siteConfig } from "@/lib/seo/config"
import { JsonLd } from "@/components/json-ld"
import { generateSchemaOrgWebsite, generateSchemaOrgOrganization } from "@/lib/seo/schema"
import ContactForm from "./contact-form"

export const metadata: Metadata = {
  title: `اتصل بنا | ${siteConfig.name}`,
  description: "تواصل مع فريق نقطة للاستفسارات والدعم",
}

export default function ContactUsPage() {
  return (
    <>
      <JsonLd data={[generateSchemaOrgWebsite(), generateSchemaOrgOrganization()]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">اتصل بنا</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نحن هنا للإجابة على استفساراتك وتقديم الدعم. لا تتردد في التواصل معنا
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">الهاتف</h3>
              <p className="text-gray-700 mb-2">خدمة العملاء:</p>
              <p className="text-teal-600 font-medium text-lg">+90 212 123 4567</p>
              <p className="text-gray-700 mt-4 mb-2">الدعم الفني:</p>
              <p className="text-teal-600 font-medium text-lg">+90 212 765 4321</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">البريد الإلكتروني</h3>
              <p className="text-gray-700 mb-2">استفسارات عامة:</p>
              <p className="text-teal-600 font-medium text-lg">info@nuqta.com</p>
              <p className="text-gray-700 mt-4 mb-2">الدعم الفني:</p>
              <p className="text-teal-600 font-medium text-lg">support@nuqta.com</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">العنوان</h3>
              <p className="text-gray-700 mb-2">المقر الرئيسي:</p>
              <p className="text-teal-600 font-medium">
                إسطنبول، تركيا
              </p>
              <p className="text-gray-700 mt-4 mb-2">ساعات العمل:</p>
              <p className="text-gray-700">الاثنين - الجمعة: 9:00 - 18:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">أرسل لنا رسالة</h2>
              <p className="text-xl text-gray-600">
                يمكنك إرسال استفسارك أو ملاحظاتك من خلال النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">موقعنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">يمكنك زيارتنا في مقرنا الرئيسي في إسطنبول</p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.1420999309894!2d28.97698731541928!3d41.03419297929894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2zxLBzdGlrbGFsIENkLiwgQmV5b8SfbHUvxLBzdGFuYnVsLCBUdXJrZXk!5e0!3m2!1sen!2sus!4v1620120000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Nuqta Office Location"
            ></iframe>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">الأسئلة الشائعة</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">إجابات على الأسئلة الأكثر شيوعًا</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">كيف يمكنني التسجيل كمزود خدمة؟</h3>
              <p className="text-gray-700">
                يمكنك التسجيل كمزود خدمة من خلال النقر على "انضم كمزود خدمة" في الصفحة الرئيسية أو من خلال زيارة صفحة
                "انضم إلينا" وملء النموذج المطلوب.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">هل يمكنني إلغاء حجز فعالية؟</h3>
              <p className="text-gray-700">
                نعم، يمكنك إلغاء حجز فعالية من خلال الدخول إلى حسابك والذهاب إلى "حجوزاتي" ثم النقر على "إلغاء الحجز".
                يرجى ملاحظة أن سياسات الإلغاء قد تختلف حسب الفعالية.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">كيف يمكنني تقييم مزود خدمة؟</h3>
              <p className="text-gray-700">
                يمكنك تقييم مزود الخدمة بعد الانتهاء من الخدمة من خلال الذهاب إلى صفحة مزود الخدمة والنقر على "إضافة
                تقييم" أو من خلال الرابط الذي سيصلك عبر البريد الإلكتروني.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">هل يمكنني تنظيم فعالية على المنصة؟</h3>
              <p className="text-gray-700">
                نعم، إذا كنت مزود خدمة مسجل، يمكنك إنشاء وتنظيم فعاليات من خلال لوحة التحكم الخاصة بك. إذا لم تكن مزود
                خدمة، يمكنك التسجيل أولاً ثم إنشاء فعاليتك.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
