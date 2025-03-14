"use client"

import { useState } from "react"
import { Download, MoreHorizontal, Plus, Search, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AdminProjects() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const projects = [
    {
      id: 1,
      name: "Collaborative Task Manager",
      owner: "Sarah Johnson",
      category: "Web Development",
      status: "Active",
      modules: 8,
      created: "2023-01-15",
      updated: "2023-05-10",
    },
    {
      id: 2,
      name: "E-commerce Platform",
      owner: "Michael Chen",
      category: "Web Development",
      status: "Active",
      modules: 12,
      created: "2023-02-21",
      updated: "2023-05-08",
    },
    {
      id: 3,
      name: "AI Image Generator",
      owner: "Emma Wilson",
      category: "AI & Machine Learning",
      status: "Active",
      modules: 6,
      created: "2023-03-10",
      updated: "2023-05-12",
    },
    {
      id: 4,
      name: "Mobile Fitness App",
      owner: "James Rodriguez",
      category: "Mobile Development",
      status: "Completed",
      modules: 10,
      created: "2023-01-05",
      updated: "2023-04-20",
    },
    {
      id: 5,
      name: "Personal Finance Tracker",
      owner: "Olivia Taylor",
      category: "Web Development",
      status: "Inactive",
      modules: 7,
      created: "2023-04-18",
      updated: "2023-04-30",
    },
    {
      id: 6,
      name: "Smart Home Controller",
      owner: "William Brown",
      category: "IoT",
      status: "Active",
      modules: 9,
      created: "2023-02-14",
      updated: "2023-05-11",
    },
    {
      id: 7,
      name: "Blockchain Wallet",
      owner: "Sophia Martinez",
      category: "Blockchain",
      status: "Active",
      modules: 11,
      created: "2023-01-20",
      updated: "2023-05-09",
    },
    {
      id: 8,
      name: "Cybersecurity Scanner",
      owner: "Benjamin Lee",
      category: "Cybersecurity",
      status: "Archived",
      modules: 8,
      created: "2023-03-25",
      updated: "2023-04-15",
    },
    {
      id: 9,
      name: "Cloud Storage Solution",
      owner: "Isabella Garcia",
      category: "Cloud Computing",
      status: "Active",
      modules: 9,
      created: "2023-02-08",
      updated: "2023-05-07",
    },
    {
      id: 10,
      name: "Social Media Analytics",
      owner: "Ethan Clark",
      category: "Data Engineering",
      status: "Inactive",
      modules: 6,
      created: "2023-04-05",
      updated: "2023-04-28",
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      categoryFilter === "all" || project.category.toLowerCase().includes(categoryFilter.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Projects</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1 border-slate-700">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </div>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Project Management</CardTitle>
              <CardDescription className="text-slate-400">Manage all projects across the platform</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search projects..."
                      className="bg-slate-800/60 border-slate-700 text-slate-100"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" size="icon" variant="secondary">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px] bg-slate-800/60 border-slate-700 text-slate-100">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                      <SelectItem value="ai">AI & Machine Learning</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                      <SelectItem value="iot">IoT</SelectItem>
                      <SelectItem value="cloud">Cloud Computing</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="data">Data Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] bg-slate-800/60 border-slate-700 text-slate-100">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border border-slate-700">
                <Table>
                  <TableHeader className="bg-slate-800/50">
                    <TableRow className="border-slate-700 hover:bg-slate-800/70">
                      <TableHead className="text-slate-300">Project Name</TableHead>
                      <TableHead className="text-slate-300">Owner</TableHead>
                      <TableHead className="text-slate-300">Category</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Modules</TableHead>
                      <TableHead className="text-slate-300">Last Updated</TableHead>
                      <TableHead className="text-slate-300 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow key={project.id} className="border-slate-700 hover:bg-slate-800/70">
                        <TableCell className="font-medium text-slate-200">{project.name}</TableCell>
                        <TableCell className="text-slate-300">{project.owner}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            <Tag className="h-3 w-3 mr-1" />
                            {project.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              project.status === "Active"
                                ? "bg-green-500/20 text-green-500"
                                : project.status === "Inactive"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : project.status === "Completed"
                                    ? "bg-blue-500/20 text-blue-500"
                                    : "bg-slate-500/20 text-slate-400"
                            }`}
                          >
                            {project.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-300">{project.modules}</TableCell>
                        <TableCell className="text-slate-300">
                          {new Date(project.updated).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Project</DropdownMenuItem>
                              <DropdownMenuItem>View Modules</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {project.status === "Active" ? (
                                <DropdownMenuItem className="text-yellow-500">Mark as Inactive</DropdownMenuItem>
                              ) : project.status === "Inactive" ? (
                                <DropdownMenuItem className="text-green-500">Mark as Active</DropdownMenuItem>
                              ) : project.status === "Completed" ? (
                                <DropdownMenuItem className="text-slate-400">Archive Project</DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-blue-500">Restore Project</DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-500">Delete Project</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  Showing <strong>{filteredProjects.length}</strong> of <strong>{projects.length}</strong> projects
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="border-slate-700">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-700">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

