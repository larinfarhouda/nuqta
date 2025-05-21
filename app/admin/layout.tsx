import type { ReactNode } from "react"
import { JsonLd } from "@/components/json-ld"
import { generateSchemaOrgWebsite } from "@/lib/seo/schema"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={generateSchemaOrgWebsite()} />
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          {children}
        </div>
      </div>
    </>
  )
}
