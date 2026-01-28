"use client"

import { useState } from "react"
import { BookCard } from "@/components/dashboard/book-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, ChevronDownIcon, GridIcon, ListIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

const categories = [
  "All Categories",
  "Self-Development",
  "Business & Finance",
  "Science & Technology",
  "Fiction",
  "History",
  "Philosophy",
  "Psychology",
  "Health & Wellness",
  "Biography",
]

const languages = ["All Languages", "English", "Amharic", "French", "Spanish"]

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
]

const allBooks = [
  {
    id: "2",
    title: "The Shadow King",
    author: "Maaza Mengiste",
    rating: 4.2,
    hasPdf: true,
    hasAudio: true,
    price: { pdf: 13.99, audio: 18.99 },
    category: "Historical Fiction",
    coverUrl: "https://covers.openlibrary.org/b/id/8789311-L.jpg",
  },
  {
    id: "3",
    title: "The Beautiful Things That Heaven Bears",
    author: "Dinaw Mengestu",
    rating: 4.4,
    hasPdf: true,
    hasAudio: false,
    price: { pdf: 12.99 },
    category: "Fiction",
    coverUrl: "https://covers.openlibrary.org/b/id/872577-L.jpg",
  },
  {
    id: "4",
    title: "Cutting for Stone",
    author: "Abraham Verghese",
    rating: 4.6,
    hasPdf: true,
    hasAudio: true,
    price: { pdf: 15.99, audio: 21.99 },
    category: "Literary Fiction",
    coverUrl: "https://covers.openlibrary.org/b/id/8474220-L.jpg",
  },
  {
    id: "5",
    title: "Beneath the Lion's Gaze",
    author: "Maaza Mengiste",
    rating: 4.3,
    hasPdf: true,
    hasAudio: false,
    price: { pdf: 11.99 },
    category: "Historical Fiction",
    coverUrl: "https://covers.openlibrary.org/b/id/6308135-L.jpg",
  },
  {
    id: "6",
    title: "Notes from the Hyena's Belly",
    author: "Nega Mezlekia",
    rating: 4.1,
    hasPdf: true,
    hasAudio: false,
    price: { pdf: 9.99 },
    category: "Memoir",
    coverUrl: "https://covers.openlibrary.org/b/id/177697-L.jpg",
  },
  {
    id: "7",
    title: "My Name Is Why",
    author: "Lemn Sissay",
    rating: 4.4,
    hasPdf: true,
    hasAudio: false,
    price: { pdf: 10.99 },
    category: "Memoir",
    coverUrl: "https://covers.openlibrary.org/b/id/10205356-L.jpg",
  },
  {
    id: "8",
    title: "The Autobiography of Emperor Haile Selassie I",
    author: "Haile Selassie I",
    rating: 4.0,
    hasPdf: true,
    hasAudio: false,
    price: { pdf: 8.99 },
    category: "History",
    coverUrl: "https://covers.openlibrary.org/b/id/1686642-L.jpg",
  },
]

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages")
  const [sortBy, setSortBy] = useState("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredBooks = allBooks.filter((book) => {
    if (
      searchQuery &&
      !book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !book.author.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }
    if (selectedCategory !== "All Categories" && book.category !== selectedCategory) {
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
                {selectedCategory}
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-accent" : ""}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 gap-2 bg-transparent">
                {selectedLanguage}
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language}
                  onClick={() => setSelectedLanguage(language)}
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
      {(selectedCategory !== "All Categories" || selectedLanguage !== "All Languages" || searchQuery) && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategory !== "All Categories" && (
            <Button
              variant="secondary"
              size="sm"
              className="h-7 gap-1"
              onClick={() => setSelectedCategory("All Categories")}
            >
              {selectedCategory}
              <span className="ml-1">&times;</span>
            </Button>
          )}
          {selectedLanguage !== "All Languages" && (
            <Button
              variant="secondary"
              size="sm"
              className="h-7 gap-1"
              onClick={() => setSelectedLanguage("All Languages")}
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
              setSelectedCategory("All Categories")
              setSelectedLanguage("All Languages")
              setSearchQuery("")
            }}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
      </p>

      {/* Books Grid/List */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No books found matching your criteria.</p>
          <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSearchQuery("")}>
            Clear search
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} {...book} variant="horizontal" />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled className="bg-transparent">
            Previous
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            2
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            3
          </Button>
          <span className="px-2 text-muted-foreground">...</span>
          <Button variant="outline" size="sm" className="bg-transparent">
            12
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
