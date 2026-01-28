"use client"

import { StatsCard } from "@/components/dashboard/stats-card"
import { AchievementBadge } from "@/components/dashboard/achievement-badge"
import { BookIcon, FireIcon, ClockIcon, CalendarIcon } from "@/components/icons"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const weeklyData = [
  { day: "Mon", pages: 45, minutes: 35 },
  { day: "Tue", pages: 32, minutes: 25 },
  { day: "Wed", pages: 67, minutes: 52 },
  { day: "Thu", pages: 28, minutes: 22 },
  { day: "Fri", pages: 54, minutes: 42 },
  { day: "Sat", pages: 82, minutes: 65 },
  { day: "Sun", pages: 61, minutes: 48 },
]

const monthlyData = [
  { week: "Week 1", pages: 280 },
  { week: "Week 2", pages: 340 },
  { week: "Week 3", pages: 290 },
  { week: "Week 4", pages: 420 },
]

const genreData = [
  { name: "Self-Help", value: 35, color: "var(--primary)" },
  { name: "Business", value: 25, color: "var(--accent)" },
  { name: "Science", value: 20, color: "var(--chart-3)" },
  { name: "Fiction", value: 15, color: "var(--chart-4)" },
  { name: "Other", value: 5, color: "var(--chart-5)" },
]

const allAchievements = [
  {
    type: "streak" as const,
    title: "7-Day Streak",
    description: "Read every day for a week",
    earned: true,
    earnedDate: "Dec 28, 2024",
  },
  {
    type: "streak" as const,
    title: "30-Day Streak",
    description: "Read every day for a month",
    earned: false,
    progress: 23,
  },
  {
    type: "reader" as const,
    title: "First Book",
    description: "Complete your first book",
    earned: true,
    earnedDate: "Nov 10, 2024",
  },
  {
    type: "reader" as const,
    title: "Bookworm",
    description: "Complete 10 books",
    earned: true,
    earnedDate: "Dec 15, 2024",
  },
  { type: "reader" as const, title: "Scholar", description: "Complete 50 books", earned: false, progress: 24 },
  {
    type: "reviewer" as const,
    title: "First Review",
    description: "Write your first review",
    earned: true,
    earnedDate: "Nov 12, 2024",
  },
  { type: "reviewer" as const, title: "Critic", description: "Write 25 book reviews", earned: false, progress: 60 },
  {
    type: "collector" as const,
    title: "Collector",
    description: "Own 50 books in your library",
    earned: false,
    progress: 72,
  },
]

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reading Progress</h1>
        <p className="text-muted-foreground mt-1">Track your learning journey and achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Books" value="12" subtitle="Completed" icon={<BookIcon className="w-5 h-5" />} />
        <StatsCard title="Current Streak" value="7" subtitle="Days" icon={<FireIcon className="w-5 h-5" />} />
        <StatsCard
          title="Reading Time"
          value="289"
          subtitle="Minutes this week"
          icon={<ClockIcon className="w-5 h-5" />}
        />
        <StatsCard
          title="Best Month"
          value="Dec 2024"
          subtitle="1,330 pages"
          icon={<CalendarIcon className="w-5 h-5" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-6">Weekly Reading Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorPages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="pages"
                  stroke="var(--primary)"
                  fillOpacity={1}
                  fill="url(#colorPages)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Genre Distribution */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-6">Reading by Genre</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {genreData.map((entry, index) => (
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
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {genreData.map((genre) => (
              <div key={genre.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: genre.color }} />
                <span className="text-sm text-muted-foreground">
                  {genre.name} ({genre.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-6">Monthly Progress</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <XAxis
                dataKey="week"
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
                dataKey="pages"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={{ fill: "var(--accent)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">All Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allAchievements.map((achievement, index) => (
            <AchievementBadge key={index} {...achievement} />
          ))}
        </div>
      </div>
    </div>
  )
}
