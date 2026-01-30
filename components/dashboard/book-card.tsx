import Link from "next/link"
import { cn } from "@/lib/utils"
import { BookIcon, HeadphonesIcon, StarIcon } from "@/components/icons"

interface BookCardProps {
  id: string
  title: string
  author: string
  coverUrl?: string
  rating?: number
  progress?: number
  hasAudio?: boolean
  hasPdf?: boolean
  price?: {
    pdf?: number
    audio?: number
  }
  variant?: "default" | "compact" | "horizontal"
  className?: string
}

export function BookCard({
  id,
  title,
  author,
  coverUrl,
  rating,
  progress,
  hasAudio,
  hasPdf,
  price,
  variant = "default",
  className,
}: BookCardProps) {
  if (variant === "horizontal") {
    return (
      <Link
        href={`/books/${id}`}
        className={cn(
          "flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group",
          className,
        )}
      >
        <div className="w-20 h-28 rounded-lg bg-muted overflow-hidden shrink-0">
          {coverUrl ? (
            <img src={coverUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
              <BookIcon className="w-8 h-8 text-primary/40" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground">{author}</p>
          {rating && (
            <div className="mt-2 flex items-center gap-1">
              <StarIcon filled className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
          {progress !== undefined && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
          <div className="mt-3 flex items-center gap-2">
            {hasPdf && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                <BookIcon className="w-3 h-3" />
                PDF
              </span>
            )}
            {hasAudio && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-xs">
                <HeadphonesIcon className="w-3 h-3" />
                Audio
              </span>
            )}
          </div>
        </div>
      </Link>
    )
  }

  if (variant === "compact") {
    return (
      <Link href={`/books/${id}`} className={cn("group", className)}>
        <div className="aspect-2/3 rounded-lg bg-muted overflow-hidden">
          {coverUrl ? (
            <img
              src={coverUrl || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
              <BookIcon className="w-10 h-10 text-primary/40" />
            </div>
          )}
        </div>
        <h3 className="mt-2 text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground truncate">{author}</p>
        {progress !== undefined && (
          <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </div>
        )}
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/books/${id}`}
      className={cn(
        "block rounded-xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors group",
        className,
      )}
    >
      <div className="aspect-3/4 bg-muted overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
            <BookIcon className="w-16 h-16 text-primary/40" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground">{author}</p>
        {rating && (
          <div className="mt-2 flex items-center gap-1">
            <StarIcon filled className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        )}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {hasPdf && price?.pdf && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
              <BookIcon className="w-3 h-3" />${price.pdf.toFixed(2)}
            </span>
          )}
          {hasAudio && price?.audio && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-xs">
              <HeadphonesIcon className="w-3 h-3" />${price.audio.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
