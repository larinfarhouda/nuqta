"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchEvents();
  }, [statusFilter]);

  async function fetchEvents() {
    let query = supabase.from("demo_events").select("id, title, date, status");
    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }
    const { data, error } = await query;
    if (!error) setEvents(data || []);
  }

  async function updateStatus(id: string, newStatus: string) {
    await supabase.from("demo_events").update({ status: newStatus }).eq("id", id);
    fetchEvents();
  }

  async function deleteEvent(id: string) {
    await supabase.from("demo_events").delete().eq("id", id);
    fetchEvents();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-right">الفعاليات</h1>
        <Button onClick={() => router.push("/adminlarin73/events/new")} className="bg-teal-600 hover:bg-teal-700 text-white">
          + إضافة فعالية جديدة
        </Button>
      </div>

      {/* الفلاتر */}
      <div className="flex gap-2 flex-wrap justify-end">
        {[
          { key: "all", label: "الكل" },
          { key: "pending", label: "معلقة" },
          { key: "approved", label: "موافقة" },
          { key: "rejected", label: "مرفوضة" },
        ].map(({ key, label }) => (
          <Button
            key={key}
            variant={statusFilter === key ? "default" : "outline"}
            onClick={() => setStatusFilter(key)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* الجدول */}
      <div className="overflow-x-auto bg-white rounded-xl border">
        <table className="min-w-full text-sm text-right">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">الفعالية</th>
              <th className="px-4 py-2">التاريخ</th>
              <th className="px-4 py-2">الحالة</th>
              <th className="px-4 py-2">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t">
                <td className="px-4 py-2">{event.title}</td>
                <td className="px-4 py-2">{new Date(event.date).toLocaleDateString("ar-EG")}</td>
                <td className="px-4 py-2">{event.status}</td>
                <td className="px-4 py-2 space-x-2 space-x-reverse">
                  <Button size="sm" variant="outline" onClick={() => router.push(`/adminlarin73/events/${event.id}/edit`)}>
                    تعديل
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteEvent(event.id)}>
                    حذف
                  </Button>
                  {event.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => updateStatus(event.id, "approved")}
                      >
                        موافقة
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => updateStatus(event.id, "rejected")}
                      >
                        رفض
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  لا توجد فعاليات حالياً.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
