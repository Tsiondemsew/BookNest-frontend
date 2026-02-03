import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, BookIcon, HeadphonesIcon, ChartIcon } from "@/components/icons"

export function Hero() {
  return (
    <section className=" ml-0 pl-0 relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Over 10,000 books available
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-5xl text-balance">
           Welcome to 
            <span className="text-primary"> BookNest </span>
           
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto text-pretty">
            Your digital home for reading and learning. Explore books and audiobooks, track your progress, and grow through personalized reading journeys—all in one smart, academic-grade platform.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="gap-2 px-8">
                Start Reading Free
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/browse">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                Browse Library
              </Button>
            </Link>
          </div>

          {/* Feature pills */}
          <div className="mt-12 ml-0 pl-0  flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm">
              <BookIcon className="w-4 h-4 text-primary" />
              <span>PDF & eBooks</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm">
              <HeadphonesIcon className="w-4 h-4 text-primary" />
              <span>Audiobooks</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm">
              <ChartIcon className="w-4 h-4 text-primary" />
              <span>Progress Tracking</span>
            </div>
          </div>
        </div>

        {/* Hero illustration - Book covers grid */}
        {/* <div className="mt-16 lg:mt-24">
          <div className="relative mx-auto max-w-5xl">
            <div className="grid grid-cols-5 gap-4 perspective-1000">
              {[
                { title: "The Art of Learning", color: "from-primary/80 to-primary" },
                { title: "Deep Work", color: "from-accent/80 to-accent" },
                { title: "Atomic Habits", color: "from-chart-3 to-chart-3/80" },
                { title: "The Psychology of Money", color: "from-chart-4 to-chart-4/80" },
                { title: "Thinking Fast and Slow", color: "from-primary/70 to-primary/90" },
              ].map((book, index) => (
                <div
                  key={book.title}
                  className={`aspect-[2/3] rounded-lg bg-linear-to-br ${book.color} shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl` }
                  style={{
                    transform: `rotateY(${(index - 2) * 5}deg)`,
                    zIndex: 5 - Math.abs(index - 2),
                  }}
                > 
                  <div className="h-full p-4 flex flex-col justify-end">
                    <div className="h-1 w-8 bg-white/30 rounded mb-2" />
                    <div className="h-1 w-12 bg-white/20 rounded" />
                  </div>
                </div>
                
              ))}
            </div>
          </div>
          </div>*/}
        
      </div>
    </section>
  )
}
