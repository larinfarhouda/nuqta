import { Calendar, MapPin } from "lucide-react"
import { formatDate } from "@/lib/utils/date-formatter"
import ImageWithFallback from "./image-with-fallback"
import { format, parseISO } from "date-fns"
import { enUS } from "date-fns/locale"

interface EventCardProps {
  id: string
  title: string
  date: string
  imageUrl: string | null
  location: string
  category: string
  showEnglishDate?: boolean
}

const categoryLabels: Record<string, string> = {
  cultural: "ثقافي",
  business: "أعمال",
  entertainment: "ترفيهي",
  education: "تعليمي",
  sports: "رياضي",
  technology: "تقنية",
  health: "صحة",
  other: "أخرى",
}

// Default placeholder image that's guaranteed to work
const DEFAULT_IMAGE = "/community-event.png"

export function EventCard({ id, title, date, imageUrl, location, category, showEnglishDate = false }: EventCardProps) {
  // Format the date in English if showEnglishDate is true
  const formattedDate = showEnglishDate ? format(parseISO(date), "MMM d, yyyy", { locale: enUS }) : formatDate(date)

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48">
        <ImageWithFallback
          src={imageUrl || DEFAULT_IMAGE}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
          fallbackSrc={DEFAULT_IMAGE}
        />
        <div className="absolute top-3 right-3 bg-teal-600 text-white px-2 py-1 rounded-full text-xs">
          {categoryLabels[category] || category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 ml-2 text-teal-600" />
            <span dir={showEnglishDate ? "ltr" : "rtl"} className={showEnglishDate ? "text-left" : "text-right"}>
              {formattedDate}
            </span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 ml-2 text-teal-600" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export as default as well
export default EventCard
