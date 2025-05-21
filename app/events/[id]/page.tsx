import { Suspense } from "react"
import type { Metadata } from "next"
import { fetchEventById } from "@/lib/utils/data-fetcher"
import { siteConfig } from "@/lib/seo/config"
import { JsonLd } from "@/components/json-ld"
import { generateSchemaOrgEvent } from "@/lib/seo/schema"
import EventDetails from "./event-details"
import EventDetailsSkeleton from "./event-details-skeleton"
import EventNotFound from "./event-not-found"

// Import the mock data for fallback
import { mockEvents } from "../mock-data"

interface EventPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { data: event } = await fetchEventById(params.id)

  if (!event) {
    return {
      title: "فعالية غير موجودة | " + siteConfig.name,
      description: "لم يتم العثور على الفعالية المطلوبة",
    }
  }

  return {
    title: `${event.title} | ${siteConfig.name}`,
    description: event.description || `تفاصيل فعالية ${event.title}`,
    openGraph: {
      title: `${event.title} | ${siteConfig.name}`,
      description: event.description || `تفاصيل فعالية ${event.title}`,
      images: event.image_url
        ? [
            {
              url: `${siteConfig.url}${event.image_url}`,
              width: 1200,
              height: 630,
              alt: event.title,
            },
          ]
        : undefined,
    },
  }
}

// In the EventPage component, add fallback to mock data
export default async function EventPage({ params }: EventPageProps) {
  const { data: eventData, error } = await fetchEventById(params.id)

  // Use the fetched data if available, otherwise try to find a matching mock event
  let event = eventData

  // If no event was found in the database, try to find it in mock data
  if (!event) {
    const mockEventMatch = mockEvents.find((e) => e.id === params.id)
    if (mockEventMatch) {
      event = mockEventMatch
    }
  }

  // If still no event found, show the not found component
  if (!event) {
    return <EventNotFound id={params.id} error={error} />
  }

  // Validar y normalizar fechas para asegurar formato inglés estándar
  if (!event.date || typeof event.date !== "string") {
    event.date = new Date().toISOString().split("T")[0] // Formato YYYY-MM-DD
  } else if (!/^\d{4}-\d{2}-\d{2}/.test(event.date)) {
    // Intentar convertir la fecha a formato ISO si no está en formato estándar
    try {
      const parsedDate = new Date(event.date)
      if (!Number.isNaN(parsedDate.getTime())) {
        event.date = parsedDate.toISOString().split("T")[0]
      } else {
        event.date = new Date().toISOString().split("T")[0]
      }
    } catch (e) {
      console.error("Error parsing date:", e)
      event.date = new Date().toISOString().split("T")[0]
    }
  }

  // Normalizar los campos de tiempo para asegurar formato ISO completo
  if (event.start_time) {
    if (!event.start_time.includes("T")) {
      // Si solo es una hora (HH:MM), convertirla a formato ISO completo
      if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(event.start_time)) {
        // Asegurarnos de que event.date sea solo la parte de la fecha (YYYY-MM-DD)
        const datePart = event.date.split("T")[0]
        event.start_time = `${datePart}T${event.start_time.padStart(8, "0")}`
      } else {
        try {
          const parsedTime = new Date(event.start_time)
          if (!Number.isNaN(parsedTime.getTime())) {
            event.start_time = parsedTime.toISOString()
          } else {
            // Asegurarnos de que event.date sea solo la parte de la fecha
            const datePart = event.date.split("T")[0]
            event.start_time = `${datePart}T12:00:00`
          }
        } catch (e) {
          console.error("Error parsing start_time:", e)
          // Asegurarnos de que event.date sea solo la parte de la fecha
          const datePart = event.date.split("T")[0]
          event.start_time = `${datePart}T12:00:00`
        }
      }
    }
  }

  if (event.end_time) {
    if (!event.end_time.includes("T")) {
      // Si solo es una hora (HH:MM), convertirla a formato ISO completo
      if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(event.end_time)) {
        // Asegurarnos de que event.date sea solo la parte de la fecha (YYYY-MM-DD)
        const datePart = event.date.split("T")[0]
        event.end_time = `${datePart}T${event.end_time.padStart(8, "0")}`
      } else {
        try {
          const parsedTime = new Date(event.end_time)
          if (!Number.isNaN(parsedTime.getTime())) {
            event.end_time = parsedTime.toISOString()
          } else {
            // Asegurarnos de que event.date sea solo la parte de la fecha
            const datePart = event.date.split("T")[0]
            event.end_time = `${datePart}T14:00:00`
          }
        } catch (e) {
          console.error("Error parsing end_time:", e)
          // Asegurarnos de que event.date sea solo la parte de la fecha
          const datePart = event.date.split("T")[0]
          event.end_time = `${datePart}T14:00:00`
        }
      }
    }
  }

  return (
    <>
      <JsonLd data={generateSchemaOrgEvent(event)} />
      <Suspense fallback={<EventDetailsSkeleton />}>
        <EventDetails event={event} />
      </Suspense>
    </>
  )
}
