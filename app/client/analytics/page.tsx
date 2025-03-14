"use client"

import { Download, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ClientAnalytics() {
  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">My Analytics</h1>
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
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8</div>
              <p className="text-xs text-green-500">+2 from last period</p>
              <div className="mt-4 h-[60px] w-full bg-slate-950/20 rounded-md flex items-end">
                {[40, 30, 45, 25, 60, 75, 65].map((height, i) => (
                  <div key={i} className="flex-1 mx-[1px] bg-primary/80" style={{ height: `${height}%` }}></div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Tasks Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">42</div>
              <p className="text-xs text-green-500">+8 from last period</p>
              <div className="mt-4 h-[60px] w-full bg-slate-950/20 rounded-md flex items-end">
                {[35, 55, 45, 60, 75, 65, 80].map((height, i) => (
                  <div key={i} className="flex-1 mx-[1px] bg-blue-500/80" style={{ height: `${height}%` }}></div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Storage Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">42.8 GB</div>
              <p className="text-xs text-yellow-500">+5.2 GB from last period</p>
              <div className="mt-4 flex items-center">
                <div className="h-2 flex-1 rounded-full bg-slate-700">
                  <div className="h-full w-[42.8%] rounded-full bg-yellow-500"></div>
                </div>
                <span className="ml-2 text-xs text-slate-400">42.8%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Team Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">High</div>
              <p className="text-xs text-green-500">+12% from last period</p>
              <div className="mt-4 h-[60px] w-full bg-slate-950/20 rounded-md flex items-end">
                {[25, 45, 35, 70, 60, 85, 75].map((height, i) => (
                  <div key={i} className="flex-1 mx-[1px] bg-green-500/80" style={{ height: `${height}%` }}></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
              <CardDescription className="text-slate-400">
                Completion rate and progress across all projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-slate-700 rounded-md">
                <div className="text-center">
                  <div className="relative h-40 w-40 mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">68%</div>
                        <div className="text-xs text-slate-400">Avg. Completion</div>
                      </div>
                    </div>
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle className="stroke-slate-700 fill-none" cx="50" cy="50" r="40" strokeWidth="10" />
                      <circle
                        className="stroke-primary fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset="80.4"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-medium">2</div>
                      <div className="text-xs text-slate-400">Completed</div>
                    </div>
                    <div>
                      <div className="text-lg font-medium">6</div>
                      <div className="text-xs text-slate-400">In Progress</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
              <CardDescription className="text-slate-400">Breakdown of tasks by status and category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-slate-700 rounded-md">
                <div className="w-full max-w-md space-y-6 px-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Completed</span>
                      </div>
                      <span className="text-sm font-medium">42 (38%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-700">
                      <div className="h-full w-[38%] rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">In Progress</span>
                      </div>
                      <span className="text-sm font-medium">35 (32%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-700">
                      <div className="h-full w-[32%] rounded-full bg-blue-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm">Not Started</span>
                      </div>
                      <span className="text-sm font-medium">33 (30%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-700">
                      <div className="h-full w-[30%] rounded-full bg-yellow-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

