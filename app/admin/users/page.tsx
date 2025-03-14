"use client"

import { useState } from "react"
import { Download, MoreHorizontal, Search, UserPlus } from "lucide-react"

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

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Admin",
      status: "Active",
      projects: 8,
      joined: "2023-01-15",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@example.com",
      role: "User",
      status: "Active",
      projects: 5,
      joined: "2023-02-21",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@example.com",
      role: "User",
      status: "Active",
      projects: 3,
      joined: "2023-03-10",
    },
    {
      id: 4,
      name: "James Rodriguez",
      email: "james.r@example.com",
      role: "Developer",
      status: "Active",
      projects: 12,
      joined: "2023-01-05",
    },
    {
      id: 5,
      name: "Olivia Taylor",
      email: "olivia.t@example.com",
      role: "User",
      status: "Inactive",
      projects: 2,
      joined: "2023-04-18",
    },
    {
      id: 6,
      name: "William Brown",
      email: "william.b@example.com",
      role: "Developer",
      status: "Active",
      projects: 7,
      joined: "2023-02-14",
    },
    {
      id: 7,
      name: "Sophia Martinez",
      email: "sophia.m@example.com",
      role: "Admin",
      status: "Active",
      projects: 10,
      joined: "2023-01-20",
    },
    {
      id: 8,
      name: "Benjamin Lee",
      email: "benjamin.l@example.com",
      role: "User",
      status: "Suspended",
      projects: 0,
      joined: "2023-03-25",
    },
    {
      id: 9,
      name: "Isabella Garcia",
      email: "isabella.g@example.com",
      role: "Developer",
      status: "Active",
      projects: 6,
      joined: "2023-02-08",
    },
    {
      id: 10,
      name: "Ethan Clark",
      email: "ethan.c@example.com",
      role: "User",
      status: "Inactive",
      projects: 1,
      joined: "2023-04-05",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Users</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1 border-slate-700">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-1">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>User Management</CardTitle>
              <CardDescription className="text-slate-400">
                Manage your platform users and their permissions
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search users..."
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
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px] bg-slate-800/60 border-slate-700 text-slate-100">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="user">User</SelectItem>
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
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border border-slate-700">
                <Table>
                  <TableHeader className="bg-slate-800/50">
                    <TableRow className="border-slate-700 hover:bg-slate-800/70">
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Email</TableHead>
                      <TableHead className="text-slate-300">Role</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Projects</TableHead>
                      <TableHead className="text-slate-300">Joined</TableHead>
                      <TableHead className="text-slate-300 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-slate-700 hover:bg-slate-800/70">
                        <TableCell className="font-medium text-slate-200">{user.name}</TableCell>
                        <TableCell className="text-slate-300">{user.email}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.role === "Admin"
                                ? "bg-blue-500/20 text-blue-500"
                                : user.role === "Developer"
                                  ? "bg-purple-500/20 text-purple-500"
                                  : "bg-slate-500/20 text-slate-400"
                            }`}
                          >
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.status === "Active"
                                ? "bg-green-500/20 text-green-500"
                                : user.status === "Inactive"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-red-500/20 text-red-500"
                            }`}
                          >
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-300">{user.projects}</TableCell>
                        <TableCell className="text-slate-300">{new Date(user.joined).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Reset Password</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "Active" ? (
                                <DropdownMenuItem className="text-yellow-500">Deactivate User</DropdownMenuItem>
                              ) : user.status === "Inactive" ? (
                                <DropdownMenuItem className="text-green-500">Activate User</DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-green-500">Unsuspend User</DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-500">Delete User</DropdownMenuItem>
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
                  Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
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

