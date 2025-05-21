import { siteConfig } from "./config"

export function generateSchemaOrgWebsite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
    },
    inLanguage: siteConfig.locale,
  }
}

export function generateSchemaOrgOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${siteConfig.logo}`,
      width: 112,
      height: 112,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "Turkey",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@nuqta.com",
    },
    sameAs: [
      "https://twitter.com/nuqtaplatform",
      "https://facebook.com/nuqtaplatform",
      "https://instagram.com/nuqtaplatform",
    ],
  }
}

export function generateSchemaOrgEvent(event: {
  id: string
  title: string
  description?: string | null
  date: string
  location_name: string
  address: string
  image_url?: string | null
  price?: number | null
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description || "",
    startDate: event.date,
    location: {
      "@type": "Place",
      name: event.location_name,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.address,
      },
    },
    image: event.image_url ? `${siteConfig.url}${event.image_url}` : `${siteConfig.url}${siteConfig.ogImage}`,
    offers: event.price
      ? {
          "@type": "Offer",
          price: event.price,
          priceCurrency: "TRY",
          availability: "https://schema.org/InStock",
        }
      : undefined,
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

export function generateSchemaOrgProvider(provider: {
  id: string
  business_name: string
  category: string
  profile_image_url?: string | null
  address?: string | null
  avg_rating?: number | null
  review_count?: number | null
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/providers/${provider.id}`,
    name: provider.business_name,
    image: provider.profile_image_url
      ? `${siteConfig.url}${provider.profile_image_url}`
      : `${siteConfig.url}${siteConfig.ogImage}`,
    address: provider.address
      ? {
          "@type": "PostalAddress",
          streetAddress: provider.address,
        }
      : undefined,
    url: `${siteConfig.url}/providers/${provider.id}`,
    telephone: "",
    priceRange: "$$",
    aggregateRating: provider.avg_rating
      ? {
          "@type": "AggregateRating",
          ratingValue: provider.avg_rating,
          reviewCount: provider.review_count || 0,
        }
      : undefined,
  }
}
