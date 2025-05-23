"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function ProvidersPage() {
  const supabase = createClient();
  const router = useRouter();
  const [providers, setProviders] = useState<any[]>([]);

  useEffect(() => {
    fetchProviders();
  }, []);

  async function fetchProviders() {
    const { data, error } = await supabase.from("demo_profiles").select("id, full_name, email, is_active");
    if (!error) setProviders(data || []);
  }

  async function toggleStatus(id: string, current: boolean) {
    await supabase.from("demo_profiles").update({ is_active: !current }).eq("id", id);
    fetchProviders();
  }

  async function deleteProvider(id: string) {
    const confirmDelete = window.confirm("هل تريد حذف مقدم الخدمة؟");
    if (!confirmDelete) return;
    await supabase.from("demo_profiles").delete().eq("id", id);
    fetchProviders();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-right">مقدمو الخدمات</h1>
        <Button onClick={() => router.push("/adminlarin73/providers/new")} className="bg-teal-600 text-white">
          + إضافة مقدم خدمة
        </Button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border">
        <table className="min-w-full text-sm text-right">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">الاسم</th>
              <th className="px-4 py-2">الإيميل</th>
              <th className="px-4 py-2">الحالة</th>
              <th className="px-4 py-2">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id} className="border-t">
                <td className="px-4 py-2">{provider.full_name}</td>
                <td className="px-4 py-2">{provider.email}</td>
                <td className="px-4 py-2">{provider.is_active ? "نشط" : "موقوف"}</td>
                <td className="px-4 py-2 space-x-2 space-x-reverse">
                  <Button size="sm" variant="outline" onClick={() => router.push(`/adminlarin73/providers/${provider.id}/edit`)}>
                    تعديل
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteProvider(provider.id)}>
                    حذف
                  </Button>
                  <Button size="sm" onClick={() => toggleStatus(provider.id, provider.is_active)}>
                    {provider.is_active ? "إيقاف" : "تفعيل"}
                  </Button>
                </td>
              </tr>
            ))}
            {providers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  لا يوجد مقدمو خدمات حاليًا.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}