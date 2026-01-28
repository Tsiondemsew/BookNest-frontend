"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { day: "Mon", pages: 45 },
  { day: "Tue", pages: 32 },
  { day: "Wed", pages: 67 },
  { day: "Thu", pages: 28 },
  { day: "Fri", pages: 54 },
  { day: "Sat", pages: 82 },
  { day: "Sun", pages: 61 },
]

export function ReadingActivity() {
  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Reading Activity</h3>
        <select className="text-sm bg-secondary rounded-lg px-3 py-1.5 border-0 outline-none focus:ring-2 focus:ring-ring text-foreground">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{ color: "var(--foreground)" }}
              itemStyle={{ color: "var(--primary)" }}
            />
            <Bar dataKey="pages" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div>
          <span className="text-muted-foreground">Total Pages:</span>
          <span className="ml-2 font-semibold text-foreground">369</span>
        </div>
        <div>
          <span className="text-muted-foreground">Daily Average:</span>
          <span className="ml-2 font-semibold text-foreground">52.7</span>
        </div>
      </div>
    </div>
  )
}
