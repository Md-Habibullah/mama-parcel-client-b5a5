import { useEffect, useState } from "react";
import { useGetStatsQuery } from "@/redux/features/parcel/parcel.api";
import type { IParcelStats } from "@/types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["#FFBB28", "#0088FE", "#00C49F", "#FF8042", "#A28FFF"];

export default function AdminDashboardStats() {
  const { data, isLoading, error } = useGetStatsQuery();
  const [stats, setStats] = useState<IParcelStats | null>(null);

  useEffect(() => {
    if (data?.success && data.data) {
      setStats(data.data);
    }
  }, [data]);

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Failed to load stats</div>;
  }

  const chartData = [
    { name: "Pending", value: stats.pendingParcels },
    { name: "In Transit", value: stats.inTransit },
    { name: "Delivered", value: stats.delivered },
    { name: "Canceled", value: stats.canceled },
  ];


  const statCards = [
    { title: "Total Users", value: stats.totalUsers, color: "bg-gradient-to-r from-purple-500 to-indigo-500" },
    { title: "Total Parcels", value: stats.totalParcels, color: "bg-gradient-to-r from-green-400 to-teal-500" },
    { title: "Pending", value: stats.pendingParcels, color: "bg-gradient-to-r from-yellow-400 to-orange-500" },
    { title: "In Transit", value: stats.inTransit, color: "bg-gradient-to-r from-blue-400 to-cyan-500" },
    { title: "Delivered", value: stats.delivered, color: "bg-gradient-to-r from-green-600 to-lime-500" },
    { title: "Canceled", value: stats.canceled, color: "bg-gradient-to-r from-red-500 to-pink-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((card, index) => (
          <Card
            key={index}
            className={`${card.color} text-white shadow-lg transform hover:scale-105 transition-transform duration-300 rounded-xl`}
          >
            <CardContent className="flex flex-col items-center justify-center h-32">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pie Chart */}
      <Card className="w-full shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Parcel Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={5}
                label
              >
                {chartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: 8, color: "#fff" }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
