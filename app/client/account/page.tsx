"use client"

import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ClientAccount() {
  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">My Account</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2 bg-slate-800/60 border-slate-700">
            <CardHeader>
              <CardTitle>Account Usage</CardTitle>
              <CardDescription className="text-slate-400">Your current resource usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Storage</div>
                  <div className="text-sm text-slate-400">42.8 GB of 100 GB</div>
                </div>
                <Progress value={42.8} className="h-2 bg-slate-700" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Projects</div>
                  <div className="text-sm text-slate-400">8 of 20</div>
                </div>
                <Progress value={40} className="h-2 bg-slate-700" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Team Members</div>
                  <div className="text-sm text-slate-400">12 of 15</div>
                </div>
                <Progress value={80} className="h-2 bg-slate-700" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">API Calls</div>
                  <div className="text-sm text-slate-400">8,542 of 50,000</div>
                </div>
                <Progress value={17} className="h-2 bg-slate-700" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader>
              <CardTitle>Membership Plan</CardTitle>
              <CardDescription className="text-slate-400">Your current plan and usage</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-col gap-2 rounded-lg border border-slate-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Business Plan</div>
                  <div className="text-sm font-medium text-primary">Active</div>
                </div>
                <div className="text-sm text-slate-400">$99/month</div>
                <div className="mt-2 text-sm">
                  <div className="flex items-center justify-between py-1">
                    <span>Billing cycle</span>
                    <span className="font-medium">Monthly</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Next billing date</span>
                    <span className="font-medium">June 15, 2023</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Payment method</span>
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-3 w-3" />
                      <span className="font-medium">•••• 4242</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full">Upgrade Plan</Button>
              <Button variant={'secondary'} className="w-full border-slate-700">
                Manage Billing
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

