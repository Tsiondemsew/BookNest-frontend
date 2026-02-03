"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import {
  BookNestLogo,
  HomeIcon,
  BookIcon,
  LibraryIcon,
  ChartIcon,
  MessageIcon,
  FireIcon,
  SearchIcon,
  BellIcon,
  UploadIcon,
  UsersIcon,
  ShieldIcon,
  DollarIcon,
  StarIcon,
  LogOutIcon,
} from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { RoleSwitcher } from "@/components/role-switcher"

type UserRole = "reader" | "author" | "admin"

interface SidebarProps {
  userRole?: UserRole
  userName?: string
  userAvatar?: string
}

const readerNavigation = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "My Library", href: "/dashboard/library", icon: LibraryIcon },
  { name: "Browse", href: "/browse", icon: SearchIcon },
  { name: "Progress", href: "/dashboard/progress", icon: ChartIcon },
  { name: "Messages", href: "/dashboard/messages", icon: MessageIcon },
]

const authorNavigation = [
  { name: "Dashboard", href: "/author", icon: HomeIcon },
  { name: "My Books", href: "/author/books", icon: BookIcon },
  { name: "Upload", href: "/author/upload", icon: UploadIcon },
  { name: "Analytics", href: "/author/analytics", icon: ChartIcon },
  { name: "Earnings", href: "/author/earnings", icon: DollarIcon },
  { name: "Reviews", href: "/author/reviews", icon: StarIcon },
  { name: "Messages", href: "/dashboard/messages", icon: MessageIcon },
]

const adminNavigation = [
  { name: "Overview", href: "/admin", icon: HomeIcon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Books", href: "/admin/books", icon: BookIcon },
  { name: "Reports", href: "/admin/reports", icon: ShieldIcon },
  { name: "Analytics", href: "/admin/analytics", icon: ChartIcon },
]

export function Sidebar({ userRole, userName, userAvatar }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Use auth context values if available, otherwise fall back to props
  const role = user?.role || userRole || "reader"
  const name = user?.display_name || userName || "Guest"
  const avatar = user?.avatar || userAvatar

  const navigation = role === "admin" ? adminNavigation : (role === "author" || role === "publisher") ? authorNavigation : readerNavigation

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <BookNestLogo className="w-8 h-8" />
          <span className="text-lg font-semibold text-sidebar-foreground">BookNest</span>
        </div>

        {/* Search */}
        {/* <div className="px-4 py-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-9 pl-9 pr-4 text-sm bg-sidebar-accent rounded-lg border-0 outline-none focus:ring-2 focus:ring-sidebar-ring placeholder:text-muted-foreground"
            />
          </div>
        </div> */}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Reading Streak Card (for reader/author) */}
          {role == "reader" && (
            <div className="mt-6 mx-1 p-4 rounded-xl bg-linear-to-br from-accent/20 to-accent/5 border border-accent/20">
              <div className="flex items-center gap-2 text-accent">
                <FireIcon className="w-5 h-5" />
                <span className="font-semibold">7 Day Streak!</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Keep reading to maintain your streak.</p>
              <div className="mt-3 flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={cn("w-4 h-4 rounded-sm", i < 5 ? "bg-accent" : "bg-accent/30")} />
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Role Switcher - for demo purposes
        <div className="px-4 py-3 border-t border-sidebar-border">
          <RoleSwitcher />
        </div> */}

        {/* User section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
              <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground">
                {name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{name}</p>
              <p className="text-xs text-muted-foreground capitalize">{role}</p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent">
                <BellIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={logout}
              >
                <LogOutIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
