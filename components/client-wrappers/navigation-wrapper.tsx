"use client"

import { Suspense, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface RouterProps {
  children: (router: ReturnType<typeof useRouter>) => ReactNode
}

function RouterContent({ children }: RouterProps) {
  const router = useRouter()
  return <>{children(router)}</>
}

export function RouterWrapper({
  children,
  fallback = <div className="p-4 text-center">Loading...</div>,
}: RouterProps & { fallback?: ReactNode }) {
  return (
    <Suspense fallback={fallback}>
      <RouterContent>{children}</RouterContent>
    </Suspense>
  )
}

interface PathnameProps {
  children: (pathname: string) => ReactNode
}

function PathnameContent({ children }: PathnameProps) {
  const pathname = usePathname()
  return <>{children(pathname)}</>
}

export function PathnameWrapper({
  children,
  fallback = <div className="p-4 text-center">Loading...</div>,
}: PathnameProps & { fallback?: ReactNode }) {
  return (
    <Suspense fallback={fallback}>
      <PathnameContent>{children}</PathnameContent>
    </Suspense>
  )
}