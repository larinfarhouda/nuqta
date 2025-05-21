import Link from "next/link"
import Image from "next/image"

interface ProviderCardProps {
  id: string
  name: string
  profession: string
  rating: number
  reviewCount: number
  description: string
  imageUrl: string
  isFeatured?: boolean
  categories?: string[]
}

export default function ProviderCard({
  id,
  name,
  profession,
  rating,
  reviewCount,
  description,
  imageUrl,
  isFeatured = false,
  categories = [],
}: ProviderCardProps) {
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${isFeatured ? "border-2 border-primary" : ""}`}
    >
      <div className="relative h-48">
        <Image src={imageUrl || "/abstract-profile.png"} alt={name} fill className="object-cover" />
        {isFeatured && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <div className="ml-auto flex items-center">
            <div className="flex text-yellow-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>
        <p className="text-primary font-medium mb-2">{profession}</p>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
        <Link href={`/providers/${id}`} className="text-primary font-medium hover:text-primary-dark transition-colors">
          View Profile →
        </Link>
      </div>
    </div>
  )
}
