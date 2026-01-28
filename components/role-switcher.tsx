"use client"

import type React from "react"

import { useAuth, type UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookIcon, PenIcon, ShieldIcon, ChevronDownIcon, LogOutIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const roles: { id: UserRole; name: string; icon: React.ElementType; color: string }[] = [
  { id: "reader", name: "Reader", icon: BookIcon, color: "text-blue-500" },
  { id: "author", name: "Author", icon: PenIcon, color: "text-amber-500" },
  { id: "admin", name: "Admin", icon: ShieldIcon, color: "text-rose-500" },
]

export function RoleSwitcher() {
  const { user, switchRole, logout } = useAuth()

  if (!user) return null

  const currentRole = roles.find((r) => r.id === user.role) || roles[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <currentRole.icon className={cn("w-4 h-4", currentRole.color)} />
          {currentRole.name}
          <ChevronDownIcon className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            onClick={() => switchRole(role.id)}
            className={cn("gap-2", user.role === role.id && "bg-accent")}
          >
            <role.icon className={cn("w-4 h-4", role.color)} />
            {role.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="gap-2 text-destructive">
          <LogOutIcon className="w-4 h-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
