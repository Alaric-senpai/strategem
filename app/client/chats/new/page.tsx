// chats/new/page.tsx
"use client"

import { useState } from "react"
import { ArrowLeft, Send, User, Bot, Paperclip } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function NewChat() {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Starting new chat with message:", message)
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
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-white">New Conversation</h1>
              <p className="text-xs text-slate-400">Start a new AI-assisted project discussion</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="bg-slate-800/60 border-slate-700 text-center p-6">
            <CardContent className="pt-6">
              <Bot className="h-12 w-12 mx-auto text-slate-500 mb-4" />
              <h3 className="text-lg font-medium text-slate-300">Start a new conversation</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                Describe your project idea, and I will help you plan it out with requirements, timelines, and technical considerations.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="border-t border-slate-700 bg-slate-800/60 p-4">
          <div className="flex items-center gap-2 max-w-3xl mx-auto ">
            <Button size="icon" className="shrink-0 border-slate-700">
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
