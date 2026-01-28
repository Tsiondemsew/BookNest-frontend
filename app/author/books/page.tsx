"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  SearchIcon,
  PlusIcon,
  MoreHorizontalIcon,
  BookIcon,
  HeadphonesIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface AuthorBook {
  id: string
  title: string
  status: "published" | "draft" | "pending"
  formats: ("pdf" | "audio")[]
  sales: number
  revenue: number
  rating?: number
  reviewCount: number
  publishDate?: string
}

const authorBooks: AuthorBook[] = [
  {
    id: "1",
    title: "Atomic Habits",
    status: "published",
    formats: ["pdf", "audio"],
    sales: 2847,
    revenue: 42705,
    rating: 4.8,
    reviewCount: 2847,
    publishDate: "Oct 16, 2018",
  },
  {
    id: "2",
    title: "Clear Thinking (Coming Soon)",
    status: "draft",
    formats: ["pdf"],
    sales: 0,
    revenue: 0,
    reviewCount: 0,
  },
  {
    id: "3",
    title: "The Habits Academy Workbook",
    status: "pending",
    formats: ["pdf"],
    sales: 0,
    revenue: 0,
    reviewCount: 0,
  },
  {
    id: "4",
    title: "Transform Your Habits Guide",
    status: "published",
    formats: ["pdf", "audio"],
    sales: 1234,
    revenue: 18510,
    rating: 4.6,
    reviewCount: 892,
    publishDate: "Mar 5, 2022",
  },
]

const statusColors = {
  published: "bg-success/10 text-success border-success/20",
  draft: "bg-muted text-muted-foreground border-muted",
  pending: "bg-warning/10 text-warning border-warning/20",
}

export default function AuthorBooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "pending">("all")

  const filteredBooks = authorBooks.filter((book) => {
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (statusFilter !== "all" && book.status !== statusFilter) {
      return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Books</h1>
          <p className="text-muted-foreground mt-1">Manage your published and upcoming books</p>
        </div>
        <Link href="/author/upload">
          <Button className="gap-2">
            <PlusIcon className="w-4 h-4" />
            Upload New Book
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search books..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(["all", "published", "draft", "pending"] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={statusFilter !== status ? "bg-transparent" : ""}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Books table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Book</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Formats</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Sales</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Revenue</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Rating</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredBooks.map((book) => (
              <tr key={book.id} className="bg-card hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <BookIcon className="w-6 h-6 text-primary/40" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{book.title}</p>
                      {book.publishDate && (
                        <p className="text-sm text-muted-foreground">Published {book.publishDate}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className={cn("capitalize", statusColors[book.status])}>
                    {book.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {book.formats.includes("pdf") && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                        <BookIcon className="w-3 h-3" />
                        PDF
                      </span>
                    )}
                    {book.formats.includes("audio") && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-xs">
                        <HeadphonesIcon className="w-3 h-3" />
                        Audio
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-medium text-foreground">{book.sales.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-medium text-foreground">${book.revenue.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  {book.rating ? (
                    <div className="flex items-center justify-end gap-1">
                      <span className="font-medium text-foreground">{book.rating}</span>
                      <span className="text-muted-foreground text-sm">({book.reviewCount})</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <EyeIcon className="w-4 h-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <EditIcon className="w-4 h-4" />
                        Edit Book
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <TrashIcon className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
