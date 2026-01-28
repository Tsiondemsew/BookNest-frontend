import { StarIcon } from "@/components/icons"

const testimonials = [
  {
    content:
      "BookNest transformed my reading habits. The progress tracking keeps me motivated, and the clean interface makes reading a joy.",
    author: "Sarah Chen",
    role: "Graduate Student",
    avatar: "/professional-woman-avatar.png",
  },
  {
    content:
      "As an author, I love how easy it is to publish and connect with readers. The analytics help me understand what resonates with my audience.",
    author: "Dr. Michael Osei",
    role: "Published Author",
    avatar: "/professional-man-avatar.png",
  },
  {
    content:
      "The audiobook player is exceptional. I can switch between reading and listening seamlessly, and it always remembers where I left off.",
    author: "Emma Tadesse",
    role: "Busy Professional",
    avatar: "/professional-woman-smiling-avatar.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by readers worldwide
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-card rounded-2xl p-8 shadow-sm border border-border">
              <div className="flex gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled className="w-4 h-4" />
                ))}
              </div>
              <p className="mt-4 text-foreground leading-relaxed">"{testimonial.content}"</p>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover bg-muted"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
