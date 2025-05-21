"use client"

import { Suspense, type ReactNode } from "react"
import { useSearchParams } from "next/navigation"

interface SearchParamsProps {
  children: (searchParams: URLSearchParams) => ReactNode
}

function SearchParamsContent({ children }: SearchParamsProps) {
  const searchParams = useSearchParams()
  return <>{children(searchParams)}</>
}

export function SearchParamsWrapper({
  children,
  fallback = <div className="p-4 text-center">Loading...</div>,
}: SearchParamsProps & { fallback?: ReactNode }) {
  return (
    <Suspense fallback={fallback}>
      <SearchParamsContent>{children}</SearchParamsContent>
    </Suspense>
  )
}