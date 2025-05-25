"use client"

import { Suspense } from "react"
import Navbar from "./navbar"
import { Skeleton } from "@/components/ui/skeleton"

function NavbarSkeleton() {
  return (
    <div className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
          <div className="flex items-center space-x-4 space-x-reverse">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NavbarWrapper() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <Navbar />
    </Suspense>
  )
}