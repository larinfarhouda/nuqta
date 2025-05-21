import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"

// Force static rendering
export const dynamic = "force-static"

export default function AboutUsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">عن نقطة</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">ربط المجتمعات من خلال الخدمات والفعاليات المحلية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">قصتنا</h2>
              <p className="text-gray-700 mb-4">
                تأسست نقطة بمهمة بسيطة: إنشاء منصة تربط مقدمي الخدمات المحليين بأفراد المجتمع الذين يحتاجون إليهم.
              </p>
              <p className="text-gray-700 mb-4">
                لقد أدركنا التحديات التي يواجهها أصحاب الأعمال الصغيرة والمهنيين المستقلين في الوصول إلى جمهورهم المحلي،
                وأردنا بناء حل يسهل عليهم عرض خدماتهم.
              </p>
              <p className="text-gray-700">
                في الوقت نفسه، أردنا إنشاء مساحة موثوقة حيث يمكن لأفراد المجتمع العثور بسهولة على الخدمات التي يحتاجونها
                والتواصل معها، من تنظيف المنازل إلى تخطيط الفعاليات وكل ما بينهما.
              </p>
            </div>
            <div className="order-first md:order-last">
              <Image
                src="/nuqta_logo_transparent.png"
                alt="قصتنا"
                width={500}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">رؤيتنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-teal-800">التواصل</h3>
                <p className="text-gray-700">بناء جسور بين مقدمي الخدمات وأفراد المجتمع لخلق نظام بيئي محلي مزدهر.</p>
              </div>
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-teal-800">الدعم</h3>
                <p className="text-gray-700">
                  تمكين الشركات الصغيرة والمهنيين المستقلين من النمو والنجاح في مجتمعاتهم المحلية.
                </p>
              </div>
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-teal-800">الاحتفال</h3>
                <p className="text-gray-700">
                  تسليط الضوء على تنوع الخدمات والمواهب التي تجعل مجتمعاتنا فريدة ونابضة بالحياة.
                </p>
              </div>
            </div>
          </div>

        

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">انضم إلى مجتمعنا</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              سواء كنت مقدم خدمة تتطلع إلى تنمية عملك أو فرد من المجتمع يبحث عن خدمات محلية عالية الجودة، ندعوك للانضمام
              إلى مجتمع نقطة.
            </p>
            <a
              href="/join-us"
              className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              انضم إلينا اليوم
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
