// BlogCard.tsx
// مكون يعرض كرت مقالة في قسم المدونة

import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    cover_image: string;
    created_at: string;
    category?: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="rounded-xl border shadow-sm overflow-hidden">
      <Link href={`/blog/${post.slug}`}>
        <div>
          <Image
            src={post.cover_image}
            alt={post.title}
            width={600}
            height={300}
            className="object-cover w-full h-48"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            {post.category && <span className="text-xs text-white bg-teal-600 px-2 py-1 rounded-full">{post.category}</span>}
            <p className="text-sm text-gray-500 mt-2">{new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
