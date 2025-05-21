import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface DemoAccountBadgeProps {
  className?: string
}

export default function DemoAccountBadge({ className = "" }: DemoAccountBadgeProps) {
  return (
    <Alert variant="default" className={`bg-blue-50 border-blue-200 ${className}`}>
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-800 font-bold">حساب تجريبي</AlertTitle>
      <AlertDescription className="text-blue-700">
        أنت تستخدم حساباً تجريبياً. بعض الوظائف قد تكون محدودة.
      </AlertDescription>
    </Alert>
  )
}