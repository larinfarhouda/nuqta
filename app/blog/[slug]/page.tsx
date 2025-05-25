// blog/[slug]/page.tsx - صفحة تفاصيل المقال بتصميم متناسق وعصري + مشاركة وروابط مقترحة

import { fetchPostBySlug, fetchAllPosts } from "@/lib/utils/data-fetcher";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug);
  const allPosts = await fetchAllPosts();

  if (!post) return notFound();

interface Post {
    id: string;
    slug: string;
    title: string;
    category: string;
    created_at: string;
    cover_image: string;
    content: string;
}

const relatedPosts: Post[] = allPosts.filter(
    (p: Post) => p.id !== post.id && p.category === post.category
).slice(0, 3);

  const shareUrl = encodeURIComponent(`https://nuqta.sa/blog/${post.slug}`);
  const shareText = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen bg-[#f8fefd] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <span className="inline-block mb-2 px-4 py-1 bg-[#e0f7f5] text-teal-700 rounded-full text-sm font-medium">
            {post.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-800 leading-relaxed mb-4">{post.title}</h1>
          <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
        </div>

        <div className="rounded-xl overflow-hidden mb-8">
          <Image
            src={post.cover_image}
            alt={post.title}
            width={1000}
            height={500}
            className="w-full h-80 object-cover rounded-xl shadow"
          />
        </div>

        <article className="prose prose-lg max-w-none text-gray-800 leading-loose prose-p:mb-6 prose-img:rounded-xl prose-img:shadow">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* مشاركة على وسائل التواصل */}
        <div className="mt-12 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">مشاركة المقال:</h3>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm"
            >
              واتساب
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
            >
              تويتر
            </a>
          </div>
        </div>

        {/* مقالات مقترحة */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-6 text-gray-800">مقالات مشابهة</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <Image
                    src={item.cover_image}
                    alt={item.title}
                    width={600}
                    height={300}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-base font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
