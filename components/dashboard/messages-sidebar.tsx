"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, PenIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unread: boolean
  isAuthor?: boolean
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "James Clear",
    lastMessage: "Thanks for your question about habit stacking!",
    timestamp: "2m ago",
    unread: true,
    isAuthor: true,
  },
  {
    id: "2",
    name: "Sarah Chen",
    lastMessage: "Have you read the chapter on...",
    timestamp: "1h ago",
    unread: false,
  },
  {
    id: "3",
    name: "David Epstein",
    lastMessage: "I'd love to hear your thoughts on Range",
    timestamp: "3h ago",
    unread: true,
    isAuthor: true,
  },
  {
    id: "4",
    name: "BookNest Support",
    lastMessage: "Your subscription has been renewed",
    timestamp: "1d ago",
    unread: false,
  },
]

interface MessagesSidebarProps {
  selectedId?: string
  onSelect: (id: string) => void
}

export function MessagesSidebar({ selectedId, onSelect }: MessagesSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-80 border-r border-border bg-card h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Messages</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <PenIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "w-full p-4 text-left hover:bg-muted/50 transition-colors border-b border-border",
              selectedId === conversation.id && "bg-muted",
            )}
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-medium", conversation.unread && "text-foreground")}>
                      {conversation.name}
                    </span>
                    {conversation.isAuthor && (
                      <span className="px-1.5 py-0.5 text-xs rounded bg-primary/10 text-primary">Author</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                </div>
                <p
                  className={cn(
                    "text-sm truncate",
                    conversation.unread ? "text-foreground font-medium" : "text-muted-foreground",
                  )}
                >
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread && <div className="w-2 h-2 rounded-full bg-primary mt-2" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
