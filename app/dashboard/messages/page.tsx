"use client"

import { useState } from "react"
import { MessagesSidebar } from "@/components/dashboard/messages-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontalIcon } from "@/components/icons"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
}

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      senderId: "author",
      content:
        "Hi! I noticed you've been reading Atomic Habits. Do you have any questions about the concepts in the book?",
      timestamp: "Yesterday at 3:45 PM",
    },
    {
      id: "2",
      senderId: "user",
      content: "Yes! I was wondering about habit stacking. How do you recommend implementing it for morning routines?",
      timestamp: "Yesterday at 4:12 PM",
    },
    {
      id: "3",
      senderId: "author",
      content:
        "Great question! The key is to start with an existing habit you already do consistently. For morning routines, I recommend anchoring new habits to things like brushing your teeth or making coffee.",
      timestamp: "Today at 9:30 AM",
    },
    {
      id: "4",
      senderId: "author",
      content: "Thanks for your question about habit stacking!",
      timestamp: "2 minutes ago",
    },
  ],
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | undefined>("1")
  const [newMessage, setNewMessage] = useState("")

  const messages = selectedConversation ? mockMessages[selectedConversation] || [] : []

  const handleSend = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-8">
      <MessagesSidebar selectedId={selectedConversation} onSelect={setSelectedConversation} />

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-background">
        {selectedConversation ? (
          <>
            {/* Chat header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="James Clear" />
                  <AvatarFallback className="bg-primary/10 text-primary">JC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">James Clear</h3>
                    <span className="px-1.5 py-0.5 text-xs rounded bg-primary/10 text-primary">Author</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Author of Atomic Habits</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontalIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => {
                const isUser = message.senderId === "user"
                return (
                  <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-md ${isUser ? "order-2" : "order-1"}`}>
                      {!isUser && (
                        <Avatar className="h-8 w-8 mb-2">
                          <AvatarImage src="/placeholder.svg" alt="James Clear" />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">JC</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p className={`text-xs text-muted-foreground mt-1 ${isUser ? "text-right" : "text-left"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-3">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend}>Send</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  )
}
