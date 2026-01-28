"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MessageSquare, Flag, Search, Filter, ThumbsUp, ThumbsDown } from "lucide-react"

const reviews = [
  {
    id: 1,
    book: "The Art of Focus",
    reviewer: "Sarah Mitchell",
    avatar: "/woman-portrait.png",
    rating: 5,
    date: "Dec 25, 2025",
    content:
      "An absolutely transformative read! The strategies outlined in this book have genuinely changed how I approach my daily work. Highly recommend for anyone struggling with distractions.",
    helpful: 24,
    replied: true,
    status: "published",
  },
  {
    id: 2,
    book: "Mindful Living",
    reviewer: "James Chen",
    avatar: "/asian-man-portrait.png",
    rating: 4,
    date: "Dec 23, 2025",
    content:
      "Great practical advice for incorporating mindfulness into everyday life. Some sections felt repetitive, but overall a solid guide for beginners.",
    helpful: 12,
    replied: false,
    status: "published",
  },
  {
    id: 3,
    book: "Digital Minimalism Guide",
    reviewer: "Emily Rodriguez",
    avatar: "/latina-portrait.png",
    rating: 5,
    date: "Dec 20, 2025",
    content:
      "This book helped me reclaim so much time from social media. The 30-day digital declutter challenge was particularly impactful. A must-read in our hyper-connected age.",
    helpful: 31,
    replied: true,
    status: "published",
  },
  {
    id: 4,
    book: "The Art of Focus",
    reviewer: "Anonymous",
    avatar: "",
    rating: 2,
    date: "Dec 18, 2025",
    content: "Nothing new here. Same productivity advice you can find in countless other books and blog posts.",
    helpful: 3,
    replied: false,
    status: "flagged",
  },
]

export default function ReviewsPage() {
  const [replyOpen, setReplyOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<(typeof reviews)[0] | null>(null)
  const [replyText, setReplyText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBook, setFilterBook] = useState("all")

  const handleReply = (review: (typeof reviews)[0]) => {
    setSelectedReview(review)
    setReplyOpen(true)
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.reviewer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBook = filterBook === "all" || review.book === filterBook
    return matchesSearch && matchesBook
  })

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Reviews Management</h1>
        <p className="text-muted-foreground mt-1">View and respond to reader reviews</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="text-2xl font-bold">{avgRating}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">{reviews.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">{reviews.filter((r) => r.replied).length}</p>
            <p className="text-sm text-muted-foreground mt-1">Replied</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold text-amber-600">{reviews.filter((r) => r.status === "flagged").length}</p>
            <p className="text-sm text-muted-foreground mt-1">Flagged</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterBook} onValueChange={setFilterBook}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by book" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Books</SelectItem>
            <SelectItem value="The Art of Focus">The Art of Focus</SelectItem>
            <SelectItem value="Mindful Living">Mindful Living</SelectItem>
            <SelectItem value="Digital Minimalism Guide">Digital Minimalism Guide</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="pending">Needs Reply</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className={review.status === "flagged" ? "border-amber-300 bg-amber-50/50" : ""}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={review.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {review.reviewer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{review.reviewer}</span>
                        <Badge variant="outline">{review.book}</Badge>
                        {review.status === "flagged" && (
                          <Badge variant="destructive" className="gap-1">
                            <Flag className="h-3 w-3" />
                            Flagged
                          </Badge>
                        )}
                        {review.replied && (
                          <Badge variant="secondary" className="gap-1">
                            <MessageSquare className="h-3 w-3" />
                            Replied
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="mt-3 text-muted-foreground">{review.content}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {review.helpful} found helpful
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-col">
                    <Button variant="outline" size="sm" onClick={() => handleReply(review)} disabled={review.replied}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {review.replied ? "Replied" : "Reply"}
                    </Button>
                    {review.status !== "flagged" && (
                      <Button variant="ghost" size="sm">
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="mt-4 space-y-4">
          {filteredReviews
            .filter((r) => !r.replied)
            .map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {review.reviewer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.reviewer}</span>
                          <Badge variant="outline">{review.book}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="mt-3 text-muted-foreground">{review.content}</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleReply(review)}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="flagged" className="mt-4 space-y-4">
          {filteredReviews
            .filter((r) => r.status === "flagged")
            .map((review) => (
              <Card key={review.id} className="border-amber-300 bg-amber-50/50">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {review.reviewer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.reviewer}</span>
                          <Badge variant="destructive" className="gap-1">
                            <Flag className="h-3 w-3" />
                            Flagged
                          </Badge>
                        </div>
                        <p className="mt-3 text-muted-foreground">{review.content}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm">
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      {/* Reply Dialog */}
      <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Review</DialogTitle>
            <DialogDescription>Your response will be visible to all readers</DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-muted">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{selectedReview.reviewer}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < selectedReview.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{selectedReview.content}</p>
              </div>
              <Textarea
                placeholder="Write your response..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setReplyOpen(false)}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
