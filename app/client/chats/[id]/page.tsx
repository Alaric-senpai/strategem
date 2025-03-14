"use client"

import { useState, use } from "react"
import { ArrowLeft, Send, User, Bot, Paperclip, MoreVertical } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ChatDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // Unwrap the promise

  const [message, setMessage] = useState("")

  const chatTitleMap: Record<string, string> = {
    "1": "Website Redesign Planning",
    "2": "Mobile App Features",
    "3": "Marketing Campaign Ideas",
    "4": "E-commerce Integration",
    "5": "SEO Strategy Discussion",
  }

  const chatTitle = chatTitleMap[id] || "Project Discussion"

  const messages = [
    {
      id: 1,
      sender: "ai",
      content: `Welcome back to our discussion about ${chatTitle}. How can I help you today?`,
      timestamp: "Just now",
    },
    {
      id: 2,
      sender: "user",
      content: "I need help planning the next phase of this project.",
      timestamp: "2 minutes ago",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col">
        <div className="border-b border-slate-700 bg-slate-800/60 p-4">
          <div className="flex items-center">
            <Link href="/client/chats" className="mr-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-white">{chatTitle}</h1>
              <p className="text-xs text-slate-400">AI-assisted project planning</p>
            </div>
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem>Create Project from Chat</DropdownMenuItem>
                  <DropdownMenuItem>Export Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Clear History</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.sender === "user" ? "bg-primary ml-2" : "bg-slate-700 mr-2"}`}>
                    {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`rounded-lg px-4 py-2 ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-slate-700 text-slate-100"}`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <div className="mt-1 text-xs opacity-70">{msg.timestamp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-700 bg-slate-800/60 p-4">
          <div className="flex items-end gap-2 max-w-3xl mx-auto">
            <Button variant="outline" size="icon" className="shrink-0 border-slate-700">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="relative flex-1">
              <Input
                placeholder="Type your message..."
                className="pr-10 bg-slate-800/60 border-slate-700 text-slate-100"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button className="shrink-0" onClick={handleSendMessage}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
