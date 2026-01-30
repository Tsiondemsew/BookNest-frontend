'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { StatsCard } from "@/components/dashboard/stats-card"
import { BookCard } from "@/components/dashboard/book-card"
import { ReadingActivity } from "@/components/dashboard/reading-activity"
import { AchievementBadge } from "@/components/dashboard/achievement-badge"
import { BookIcon, FireIcon, ClockIcon, CalendarIcon } from "@/components/icons"
import { useAuth } from "@/lib/auth-context"
import { booksAPI } from "@/lib/api"

const mapBook = (b: any) => ({
  id: b.id,
  title: b.title,
  author: b.authorName || b.author_name || b.author || "Unknown",
  progress: b.progress ?? undefined,
  coverUrl: b.coverImageUrl || b.cover || b.cover_image_url || null,
  hasPdf: (b.availableFormats || b.formats || []).some((f: any) => String(f.format_type || f).toLowerCase().includes("pdf")),
  hasAudio: (b.availableFormats || b.formats || []).some((f: any) => String(f.format_type || f).toLowerCase().includes("audio")),
  rating: b.averageRating || b.rating || null,
  price: {
    pdf: b.formats ? (b.formats.find((f: any) => String(f.format_type).toLowerCase().includes('pdf'))?.price ?? null) : (b.priceRange?.min ?? null),
    audio: b.formats ? (b.formats.find((f: any) => String(f.format_type).toLowerCase().includes('audio'))?.price ?? null) : null,
  },
})

const achievements = [
  {
    type: "streak" as const,
    title: "7-Day Streak",
    description: "Read every day for a week",
    earned: true,
    earnedDate: "Dec 28, 2024",
  },
  {
    type: "reader" as const,
    title: "Bookworm",
    description: "Complete 10 books",
    earned: true,
    earnedDate: "Dec 15, 2024",
  },
  {
    type: "reviewer" as const,
    title: "Critic",
    description: "Write 25 book reviews",
    earned: false,
    progress: 60,
  },
  {
    type: "collector" as const,
    title: "Collector",
    description: "Own 50 books in your library",
    earned: false,
    progress: 72,
  },
]

export default function DashboardPage() {
  
  const { user } = useAuth();

  // Dashboard lists (fetched from API)
  const [continueReading, setContinueReading] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loadingContinue, setLoadingContinue] = useState(false)
  const [loadingRecs, setLoadingRecs] = useState(false)

  useEffect(() => {
    const fetchContinue = async () => {
      setLoadingContinue(true)
      try {
        const res = await booksAPI.search({ page: 1, limit: 3, sortBy: 'newest' })
        const resp = res?.data?.books || res?.books || []
        setContinueReading(resp.map(mapBook))
      } catch (e) {
        setContinueReading([])
      } finally {
        setLoadingContinue(false)
      }
    }

    const fetchRecs = async () => {
      setLoadingRecs(true)
      try {
        const res = await booksAPI.search({ page: 1, limit: 6, sortBy: 'popular' })
        const resp = res?.data?.books || res?.books || []
        setRecommendations(resp.map(mapBook))
      } catch (e) {
        setRecommendations([])
      } finally {
        setLoadingRecs(false)
      }
    }

    fetchContinue()
    fetchRecs()
  }, [])

  // Use auth context values if available, otherwise fall back to props

  const name = user?.display_name  ;
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back {name}</h1>
        <p className="text-muted-foreground mt-1">{"Here's what's happening with your reading today."}</p>
      </div>

      {/* Stats */}
       
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Total Books" value="12" subtitle="Completed" icon={<BookIcon className="w-5 h-5" />} />
                <StatsCard title="Current Streak" value="7" subtitle="Days" icon={<FireIcon className="w-5 h-5" />} />
                <StatsCard
                  title="Reading Time"
                  value="289"
                  subtitle="Minutes this week"
                  icon={<ClockIcon className="w-5 h-5" />}
                />
                <StatsCard
                  title="Best Month"
                  value="Dec 2024"
                  subtitle="1,330 pages"
                  icon={<CalendarIcon className="w-5 h-5" />}
                />
              </div> 
                    

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Continue Reading & Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Reading */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Continue Reading</h2>
              <Link href="/dashboard/library" className="text-sm text-primary hover:underline">
                View all
              </Link> 
            </div>
            <div className="space-y-4">
              {continueReading.map((book) => (
                <BookCard key={book.id} {...book} variant="horizontal" />
              ))}
            </div>
          </div>

          {/* Reading Activity */}
          <ReadingActivity />
        </div>

        {/* Right column - Achievements & Recommendations */}
        <div className="space-y-8">
          {/* Achievements */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Achievements</h2>
              <Link href="/dashboard/achievements" className="text-sm text-primary hover:underline">
                View all
              </Link> 
            </div>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <AchievementBadge key={index} {...achievement} />
              ))}
            </div>
          </div>

          {/* Quick Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">For You</h2>
              <Link href="/browse" className="text-sm text-primary hover:underline">
                Browse more
              </Link> 
            </div>
            <div className="grid grid-cols-3 gap-3">
              {recommendations.map((book) => (
                <BookCard key={book.id} {...book} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
