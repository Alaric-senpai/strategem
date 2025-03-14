"use client"

import { Activity, CreditCard, FileText, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientActivity() {
  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Recent Activity</h1>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription className="text-slate-400">
              Recent actions and updates across your projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-slate-400" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">You created a new project: Website Redesign</p>
                  <p className="text-sm text-slate-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-slate-400" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">You invited 3 new team members</p>
                  <p className="text-sm text-slate-400">Yesterday at 11:34 AM</p>
                </div>
              </div>
              <div className="flex items-center">
                <Activity className="mr-2 h-4 w-4 text-slate-400" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">You completed the Mobile App Development milestone</p>
                  <p className="text-sm text-slate-400">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4 text-slate-400" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">Your subscription was renewed</p>
                  <p className="text-sm text-slate-400">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-slate-400" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">You completed the Marketing Campaign project</p>
                  <p className="text-sm text-slate-400">1 week ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-slate-400" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">You removed a team member from your workspace</p>
                  <p className="text-sm text-slate-400">2 weeks ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Activity className="mr-2 h-4 w-4 text-slate-400" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">You updated your profile information</p>
                  <p className="text-sm text-slate-400">3 weeks ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

