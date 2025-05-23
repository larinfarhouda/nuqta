"use client";

import { useState, useMemo } from "react";
import StatsCard from "@/components/admin/StatsCard";
import EventChartCard from "@/components/admin/Charts/EventChartCard";
import ProviderChartCard from "@/components/admin/Charts/ProviderChartCard";

const chartColor = "#2CA6A4";

type ChartData = { date: string; count: number };

type Props = {
  totalEvents: number;
  pendingEvents: number;
  totalProviders: number;
  dailyData: ChartData[];
  monthlyData: ChartData[];
  providerDailyData: ChartData[];
  providerMonthlyData: ChartData[];
};

export default function DashboardClient({
  totalEvents,
  pendingEvents,
  totalProviders,
  dailyData,
  monthlyData,
  providerDailyData,
  providerMonthlyData,
}: Props) {
  const [view, setView] = useState<"daily" | "monthly">("monthly");
  const [range, setRange] = useState<"all" | "last30" | "thisMonth">("all");

  const labels: Record<typeof range, string> = {
    all: "الكل",
    last30: "آخر 30 يوم",
    thisMonth: "هذا الشهر",
  };

  const filterData = (data: ChartData[]) => {
    if (range === "all") return data;
    const today = new Date();

    return data.filter(({ date }) => {
      const parsed = new Date(date);
      if (isNaN(parsed.getTime())) return false;

      if (range === "last30") {
        const diff = (today.getTime() - parsed.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 30;
      }

      if (range === "thisMonth") {
        return (
          parsed.getMonth() === today.getMonth() &&
          parsed.getFullYear() === today.getFullYear()
        );
      }

      return true;
    });
  };

  const eventData = useMemo(() => {
    const source = view === "daily" ? dailyData : monthlyData;
    return filterData(source);
  }, [view, range, dailyData, monthlyData]);

  const providerData = useMemo(() => {
    const source = view === "daily" ? providerDailyData : providerMonthlyData;
    return filterData(source);
  }, [view, range, providerDailyData, providerMonthlyData]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-right">لوحة التحكم</h1>

      <section>
        <h2 className="text-lg font-semibold mb-2 text-right">📊 الإحصائيات العامة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard title="عدد الفعاليات" value={totalEvents} />
          <StatsCard title="الفعاليات المعلقة" value={pendingEvents} />
          <StatsCard title="عدد مقدمي الخدمات" value={totalProviders} />
        </div>
      </section>

      <section className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setView("monthly")}
            className={`px-3 py-1 rounded-full text-sm ${
              view === "monthly" ? "bg-[#2CA6A4] text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            شهري
          </button>
          <button
            onClick={() => setView("daily")}
            className={`px-3 py-1 rounded-full text-sm ${
              view === "daily" ? "bg-[#2CA6A4] text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            يومي
          </button>
        </div>

        <div className="flex gap-2">
          {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => (
            <button
              key={key}
              onClick={() => setRange(key)}
              className={`px-3 py-1 rounded-full text-sm ${
                range === key ? "bg-[#2CA6A4] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {labels[key]}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EventChartCard data={eventData} title="عدد الفعاليات" color={chartColor} />
          <ProviderChartCard data={providerData} title="عدد مقدمي الخدمات" color={chartColor} />
        </div>
      </section>
    </div>
  );
}
