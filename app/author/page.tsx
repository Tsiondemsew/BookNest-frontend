"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen,DollarSign,Eye, Star, TrendingUp, Users, ArrowUpRight, Clock } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

const stats = [
  { label: "Total Books", value: "12", change: "+2 this month", icon: BookOpen, trend: "up" },
  { label: "Total Revenue", value: "24,580 ETB", change: "+12.5%", icon:DollarSign, trend: "up" },
  { label: "Total Readers", value: "3,847", change: "+284 this week", icon: Users, trend: "up" },
  { label: "Avg. Rating", value: "4.7", change: "Across all books", icon: Star, trend: "neutral" },
]

const recentActivity = [
  { type: "sale", message: "New sale: The Art of Focus", time: "2 min ago", amount: "140 ETB" },
  { type: "review", message: "New 5-star review on Mindful Living", time: "1 hour ago" },
  { type: "sale", message: "New sale: Digital Minimalism Guide", time: "3 hours ago", amount: "100 ETB" },
  { type: "follower", message: "Sarah M. started following you", time: "5 hours ago" },
  { type: "review", message: "New 4-star review on The Art of Focus", time: "Yesterday" },
]

const topBooks = [
  { title: "The Art of Focus", sales: 1284, revenue: "19,246 ETB", rating: 4.8 },
  { title: "Mindful Living", sales: 892, revenue: "8,027 ETB", rating: 4.6 },
  { title: "Digital Minimalism Guide", sales: 654, revenue: "6,533 ETB", rating: 4.5 },
]


export default function AuthorDashboardPage() {
    const { user } = useAuth() 
  const role = user?.role 
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">{role?.charAt(0).toUpperCase() + role?.slice(1)} Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, here's your publishing overview</p>
        </div>
        <Button asChild>
          <Link href="/author/upload">
            <BookOpen className="mr-2 h-4 w-4" />
            Upload New Book
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                {stat.trend === "up" && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Up
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
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Recent Activity</CardTitle>
            <CardDescription>Latest updates from your books</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div
                    className={`rounded-full p-2 ${
                      activity.type === "sale"
                        ? "bg-green-100"
                        : activity.type === "review"
                          ? "bg-amber-100"
                          : "bg-blue-100"
                    }`}
                  >
                    {activity.type === "sale" ? (
                      <DollarSign className="h-4 w-4 text-green-600" />
                    ) : activity.type === "review" ? (
                      <Star className="h-4 w-4 text-amber-600" />
                    ) : (
                      <Users className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      {activity.amount && (
                        <Badge variant="secondary" className="text-xs">
                          {activity.amount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Books */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif">Top Performing Books</CardTitle>
                <CardDescription>Your best sellers this month</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/author/books">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBooks.map((book, index) => (
                <div key={book.title} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{book.revenue}</p>
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-muted-foreground">{book.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/author/upload">
                <BookOpen className="h-5 w-5" />
                <span>Upload Book</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/author/earnings">
                <DollarSign className="h-5 w-5" />
                <span>View Earnings</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/author/reviews">
                <Star className="h-5 w-5" />
                <span>Manage Reviews</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/author/analytics">
                <Eye className="h-5 w-5" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
