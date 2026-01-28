"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Users, BookOpen, DollarSign, TrendingUp } from "lucide-react"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const userGrowthData = [
  { month: "Jan", users: 8500, authors: 420 },
  { month: "Feb", users: 9200, authors: 480 },
  { month: "Mar", users: 9800, authors: 520 },
  { month: "Apr", users: 10400, authors: 580 },
  { month: "May", users: 11100, authors: 650 },
  { month: "Jun", users: 11800, authors: 720 },
  { month: "Jul", users: 12300, authors: 810 },
  { month: "Aug", users: 12600, authors: 890 },
  { month: "Sep", users: 12800, authors: 960 },
  { month: "Oct", users: 13100, authors: 1050 },
  { month: "Nov", users: 13500, authors: 1150 },
  { month: "Dec", users: 13847, authors: 1246 },
]

const revenueData = [
  { month: "Jan", revenue: 85000 },
  { month: "Feb", revenue: 92000 },
  { month: "Mar", revenue: 88000 },
  { month: "Apr", revenue: 95000 },
  { month: "May", revenue: 102000 },
  { month: "Jun", revenue: 108000 },
  { month: "Jul", revenue: 98000 },
  { month: "Aug", revenue: 112000 },
  { month: "Sep", revenue: 118000 },
  { month: "Oct", revenue: 122000 },
  { month: "Nov", revenue: 128000 },
  { month: "Dec", revenue: 135000 },
]

const categoryData = [
  { name: "Self-Help", value: 35, color: "#2d6a4f" },
  { name: "Technology", value: 25, color: "#40916c" },
  { name: "Business", value: 20, color: "#52b788" },
  { name: "Fiction", value: 12, color: "#74c69d" },
  { name: "Other", value: 8, color: "#95d5b2" },
]

const engagementData = [
  { day: "Mon", pageViews: 45000, sessions: 12000, purchases: 850 },
  { day: "Tue", pageViews: 52000, sessions: 14500, purchases: 920 },
  { day: "Wed", pageViews: 48000, sessions: 13000, purchases: 880 },
  { day: "Thu", pageViews: 55000, sessions: 15200, purchases: 950 },
  { day: "Fri", pageViews: 58000, sessions: 16000, purchases: 1020 },
  { day: "Sat", pageViews: 42000, sessions: 11500, purchases: 780 },
  { day: "Sun", pageViews: 38000, sessions: 10200, purchases: 720 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Platform Analytics</h1>
          <p className="text-muted-foreground mt-1">Comprehensive platform statistics and insights</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="year">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">13,847</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-amber-100 p-2">
                <BookOpen className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+8.2%</span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">3,256</p>
              <p className="text-sm text-muted-foreground">Total Books</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-green-100 p-2">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+18.5%</span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">$1.28M</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-blue-100 p-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+5.3%</span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">$39.32</p>
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">User Growth</CardTitle>
            <CardDescription>Total users and authors over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: { label: "Total Users", color: "hsl(var(--primary))" },
                authors: { label: "Authors", color: "hsl(var(--chart-2))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="var(--color-users)"
                    fill="var(--color-users)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="authors"
                    stroke="var(--color-authors)"
                    fill="var(--color-authors)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Revenue Trend</CardTitle>
            <CardDescription>Monthly platform revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-revenue)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Category Distribution</CardTitle>
            <CardDescription>Books by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Percentage" },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span>{category.name}</span>
                  </div>
                  <span className="font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Engagement */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif">Weekly Engagement</CardTitle>
            <CardDescription>Page views, sessions, and purchases by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                pageViews: { label: "Page Views", color: "hsl(var(--primary))" },
                sessions: { label: "Sessions", color: "hsl(var(--chart-2))" },
                purchases: { label: "Purchases", color: "hsl(var(--chart-3))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="pageViews" fill="var(--color-pageViews)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sessions" fill="var(--color-sessions)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="purchases" fill="var(--color-purchases)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
