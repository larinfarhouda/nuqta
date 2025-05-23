// components/adminlarin73/StatsCard.tsx
type StatsCardProps = {
    title: string;
    value: number;
  };
  
  export default function StatsCard({ title, value }: StatsCardProps) {
    return (
      <div className="bg-white rounded-xl shadow p-4 text-right border border-gray-200">
        <h2 className="text-sm text-gray-500">{title}</h2>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
    );
  }
  