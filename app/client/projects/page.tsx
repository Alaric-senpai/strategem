"use client"

import { MoreHorizontal, Plus, ArrowUpRight, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Function to get project initials
const getProjectInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()
}

// Function to get color class based on project color
const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/20 text-blue-500",
    purple: "bg-purple-500/20 text-purple-500",
    green: "bg-green-500/20 text-green-500",
    amber: "bg-amber-500/20 text-amber-500",
    pink: "bg-pink-500/20 text-pink-500",
    indigo: "bg-indigo-500/20 text-indigo-500",
    rose: "bg-rose-500/20 text-rose-500",
    cyan: "bg-cyan-500/20 text-cyan-500",
  }

  return colorMap[color] || "bg-slate-500/20 text-slate-500"
}

export default function ClientProjects() {
  const [totalProjects, setTotalProjects] = useState<number>(0)
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/projects")
        if (!res.ok) throw new Error("Failed to fetch projects")

        const data = await res.json()
        console.log("API Response:", data)

        if (data.success && data.records) {
          setTotalProjects(data.records.total || 0)
          setProjects(data.records.documents || [])
        } else {
          throw new Error(data.message || "Unexpected API response")
        }
      } catch (err: any) {
        console.error("Fetch error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">My Projects</h1>
          <div className="ml-auto">
            <Link href="/client/projects/new">
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-slate-400">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-md p-4 text-red-500">
            <p>Error: {error} . Try reloading</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-slate-400 mb-4">No projects found</p>
            <Link href="/client/projects/new">
              <Button size="sm" variant="outline" className="gap-1">
                <Plus className="h-4 w-4" />
                Create your first project
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <Card
                key={project.$id}
                className="bg-slate-800/60 rounded-2xl border-slate-700 overflow-hidden transition-all hover:shadow-lg hover:border-slate-600 relative ring-2 hover:ring-blue-500 ring-offset-transparent"
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500">
                      <span className="text-lg font-semibold">{getProjectInitials(project.title)}</span>
                    </div>
                    <div className="z-20">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="bottom"
                          align="end"
                          className="w-[180px] bg-slate-800 border-slate-700 z-30"
                        >
                          <DropdownMenuItem>
                            <Link href={`/client/projects/${project.$id}`} className="w-full flex">
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardTitle className="mt-3 text-lg font-semibold text-slate-100">{project.title}</CardTitle>
                  <CardDescription className="text-slate-400 line-clamp-2 min-h-[40px]">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-between items-center mb-2">
                    <Badge
                      variant="outline"
                      className={` rounded-lg ${
                        project.status === "not-started"
                          ? "border-gray-500 text-gray-500"
                          : "border-green-500 text-green-500"
                      }`}
                    >
                      {project.status}
                    </Badge>
                    <div className="text-xs text-slate-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(project.$updatedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-slate-400">0%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: "0%" }}></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs font-medium text-slate-300">
                      U2
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-slate-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    N/A
                  </div>
                </CardFooter>
                <Link href={`/client/projects/${project.$id}`} className="absolute inset-0 z-0 hover:z-5">
                  <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/10 transition-colors group">
                    <div className="absolute right-3 bottom-3 bg-primary text-primary-foreground rounded-full p-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                      <ArrowUpRight size={26} className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

