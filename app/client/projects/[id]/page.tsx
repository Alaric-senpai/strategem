/* eslint-disable @next/next/no-img-element */
"use client"

import { ArrowLeft, Calendar, Clock, Edit, MoreHorizontal, Plus, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProjectDetail({ params }: { params: { id: string } }) {
  // This would normally come from an API call using the params.id
  const project = {
    id: params.id,
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved user experience.",
    status: "In Progress",
    progress: 65,
    startDate: "May 15, 2023",
    endDate: "July 30, 2023",
    category: "Web Development",
    teamSize: 5,
    tasks: [
      { id: 1, name: "Research & Planning", status: "Completed", assignee: "You", dueDate: "May 25, 2023" },
      { id: 2, name: "Wireframing", status: "Completed", assignee: "Sarah Johnson", dueDate: "June 10, 2023" },
      { id: 3, name: "Visual Design", status: "In Progress", assignee: "Michael Chen", dueDate: "June 30, 2023" },
      {
        id: 4,
        name: "Frontend Development",
        status: "In Progress",
        assignee: "Alex Rodriguez",
        dueDate: "July 15, 2023",
      },
      { id: 5, name: "Backend Integration", status: "Not Started", assignee: "Jamie Taylor", dueDate: "July 25, 2023" },
      { id: 6, name: "Testing & QA", status: "Not Started", assignee: "You", dueDate: "July 28, 2023" },
    ],
    team: [
      { id: 1, name: "You (Project Owner)", role: "Project Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 2, name: "Sarah Johnson", role: "UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 3, name: "Michael Chen", role: "UI Designer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 4, name: "Alex Rodriguez", role: "Frontend Developer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 5, name: "Jamie Taylor", role: "Backend Developer", avatar: "/placeholder.svg?height=40&width=40" },
    ],
  }

  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/client/projects" className="flex items-center text-sm text-slate-300 hover:text-white">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{project.name}</h1>
            <p className="text-sm text-slate-400">{project.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-slate-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Project
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                <DropdownMenuItem>Duplicate Project</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">Archive Project</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{project.status}</div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-slate-400">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2 bg-slate-700" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Timeline</CardTitle>
              <Calendar className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Start Date</span>
                  <span className="text-xs font-medium">{project.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">End Date</span>
                  <span className="text-xs font-medium">{project.endDate}</span>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-700">
                <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Team</CardTitle>
              <Users className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{project.teamSize} Members</div>
              <div className="mt-4 flex -space-x-2">
                {project.team.slice(0, 4).map((member) => (
                  <div
                    key={member.id}
                    className="h-8 w-8 rounded-full border-2 border-slate-800 bg-slate-700 overflow-hidden"
                  >
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                {project.team.length > 4 && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-800 bg-slate-700 text-xs font-medium">
                    +{project.team.length - 4}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Tasks</CardTitle>
              <Clock className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{project.tasks.length} Tasks</div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded bg-green-500/20 px-2 py-1 text-center text-green-500">
                  {project.tasks.filter((t) => t.status === "Completed").length} Completed
                </div>
                <div className="rounded bg-blue-500/20 px-2 py-1 text-center text-blue-500">
                  {project.tasks.filter((t) => t.status === "In Progress").length} In Progress
                </div>
                <div className="rounded bg-yellow-500/20 px-2 py-1 text-center text-yellow-500">
                  {project.tasks.filter((t) => t.status === "Not Started").length} Not Started
                </div>
                <div className="rounded bg-slate-500/20 px-2 py-1 text-center text-slate-400">
                  <Button variant="ghost" size="sm" className="h-5 w-full p-0">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Task
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tasks" className="space-y-4">
          <TabsList className="bg-slate-800/60">
            <TabsTrigger value="tasks" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Team
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Files
            </TabsTrigger>
            <TabsTrigger
              value="discussions"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              Discussions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Project Tasks</CardTitle>
                  <CardDescription className="text-slate-400">Manage and track your project tasks</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between rounded-lg border border-slate-700 p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              task.status === "Completed"
                                ? "bg-green-500"
                                : task.status === "In Progress"
                                  ? "bg-blue-500"
                                  : "bg-yellow-500"
                            }`}
                          ></div>
                          <h3 className="font-medium text-slate-100">{task.name}</h3>
                        </div>
                        <div className="flex gap-4 text-xs text-slate-400">
                          <span>Assignee: {task.assignee}</span>
                          <span>Due: {task.dueDate}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
                          <DropdownMenuItem>Reassign</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Delete Task</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription className="text-slate-400">People working on this project</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.team.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between rounded-lg border border-slate-700 p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-slate-700 overflow-hidden">
                          <img
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-100">{member.name}</h3>
                          <p className="text-xs text-slate-400">{member.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>Project Files</CardTitle>
                <CardDescription className="text-slate-400">Documents and assets for this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40 border border-dashed border-slate-700 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-slate-400">No files uploaded yet</p>
                    <Button size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>Project Discussions</CardTitle>
                <CardDescription className="text-slate-400">Team conversations about this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40 border border-dashed border-slate-700 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-slate-400">No discussions started yet</p>
                    <Button size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Start Discussion
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

