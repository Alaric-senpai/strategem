"use client"

import { CreditCard, Download, FileBarChart, FileText, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

export default function ClientDashboard() {

  const [plan, setPlan]=useState<'free'| 'personal'| 'business'| 'enterprise'| undefined>(undefined)

  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">My Dashboard</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="gap-1 hidden">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button size="sm" variant="secondary" className="p-2" asChild>
              <Link href={'/client/projects/new'} className="gap-4">
              <Plus className="h-4 w-4" />
              New Project
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">My Projects</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8</div>
              <p className="text-xs text-slate-400">2 active, 6 completed</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Active Plan</CardTitle>
              <FileBarChart className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">free tier</div>
              <p className="text-xs text-slate-400">3 pending invitations</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Remaining Projects </CardTitle>
              <CreditCard className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">42</div>
              <p className="text-xs text-slate-400">of 100 projects</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2 bg-slate-800/60 border-slate-700 w-full">
            <CardHeader>
              <CardTitle className="text-emerald-300">Quick Actions</CardTitle>
              <CardDescription className="text-slate-400">Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="h-20 justify-start border-slate-700 bg-slate-800/30 text-left">
                  <div>
                    <div className="font-semibold text-slate-100">Create New Project</div>
                    <div className="text-xs text-slate-400">Start a new project from scratch</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-20 justify-start border-slate-700 bg-slate-800/30 text-left">
                  <div>
                    <div className="font-semibold text-slate-100">Invite Team Member</div>
                    <div className="text-xs text-slate-400">Add someone to your workspace</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-20 justify-start border-slate-700 bg-slate-800/30 text-left">
                  <div>
                    <div className="font-semibold text-slate-100">View Reports</div>
                    <div className="text-xs text-slate-400">See your project analytics</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-20 justify-start border-slate-700 bg-slate-800/30 text-left">
                  <div>
                    <div className="font-semibold text-slate-100">Manage Account</div>
                    <div className="text-xs text-slate-400">Update your plan and billing</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700 w-full">
            <CardHeader>
              <CardTitle className="text-emerald-300">My Plan</CardTitle>
              <CardDescription className="text-slate-400">Your current subscription</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* <div className="flex flex-col gap-2 rounded-lg border border-slate-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Business Plan</div>
                  <div className="text-sm font-medium text-primary">Active</div>
                </div>
                <div className="text-sm text-slate-400">$99/month</div>
                <div className="mt-2 text-sm">
                  <div className="flex items-center justify-between py-1">
                    <span>Next billing date</span>
                    <span className="font-medium">June 15, 2023</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Payment method</span>
                    <span className="font-medium">•••• 4242</span>
                  </div>
                </div>
              </div> */}
              {plan}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

