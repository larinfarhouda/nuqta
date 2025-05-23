import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./dashboard-client";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const [
    { count: totalEvents },
    { count: pendingEvents },
    { count: totalProviders },
    { data: events },
    { data: providers },
  ] = await Promise.all([
    supabase.from("demo_events").select("*", { count: "exact", head: true }),
    supabase.from("demo_events").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("demo_profiles").select("*", { count: "exact", head: true }),
    supabase.from("demo_events").select("date"),
    supabase.from("demo_profiles").select("created_at"),
  ]);

  function groupBy(data: any[], keyFn: (date: Date) => string) {
    return data.reduce((acc, e) => {
      const raw = e.date || e.created_at;
      if (!raw) return acc;
      const date = new Date(raw);
      if (isNaN(date.getTime())) return acc;
      const key = keyFn(date);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  // فعاليات
  const dailyGrouped = groupBy(events || [], (d) => d.toISOString().slice(0, 10));
  const dailyData = Object.entries(dailyGrouped).map(([date, count]) => ({ date, count: count as number }));

  const monthlyGrouped = groupBy(events || [], (d) =>
    d.toLocaleString("ar-EG", { month: "short", year: "numeric" })
  );
  const monthlyData = Object.entries(monthlyGrouped).map(([date, count]) => ({ date, count: count as number }));

  // مقدمو الخدمات
  const providerDailyGrouped = groupBy(providers || [], (d) => d.toISOString().slice(0, 10));
  const providerDailyData = Object.entries(providerDailyGrouped).map(([date, count]) => ({ date, count: count as number }));

  const providerMonthlyGrouped = groupBy(providers || [], (d) =>
    d.toLocaleString("ar-EG", { month: "short", year: "numeric" })
  );
  const providerMonthlyData = Object.entries(providerMonthlyGrouped).map(([date, count]) => ({ date, count: count as number }));

  return (
    <DashboardClient
      totalEvents={totalEvents || 0}
      pendingEvents={pendingEvents || 0}
      totalProviders={totalProviders || 0}
      dailyData={dailyData}
      monthlyData={monthlyData}
      providerDailyData={providerDailyData}
      providerMonthlyData={providerMonthlyData}
    />
  );
}
