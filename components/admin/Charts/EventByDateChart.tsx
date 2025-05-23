import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

type Props = {
  data: { date: string; count: number }[];
  title?: string;
};

export default function EventByDateChart({ data, title }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl border text-right space-y-4">
      <h2 className="text-lg font-semibold">{title || "عدد الفعاليات"}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ec4899" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
