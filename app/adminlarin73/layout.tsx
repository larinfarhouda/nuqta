// // app/adminlarin73/layout.tsx

// import type { ReactNode } from "react";
// import AdminLayout from "@/components/admin/adminlarin73Layout";

// export default function AdminSectionLayout({ children }: { children: ReactNode }) {
//   return <AdminLayout>{children}</adminlarin73Layout>;
// }

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar"; // غيري المسار حسب ما عندك

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // إذا ما في جلسة => رجعي المستخدم لصفحة تسجيل الدخول
  if (!session) {
    redirect("/adminlarin73/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-right">
      <Sidebar />
      <main className="flex-1 p-6 overflow-x-hidden">{children}</main>
    </div>
  );
}
