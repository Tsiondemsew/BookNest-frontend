"use client"

import { useEffect, useState } from "react"
import { BookCard } from "@/components/dashboard/book-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, ChevronDownIcon, GridIcon, ListIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { booksAPI } from "@/lib/api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

// categories and languages will be loaded from the API
const [fallbackCategories] = [
  "All Categories",
]

const staticLanguages = ["All Languages", "English", "Amharic", "French", "Spanish"]

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
]


export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("") // empty -> all
  const [selectedLanguage, setSelectedLanguage] = useState<string>("") // empty -> all
  const [sortBy, setSortBy] = useState("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const [books, setBooks] = useState<Array<any>>([])
  const [booksLoading, setBooksLoading] = useState(false)
  const [booksError, setBooksError] = useState<string | null>(null)
  const [categoriesList, setCategoriesList] = useState<Array<{id:string,name:string}>>([])
  const [languagesList, setLanguagesList] = useState<string[]>(staticLanguages)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalBooks, setTotalBooks] = useState(0)

  const fetchBooks = async () => {
    setBooksLoading(true)
    setBooksError(null)

    try {
      const sortMap: any = {
        popular: 'popular',
        newest: 'newest',
        rating: 'highest_rated',
        'price-low': 'price_low_high',
        'price-high': 'price_high_low',
      }

      const params: any = { page, limit: 20, sortBy: sortMap[sortBy] || 'newest' }
      if (searchQuery) params.query = searchQuery
      if (selectedCategoryId) params.categoryId = selectedCategoryId
      if (selectedLanguage) params.language = selectedLanguage

      const res = await booksAPI.search(params)

      // Expect { success:true, data: { books: [], pagination: {} } }
      const respBooks = res?.data?.books || res?.books || []
      const pagination = res?.data?.pagination || null

      setBooks(
        respBooks.map((b: any) => ({
          id: b.id,
          title: b.title,
          author: b.authorName || b.author_name || b.author || "Unknown",
          coverUrl: b.coverImageUrl || b.cover_image_url || b.cover || null,
          rating: b.averageRating || b.rating || null,
          hasPdf: (b.availableFormats || b.formats || []).some((f: any) => String(f.format_type || f).toLowerCase().includes('pdf')),
          hasAudio: (b.availableFormats || b.formats || []).some((f: any) => String(f.format_type || f).toLowerCase().includes('audio')),
          price: {
            pdf: b.formats ? (b.formats.find((f: any) => String(f.format_type).toLowerCase().includes('pdf'))?.price ?? null) : (b.priceRange?.min ?? null),
            audio: b.formats ? (b.formats.find((f: any) => String(f.format_type).toLowerCase().includes('audio'))?.price ?? null) : null,
          },
        }))
      )

      if (pagination) {
        setTotalBooks(pagination.total || 0)
        setTotalPages(pagination.totalPages || 1)
      } else {
        setTotalBooks(respBooks.length)
        setTotalPages(1)
      }
    } catch (err: any) {
      setBooksError(err?.message || 'Failed to load books')
      setBooks([])
    } finally {
      setBooksLoading(false)
    }
  }

  const fetchFilters = async () => {
    try {
      const c = await booksAPI.getCategories()
      const cats = Array.isArray(c) ? c : (c?.data || [])
      setCategoriesList(cats.map((x: any) => ({ id: String(x.id), name: x.name || x.title || x.value || String(x.id) })))

      const langs = await booksAPI.getLanguages()
      const ll = Array.isArray(langs) ? langs : (langs?.data || [])
      setLanguagesList(['All Languages', ...(ll || [])])
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    void fetchFilters()
  }, [])

  useEffect(() => {
    void fetchBooks()
  }, [page, sortBy, selectedCategoryId, selectedLanguage, searchQuery])

  // Reset to first page when filters or search change
  useEffect(() => {
    setPage(1)
  }, [sortBy, selectedCategoryId, selectedLanguage, searchQuery])

  const filteredBooks = books.filter((book) => {
    // local search/filter fallback if backend not used
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase()) && !book.author.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Browse Books</h1>
        <p className="text-muted-foreground mt-2">Discover your next great read from our curated collection</p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by title, author, or keyword..."
            className="pl-11 h-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter toggles */}
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 gap-2 bg-transparent">
                {selectedCategoryId ? (categoriesList.find(c => c.id === selectedCategoryId)?.name || 'Category') : 'All Categories'}
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                key="all"
                onClick={() => setSelectedCategoryId("")}
                className={!selectedCategoryId ? "bg-accent" : ""}
              >
                All Categories
              </DropdownMenuItem>
              {categoriesList.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={selectedCategoryId === category.id ? "bg-accent" : ""}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 gap-2 bg-transparent">
                {selectedLanguage || 'All Languages'}
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languagesList.map((language) => (
                <DropdownMenuItem
                  key={language}
                  onClick={() => setSelectedLanguage(language === 'All Languages' ? '' : language)}
                  className={selectedLanguage === language ? "bg-accent" : ""}
                >
                  {language}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 gap-2 bg-transparent">
                Sort: {sortOptions.find((s) => s.value === sortBy)?.label}
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={sortBy === option.value ? "bg-accent" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-10 w-10", viewMode === "grid" && "bg-background shadow-sm")}
              onClick={() => setViewMode("grid")}
            >
              <GridIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-10 w-10", viewMode === "list" && "bg-background shadow-sm")}
              onClick={() => setViewMode("list")}
            >
              <ListIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active filters */}
      {(selectedCategoryId || selectedLanguage || searchQuery) && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategoryId && (
            <Button
              variant="secondary"
              size="sm"
              className="h-7 gap-1"
              onClick={() => setSelectedCategoryId("")}
            >
              {categoriesList.find(c => c.id === selectedCategoryId)?.name || 'Category'}
              <span className="ml-1">&times;</span>
            </Button>
          )}
          {selectedLanguage && (
            <Button
              variant="secondary"
              size="sm"
              className="h-7 gap-1"
              onClick={() => setSelectedLanguage("")}
            >
              {selectedLanguage}
              <span className="ml-1">&times;</span>
            </Button>
          )}
          {searchQuery && (
            <Button variant="secondary" size="sm" className="h-7 gap-1" onClick={() => setSearchQuery("")}>
              "{searchQuery}"<span className="ml-1">&times;</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-muted-foreground"
            onClick={() => {
              setSelectedCategoryId("")
              setSelectedLanguage("")
              setSearchQuery("")
            }}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing {totalBooks || books.length} {totalBooks === 1 ? "book" : "books"}
      </p>

      {/* Books Grid/List */}
      {booksLoading ? (
        <div className="text-center py-16">Loading books...</div>
      ) : books.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No books found matching your criteria.</p>
          <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSearchQuery("")}>
            Clear search
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {books.map((book) => (
            <BookCard key={book.id} {...book} variant="horizontal" />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} className="bg-transparent" onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Previous
          </Button>
          <span className="px-2 text-muted-foreground">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} className="bg-transparent" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
