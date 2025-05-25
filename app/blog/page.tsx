// blog/page.tsx - صفحة عرض جميع المقالات بتصميم متناسق مع الصفحة الرئيسية

import { fetchAllPosts, fetchAllCategories } from "@/lib/utils/data-fetcher";
import BlogCard from "@/components/blog-card";

export default async function BlogListPage() {
  const posts = await fetchAllPosts();
  const categories = (await fetchAllCategories()) as string[];

  return (
    <div className="min-h-screen bg-[#f8fefd] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block mb-2 px-4 py-1 bg-[#e0f7f5] text-teal-700 rounded-full text-sm font-medium">
            مقالات مختارة من إسطنبول
          </span>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">مدونة نقطة</h1>
          <p className="text-base text-gray-600">
            اكتشف نصائح، فعاليات، وتجارب ملهمة تساعدك على التخطيط والنجاح في إسطنبول.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <span
              key={cat}
              className="bg-white text-teal-700 border border-teal-600 px-4 py-1 text-sm rounded-full shadow-sm hover:bg-teal-50 transition cursor-pointer"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
