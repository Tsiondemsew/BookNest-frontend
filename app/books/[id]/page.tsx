"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewCard } from "@/components/book/review-card"
import { BookIcon, HeadphonesIcon, StarIcon, BookmarkIcon, ChevronLeftIcon, CheckIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

// Mock book data - in real app this would come from API/database
const bookData = {
  id: "8",
  title: "The Autobiography of Emperor Haile Selassie I",
  subtitle: "",
  author: "Haile Selassie I",
  authorBio:
    "Haile Selassie I was the Emperor of Ethiopia from 1930 to 1974. He is a central figure in modern Ethiopian history.",
  description: `The autobiography recounts the life and reign of Emperor Haile Selassie I, his leadership, and Ethiopia's modern history.`,
  rating: 4.0,
  reviewCount: 124,
  pageCount: 512,
  duration: "",
  publishDate: "",
  publisher: "",
  language: "Amharic",
  isbn: "",
  category: "History",
  hasPdf: true,
  hasAudio: false,
  formats: {
    pdf: { price: 8.99, owned: false },
    audio: { price: 0, owned: false },
  },
  coverUrl: "https://covers.openlibrary.org/b/id/1686642-L.jpg",
}

const reviews = [
  {
    author: "Michael Thompson",
    rating: 5,
    date: "Dec 15, 2024",
    content:
      "This book completely changed my approach to building habits. The 1% improvement concept is brilliant and the practical strategies are easy to implement. Highly recommended for anyone looking to make lasting changes.",
    helpful: 42,
  },
  {
    author: "Sarah Williams",
    rating: 5,
    date: "Dec 10, 2024",
    content:
      "One of the best books on habit formation I've ever read. James Clear breaks down complex concepts into simple, actionable steps. The audiobook version is excellent too!",
    helpful: 28,
  },
  {
    author: "David Chen",
    rating: 4,
    date: "Dec 5, 2024",
    content:
      "Great practical advice with solid scientific backing. Some concepts feel repetitive if you've read other habit books, but the framework presented here is unique and effective.",
    helpful: 15,
  },
]

export default function BookDetailPage() {
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "audio">("pdf")
  const [isBookmarked, setIsBookmarked] = useState(false)

  const currentPrice = selectedFormat === "pdf" ? bookData.formats.pdf.price : bookData.formats.audio.price

  return (
    <div className="min-h-screen bg-background">
      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4 lg:px-8">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Back to Browse
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 pb-16 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column - Book cover and purchase */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Book cover */}
              <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-lg bg-muted">
                {bookData.coverUrl ? (
                  <img src={bookData.coverUrl} alt={bookData.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                    <BookIcon className="w-24 h-24 text-primary/30" />
                  </div>
                )}
              </div>

              {/* Format selection */}
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-sm font-medium text-foreground mb-3">Select Format</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedFormat("pdf")}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all text-left",
                      selectedFormat === "pdf"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <BookIcon
                      className={cn(
                        "w-5 h-5 mb-2",
                        selectedFormat === "pdf" ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <p className="font-medium text-foreground">PDF</p>
                    <p className="text-lg font-bold text-primary">${bookData.formats.pdf.price}</p>
                  </button>
                  <button
                    onClick={() => setSelectedFormat("audio")}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all text-left",
                      selectedFormat === "audio"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <HeadphonesIcon
                      className={cn(
                        "w-5 h-5 mb-2",
                        selectedFormat === "audio" ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <p className="font-medium text-foreground">Audiobook</p>
                    <p className="text-lg font-bold text-primary">${bookData.formats.audio.price}</p>
                  </button>
                </div>
              </div>

              {/* Purchase buttons */}
              <div className="space-y-3">
                <Button size="lg" className="w-full">
                  Purchase {selectedFormat === "pdf" ? "PDF" : "Audiobook"} - ${currentPrice}
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className={cn("flex-1 gap-2 bg-transparent", isBookmarked && "text-accent border-accent")}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <BookmarkIcon filled={isBookmarked} className="w-4 h-4" />
                    {isBookmarked ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                    Preview
                  </Button>
                </div>
              </div>

              {/* Quick info */}
              <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pages</span>
                  <span className="text-foreground font-medium">{bookData.pageCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Audio Duration</span>
                  <span className="text-foreground font-medium">{bookData.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Language</span>
                  <span className="text-foreground font-medium">{bookData.language}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Publisher</span>
                  <span className="text-foreground font-medium">{bookData.publisher}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Book details */}
          <div className="lg:col-span-2">
            {/* Book title and info */}
            <div>
              <p className="text-sm text-primary font-medium">{bookData.category}</p>
              <h1 className="mt-2 text-3xl lg:text-4xl font-bold text-foreground">{bookData.title}</h1>
              <p className="mt-2 text-xl text-muted-foreground">{bookData.subtitle}</p>

              <div className="mt-4 flex items-center gap-4">
                <Link href={`/authors/${bookData.author}`} className="text-primary hover:underline font-medium">
                  {bookData.author}
                </Link>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        filled={i < Math.floor(bookData.rating)}
                        className={`w-4 h-4 ${i < Math.floor(bookData.rating) ? "text-accent" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">{bookData.rating}</span>
                  <span className="text-muted-foreground">({bookData.reviewCount.toLocaleString()} reviews)</span>
                </div>
              </div>

              {/* Format badges */}
              <div className="mt-4 flex items-center gap-3">
                {bookData.hasPdf && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                    <BookIcon className="w-4 h-4" />
                    PDF Available
                  </span>
                )}
                {bookData.hasAudio && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-sm font-medium">
                    <HeadphonesIcon className="w-4 h-4" />
                    Audiobook Available
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="author"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  About Author
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  Reviews ({bookData.reviewCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="prose prose-stone max-w-none">
                  {bookData.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Key takeaways */}
                <div className="mt-8 p-6 rounded-xl bg-secondary/50">
                  <h3 className="font-semibold text-foreground mb-4">Key Takeaways</h3>
                  <ul className="space-y-3">
                    {[
                      "Small habits compound into remarkable results over time",
                      "Focus on systems rather than goals",
                      "The 4 laws of behavior change: make it obvious, attractive, easy, and satisfying",
                      "Identity-based habits are more effective than outcome-based habits",
                    ].map((takeaway, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Details */}
                <div className="mt-8">
                  <h3 className="font-semibold text-foreground mb-4">Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Published</p>
                      <p className="font-medium text-foreground">{bookData.publishDate}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">ISBN</p>
                      <p className="font-medium text-foreground">{bookData.isbn}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="author" className="mt-6">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-full bg-muted flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{bookData.author}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{bookData.authorBio}</p>
                    <Link href={`/authors/${bookData.author}`}>
                      <Button variant="outline" className="mt-4 bg-transparent">
                        View Author Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                {/* Rating summary */}
                <div className="flex items-center gap-8 p-6 rounded-xl bg-secondary/50 mb-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-foreground">{bookData.rating}</p>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          filled={i < Math.floor(bookData.rating)}
                          className={`w-5 h-5 ${i < Math.floor(bookData.rating) ? "text-accent" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {bookData.reviewCount.toLocaleString()} reviews
                    </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage = stars === 5 ? 78 : stars === 4 ? 15 : stars === 3 ? 5 : stars === 2 ? 1 : 1
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground w-4">{stars}</span>
                          <StarIcon filled className="w-4 h-4 text-accent" />
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-accent rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">{percentage}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Write review button */}
                <Button className="mb-6">Write a Review</Button>

                {/* Reviews list */}
                <div className="divide-y divide-border">
                  {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                  ))}
                </div>

                <Button variant="outline" className="mt-6 w-full bg-transparent">
                  Load More Reviews
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
