"use client"

import { Save, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function AdminSettings() {
  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Platform Settings</h1>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="bg-slate-800/60">
            <TabsTrigger value="general" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              General
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              API
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription className="text-slate-400">Manage your platform&apos;s general settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="platform-name" className="text-slate-200">
                    Platform Name
                  </Label>
                  <Input
                    id="platform-name"
                    defaultValue="Strategem"
                    className="bg-slate-800/60 border-slate-700 text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform-description" className="text-slate-200">
                    Platform Description
                  </Label>
                  <Textarea
                    id="platform-description"
                    defaultValue="A SaaS platform designed to help users select, plan, and execute software projects with AI-driven insights and collaborative features."
                    className="min-h-[100px] bg-slate-800/60 border-slate-700 text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-email" className="text-slate-200">
                    Support Email
                  </Label>
                  <Input
                    id="support-email"
                    type="email"
                    defaultValue="support@strategem.com"
                    className="bg-slate-800/60 border-slate-700 text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-slate-200">
                    Default Timezone
                  </Label>
                  <select
                    id="timezone"
                    className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2 text-slate-100"
                    defaultValue="UTC"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="CST">Central Time (CST)</option>
                    <option value="MST">Mountain Time (MST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode" className="text-slate-200">
                      Maintenance Mode
                    </Label>
                    <p className="text-xs text-slate-400">Temporarily disable access to the platform</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription className="text-slate-400">
                  Customize the look and feel of your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-200">Theme Mode</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="light"
                        name="theme"
                        className="rounded border-slate-600 bg-slate-800 text-primary"
                      />
                      <Label htmlFor="light" className="text-slate-300">
                        Light
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="dark"
                        name="theme"
                        className="rounded border-slate-600 bg-slate-800 text-primary"
                        defaultChecked
                      />
                      <Label htmlFor="dark" className="text-slate-300">
                        Dark
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="system"
                        name="theme"
                        className="rounded border-slate-600 bg-slate-800 text-primary"
                      />
                      <Label htmlFor="system" className="text-slate-300">
                        System
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">Primary Color</Label>
                  <div className="flex space-x-4">
                    {["blue", "purple", "green", "red", "orange"].map((color) => (
                      <div key={color} className="flex flex-col items-center space-y-2">
                        <div
                          className={`h-8 w-8 rounded-full cursor-pointer border-2 ${color === "blue" ? "border-white bg-blue-500" : "border-transparent"}`}
                          style={{ backgroundColor: `var(--${color}-500)` }}
                        ></div>
                        <span className="text-xs text-slate-300 capitalize">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo-upload" className="text-slate-200">
                    Logo
                  </Label>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-md bg-slate-700 flex items-center justify-center">
                      <span className="text-slate-400">Logo</span>
                    </div>
                    <Button variant="outline" className="border-slate-700">
                      Upload New
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="favicon-upload" className="text-slate-200">
                    Favicon
                  </Label>
                  <div className="flex items-center space-x-4">
                    <div className="h-8 w-8 rounded-md bg-slate-700 flex items-center justify-center">
                      <span className="text-slate-400 text-xs">Icon</span>
                    </div>
                    <Button variant="outline" className="border-slate-700">
                      Upload New
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="custom-css" className="text-slate-200">
                      Custom CSS
                    </Label>
                    <p className="text-xs text-slate-400">Apply custom CSS to your platform</p>
                  </div>
                  <Switch id="custom-css" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription className="text-slate-400">Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-100">Email Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-200">New User Registration</Label>
                      <p className="text-xs text-slate-400">Receive an email when a new user registers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-200">New Project Creation</Label>
                      <p className="text-xs text-slate-400">Receive an email when a new project is created</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-200">Subscription Changes</Label>
                      <p className="text-xs text-slate-400">Receive an email when a subscription is updated</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-200">System Alerts</Label>
                      <p className="text-xs text-slate-400">Receive critical system alerts and notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-100">In-App Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-200">User Activity</Label>
                      <p className="text-xs text-slate-400">Show notifications for user activity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-200">Project Updates</Label>
                      <p className="text-xs text-slate-400">Show notifications for project updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-200">System Announcements</Label>
                      <p className="text-xs text-slate-400">Show notifications for system announcements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription className="text-slate-400">Manage API keys and access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-200">API Access</Label>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm text-slate-300">Enable API access for developers</p>
                      <p className="text-xs text-slate-400">Allow external applications to connect to your platform</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">API Keys</Label>
                  <div className="rounded-md border border-slate-700 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-200">Production API Key</h4>
                        <p className="text-xs text-slate-400">Last used: 2 hours ago</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="bg-slate-700 px-3 py-1 rounded text-sm font-mono text-slate-300">
                          ••••••••••••••••
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-700">
                          Reveal
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-700">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border border-slate-700 p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-200">Development API Key</h4>
                        <p className="text-xs text-slate-400">Last used: 1 day ago</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="bg-slate-700 px-3 py-1 rounded text-sm font-mono text-slate-300">
                          ••••••••••••••••
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-700">
                          Reveal
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-700">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">Webhook Settings</Label>
                  <div className="rounded-md border border-slate-700 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-medium text-slate-200">Enable Webhooks</h4>
                        <p className="text-xs text-slate-400">Send event notifications to external URLs</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="webhook-url" className="text-slate-200">
                        Webhook URL
                      </Label>
                      <Input
                        id="webhook-url"
                        defaultValue="https://example.com/webhook"
                        className="bg-slate-800/60 border-slate-700 text-slate-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">Rate Limiting</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="number"
                      defaultValue="100"
                      className="w-24 bg-slate-800/60 border-slate-700 text-slate-100"
                    />
                    <span className="text-slate-300">requests per minute</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>Billing Settings</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage subscription plans and payment settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-200">Subscription Plans</Label>
                  <div className="space-y-4">
                    <div className="rounded-md border border-slate-700 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-slate-200">Pro Plan</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-slate-300">$29/month</span>
                          <Button variant="outline" size="sm" className="border-slate-700">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">Basic features for individuals and small teams</p>
                    </div>

                    <div className="rounded-md border border-slate-700 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-slate-200">Business Plan</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-slate-300">$99/month</span>
                          <Button variant="outline" size="sm" className="border-slate-700">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">Advanced features for growing businesses</p>
                    </div>

                    <div className="rounded-md border border-slate-700 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-slate-200">Enterprise Plan</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-slate-300">$299/month</span>
                          <Button variant="outline" size="sm" className="border-slate-700">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">Premium features for large organizations</p>
                    </div>

                    <Button variant="outline" className="w-full border-slate-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Plan
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">Payment Processor</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="stripe"
                        name="payment"
                        className="rounded border-slate-600 bg-slate-800 text-primary"
                        defaultChecked
                      />
                      <Label htmlFor="stripe" className="text-slate-300">
                        Stripe
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="paypal"
                        name="payment"
                        className="rounded border-slate-600 bg-slate-800 text-primary"
                      />
                      <Label htmlFor="paypal" className="text-slate-300">
                        PayPal
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-slate-200">
                    Default Currency
                  </Label>
                  <select
                    id="currency"
                    className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2 text-slate-100"
                    defaultValue="USD"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-200">Invoice Generation</Label>
                    <p className="text-xs text-slate-400">Automatically generate invoices for payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

