"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookNestLogo, MenuIcon, XIcon, GlobeIcon, ChevronDownIcon } from "@/components/icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"

const navigation = [
  { name: "Browse", href: "/browse" },
]

const languages = [
  { code: "en", name: "English" },
  { code: "am", name: "አማርኛ" },
]

function AuthAwareActions() {
  const router = useRouter()
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <>
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
        </Link>
        <Link href="/register">
          <Button size="sm">Get Started</Button>
        </Link>
      </>
    )
  }

  const initials = (user?.display_name || user?.name || "").split(" ").map((n: string) => n[0]).join("") || "U"

  return (
    <div className="flex items-center gap-3">
      <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        Dashboard
      </Link>
      <Button variant="ghost" size="sm" onClick={() => { logout(); router.push('/') }}>
        Sign out
      </Button>
      <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sm font-medium text-sidebar-foreground">
        {initials}
      </div>
    </div>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("en")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-x-12">
          <Link href="/" className="flex items-center gap-3">
            <BookNestLogo className="w-9 h-9" />
            <span className="text-xl font-semibold tracking-tight text-foreground">BookNest</span>
          </Link>

          <div className="hidden lg:flex lg:gap-x-8" />
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-4">
          {/* Move Browse next to the right-side actions so it's closer visually */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <GlobeIcon className="w-4 h-4" />
                {languages.find((l) => l.code === currentLang)?.name}
                <ChevronDownIcon className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setCurrentLang(lang.code)}>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth-aware actions */}
          <AuthAwareActions />
        </div>

        <div className="flex lg:hidden">
          <button type="button" className="p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-6 pb-6 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <AuthAwareActions />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
