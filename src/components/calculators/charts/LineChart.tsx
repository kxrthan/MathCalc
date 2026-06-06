"use client";

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

type SeriesConfig = {
  key: string;
  name: string;
  color: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LineChart({ data, series, xAxisKey = "year", title }: { data: any[], series: SeriesConfig[], xAxisKey?: string, title?: string }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-xl bg-muted/20">
        <p className="text-muted-foreground text-sm">No data to display</p>
      </div>
    );
  }

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return String(value);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {title && <h4 className="text-lg font-semibold mb-4 text-center">{title}</h4>}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              tickFormatter={formatYAxis} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />
            <Tooltip
              formatter={(value: number | string) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Number(value))}
              contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
            {series.map((s) => (
              <Line 
                key={s.key}
                type="monotone" 
                dataKey={s.key} 
                name={s.name} 
                stroke={s.color} 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
                animationDuration={1000}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
