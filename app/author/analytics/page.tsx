"use client"

import { StatsCard } from "@/components/dashboard/stats-card"
import { BookIcon, DollarIcon, EyeIcon, StarIcon } from "@/components/icons"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const salesData = [
  { month: "Jul", sales: 120, revenue: 1800 },
  { month: "Aug", sales: 180, revenue: 2700 },
  { month: "Sep", sales: 240, revenue: 3600 },
  { month: "Oct", sales: 320, revenue: 4800 },
  { month: "Nov", sales: 280, revenue: 4200 },
  { month: "Dec", sales: 420, revenue: 6300 },
]

const bookPerformance = [
  { name: "Atomic Habits", sales: 2847, revenue: 42705 },
  { name: "Transform Your Habits", sales: 1234, revenue: 18510 },
]

const readerEngagement = [
  { day: "Mon", readers: 450 },
  { day: "Tue", readers: 380 },
  { day: "Wed", readers: 520 },
  { day: "Thu", readers: 410 },
  { day: "Fri", readers: 490 },
  { day: "Sat", readers: 680 },
  { day: "Sun", readers: 590 },
]

const formatDistribution = [
  { name: "PDF", value: 65, color: "var(--primary)" },
  { name: "Audiobook", value: 35, color: "var(--accent)" },
]

export default function AuthorAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Track your book performance and reader engagement</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Sales"
          value="4,081"
          subtitle="All time"
          icon={<BookIcon className="w-5 h-5" />}
          trend={{ value: 23, isPositive: true }}
        />
        <StatsCard
          title="Total Revenue"
          value="$61,215"
          subtitle="All time"
          icon={<DollarIcon className="w-5 h-5" />}
          trend={{ value: 18, isPositive: true }}
        />
        <StatsCard
          title="Active Readers"
          value="3,520"
          subtitle="This month"
          icon={<EyeIcon className="w-5 h-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Average Rating"
          value="4.7"
          subtitle="Across all books"
          icon={<StarIcon filled className="w-5 h-5" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales trend */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-6">Sales Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
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
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--primary)"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by book */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-6">Revenue by Book</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookPerformance} layout="vertical">
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="var(--primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* More charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reader engagement */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-6">Daily Reader Activity</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readerEngagement}>
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
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="readers"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  dot={{ fill: "var(--accent)", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Format distribution */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-6">Sales by Format</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={formatDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {formatDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {formatDistribution.map((format) => (
              <div key={format.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: format.color }} />
                <span className="text-sm text-muted-foreground">
                  {format.name} ({format.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent reviews */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-6">Recent Reviews</h3>
        <div className="space-y-4">
          {[
            {
              book: "Atomic Habits",
              reader: "Michael T.",
              rating: 5,
              comment: "Life-changing book! The 1% improvement concept has transformed my daily routine.",
              date: "2 hours ago",
            },
            {
              book: "Transform Your Habits",
              reader: "Sarah W.",
              rating: 4,
              comment: "Great practical workbook. Would love more examples for specific scenarios.",
              date: "5 hours ago",
            },
            {
              book: "Atomic Habits",
              reader: "David C.",
              rating: 5,
              comment: "The audiobook narration is excellent. Very engaging and easy to follow.",
              date: "1 day ago",
            },
          ].map((review, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-foreground">{review.reader}</span>
                    <span className="mx-2 text-muted-foreground">on</span>
                    <span className="text-primary">{review.book}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        filled={i < review.rating}
                        className={`w-4 h-4 ${i < review.rating ? "text-accent" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-foreground">{review.comment}</p>
                <p className="mt-2 text-sm text-muted-foreground">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
