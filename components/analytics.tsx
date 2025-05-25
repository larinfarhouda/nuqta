"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

export interface GoogleAnalyticsProps {
  gaId: string
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
    useEffect(() => {
      if (typeof window === "undefined" || !window.gtag) return;
  
      const url = window.location.pathname + window.location.search;
  
      window.gtag("config", gaId, {
        page_path: url,
      });
    }, [gaId]);
  
    return (
      <>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname + window.location.search,
              });
            `,
          }}
        />
      </>
    );
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


// "use client"

// import { usePathname, useSearchParams } from "next/navigation"
// import Script from "next/script"
// import { useEffect } from "react"
// import { Suspense } from "react"

// export interface GoogleAnalyticsProps {
//   gaId: string
// }

// function GoogleAnalyticsTracker({ gaId }: { gaId: string }) {
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   useEffect(() => {
//     if (!gaId || !window.gtag) return

//     const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

//     window.gtag("config", gaId, {
//       page_path: url,
//     })
//   }, [pathname, searchParams, gaId])

//   return null
// }

// export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
//   return (
//     <>
//       <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
//       <Script
//         id="google-analytics"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', '${gaId}', {
//               page_path: window.location.pathname,
//             });
//           `,
//         }}
//       />
//       <Suspense fallback={null}>
//         <GoogleAnalyticsTracker gaId={gaId} />
//       </Suspense>
//     </>
//   )
// }

// // Custom event tracking function
// export function trackEvent(action: string, category: string, label: string, value?: number) {
//   if (typeof window !== "undefined" && window.gtag) {
//     window.gtag("event", action, {
//       event_category: category,
//       event_label: label,
//       value: value,
//     })
//   }
// }

// // Declare global gtag function
// declare global {
//   interface Window {
//     gtag: (command: string, gaId: string, config?: Record<string, any>) => void
//   }
// }

// // Add the default export
// const Analytics = ({ gaId }: GoogleAnalyticsProps) => {
//   return <GoogleAnalytics gaId={gaId} />
// }

// export default Analytics
