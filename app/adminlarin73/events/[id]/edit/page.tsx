"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Autocomplete } from "@react-google-maps/api";
import GoogleMapProvider from "@/components/GoogleMapProvider";

export default function EditEventPage() {
  const router = useRouter();
  const supabase = createClient();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (!params?.id) return;
    fetchEvent();
    supabase.from("demo_profiles").select("id, full_name").then(({ data }) => data && setProviders(data));
    supabase.from("event_categories").select("id, name_ar").then(({ data }) => data && setCategories(data));
  }, [params?.id]);

  async function fetchEvent() {
    const { data, error } = await supabase.from("demo_events").select("*").eq("id", params.id).single();
    if (!error && data) {
      setFormData({ ...data, image: null });
      setPreviewImage(data.image_url);
    }
  }

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      setFormData((prev: any) => ({
        ...prev,
        location_name: place.name || "",
        address: place.formatted_address || "",
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "is_free" && checked ? { price: "0" } : {}),
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev: any) => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let image_url = formData.image_url;
    if (formData.image) {
      const file = formData.image;
      const ext = file.name.split(".").pop();
      const filePath = `events/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("event-images").upload(filePath, file);
      if (uploadError) {
        toast({ title: "فشل رفع الصورة", description: uploadError.message, variant: "destructive" });
        setLoading(false);
        return;
      }
      const { data } = supabase.storage.from("event-images").getPublicUrl(filePath);
      image_url = data.publicUrl;
    }

    const updatedEvent = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      date: formData.date,
      start_time: formData.start_time,
      end_time: formData.end_time,
      location_name: formData.location_name,
      address: formData.address,
      capacity: parseInt(formData.capacity),
      price: parseFloat(formData.price),
      is_free: formData.is_free,
      image_url,
      provider_id: formData.provider_id,
      status: formData.status,
    };

    const { error } = await supabase.from("demo_events").update(updatedEvent).eq("id", params.id);
    if (error) {
      toast({ title: "فشل تحديث الفعالية", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تم تحديث الفعالية بنجاح" });
      router.push("/adminlarin73/events");
    }
    setLoading(false);
  };

  if (!formData) {
    return <p className="text-center py-10">جاري تحميل البيانات...</p>;
  }

  return (
    <GoogleMapProvider>
      <div className="max-w-2xl mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>تعديل الفعالية</CardTitle>
            <CardDescription>يرجى تعديل البيانات أدناه</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>اسم الفعالية</Label>
                <Input name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>الوصف</Label>
                <Textarea name="description" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>الفئة</Label>
                <Select onValueChange={(value) => handleSelectChange("category", value)} value={formData.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent className="max-h-52 overflow-y-auto">
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.nameـar}>{c.name_ar}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>مقدم الخدمة</Label>
                <Select onValueChange={(value) => handleSelectChange("provider_id", value)} value={formData.provider_id}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مقدم الخدمة" />
                  </SelectTrigger>
                  <SelectContent className="max-h-52 overflow-y-auto">
                    {providers.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.full_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>تاريخ الفعالية</Label>
                  <Input name="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div>
                  <Label>وقت البداية</Label>
                  <Input name="start_time" type="time" value={formData.start_time} onChange={handleChange} />
                </div>
                <div>
                  <Label>وقت النهاية</Label>
                  <Input name="end_time" type="time" value={formData.end_time} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>اختيار الموقع</Label>
                <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceChanged}>
                  <Input placeholder="ابحث عن الموقع..." className="bg-gray-50" />
                </Autocomplete>
              </div>
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>السعة</Label>
                  <Input name="capacity" type="number" value={formData.capacity} onChange={handleChange} />
                </div>
                <div>
                  <Label>السعر</Label>
                  <Input name="price" type="number" value={formData.price} onChange={handleChange} disabled={formData.is_free} />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" name="is_free" checked={formData.is_free} onChange={handleChange} />
                <Label>فعالية مجانية</Label>
              </div>
              
<div className="space-y-2">
  <Label>الحالة</Label>
  <Select onValueChange={(value) => handleSelectChange("status", value)} value={formData.status}>
    <SelectTrigger>
      <SelectValue placeholder="اختر الحالة" />
    </SelectTrigger>
    <SelectContent className="max-h-52 overflow-y-auto">
      <SelectItem value="pending">معلقة</SelectItem>
      <SelectItem value="approved">موافقة</SelectItem>
      <SelectItem value="rejected">مرفوضة</SelectItem>
    </SelectContent>
  </Select>
</div>
<div className="space-y-2">
  <Label>صورة الفعالية</Label>
  <Input type="file" onChange={handleImageChange} accept="image/*" />
       {previewImage && <Image src={previewImage} alt="معاينة" width={300} height={200} className="rounded-md" />}        
</div>
              <div className="flex items-center justify-between gap-4">
  <Button type="submit" disabled={loading}>
    {loading ? "جاري التحديث..." : "تحديث الفعالية"}
  </Button>

  <Button
    variant="destructive"
    onClick={async () => {
      const confirmDelete = window.confirm("هل أنت متأكد من حذف هذه الفعالية؟ لا يمكن التراجع عن هذا الإجراء.");
      if (!confirmDelete) return;
      const { error } = await supabase.from("demo_events").delete().eq("id", params.id);
      if (error) {
        toast({ title: "فشل الحذف", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "تم حذف الفعالية بنجاح" });
        router.push("/adminlarin73/events");
      }
    }}
  >
    حذف الفعالية
  </Button>
</div>
</form>

          </CardContent>
        </Card>
      </div>
    </GoogleMapProvider>
  );
}
