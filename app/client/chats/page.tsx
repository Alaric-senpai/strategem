"use client"

import { MessageSquare, Plus, Search } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ClientChats() {
  const [searchQuery, setSearchQuery] = useState("")

  const chats = [
    {
      id: "1",
      title: "Website Redesign Planning",
      lastMessage: "Let me help you plan the information architecture for your website redesign.",
      date: "2 hours ago",
    },
    {
      id: "2",
      title: "Mobile App Features",
      lastMessage: "Based on your requirements, I recommend including these core features in your MVP.",
      date: "Yesterday",
    },
    {
      id: "3",
      title: "Marketing Campaign Ideas",
      lastMessage: "Here are some content ideas for your upcoming seasonal campaign.",
      date: "3 days ago",
    },
    {
      id: "4",
      title: "E-commerce Integration",
      lastMessage: "To integrate payment processing, you'll need to consider these security aspects.",
      date: "1 week ago",
    },
    {
      id: "5",
      title: "SEO Strategy Discussion",
      lastMessage: "Let's analyze your current keyword performance and identify opportunities.",
      date: "2 weeks ago",
    },
  ]

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">AI Project Chats</h1>
          <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="gap-1" asChild>
                <Link href="/client/chats/new" className="gap-1">
                    <Plus className="h-4 w-4" />
                    New Chat
                </Link>
              </Button>
          </div>
        </div>

        <div className="flex w-full  items-center space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search chats..."
            className="bg-slate-800/60 border-slate-700 text-slate-100 w-11/12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="icon" variant="secondary" className="w-1/12">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader>
            <CardTitle className="text-teal-300 my-2">Recent Conversations</CardTitle>
            <CardDescription className="text-slate-400">
              Continue planning your projects with AI assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <Link href={`/client/chats/${chat.id}`} key={chat.id}>
                    <div className="flex items-start space-x-4 rounded-lg border border-slate-700 p-4 transition-colors hover:bg-slate-700/50 cursor-pointer">
                      <div className="rounded-full bg-slate-700 p-2">
                        <MessageSquare className="h-4 w-4 text-slate-300" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-slate-100">{chat.title}</p>
                        <p className="text-sm text-slate-400 line-clamp-1">{chat.lastMessage}</p>
                        <p className="text-xs text-slate-500">{chat.date}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageSquare className="h-12 w-12 text-slate-500 mb-4" />
                  <h3 className="text-lg font-medium text-slate-300">No chats found</h3>
                  <p className="text-sm text-slate-400 mt-1">Try adjusting your search or start a new chat</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

