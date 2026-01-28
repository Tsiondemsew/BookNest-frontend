import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "@/components/icons"

interface ReviewCardProps {
  author: string
  authorAvatar?: string
  rating: number
  date: string
  content: string
  helpful?: number
}

export function ReviewCard({ author, authorAvatar, rating, date, content, helpful }: ReviewCardProps) {
  return (
    <div className="py-6 border-b border-border last:border-0">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={authorAvatar || "/placeholder.svg"} alt={author} />
          <AvatarFallback className="bg-muted text-muted-foreground">
            {author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{author}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      filled={i < rating}
                      className={`w-4 h-4 ${i < rating ? "text-accent" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{date}</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-foreground leading-relaxed">{content}</p>
          {helpful !== undefined && (
            <p className="mt-3 text-sm text-muted-foreground">{helpful} people found this helpful</p>
          )}
        </div>
      </div>
    </div>
  )
}
