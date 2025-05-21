import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function EventDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Event Image Skeleton */}
            <Skeleton className="h-64 md:h-96 w-full" />

            {/* Event Details Skeleton */}
            <div className="p-6">
              <Skeleton className="h-10 w-3/4 mb-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 ml-2" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 ml-2" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 ml-2" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 ml-2" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="mb-6">
                <Skeleton className="h-7 w-40 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div className="mb-6">
                <Skeleton className="h-7 w-32 mb-3" />
                <div className="flex items-center">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="mr-3">
                    <Skeleton className="h-5 w-40 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div>
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-7 w-40 mb-4" />

              <div className="space-y-4 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-10 w-full" />
              </div>

              <Skeleton className="h-12 w-full mb-6" />

              <div className="mt-6">
                <Skeleton className="h-7 w-32 mb-2" />
                <Skeleton className="h-48 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
