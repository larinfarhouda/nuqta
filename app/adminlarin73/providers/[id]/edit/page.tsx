"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function EditProviderPage() {
  const supabase = createClient();
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProvider();
    supabase.from("service_categories").select("name_ar").then(({ data }) => data && setCategories(data));
  }, [id]);

  async function fetchProvider() {
    const { data } = await supabase.from("demo_profiles").select("*").eq("id", id).single();
    if (data) setFormData({ ...data });
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("demo_profiles").update(formData).eq("id", id);
    setLoading(false);
    if (!error) router.push("/adminlarin73/providers");
  };

  if (!formData) return <p className="text-center py-10">جاري تحميل البيانات...</p>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>تعديل مقدم الخدمة</CardTitle>
          <CardDescription>قم بتعديل البيانات التالية</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>الاسم الكامل</Label>
              <Input name="full_name" value={formData.full_name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label>اسم النشاط</Label>
              <Input name="business_name" value={formData.business_name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>البريد الإلكتروني</Label>
              <Input name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label>رقم الجوال</Label>
              <Input name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>الفئة</Label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">اختر الفئة</option>
                {categories.map((c: any, i: number) => (
                  <option key={i} value={c.name_ar}>{c.name_ar}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>الوصف</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>العنوان</Label>
              <Input name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>الموقع الإلكتروني</Label>
              <Input name="website" value={formData.website} onChange={handleChange} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
              <Label>الحساب مفعل</Label>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
