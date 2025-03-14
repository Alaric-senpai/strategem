"use client"

import { MoreHorizontal, Plus, ArrowUpRight, Clock, Calendar } from "lucide-react"
import Link from "next/link"

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

// Project data with additional fields
const projects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved UX",
    status: "Active",
    updated: "2 hours ago",
    progress: 65,
    color: "blue",
    team: ["SJ", "MC", "AR"],
    dueDate: "Jul 30, 2023",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Cross-platform mobile application with offline capabilities",
    status: "Active",
    updated: "Yesterday",
    progress: 42,
    color: "purple",
    team: ["MC", "JT"],
    dueDate: "Aug 15, 2023",
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Seasonal marketing campaign for product launch",
    status: "Completed",
    updated: "3 days ago",
    progress: 100,
    color: "green",
    team: ["SJ", "EW"],
    dueDate: "Jun 10, 2023",
  },
  {
    id: "4",
    name: "Brand Identity",
    description: "Brand refresh including logo, color palette and style guide",
    status: "Completed",
    updated: "1 week ago",
    progress: 100,
    color: "amber",
    team: ["SJ", "MC"],
    dueDate: "May 28, 2023",
  },
  {
    id: "5",
    name: "E-commerce Platform",
    description: "Online store with product catalog, cart and payment processing",
    status: "Completed",
    updated: "2 weeks ago",
    progress: 100,
    color: "pink",
    team: ["AR", "JT", "EW"],
    dueDate: "May 15, 2023",
  },
  {
    id: "6",
    name: "Social Media Strategy",
    description: "Content strategy and posting schedule for social platforms",
    status: "Completed",
    updated: "1 month ago",
    progress: 100,
    color: "indigo",
    team: ["SJ", "EW"],
    dueDate: "Apr 30, 2023",
  },
  {
    id: "7",
    name: "Content Creation",
    description: "Blog posts, videos and infographics for marketing",
    status: "Completed",
    updated: "2 months ago",
    progress: 100,
    color: "rose",
    team: ["EW"],
    dueDate: "Mar 15, 2023",
  },
  {
    id: "8",
    name: "SEO Optimization",
    description: "Technical and content SEO improvements for better rankings",
    status: "Completed",
    updated: "3 months ago",
    progress: 100,
    color: "cyan",
    team: ["AR", "JT"],
    dueDate: "Feb 28, 2023",
  },
]

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-slate-800/60 border-slate-700 overflow-hidden transition-all hover:shadow-lg hover:border-slate-600 relative"
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-md ${getColorClass(project.color)}`}
                  >
                    <span className="text-lg font-semibold">{getProjectInitials(project.name)}</span>
                  </div>
                  <div className="z-10">
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
                        className="w-[180px] bg-slate-800 border-slate-700"
                      >
                        <DropdownMenuItem>
                          <Link href={`/client/projects/${project.id}`} className="w-full flex">
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
                <CardTitle className="mt-3 text-lg font-semibold text-slate-100">{project.name}</CardTitle>
                <CardDescription className="text-slate-400 line-clamp-2 min-h-[40px]">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center mb-2">
                  <Badge
                    variant="outline"
                    className={`${project.status === "Active" ? "border-green-500 text-green-500" : "border-slate-500 text-slate-400"}`}
                  >
                    {project.status}
                  </Badge>
                  <div className="text-xs text-slate-400 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {project.updated}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-slate-400">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        project.status === "Completed" ? "bg-green-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {project.team.map((member, i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs font-medium text-slate-300"
                    >
                      {member}
                    </div>
                  ))}
                </div>
                <div className="flex items-center text-xs text-slate-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  {project.dueDate}
                </div>
              </CardFooter>
              <Link href={`/client/projects/${project.id}`} className="absolute inset-0 z-0 hover:z-10">
                <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/10 transition-colors group">
                  <div className="absolute right-3 bottom-3 bg-primary text-primary-foreground rounded-full p-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

