import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

// Default fallback image
const DEFAULT_IMAGE = "/provider-abstract.png"

export default function ProviderDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Provider Header Skeleton */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {/* Cover Image Skeleton */}
        <Skeleton className="h-48 md:h-64 w-full" />

        {/* Provider Info Skeleton */}
        <div className="p-6 md:p-8 relative">
          {/* Profile Image Skeleton */}
          <div className="absolute -top-16 right-6 md:right-8 rounded-full border-4 border-white overflow-hidden">
            <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full" />
          </div>

          {/* Provider Details Skeleton */}
          <div className="mt-12 md:mt-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <Skeleton className="h-10 w-64 mb-2" />
                <div className="flex items-center mb-4">
                  <Skeleton className="h-6 w-24 ml-2" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>

              <div className="flex space-x-2 space-x-reverse mt-4 md:mt-0">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <Skeleton className="h-10 w-full" />
          </div>

          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-7 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          <div className="mt-8">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-7 w-32 mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="aspect-square rounded-md" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div>
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-7 w-48 mb-4" />

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 ml-2" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 ml-2" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 ml-2" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>

              <Skeleton className="h-7 w-32 mb-2" />
              <Skeleton className="h-48 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />

              <div className="mt-6">
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
