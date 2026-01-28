"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BookmarkIcon,
  SettingsIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
  MaximizeIcon,
  ListIcon,
  PenIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

// bookContent and sample content live in component state now so we can swap for real books (e.g. Amharic PDF)

export default function ReadPage() {
  const [currentPage, setCurrentPage] = useState(45)
  const [fontSize, setFontSize] = useState(18)
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarTab, setSidebarTab] = useState<"toc" | "bookmarks" | "notes">("toc")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("light")

  const [bookContent, setBookContent] = useState({
    title: "Atomic Habits",
    author: "James Clear",
    totalPages: 320,
    chapters: [
      { title: "Introduction", startPage: 1 },
      { title: "The Fundamentals", startPage: 15 },
      { title: "The 1st Law: Make It Obvious", startPage: 45 },
      { title: "The 2nd Law: Make It Attractive", startPage: 95 },
      { title: "The 3rd Law: Make It Easy", startPage: 145 },
      { title: "The 4th Law: Make It Satisfying", startPage: 195 },
      { title: "Advanced Tactics", startPage: 245 },
      { title: "Conclusion", startPage: 295 },
    ],
    bookmarks: [
      { page: 23, note: "Key insight about compound growth" },
      { page: 67, note: "Habit stacking technique" },
      { page: 142, note: "Implementation intentions" },
    ],
    notes: [
      { page: 23, text: "Focus on small, repeatable actions that compound." },
      { page: 142, text: "Plan implementation intentions to make habits stick." },
    ],
  })

  const [samplePageContent, setSamplePageContent] = useState(`The habits you repeat (or don't repeat) every day largely determine your health, wealth, and happiness. With the same habits, you'll end up with the same results. But with better habits, anything is possible.`)

  const [pages, setPages] = useState<string[]>([])

  const progress = Math.round((currentPage / bookContent.totalPages) * 100)

  const goToNextPage = () => {
    if (currentPage < bookContent.totalPages) {
      setCurrentPage((p) => p + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        goToNextPage()
      } else if (e.key === "ArrowLeft") {
        goToPrevPage()
      } else if (e.key === "Escape") {
        setShowSidebar(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage])

  // On mount, detect route id and swap in Amharic book if id === "1"
  useEffect(() => {
    try {
      const parts = window.location.pathname.split("/").filter(Boolean)
      const id = parts[parts.length - 1]
      if (id === "1") {
        // set Amharic metadata
        setBookContent({
          title: "እቴሜቴ ሎሚ ሽታ",
          author: "አዳም ረታ",
          totalPages: 0,
          chapters: [
            { title: "መግቢያ", startPage: 1 },
            { title: "የመነሻ ሀሳቦች", startPage: 5 },
            { title: "ምክንያቶች", startPage: 25 },
            { title: "የማጠናቀቂያ ማብራሪያ", startPage: 180 },
          ],
            bookmarks: [
              { page: 12, note: "በገንዘብ ስር የሚነጋገር ክፍል" },
              { page: 45, note: "የሕይወት ልምዶች ስለ ግንዛቤ" },
            ],
            notes: [
              { page: 12, text: "ይህ ክፍል ስለ ገንዘብ እና ሀብት ይነጋገራል።" },
              { page: 45, text: "እዚህ የሚገኙ ሀሳቦች በቀላሉ የሚተገበሩ ናቸው።" },
            ],
        })

        // Load OCRed text produced earlier and parse pages/bookmarks/notes
        fetch('/ebook-1-ocr.txt')
          .then((r) => r.text())
          .then((text) => {
            // split on page markers like "-- Page 1 --"
            const parts = text.split(/-- Page \d+ --/).map((p) => p.trim()).filter(Boolean)
            setPages(parts)
            setSamplePageContent(parts[0] || '')
            setCurrentPage(1)
            setBookContent((prev) => ({ ...prev, totalPages: parts.length }))

            // build bookmarks/notes from money-word occurrences
            const moneyWords = ['ገንዘብ', 'ብር', 'ወርቅ']
            const bookmarks: any[] = []
            const notes: any[] = []
            parts.forEach((p, idx) => {
              for (const w of moneyWords) {
                const i = p.indexOf(w)
                if (i !== -1) {
                  const snippet = p.slice(Math.max(0, i - 40), i + 80).replace(/\s+/g, ' ').trim()
                  bookmarks.push({ page: idx + 1, note: snippet })
                  notes.push({ page: idx + 1, text: `Contains money term: ${w} — ${snippet}` })
                  break
                }
              }
            })
            if (bookmarks.length > 0) {
              setBookContent((prev) => ({ ...prev, bookmarks }))
            }
            if (notes.length > 0) {
              setBookContent((prev) => ({ ...prev, notes }))
            }
          })
          .catch(() => {
            // leave fallback excerpt if OCR file not found
          })
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const themeStyles = {
    light: "bg-white text-foreground",
    sepia: "bg-amber-50 text-amber-950",
    dark: "bg-zinc-900 text-zinc-100",
  }

  return (
    <div className={cn("min-h-screen flex flex-col", themeStyles[theme])}>
      {/* Top toolbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/library">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <XIcon className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold text-foreground">{bookContent.title}</h1>
            <p className="text-sm text-muted-foreground">{bookContent.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => {
              setShowSidebar(!showSidebar)
              setSidebarTab("toc")
            }}
          >
            <ListIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => {
              setShowSidebar(!showSidebar)
              setSidebarTab("bookmarks")
            }}
          >
            <BookmarkIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => {
              setShowSidebar(!showSidebar)
              setSidebarTab("notes")
            }}
          >
            <PenIcon className="w-5 h-5" />
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <SettingsIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Reading Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Font size */}
              <div className="p-3">
                <p className="text-sm font-medium mb-2">Font Size</p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                  >
                    <ZoomOutIcon className="w-4 h-4" />
                  </Button>
                  <Slider
                    value={[fontSize]}
                    onValueChange={([v]) => setFontSize(v)}
                    min={14}
                    max={28}
                    step={2}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => setFontSize((s) => Math.min(28, s + 2))}
                  >
                    <ZoomInIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Theme */}
              <div className="p-3">
                <p className="text-sm font-medium mb-2">Theme</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium bg-white text-zinc-900",
                      theme === "light" ? "border-primary" : "border-transparent",
                    )}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme("sepia")}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium bg-amber-50 text-amber-900",
                      theme === "sepia" ? "border-primary" : "border-transparent",
                    )}
                  >
                    Sepia
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium bg-zinc-900 text-zinc-100",
                      theme === "dark" ? "border-primary" : "border-transparent",
                    )}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsFullscreen(!isFullscreen)}>
            <MaximizeIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        {showSidebar && (
          <aside className="w-80 border-r border-border bg-background overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border">
              <div className="flex">
                <button
                  onClick={() => setSidebarTab("toc")}
                  className={cn(
                    "flex-1 py-3 text-sm font-medium border-b-2 transition-colors",
                    sidebarTab === "toc"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  Contents
                </button>
                <button
                  onClick={() => setSidebarTab("bookmarks")}
                  className={cn(
                    "flex-1 py-3 text-sm font-medium border-b-2 transition-colors",
                    sidebarTab === "bookmarks"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  Bookmarks
                </button>
                <button
                  onClick={() => setSidebarTab("notes")}
                  className={cn(
                    "flex-1 py-3 text-sm font-medium border-b-2 transition-colors",
                    sidebarTab === "notes"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  Notes
                </button>
              </div>
            </div>

            <div className="p-4">
              {sidebarTab === "toc" && (
                <ul className="space-y-1">
                  {bookContent.chapters.map((chapter, index) => {
                    const isActive = currentPage >= chapter.startPage
                    const nextChapter = bookContent.chapters[index + 1]
                    const isCurrent =
                      currentPage >= chapter.startPage && (!nextChapter || currentPage < nextChapter.startPage)
                    return (
                      <li key={index}>
                        <button
                          onClick={() => setCurrentPage(chapter.startPage)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                            isCurrent
                              ? "bg-primary text-primary-foreground"
                              : isActive
                                ? "text-foreground hover:bg-muted"
                                : "text-muted-foreground hover:bg-muted",
                          )}
                        >
                          <span className="font-medium">{chapter.title}</span>
                          <span className="ml-2 text-xs opacity-60">p. {chapter.startPage}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}

              {sidebarTab === "bookmarks" && (
                <div className="space-y-3">
                  {bookContent.bookmarks.map((bookmark, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(bookmark.page)}
                      className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-2 text-primary">
                        <BookmarkIcon filled className="w-4 h-4" />
                        <span className="text-sm font-medium">Page {bookmark.page}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{bookmark.note}</p>
                    </button>
                  ))}
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Add Bookmark
                  </Button>
                </div>
              )}

              {sidebarTab === "notes" && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Notes from this book</p>
                  {bookContent.notes && bookContent.notes.length > 0 ? (
                    <div className="space-y-2">
                      {bookContent.notes.map((note: any, i: number) => (
                        <div key={i} className="p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Page {note.page}</span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No notes yet — select text to add one.</p>
                  )}
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Main reading area */}
        <main className={cn("flex-1 flex flex-col", themeStyles[theme])}>
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-8 py-12">
                <article
                  className="leading-relaxed"
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: 1.8,
                  }}
                >
                  {(pages.length ? pages[currentPage - 1] || '' : samplePageContent)
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className="mb-6">
                        {paragraph}
                      </p>
                    ))}
                </article>
            </div>
          </div>

          {/* Bottom navigation */}
          <footer className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 py-3">
              {/* Progress bar */}
              <div className="mb-3">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={goToPrevPage} disabled={currentPage <= 1} className="gap-2">
                  <ChevronLeftIcon className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {bookContent.totalPages}
                  </span>
                  <span className="text-sm font-medium text-primary">{progress}%</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage >= bookContent.totalPages}
                  className="gap-2"
                >
                  Next
                  <ChevronRightIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
