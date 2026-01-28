import type React from "react"
import { Header } from "@/components/landing/header"

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">{children}</main>
    </div>
  )
}
