"use client"
import { format } from "date-fns"
import { ar, enUS } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  placeholder?: string
  locale?: "ar" | "en"
  className?: string
  id?: string
}

export function DatePicker({
  date,
  setDate,
  placeholder = "اختر تاريخ",
  locale = "ar",
  className,
  id,
}: DatePickerProps) {
  const localeObj = locale === "ar" ? ar : enUS

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn("w-full justify-start text-right", !date && "text-muted-foreground", className)}
        >
          <CalendarIcon className="ml-2 h-4 w-4" />
          {date ? (
            <span dir={locale === "en" ? "ltr" : "rtl"} className={locale === "en" ? "text-left" : "text-right"}>
              {format(date, "PPP", { locale: localeObj })}
            </span>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={localeObj} />
      </PopoverContent>
    </Popover>
  )
}
