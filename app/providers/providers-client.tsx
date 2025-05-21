"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, AlertCircle, Loader2, Search } from "lucide-react"
import { validateImageUrl, createImageErrorHandler } from "@/lib/utils/image-validator"

interface Provider {
  id: string
  business_name: string
  full_name?: string | null
  category: string
  profile_image_url: string | null
  address: string | null
  avg_rating: number | null
  review_count: number | null
}

interface ProvidersClientProps {
  providers?: Provider[]
}

export default function ProvidersClient({ providers = [] }: ProvidersClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [minRating, setMinRating] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter providers based on search term, category, and rating
  const filteredProviders = providers.filter((provider) => {
    try {
      const businessName = provider.business_name || ""
      const fullName = provider.full_name || ""
      const displayName = businessName || fullName

      const matchesSearch = displayName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "" || provider.category === selectedCategory
      const matchesRating = !provider.avg_rating || provider.avg_rating >= minRating
      return matchesSearch && matchesCategory && matchesRating
    } catch (err) {
      console.error("Error filtering provider:", err)
      return false
    }
  })

  // Get unique categories from providers
  const categories = Array.from(new Set(providers.map((provider) => provider.category)))

  // Category labels mapping
  const categoryLabels: Record<string, string> = {
    cleaning: "خدمات التنظيف",
    beauty: "خدمات التجميل",
    food: "خدمات الطعام",
    eventPlanning: "تنظيم الفعاليات",
    maintenance: "خدمات الصيانة",
    photography: "خدمات التصوير",
  }

  // Default fallback image
  const defaultImage = "/provider-abstract.png"

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">مزودي الخدمات</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">ابحث عن مزودي الخدمات المحليين المتميزين في مختلف المجالات</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="search"
                type="text"
                placeholder="ابحث عن مزود خدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-10"
              />
            </div>
          </div>

          <div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="جميع التصنيفات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التصنيفات</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {categoryLabels[category] || category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="rating" className="mb-2 block text-sm font-medium">
            الحد الأدنى للتقييم: {minRating}
          </label>
          <Slider
            id="rating"
            min={0}
            max={5}
            step={0.5}
            value={[minRating]}
            onValueChange={(value) => setMinRating(value[0])}
          />
        </div>

        <div className="mt-4 flex justify-end space-x-2 space-x-reverse">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            شبكة
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            قائمة
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : filteredProviders.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">لم يتم العثور على مزودي خدمات</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.map((provider) => (
            <Link href={`/providers/${provider.id}`} key={provider.id}>
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="relative h-48 w-full">
                  <Image
                    src={validateImageUrl(provider.profile_image_url, defaultImage) || "/placeholder.svg"}
                    alt={provider.business_name || provider.full_name || "مزود خدمة"}
                    fill
                    className="object-cover"
                    onError={createImageErrorHandler(provider.profile_image_url, defaultImage)}
                  />
                  <div className="absolute top-3 right-3 bg-teal-600 text-white px-2 py-1 rounded-full text-xs">
                    {categoryLabels[provider.category] || provider.category}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold">
                    {provider.business_name || provider.full_name || "مزود خدمة"}
                  </h3>
                  <div className="mt-2 flex items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="rtl:mr-1 ltr:ml-1 text-sm font-medium">
                        {(provider.avg_rating || 0).toFixed(1)}
                      </span>
                    </div>
                    <span className="mx-1 text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{provider.review_count || 0} تقييمات</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-muted/50">
                      {categoryLabels[provider.category] || provider.category}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/20 p-4">
                  <span className="text-sm font-medium">عرض الملف الشخصي</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProviders.map((provider) => (
            <Link href={`/providers/${provider.id}`} key={provider.id}>
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 md:h-auto md:w-48 flex-shrink-0">
                    <Image
                      src={validateImageUrl(provider.profile_image_url, defaultImage) || "/placeholder.svg"}
                      alt={provider.business_name || provider.full_name || "مزود خدمة"}
                      fill
                      className="object-cover"
                      onError={createImageErrorHandler(provider.profile_image_url, defaultImage)}
                    />
                  </div>
                  <div className="flex flex-col justify-between p-4 flex-grow">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold">
                          {provider.business_name || provider.full_name || "مزود خدمة"}
                        </h3>
                        <Badge variant="outline" className="bg-teal-50 text-teal-700">
                          {categoryLabels[provider.category] || provider.category}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="rtl:mr-1 ltr:ml-1 text-sm font-medium">
                            {(provider.avg_rating || 0).toFixed(1)}
                          </span>
                        </div>
                        <span className="mx-1 text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{provider.review_count || 0} تقييمات</span>
                      </div>
                      <p className="mt-2 text-gray-600 line-clamp-2">{provider.address || "لا يوجد عنوان"}</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button className="bg-teal-600 hover:bg-teal-700">عرض التفاصيل</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
