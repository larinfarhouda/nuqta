import { Suspense } from "react"
import ProvidersClient from "./providers-client"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/seo/config"
import { fetchAllProviders } from "@/lib/utils/data-fetcher"
import { JsonLd } from "@/components/json-ld"
import { generateSchemaOrgWebsite } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: `مزودي الخدمات | ${siteConfig.name}`,
  description: "ابحث عن مزودي الخدمات المحليين المتميزين في مختلف المجالات",
}

export default async function ProvidersPage() {
  // Añadir manejo de errores y valores por defecto
  let providers = []
  let error = null

  try {
    const result = await fetchAllProviders()
    if (result) {
      providers = result.data || []
      error = result.error || null
    } else {
      // Si fetchAllProviders devuelve undefined, establecer un error
      error = "Error al cargar los datos de proveedores"
    }
  } catch (e) {
    console.error("Error fetching providers:", e)
    error = "Error inesperado al cargar los proveedores"
  }

  return (
    <>
      <JsonLd data={generateSchemaOrgWebsite()} />
      <div className="min-h-screen py-8">
        <Suspense fallback={<div className="container mx-auto px-4 py-8">جاري التحميل...</div>}>
          <ProvidersClient providers={providers} error={error} />
        </Suspense>
      </div>
    </>
  )
}
