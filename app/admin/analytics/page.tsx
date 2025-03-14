"use client"

import { Calendar, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminAnalytics() {
  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Analytics</h1>
          <div className="ml-auto flex items-center gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px] bg-slate-800/60 border-slate-700 text-slate-100">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" className="gap-1 border-slate-700">
              <Calendar className="h-4 w-4" />
              Custom Range
            </Button>
            <Button size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-slate-800/60">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Users
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Projects
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Revenue
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-slate-800/60 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-100">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">573</div>
                  <p className="text-xs text-green-500">+18 from last month</p>
                  <div className="mt-4 h-[60px] w-full bg-slate-950/20 rounded-md flex items-end">
                    {[40, 30, 45, 25, 60, 75, 65].map((height, i) => (
                      <div key={i} className="flex-1 mx-[1px] bg-primary/80" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-100">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">249</div>
                  <p className="text-xs text-green-500">+12 from last month</p>
                  <div className="mt-4 h-[60px] w-full bg-slate-950/20 rounded-md flex items-end">
                    {[35, 55, 45, 60, 75, 65, 80].map((height, i) => (
                      <div key={i} className="flex-1 mx-[1px] bg-blue-500/80" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-100">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">$4,395</div>
                  <p className="text-xs text-green-500">+7% from last month</p>
                  <div className="mt-4 h-[60px] w-full bg-slate-950/20 rounded-md flex items-end">
                    {[25, 45, 35, 70, 60, 85, 75].map((height, i) => (
                      <div key={i} className="flex-1 mx-[1px] bg-green-500/80" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-100">Active Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">342</div>
                  <p className="text-xs text-green-500">+4 from last month</p>
                  <div className="mt-4 h-[60px] w-full bg-slate-950/20 rounded-md flex items-end">
                    {[45, 50, 55, 60, 65, 70, 75].map((height, i) => (
                      <div key={i} className="flex-1 mx-[1px] bg-purple-500/80" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-slate-800/60 border-slate-700">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription className="text-slate-400">New user registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border border-slate-700 rounded-md">
                    <p className="text-slate-400">User growth chart would appear here</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border-slate-700">
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription className="text-slate-400">Revenue by subscription plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border border-slate-700 rounded-md">
                    <p className="text-slate-400">Revenue breakdown chart would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <CardDescription className="text-slate-400">Detailed user statistics and demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] flex items-center justify-center border border-slate-700 rounded-md">
                  <p className="text-slate-400">User analytics dashboard would appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>Project Analytics</CardTitle>
                <CardDescription className="text-slate-400">Project creation and completion metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] flex items-center justify-center border border-slate-700 rounded-md">
                  <p className="text-slate-400">Project analytics dashboard would appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription className="text-slate-400">
                  Financial performance and subscription metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] flex items-center justify-center border border-slate-700 rounded-md">
                  <p className="text-slate-400">Revenue analytics dashboard would appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

