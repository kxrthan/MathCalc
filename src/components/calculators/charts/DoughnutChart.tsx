"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

type DataItem = {
  name: string;
  value: number;
  color: string;
};

export default function DoughnutChart({ data, title }: { data: DataItem[], title?: string }) {
  // Filter out zero values to avoid tiny slices
  const validData = data.filter(d => d.value > 0);

  if (validData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-xl bg-muted/20">
        <p className="text-muted-foreground text-sm">No data to display</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {title && <h4 className="text-lg font-semibold mb-4 text-center">{title}</h4>}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={validData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={800}
            >
              {validData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number | string | readonly (string | number)[] | undefined) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(Number(Array.isArray(value) ? value[0] : value || 0))}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
