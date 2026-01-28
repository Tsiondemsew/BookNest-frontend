"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  BookOpen,
  Clock,
  AlertTriangle,
  Download,
} from "lucide-react"
import Image from "next/image"

const books = [
  {
    id: 1,
    title: "The Art of Focus",
    author: "Jessica Taylor",
    category: "Self-Help",
    status: "published",
    submitted: "Dec 10, 2025",
    price: "$14.99",
    cover: "/focus-book-cover.jpg",
  },
  {
    id: 2,
    title: "Modern Philosophy",
    author: "David Kim",
    category: "Philosophy",
    status: "pending",
    submitted: "Dec 28, 2025",
    price: "$19.99",
    cover: "/philosophy-book-cover.jpg",
  },
  {
    id: 3,
    title: "Digital Art Guide",
    author: "Emily Rodriguez",
    category: "Art & Design",
    status: "flagged",
    submitted: "Dec 20, 2025",
    price: "$24.99",
    cover: "/digital-art-book-cover.jpg",
  },
  {
    id: 4,
    title: "Mindful Living",
    author: "Sarah Mitchell",
    category: "Self-Help",
    status: "published",
    submitted: "Nov 15, 2025",
    price: "$9.99",
    cover: "/mindfulness-book-cover.jpg",
  },
  {
    id: 5,
    title: "Cooking Basics",
    author: "Michael Chen",
    category: "Cooking",
    status: "rejected",
    submitted: "Dec 5, 2025",
    price: "$12.99",
    cover: "/cooking-book-cover.jpg",
  },
]

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedBook, setSelectedBook] = useState<(typeof books)[0] | null>(null)
  const [actionDialog, setActionDialog] = useState<"view" | "approve" | "reject" | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const pendingBooks = filteredBooks.filter((b) => b.status === "pending")
  const publishedBooks = filteredBooks.filter((b) => b.status === "published")
  const flaggedBooks = filteredBooks.filter((b) => b.status === "flagged")

  const handleAction = (book: (typeof books)[0], action: "view" | "approve" | "reject") => {
    setSelectedBook(book)
    setActionDialog(action)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Book Management</h1>
          <p className="text-muted-foreground mt-1">Review and moderate book submissions</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Catalog
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">3,256</p>
                <p className="text-sm text-muted-foreground">Total Books</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-amber-100 p-2">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-100 p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3,180</p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-red-100 p-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Flagged</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Self-Help">Self-Help</SelectItem>
                <SelectItem value="Philosophy">Philosophy</SelectItem>
                <SelectItem value="Art & Design">Art & Design</SelectItem>
                <SelectItem value="Cooking">Cooking</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Books Tabs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Pending Review
            <Badge variant="secondary" className="ml-2">
              {pendingBooks.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="flagged">
            Flagged
            <Badge variant="destructive" className="ml-2">
              {flaggedBooks.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="all">All Books</TabsTrigger>
        </TabsList>

        {["pending", "published", "flagged", "all"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif capitalize">{tab === "all" ? "All" : tab} Books</CardTitle>
                <CardDescription>
                  {tab === "pending"
                    ? "Books awaiting review and approval"
                    : tab === "published"
                      ? "Currently live on the platform"
                      : tab === "flagged"
                        ? "Books with reported issues"
                        : "Complete book catalog"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(tab === "all" ? filteredBooks : filteredBooks.filter((b) => b.status === tab)).map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Image
                              src={book.cover || "/placeholder.svg"}
                              alt={book.title}
                              width={40}
                              height={60}
                              className="rounded object-cover"
                            />
                            <span className="font-medium">{book.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{book.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              book.status === "published"
                                ? "outline"
                                : book.status === "pending"
                                  ? "secondary"
                                  : book.status === "flagged"
                                    ? "destructive"
                                    : "outline"
                            }
                            className={book.status === "published" ? "bg-green-50 text-green-700 border-green-200" : ""}
                          >
                            {book.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{book.submitted}</TableCell>
                        <TableCell>{book.price}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleAction(book, "view")}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {book.status === "pending" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-green-600"
                                    onClick={() => handleAction(book, "approve")}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleAction(book, "reject")}
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              {book.status === "published" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Unpublish
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* View Book Dialog */}
      <Dialog open={actionDialog === "view"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
          </DialogHeader>
          {selectedBook && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <Image
                  src={selectedBook.cover || "/placeholder.svg"}
                  alt={selectedBook.title}
                  width={80}
                  height={120}
                  className="rounded object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{selectedBook.title}</h3>
                  <p className="text-muted-foreground">by {selectedBook.author}</p>
                  <Badge variant="outline" className="mt-2">
                    {selectedBook.category}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{selectedBook.status}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="font-medium">{selectedBook.price}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Submitted</p>
                  <p className="font-medium">{selectedBook.submitted}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Close
            </Button>
            {selectedBook?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  className="text-red-600 bg-transparent"
                  onClick={() => {
                    setActionDialog("reject")
                  }}
                >
                  Reject
                </Button>
                <Button onClick={() => setActionDialog(null)}>Approve</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={actionDialog === "approve"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Book</DialogTitle>
            <DialogDescription>
              Approve "{selectedBook?.title}" by {selectedBook?.author}? It will be published immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button onClick={() => setActionDialog(null)}>Approve & Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={actionDialog === "reject"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Book</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting "{selectedBook?.title}"</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setActionDialog(null)}>
              Reject Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
