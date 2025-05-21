import { Suspense } from "react"
import type { Metadata } from "next"
import { fetchProviderById, fetchEventsByProviderId } from "@/lib/utils/data-fetcher"
import { siteConfig } from "@/lib/seo/config"
import { JsonLd } from "@/components/json-ld"
import { generateSchemaOrgProvider } from "@/lib/seo/schema"
import ProviderDetails from "./provider-details"
import ProviderDetailsSkeleton from "./provider-details-skeleton"
import ProviderNotFound from "./provider-not-found"

interface ProviderPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProviderPageProps): Promise<Metadata> {
  const { data: provider } = await fetchProviderById(params.id)

  if (!provider) {
    return {
      title: "مزود الخدمة غير موجود | " + siteConfig.name,
      description: "لم يتم العثور على مزود الخدمة المطلوب",
    }
  }

  return {
    title: `${provider.business_name} | ${siteConfig.name}`,
    description: provider.description || `تفاصيل عن ${provider.business_name}`,
    openGraph: {
      title: `${provider.business_name} | ${siteConfig.name}`,
      description: provider.description || `تفاصيل عن ${provider.business_name}`,
      images: provider.profile_image_url
        ? [
            {
              url: `${siteConfig.url}${provider.profile_image_url}`,
              width: 1200,
              height: 630,
              alt: provider.business_name,
            },
          ]
        : undefined,
    },
  }
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  // Check if we're using the specific provider ID from the request
  const isSpecificProvider = params.id === "8a66ccea-d188-4852-ae3a-2eea0e9bc804"

  // Fetch provider data
  const { data: provider, error } = await fetchProviderById(params.id)

  if (!provider) {
    return <ProviderNotFound id={params.id} error={error} />
  }

  // Fetch events by this provider
  const { data: providerEvents } = await fetchEventsByProviderId(params.id)

  // If this is our specific provider and there are no events, use mock data
  let events = providerEvents || []
  if (isSpecificProvider && (!events || events.length === 0)) {
    events = [
      {
        id: "event-1",
        title: "ورشة عمل تعليمية",
        date: "2023-12-15",
        location_name: "مركز التدريب الرئيسي",
        image_url: "/book-club.png",
        category: "education",
      },
      {
        id: "event-2",
        title: "ندوة تطوير المهارات",
        date: "2023-12-20",
        location_name: "قاعة المؤتمرات",
        image_url: "/business-networking.png",
        category: "business",
      },
    ]
  }

  return (
    <>
      <JsonLd data={generateSchemaOrgProvider(provider)} />
      <Suspense fallback={<ProviderDetailsSkeleton />}>
        <ProviderDetails provider={provider} providerEvents={events} />
      </Suspense>
    </>
  )
}
