"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

export interface GoogleAnalyticsProps {
  gaId: string
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!gaId || !window.gtag) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Send pageview with the new URL
    window.gtag("config", gaId, {
      page_path: url,
    })
  }, [pathname, searchParams, gaId])

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

// Custom event tracking function
export function trackEvent(action: string, category: string, label: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Declare global gtag function
declare global {
  interface Window {
    gtag: (command: string, gaId: string, config?: Record<string, any>) => void
  }
}

// Add the default export for Analytics
const Analytics = ({ gaId }: GoogleAnalyticsProps) => {
  return <GoogleAnalytics gaId={gaId} />
}

export default Analytics