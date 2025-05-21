interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLdString = JSON.stringify(data)

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} suppressHydrationWarning />
  )
}
