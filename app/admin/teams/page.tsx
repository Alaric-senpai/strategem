"use client"

import { useState } from "react"
import { Download, MoreHorizontal, Plus, Search, Users } from "lucide-react"

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminTeams() {
  const [searchQuery, setSearchQuery] = useState("")

  const teams = [
    { id: 1, name: "Design Team", owner: "Sarah Johnson", members: 8, projects: 12, created: "2023-01-15" },
    { id: 2, name: "Frontend Developers", owner: "Michael Chen", members: 6, projects: 8, created: "2023-02-21" },
    { id: 3, name: "Backend Engineers", owner: "Emma Wilson", members: 5, projects: 7, created: "2023-03-10" },
    { id: 4, name: "DevOps Team", owner: "James Rodriguez", members: 4, projects: 5, created: "2023-01-05" },
    { id: 5, name: "Product Management", owner: "Olivia Taylor", members: 3, projects: 10, created: "2023-04-18" },
    { id: 6, name: "QA Testers", owner: "William Brown", members: 7, projects: 9, created: "2023-02-14" },
    { id: 7, name: "Data Science", owner: "Sophia Martinez", members: 5, projects: 6, created: "2023-01-20" },
    { id: 8, name: "Mobile Developers", owner: "Benjamin Lee", members: 4, projects: 5, created: "2023-03-25" },
  ]

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.owner.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Teams</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1 border-slate-700">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Create Team
            </Button>
          </div>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Team Management</CardTitle>
              <CardDescription className="text-slate-400">Manage teams and their members</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search teams..."
                      className="bg-slate-800/60 border-slate-700 text-slate-100"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" size="icon" variant="secondary">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-slate-700">
                <Table>
                  <TableHeader className="bg-slate-800/50">
                    <TableRow className="border-slate-700 hover:bg-slate-800/70">
                      <TableHead className="text-slate-300">Team Name</TableHead>
                      <TableHead className="text-slate-300">Owner</TableHead>
                      <TableHead className="text-slate-300">Members</TableHead>
                      <TableHead className="text-slate-300">Projects</TableHead>
                      <TableHead className="text-slate-300">Created</TableHead>
                      <TableHead className="text-slate-300 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeams.map((team) => (
                      <TableRow key={team.id} className="border-slate-700 hover:bg-slate-800/70">
                        <TableCell className="font-medium text-slate-200">
                          <div className="flex items-center space-x-2">
                            <div className="rounded-md bg-slate-700 p-2">
                              <Users className="h-4 w-4 text-slate-300" />
                            </div>
                            <span>{team.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300">{team.owner}</TableCell>
                        <TableCell className="text-slate-300">{team.members}</TableCell>
                        <TableCell className="text-slate-300">{team.projects}</TableCell>
                        <TableCell className="text-slate-300">{new Date(team.created).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem>View Team</DropdownMenuItem>
                              <DropdownMenuItem>Edit Team</DropdownMenuItem>
                              <DropdownMenuItem>Manage Members</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">Delete Team</DropdownMenuItem>
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
                  Showing <strong>{filteredTeams.length}</strong> of <strong>{teams.length}</strong> teams
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

