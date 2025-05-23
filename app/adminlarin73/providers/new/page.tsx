"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useEffect as reactUseEffect } from "react";

export default function NewProviderPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    business_name: "",
    email: "",
    phone: "",
    category: "",
    description: "",
    address: "",
    website: "",
    is_active: true,
    profile_image: null as File | null,
    cover_image: null as File | null,
  });

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("service_categories").select("name_ar").then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [name]: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === "profile_image") setPreviewProfile(reader.result as string);
        if (name === "cover_image") setPreviewCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    let profile_image_url = "";
    let cover_image_url = "";

    if (formData.profile_image) {
      const file = formData.profile_image;
      const ext = file.name.split(".").pop();
      const path = `providers/profile_${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("provider-images").upload(path, file);
      if (!error) profile_image_url = supabase.storage.from("provider-images").getPublicUrl(path).data.publicUrl;
    }

    if (formData.cover_image) {
      const file = formData.cover_image;
      const ext = file.name.split(".").pop();
      const path = `providers/cover_${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("provider-images").upload(path, file);
      if (!error) cover_image_url = supabase.storage.from("provider-images").getPublicUrl(path).data.publicUrl;
    }

    const result = await supabase.from("demo_profiles").insert({
      full_name: formData.full_name,
      business_name: formData.business_name,
      email: formData.email,
      phone: formData.phone,
      category: formData.category,
      description: formData.description,
      address: formData.address,
      website: formData.website,
      is_active: formData.is_active,
      profile_image_url,
      cover_image_url,
    });

    if (!result.error) {
      router.push("/adminlarin73/providers");
    } else {
      alert("فشل في الإضافة: " + result.error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>إضافة مقدم خدمة</CardTitle>
          <CardDescription>يرجى تعبئة البيانات التالية</CardDescription>
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
            <div className="space-y-2">
              <Label>صورة الملف الشخصي</Label>
              <Input type="file" accept="image/*" onChange={(e) => handleImageChange("profile_image", e)} />
              {previewProfile && <img src={previewProfile} className="w-32 h-32 rounded-full object-cover mt-2" />}
            </div>
            <div className="space-y-2">
              <Label>صورة الغلاف</Label>
              <Input type="file" accept="image/*" onChange={(e) => handleImageChange("cover_image", e)} />
              {previewCover && <img src={previewCover} className="w-full max-h-48 object-cover mt-2 rounded-md" />}
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
              <Label>الحساب مفعل</Label>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "جاري الحفظ..." : "إضافة مقدم الخدمة"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
function useEffect(callback: () => void, dependencies: any[]) {
    reactUseEffect(callback, dependencies);
}

