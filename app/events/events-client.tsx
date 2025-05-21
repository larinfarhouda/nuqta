"use client"

import { useState } from "react"
import Link from "next/link"
import EventCard from "@/components/event-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DatePicker } from "@/components/date-picker"
import { parseISO, isAfter, isSameDay } from "date-fns"

interface Event {
  id: string
  title: string
  description: string | null
  category: string
  image_url: string | null
  date: string
  location_name: string
  address: string
  price: number | null
}

interface EventsClientProps {
  events?: Event[]
  error?: string
}

// Default placeholder image that's guaranteed to work
const DEFAULT_IMAGE = "/community-event.png"

export default function EventsClient({ events = [], error }: EventsClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)

  // Filter events based on search term, category, and date range
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      event.location_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = category === "all" || event.category === category

    // Date filtering - only check start date
    let matchesDate = true
    if (startDate) {
      const eventDate = parseISO(event.date)
      matchesDate = isSameDay(eventDate, startDate) || isAfter(eventDate, startDate)
    }

    return matchesSearch && matchesCategory && matchesDate
  })

  const clearDateFilters = () => {
    setStartDate(undefined)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">استكشف الفعاليات</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">اكتشف الفعاليات المحلية القادمة وشارك فيها</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search field */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن فعالية..."
              className="pl-3 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category dropdown */}
          <div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="جميع التصنيفات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التصنيفات</SelectItem>
                <SelectItem value="cultural">ثقافي</SelectItem>
                <SelectItem value="business">أعمال</SelectItem>
                <SelectItem value="entertainment">ترفيهي</SelectItem>
                <SelectItem value="education">تعليمي</SelectItem>
                <SelectItem value="sports">رياضي</SelectItem>
                <SelectItem value="technology">تقنية</SelectItem>
                <SelectItem value="health">صحة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date picker with clear button */}
          <div className="relative">
            <DatePicker
              id="start-date"
              date={startDate}
              setDate={setStartDate}
              locale="en"
              placeholder="تاريخ الفعالية"
            />
            {startDate && (
              <button
                onClick={clearDateFilters}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="مسح فلتر التاريخ"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <EventCard
                id={event.id}
                title={event.title}
                date={event.date}
                imageUrl={event.image_url}
                location={event.location_name}
                category={event.category}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج</h3>
          <p className="text-gray-600">
            لم يتم العثور على فعاليات تطابق معايير البحث الخاصة بك. يرجى تجربة كلمات بحث مختلفة أو تصفية أخرى.
          </p>
        </div>
      )}
    </div>
  )
}
