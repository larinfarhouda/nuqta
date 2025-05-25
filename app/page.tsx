import { Suspense } from "react"
import type { Metadata } from "next"
import HomeClient from "./home-client"
import { JsonLd } from "@/components/json-ld"
import { generateSchemaOrgWebsite, generateSchemaOrgOrganization } from "@/lib/seo/schema"
import { siteConfig } from "@/lib/seo/config"
import { fetchFeaturedEvents, fetchFeaturedProviders } from "@/lib/utils/data-fetcher"

// Force static generation
export const dynamic = "force-static"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.description,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
    creator: "@nuqtaplatform",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  alternates: {
    canonical: siteConfig.url,
  },
}

export default async function Home() {
  try {
    // Fetch featured events
    const eventsResult = await fetchFeaturedEvents()
    const featuredEvents = eventsResult?.data || []
    const eventsError = eventsResult?.error || null

    // Fetch featured providers
    const providersResult = await fetchFeaturedProviders()
    const featuredProviders = providersResult?.data || []
    const providersError = providersResult?.error || null

    return (
      <>
        <JsonLd data={[generateSchemaOrgWebsite(), generateSchemaOrgOrganization()]} />
        <Suspense fallback={<HomePageSkeleton />}>
          <HomeClient
            featuredEvents={featuredEvents}
            featuredProviders={featuredProviders}
            eventsError={eventsError}
            providersError={providersError}
          />
        </Suspense>
      </>
    )
  } catch (error) {
    console.error("Error in Home component:", error)
    // Fallback to empty data in case of error
    return (
      <>
        <JsonLd data={[generateSchemaOrgWebsite(), generateSchemaOrgOrganization()]} />
        <Suspense fallback={<HomePageSkeleton />}>
          <HomeClient
            featuredEvents={[]}
            featuredProviders={[]}
            eventsError="Error al cargar los datos"
            providersError="Error al cargar los datos"
          />
        </Suspense>
      </>
    )
  }
}

function HomePageSkeleton() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-teal-50 py-20 md:py-28">
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 z-10">
              <div className="h-6 w-40 bg-teal-100 rounded-full mb-6 animate-pulse"></div>
              <div className="h-12 w-full max-w-md bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
              <div className="h-6 w-full max-w-sm bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-12 w-40 bg-teal-200 rounded-xl animate-pulse"></div>
                <div className="h-12 w-40 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
            <div className="md:w-1/2 z-10">
              <div className="relative flex items-center justify-center">
                <div className="h-80 w-80 bg-gray-100 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-full max-w-md bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                  <div className="h-10 w-full bg-teal-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="h-12 w-48 bg-teal-200 rounded-lg mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-full max-w-md bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="h-12 w-48 bg-teal-200 rounded-lg mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
      
    </>
  )
}
