import { StatsCard } from "@/components/dashboard/stats-card"
import { BookCard } from "@/components/dashboard/book-card"
import { ReadingActivity } from "@/components/dashboard/reading-activity"
import { AchievementBadge } from "@/components/dashboard/achievement-badge"
 import { BookIcon, FireIcon, ClockIcon, CalendarIcon } from "@/components/icons"
const continueReading = [
  {
    id: "1",
    title: "መረቅ",
    author: "አዳም ረታ",
    progress: 67,
    coverUrl: "/covers/book-1.svg",
    hasPdf: true,
    hasAudio: true,
  },
  {
    id: "2",
    title: "የስንብት ቀለማት",
    author: "አዳም ረታ",
    progress: 34,
    coverUrl: "/covers/book-2.svg",
    hasPdf: true,
    hasAudio: false,
  },
  {
    id: "3",
    title: "ኦሮማይ",
    author: "ባዕሉ ግርማ",
    progress: 89,
    coverUrl: "/covers/book-3.svg",
    hasPdf: true,
    hasAudio: true,
  },
]

const recommendations = [
  {
    id: "4",
    title: "ዙበዳ",
    author: "አሌክስ አብርሃም",
    rating: 4.7,
    coverUrl: "/covers/book-4.svg",
    hasPdf: true,
    hasAudio: true,
    price: { pdf: 14.99, audio: 19.99 },
  },
  {
    id: "5",
    title: "ከአምን ባሻገር",
    author: "በውቀቱ ሲዩም",
    rating: 4.5,
    coverUrl: "/covers/book-5.svg",
    hasPdf: true,
    hasAudio: false,
    price: { pdf: 12.99 },
  },
  {
    id: "6",
    title: "እሳት ወይ አቤባ",
    author: "ሎሬት ጸጋዬ ገብረመድህን",
    rating: 4.6,
    coverUrl: "/covers/book-6.svg",
    hasPdf: true,
    hasAudio: true,
    price: { pdf: 11.99, audio: 16.99 },
  },
]

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
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, John</h1>
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
              <a href="/dashboard/library" className="text-sm text-primary hover:underline">
                View all
              </a>
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
              <a href="/dashboard/achievements" className="text-sm text-primary hover:underline">
                View all
              </a>
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
              <a href="/browse" className="text-sm text-primary hover:underline">
                Browse more
              </a>
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
