"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  Flag,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  UserPlus,
  ShieldAlert,
} from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Line, LineChart, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const stats = [
  { label: "Total Users", value: "12,847", change: "+284 this week", icon: Users, trend: "up" },
  { label: "Total Books", value: "3,256", change: "+42 pending", icon: BookOpen, trend: "neutral" },
  { label: "Pending Reports", value: "18", change: "5 urgent", icon: Flag, trend: "alert" },
  { label: "Revenue", value: "$128,450", change: "+18.5%", icon: DollarSign, trend: "up" },
]

const recentActivity = [
  { type: "user", message: "New author registration: David Kim", time: "5 min ago", status: "pending" },
  { type: "report", message: "Content reported: Inappropriate review", time: "12 min ago", status: "urgent" },
  { type: "book", message: "New book submitted: 'Modern Philosophy'", time: "1 hour ago", status: "review" },
  { type: "user", message: "Account suspended: spam_user123", time: "2 hours ago", status: "resolved" },
  { type: "report", message: "Copyright claim on 'Digital Art Guide'", time: "3 hours ago", status: "investigating" },
]

const weeklyData = [
  { day: "Mon", users: 120, books: 8 },
  { day: "Tue", users: 145, books: 12 },
  { day: "Wed", users: 132, books: 6 },
  { day: "Thu", users: 168, books: 15 },
  { day: "Fri", users: 189, books: 18 },
  { day: "Sat", users: 156, books: 10 },
  { day: "Sun", users: 134, books: 7 },
]

const revenueData = [
  { month: "Jul", revenue: 18500 },
  { month: "Aug", revenue: 21200 },
  { month: "Sep", revenue: 19800 },
  { month: "Oct", revenue: 24500 },
  { month: "Nov", revenue: 28100 },
  { month: "Dec", revenue: 32400 },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and moderation center</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/reports">
              <Flag className="mr-2 h-4 w-4" />
              View Reports
              <Badge variant="destructive" className="ml-2">
                18
              </Badge>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div
                  className={`rounded-lg p-2 ${
                    stat.trend === "up" ? "bg-green-100" : stat.trend === "alert" ? "bg-red-100" : "bg-primary/10"
                  }`}
                >
                  <stat.icon
                    className={`h-5 w-5 ${
                      stat.trend === "up" ? "text-green-600" : stat.trend === "alert" ? "text-red-600" : "text-primary"
                    }`}
                  />
                </div>
                {stat.trend === "up" && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Up
                  </Badge>
                )}
                {stat.trend === "alert" && (
                  <Badge variant="destructive">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Alert
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Weekly Activity</CardTitle>
            <CardDescription>New users and book submissions this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: { label: "New Users", color: "hsl(var(--primary))" },
                books: { label: "Books Submitted", color: "hsl(var(--chart-2))" },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="books" fill="var(--color-books)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Revenue Trend</CardTitle>
            <CardDescription>Platform revenue over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
              }}
              className="h-[250px]"
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif">Recent Activity</CardTitle>
                <CardDescription>Latest platform events</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/activity">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div
                    className={`rounded-full p-2 ${
                      activity.status === "urgent"
                        ? "bg-red-100"
                        : activity.status === "pending"
                          ? "bg-amber-100"
                          : activity.status === "resolved"
                            ? "bg-green-100"
                            : "bg-blue-100"
                    }`}
                  >
                    {activity.type === "user" ? (
                      <UserPlus
                        className={`h-4 w-4 ${activity.status === "resolved" ? "text-green-600" : "text-amber-600"}`}
                      />
                    ) : activity.type === "report" ? (
                      <ShieldAlert
                        className={`h-4 w-4 ${activity.status === "urgent" ? "text-red-600" : "text-blue-600"}`}
                      />
                    ) : (
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      <Badge
                        variant={
                          activity.status === "urgent"
                            ? "destructive"
                            : activity.status === "resolved"
                              ? "outline"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="outline" className="h-auto py-4 justify-start bg-transparent" asChild>
                <Link href="/admin/users">
                  <Users className="mr-3 h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Manage Users</p>
                    <p className="text-xs text-muted-foreground">View and moderate accounts</p>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 justify-start bg-transparent" asChild>
                <Link href="/admin/books">
                  <BookOpen className="mr-3 h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Review Books</p>
                    <p className="text-xs text-muted-foreground">Approve pending submissions</p>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 justify-start bg-transparent" asChild>
                <Link href="/admin/reports">
                  <Flag className="mr-3 h-5 w-5 text-red-500" />
                  <div className="text-left">
                    <p className="font-medium">Handle Reports</p>
                    <p className="text-xs text-muted-foreground">Review flagged content</p>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 justify-start bg-transparent" asChild>
                <Link href="/admin/analytics">
                  <TrendingUp className="mr-3 h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">View Analytics</p>
                    <p className="text-xs text-muted-foreground">Platform statistics</p>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
