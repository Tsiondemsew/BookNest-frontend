"use client"

import { useState } from "react"
import { BookCard } from "@/components/dashboard/book-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, GridIcon, ListIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const libraryBooks = [
  {
    id: "1",
    title: "መረቅ",
    author: "አዳም ረታ",
    progress: 67,
    hasPdf: true,
    hasAudio: true,
    coverUrl: "/covers/book-1.svg",
  },
  {
    id: "2",
    title: "የስንብት ቀለማት",
    author: "አዳም ረታ",
    progress: 34,
    hasPdf: true,
    hasAudio: false,
    coverUrl: "/covers/book-2.svg",
  },
  {
    id: "3",
    title: "ኦሮማይ",
    author: "ባዕሉ ግርማ",
    progress: 89,
    hasPdf: true,
    hasAudio: true,
    coverUrl: "/covers/book-3.svg",
  },
  {
    id: "4",
    title: "ዙበዳ",
    author: "አሌክስ አብርሃም",
    progress: 100,
    hasPdf: true,
    hasAudio: true,
    rating: 4.7,
    coverUrl: "/covers/book-4.svg",
    price: { pdf: 14.99, audio: 19.99 },
  },
  {
    id: "5",
    title: "ከአምን ባሻገር",
    author: "በውቀቱ ሲዩም",
    progress: 12,
    hasPdf: true,
    hasAudio: false,
    rating: 4.5,
    coverUrl: "/covers/book-5.svg",
    price: { pdf: 12.99 },
  },
  {
    id: "6",
    title: "እሳት ወይ አቤባ",
    author: "ሎሬት ጸጋዬ ገብረመድህን",
    progress: 0,
    hasPdf: true,
    hasAudio: true,
    rating: 4.6,
    coverUrl: "/covers/book-6.svg",
    price: { pdf: 11.99, audio: 16.99 },
  },
]

type FilterType = "all" | "reading" | "completed" | "not-started"

export default function LibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState<FilterType>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBooks = libraryBooks.filter((book) => {
    // Search filter
    if (
      searchQuery &&
      !book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !book.author.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }
    // Status filter
    if (filter === "reading" && (book.progress === 0 || book.progress === 100)) return false
    if (filter === "completed" && book.progress !== 100) return false
    if (filter === "not-started" && book.progress !== 0) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Library</h1>
        <p className="text-muted-foreground mt-1">{libraryBooks.length} books in your collection</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {(["all", "reading", "completed", "not-started"] as FilterType[]).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className={filter !== f ? "bg-transparent" : ""}
            >
              {f === "all" ? "All" : f === "reading" ? "Reading" : f === "completed" ? "Completed" : "Not Started"}
            </Button>
          ))}
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", viewMode === "grid" && "bg-background shadow-sm")}
              onClick={() => setViewMode("grid")}
            >
              <GridIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", viewMode === "list" && "bg-background shadow-sm")}
              onClick={() => setViewMode("list")}
            >
              <ListIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Books Grid/List */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your criteria.</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} {...book} variant="compact" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} {...book} variant="horizontal" />
          ))}
        </div>
      )}
    </div>
  )
}
