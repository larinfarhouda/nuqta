"use client"

import { trackEvent } from "@/components/analytics"

export function useAnalytics() {
  const trackPageView = (url: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-BT5RS3V4NK", {
        page_path: url,
      })
    }
  }

  const trackButtonClick = (buttonName: string, pageLocation: string) => {
    trackEvent("click", "button", `${buttonName} - ${pageLocation}`)
  }

  const trackSearch = (searchTerm: string, resultsCount: number) => {
    trackEvent("search", "user_search", searchTerm, resultsCount)
  }

  const trackProviderView = (providerId: string, providerName: string) => {
    trackEvent("view", "provider_profile", `${providerName} (${providerId})`)
  }

  const trackEventView = (eventId: string, eventName: string) => {
    trackEvent("view", "event_details", `${eventName} (${eventId})`)
  }

  const trackSignup = (method: string) => {
    trackEvent("signup", "user", method)
  }

  const trackLogin = (method: string) => {
    trackEvent("login", "user", method)
  }

  return {
    trackPageView,
    trackButtonClick,
    trackSearch,
    trackProviderView,
    trackEventView,
    trackSignup,
    trackLogin,
    trackEvent,
  }
}