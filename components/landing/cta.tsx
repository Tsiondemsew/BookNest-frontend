import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@/components/icons"

export function CTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 lg:px-16 lg:py-24">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
              Start your reading journey today
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Join thousands of readers who have discovered a better way to learn. Get started for free and unlock your
              potential.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="gap-2 px-8">
                  Create Free Account
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/browse">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-white/10 px-8"
                >
                  Explore Library
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
