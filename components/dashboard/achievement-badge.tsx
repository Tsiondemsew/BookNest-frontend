import { cn } from "@/lib/utils"
import { TrophyIcon, BookIcon, FireIcon, StarIcon } from "@/components/icons"

type BadgeType = "streak" | "reader" | "reviewer" | "collector"

interface AchievementBadgeProps {
  type: BadgeType
  title: string
  description: string
  earned?: boolean
  earnedDate?: string
  progress?: number
  className?: string
}

const badgeIcons = {
  streak: FireIcon,
  reader: BookIcon,
  reviewer: StarIcon,
  collector: TrophyIcon,
}

const badgeColors = {
  streak: "from-orange-500/20 to-orange-600/20 text-orange-500",
  reader: "from-primary/20 to-primary/30 text-primary",
  reviewer: "from-accent/20 to-accent/30 text-accent",
  collector: "from-chart-5/20 to-chart-5/30 text-chart-5",
}

export function AchievementBadge({
  type,
  title,
  description,
  earned = false,
  earnedDate,
  progress,
  className,
}: AchievementBadgeProps) {
  const Icon = badgeIcons[type]

  return (
    <div
      className={cn(
        "relative p-4 rounded-xl border transition-all",
        earned ? "bg-card border-border" : "bg-muted/50 border-transparent opacity-60",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-xl bg-linear-to-br", badgeColors[type])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          {earned && earnedDate && <p className="mt-1 text-xs text-muted-foreground">Earned {earnedDate}</p>}
          {!earned && progress !== undefined && (
            <div className="mt-2">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary/50 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{progress}% complete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
