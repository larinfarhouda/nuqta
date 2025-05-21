import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface ProviderNotFoundProps {
  id: string
  error?: string | null
}

export default function ProviderNotFound({ id, error }: ProviderNotFoundProps) {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertCircle className="h-6 w-6 ml-2" />
            مزود الخدمة غير موجود
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            عذراً، لم نتمكن من العثور على مزود الخدمة برقم المعرف: <span className="font-bold">{id}</span>
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-600 mt-4">
              <p className="font-medium">تفاصيل الخطأ:</p>
              <p className="mt-1">{error}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 w-full">
            <Link href="/providers">العودة إلى قائمة مزودي الخدمات</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
