"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function GaugeChart({ value, title }: { value: number, title?: string }) {
  // We want to map these to a Pie chart (half doughnut)
  // Total gauge is from 10 to 40 (span = 30) for visualization purposes.
  const minVal = 10;
  const maxVal = 40;
  
  const data = [
    { name: "Underweight", value: 18.5 - 10, color: "hsl(var(--chart-1))" },
    { name: "Normal", value: 25 - 18.5, color: "hsl(var(--chart-2))" },
    { name: "Overweight", value: 30 - 25, color: "hsl(var(--chart-3))" },
    { name: "Obesity", value: 40 - 30, color: "hsl(var(--chart-4))" }
  ];

  // Calculate needle angle
  const clampedValue = Math.min(Math.max(value, minVal), maxVal);
  const percent = (clampedValue - minVal) / (maxVal - minVal);
  const angle = -90 + percent * 180; // -90 is left, 90 is right

  return (
    <div className="w-full flex flex-col items-center relative">
      {title && <h4 className="text-lg font-semibold mb-2 text-center">{title}</h4>}
      <div className="w-full h-56 relative overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="75%"
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Needle Container */}
        <div 
          className="absolute left-1/2 top-[75%] transition-transform duration-1000 ease-out z-0"
          style={{ 
            transform: `rotate(${angle}deg)`,
            transformOrigin: "bottom center",
            width: "12px",
            height: "85px",
            marginTop: "-85px", // move it up so its bottom is at the pivot
            marginLeft: "-6px"  // center horizontally
          }}
        >
          {/* Needle Graphic */}
          <div style={{
            width: 0, height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "85px solid hsl(var(--foreground))"
          }}></div>
        </div>
        
        {/* Pivot Dot */}
        <div className="absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-foreground rounded-full shadow-md z-10 border-2 border-background"></div>
        
        {/* Center Text */}
        <div className="absolute left-1/2 top-[75%] -translate-x-1/2 translate-y-3 text-center">
          <p className="text-3xl font-black text-foreground">{value.toFixed(1)}</p>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]"></div><span className="text-sm font-medium">Underweight</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]"></div><span className="text-sm font-medium">Normal</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-3))]"></div><span className="text-sm font-medium">Overweight</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-4))]"></div><span className="text-sm font-medium">Obesity</span></div>
      </div>
    </div>
  );
}
