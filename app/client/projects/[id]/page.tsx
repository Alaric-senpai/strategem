/* eslint-disable @next/next/no-img-element */
"use client"

import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  MoreHorizontal,
  Plus,
  Code,
  GitBranch,
  Check,
  X,
  Play,
  Pause,
} from "lucide-react"
import Link from "next/link"
import { useState, use, useEffect } from "react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Badge } from "@/components/ui/badge"

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [projectData, setProjectData] = useState<any | null>(null)

  const { id } = use(params) // Unwrap the promise

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/projects/${id}`, { method: "GET" })

        if (!response.ok) {
          throw new Error("Error when fetching project: Server returned an error")
        }

        const data = await response.json()

        // Check if the API response indicates failure
        if (data.success === false) {
          throw new Error(data.message || "API returned an error")
        }

        setProjectData(data)
        console.log(data)
      } catch (err: any) {
        console.error("Project fetch error:", err)
        setError(err.message || "Failed to fetch project details")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  // Error UI component for reuse
  const ErrorDisplay = ({ message }: { message: string }) => (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/client/projects" className="flex items-center text-sm text-slate-300 hover:text-white">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Projects
          </Link>
        </div>
        <div className="flex items-center justify-center flex-1 text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-md p-6 text-red-500 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Error Loading Project</h3>
            <p className="mb-4">{message}</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
              >
                Try Again
              </Button>
              <Link href="/client/projects">
                <Button variant="default">Return to Projects</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col dark">
        <Toaster position="top-right" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <Link href="/client/projects" className="flex items-center text-sm text-slate-300 hover:text-white">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Projects
            </Link>
          </div>
          <div className="flex items-center justify-center flex-1">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full border-4 border-t-blue-500 border-b-transparent border-l-transparent border-r-transparent animate-spin mb-4"></div>
              <p className="text-slate-400">Loading project details...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !projectData) {
    return <ErrorDisplay message={error || "Failed to load project data"} />
  }

  // Validate that we have the expected data structure
  if (!projectData.title || !projectData.$id) {
    return <ErrorDisplay message="Invalid project data structure received from server" />
  }

  // Calculate total hours and completed hours
  const totalHours = projectData.estimated_hours || 0
  const completedHours = 0 // This would be calculated from actual data
  const progress = totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0

  // Count modules and submodules
  const moduleCount = projectData.modules?.length || 0
  const submoduleCount =
    projectData.modules?.reduce((count: number, module: any) => count + (module.submodules?.length || 0), 0) || 0

  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <Toaster position="top-right" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/client/projects" className="flex items-center text-sm text-slate-300 hover:text-white">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{projectData.title}</h1>
            <p className="text-sm text-slate-400">{projectData.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-700 bg-teal-500 hover:bg-teal-500/50 duration-300 ease-linear transition-all"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Project
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4 text-white " />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white">
                <DropdownMenuItem
                  onClick={() => {
                    toast.info("Coming soon")
                  }}
                >
                  Duplicate Project
                </DropdownMenuItem>
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
              <div className="text-2xl font-bold text-white capitalize">{projectData.status || "Not Started"}</div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-slate-400">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-slate-700" />
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
                  <span className="text-xs text-slate-400">Created</span>
                  <span className="text-xs font-medium text-emerald-300">
                    {new Date(projectData.$createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Last Updated</span>
                  <span className="text-xs font-medium text-emerald-300">
                    {new Date(projectData.$updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-700">
                <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Modules</CardTitle>
              <Code className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{moduleCount} Modules</div>
              <div className="mt-2 text-sm text-slate-400">{submoduleCount} Submodules</div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded bg-blue-500/20 px-2 py-1 text-center text-blue-500">
                  {projectData.modules?.filter((m: any) => m.status === "in-progress").length || 0} In Progress
                </div>
                <div className="rounded bg-yellow-500/20 px-2 py-1 text-center text-yellow-500">
                  {projectData.modules?.filter((m: any) => m.status === "pending").length || 0} Pending
                </div>
                <div className="rounded bg-green-500/20 px-2 py-1 text-center text-green-500">
                  {projectData.modules?.filter((m: any) => m.status === "completed").length || 0} Completed
                </div>
                <div className="rounded bg-red-500/20 px-2 py-1 text-center text-slate-400">
                  {projectData.modules?.filter((m: any) => m.status === "cancelled").length || 0} Cancelled
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Estimated Time</CardTitle>
              <Clock className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalHours} Hours</div>
              <div className="mt-2 text-sm text-slate-400">
                {completedHours} hours completed ({progress}%)
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 text-xs">
                <div className="rounded bg-slate-700 px-3 py-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">Time Remaining</span>
                    <span className="text-slate-300">{totalHours - completedHours} hours</span>
                  </div>
                  <Progress value={progress} className="h-1.5 bg-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="modules" className="space-y-4">
          <TabsList className="bg-teal-800/60 text-blue-400 w-full md:w-max">
            <TabsTrigger value="modules" className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white">
              Modules
            </TabsTrigger>
            <TabsTrigger value="tech" className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white">
              Tech Stack
            </TabsTrigger>
            <TabsTrigger value="routes" className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white">
              API Routes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-emerald-300 my-2">Project Modules</CardTitle>
                  <CardDescription className="text-slate-400">Manage and track your project modules</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
              </CardHeader>
              <CardContent>
                {projectData.modules && projectData.modules.length > 0 ? (
                  <div className="space-y-6">
                    {projectData.modules.map((module: any) => (
                      <div key={module.$id} className="rounded-lg border border-slate-700 overflow-hidden">
                        <div className="flex items-center justify-between p-4 bg-slate-800">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  module.status === "completed"
                                    ? "bg-green-500"
                                    : module.status === "in-progress"
                                      ? "bg-blue-500"
                                      : "bg-yellow-500"
                                }`}
                              ></div>
                              <h3 className="font-medium text-slate-100">{module.name}</h3>
                            </div>
                            <p className="text-xs text-slate-400">{module.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {module.estimated_hours} hours
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4 text-white" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white">
                                <DropdownMenuItem>Edit Module</DropdownMenuItem>
                                <DropdownMenuItem>Change Status</DropdownMenuItem>
                                <DropdownMenuItem>Add Submodule</DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500">Delete Module</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {module.submodules && module.submodules.length > 0 && (
                          <div className="p-4 pt-0">
                            <div className="mt-4 space-y-2">
                              {module.submodules.map((submodule: any) => (
                                <ContextMenu key={submodule.$id}>
                                  <ContextMenuTrigger>
                                    <div className="flex items-center justify-between rounded-md border border-slate-700 my-2 p-3 bg-slate-800/50 cursor-context-menu">
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                          <div
                                            className={`h-1.5 w-1.5 rounded-full ${
                                              submodule.status === "completed"
                                                ? "bg-green-500"
                                                : submodule.status === "in-progress"
                                                  ? "bg-blue-500"
                                                  : "bg-yellow-500"
                                            }`}
                                          ></div>
                                          <h4 className="text-sm font-medium text-slate-200">{submodule.name}</h4>
                                        </div>
                                        <p className="text-xs text-slate-400">{submodule.description}</p>
                                      </div>
                                      <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                                        {submodule.estimated_hours} hours
                                      </Badge>
                                    </div>
                                  </ContextMenuTrigger>
                                  <ContextMenuContent className="bg-slate-800 border-slate-700 text-white min-w-[220px]">
                                    <ContextMenuLabel>{submodule.name}</ContextMenuLabel>
                                    <ContextMenuSeparator />
                                    <ContextMenuItem onClick={() => toast.info(`Editing ${submodule.name}`)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Submodule
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                      onClick={() => toast.info(`Viewing details for ${submodule.name}`)}
                                    >
                                      <Code className="h-4 w-4 mr-2" />
                                      View Details
                                    </ContextMenuItem>
                                    <ContextMenuSeparator />
                                    <ContextMenuItem
                                      onClick={() => toast.info(`Marking ${submodule.name} as completed`)}
                                    >
                                      <Check className="h-4 w-4 mr-2 text-green-500" />
                                      Mark as Completed
                                    </ContextMenuItem>
                                    <ContextMenuItem onClick={() => toast.info(`Starting ${submodule.name}`)}>
                                      <Play className="h-4 w-4 mr-2 text-blue-500" />
                                      Start Work
                                    </ContextMenuItem>
                                    <ContextMenuItem onClick={() => toast.info(`Pausing ${submodule.name}`)}>
                                      <Pause className="h-4 w-4 mr-2 text-yellow-500" />
                                      Pause Work
                                    </ContextMenuItem>
                                    <ContextMenuSeparator />
                                    <ContextMenuItem
                                      className="text-red-500"
                                      onClick={() => toast.error(`Deleting ${submodule.name}`)}
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Delete Submodule
                                    </ContextMenuItem>
                                  </ContextMenuContent>
                                </ContextMenu>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 border border-dashed border-slate-700 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-slate-400">No modules found for this project</p>
                      <Button size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Module
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tech">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription className="text-slate-400">Technologies used in this project</CardDescription>
              </CardHeader>
              <CardContent>
                {projectData.techstack && projectData.techstack.length > 0 ? (
                  <div className="space-y-4">
                    {projectData.techstack.map((tech: string, index: number) => {
                      const [category, technologies] = tech.split(": ")
                      return (
                        <div key={index} className="rounded-lg border border-slate-700 p-4">
                          <h3 className="font-medium text-slate-100 mb-2 capitalize">{category}</h3>
                          <div className="flex flex-wrap gap-2">
                            {technologies.split(", ").map((item: string, idx: number) => (
                              <Badge key={idx} className="bg-slate-700 hover:bg-slate-600 text-slate-200">
                                {item.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 border border-dashed border-slate-700 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-slate-400">No tech stack information available</p>
                      <Button size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Tech Stack
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>API Routes</CardTitle>
                  <CardDescription className="text-slate-400">Suggested API endpoints for this project</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Route
                </Button>
              </CardHeader>
              <CardContent>
                {projectData.routes && projectData.routes.length > 0 ? (
                  <div className="space-y-4">
                    {projectData.routes.map((route: any) => (
                      <div
                        key={route.$id}
                        className="flex items-center justify-between rounded-lg border border-slate-700 p-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`${
                                route.method === "GET"
                                  ? "bg-green-500/20 text-green-500"
                                  : route.method === "POST"
                                    ? "bg-blue-500/20 text-blue-500"
                                    : route.method === "PUT"
                                      ? "bg-amber-500/20 text-amber-500"
                                      : "bg-red-500/20 text-red-500"
                              }`}
                            >
                              {route.method}
                            </Badge>
                            <h3 className="font-medium text-slate-100 font-mono">{route.path}</h3>
                          </div>
                          <p className="text-xs text-slate-400">{route.description}</p>
                        </div>
                        <GitBranch className="h-4 w-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 border border-dashed border-slate-700 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-slate-400">No API routes defined for this project</p>
                      <Button size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Route
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

