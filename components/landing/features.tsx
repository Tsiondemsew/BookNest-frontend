import {
  BookIcon,
  HeadphonesIcon,
  FireIcon,
  TrophyIcon,
  UsersIcon,
  ShieldIcon,
  GlobeIcon,
  ChartIcon,
} from "@/components/icons"

const features = [
  {
    name: "Digital Books & PDFs",
    description: "Read beautifully formatted PDFs with a distraction-free reader. Bookmark, highlight, and take notes.",
    icon: BookIcon,
  }, 
  {
    name: "Reading Streaks",
    description: "Build consistent reading habits with daily streaks. Stay motivated and achieve your learning goals.",
    icon: FireIcon,
  }, 
  {
    name: "Community & Social",
    description: "Connect with fellow readers and authors. Share reviews, discuss books, and grow together.",
    icon: UsersIcon,
  },
  {
    name: "Progress Analytics",
    description: "Detailed insights into your reading habits. Weekly and monthly statistics to track your growth.",
    icon: ChartIcon,
  },  
]

export function Features() {
  return (
    <section className=" my-0 py-0 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything you need for a complete reading experience
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            A thoughtfully designed platform that puts your learning first.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative group">
                <div className="absolute -inset-2 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{feature.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
