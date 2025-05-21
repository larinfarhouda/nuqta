import { Suspense } from "react"
import EventsClient from "./events-client"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/seo/config"
import { fetchAllEvents } from "@/lib/utils/data-fetcher"
import { JsonLd } from "@/components/json-ld"
import { generateSchemaOrgWebsite } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: `الفعاليات | ${siteConfig.name}`,
  description: "اكتشف الفعاليات المحلية القادمة وشارك فيها",
}

export default async function EventsPage() {
  const { data: events, error } = await fetchAllEvents()

  return (
    <>
      <JsonLd data={generateSchemaOrgWebsite()} />
      <div className="min-h-screen py-8">
        <Suspense fallback={<div className="container mx-auto px-4 py-8">جاري التحميل...</div>}>
          <EventsClient events={events || []} error={error} />
        </Suspense>
      </div>
    </>
  )
}
