"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BookCard } from "@/components/dashboard/book-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, GridIcon, ListIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { paymentsAPI } from "@/lib/api"


type FilterType = "all" | "reading" | "completed" | "not-started"

export default function LibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState<FilterType>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const [libraryBooks, setLibraryBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Static book requested to appear in Library
  const staticBook = {
    id: "1",
    title: "እቴሜቴ ሎሚ ሽታ",
    author: "አዳም ረታ",
    progress: 42,
    hasPdf: true,
    hasAudio: false,
    coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRasdVDrRS2ZD7joktTuAHWUyH91ogj16m7Ig&s",
   // pdfUrl: "/እቴሜቴ ሎሚ ሽታ - አዳም ረታ.pdf",
  }

  useEffect(() => {
    let mounted = true
    setLoading(true)
    ;(async () => {
      try {
        const res = await paymentsAPI.getPurchasedBooks(1, 100)
        // Accept variations: res.data.books or res.data or res.books or res
        const items = res?.data?.books || res?.data || res?.books || res || []
        if (!mounted) return
        const mapped = items.map((b: any) => ({
          id: String(b.id),
          title: b.title,
          author: b.authorName || b.author_name || b.author || "Unknown",
          progress: b.progress ?? 0,
          hasPdf: (b.availableFormats || b.formats || []).some((f: any) => String(f.format_type || f).toLowerCase().includes('pdf')),
          hasAudio: (b.availableFormats || b.formats || []).some((f: any) => String(f.format_type || f).toLowerCase().includes('audio')),
          coverUrl: b.coverImageUrl || b.cover || b.cover_image_url || "/placeholder.svg",
          price: b.formats ? (b.formats.find((f: any) => String(f.format_type).toLowerCase().includes('pdf'))?.price ?? null) : null,
          rating: b.averageRating || b.rating || null,
        }))

        // Ensure static book is present (avoid duplicates)
        const exists = mapped.some((mb: any) => mb.id === String(staticBook.id) || mb.title === staticBook.title)
        const final = exists ? mapped : [staticBook, ...mapped]

        setLibraryBooks(final)
      } catch (e) {
        // Ensure static book still shows even if fetch fails
        setLibraryBooks([staticBook])
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

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
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your criteria.</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) =>
            book.id === "1" ? (
              <div key={book.id} className="rounded-xl bg-card border border-border overflow-hidden group">
                <div className="aspect-2/3 bg-muted overflow-hidden">
                  <img src={book.coverUrl || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="mt-2 text-sm font-medium text-foreground truncate">{book.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                  {book.progress !== undefined && (
                    <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${book.progress}%` }} />
                    </div>
                  )}
                  <div className="mt-3">
                    <Link href="/read/1" className="w-full inline-block">
                      <Button className="w-full">Continue</Button>
                    </Link>
                    {/* <a href={book.pdfUrl} className="mt-2 block text-sm text-muted-foreground text-center underline">Open PDF</a>
                  */}
                  </div>
                </div>
              </div>
            ) : (
              <BookCard key={book.id} {...book} variant="compact" />
            ),
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBooks.map((book) =>
            book.id === "1" ? (
              <div key={book.id} className="flex gap-4 p-4 rounded-xl bg-card border border-border group">
                <div className="w-20 h-28 rounded-lg bg-muted overflow-hidden shrink-0">
                  <img src={book.coverUrl || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <div className="mt-3">
                    <Link href="/read/1" className="inline-block">
                      <Button>Continue</Button>
                    </Link>
                    {/* <a href={book.pdfUrl} className="ml-3 text-sm text-muted-foreground underline">Open PDF</a>
                   */}
                   </div>
                </div>
              </div>
            ) : (
              <BookCard key={book.id} {...book} variant="horizontal" />
            ),
          )}
        </div>
      )}
    </div>
  )
}
