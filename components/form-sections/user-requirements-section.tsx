"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFormContext, Controller } from "react-hook-form"

export default function UserRequirementsSection() {
  const { control } = useFormContext()

  const purposeOptions = [
    "Personal Project",
    "Business/Enterprise Solution",
    "Learning/Practice",
    "Startup/Product Development",
    "Open Source Contribution",
    "Research & Experimentation",
  ]

  const targetAudienceOptions = [
    "Developers",
    "Businesses",
    "General Consumers",
    "Students & Educators",
    "Researchers",
    "Internal Company Use",
  ]

  const projectTypeOptions = [
    "Web Application",
    "Mobile Application",
    "Desktop Software",
    "API/Backend Service",
    "AI/ML-based Project",
    "IoT (Internet of Things)",
    "Blockchain Application",
    "Game Development",
  ]

  const monetizationOptions = [
    "Free & Open Source",
    "Subscription-based",
    "One-time Purchase",
    "Ad-based Revenue",
    "In-app Purchases",
    "Commission/Fee-based Model",
    "No Monetization",
  ]

  return (
    <Card className="bg-slate-600/30 border-slate-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-blue-400">User Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="purpose" className="text-sm text-slate-300">
            What is the main goal of this project?
          </Label>
          <Controller
            name="purpose"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose a goal" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {purposeOptions.map((option, index) => (
                      <SelectItem key={index} value={option} className="text-white">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="audience" className="text-sm text-slate-300">
            Who will use the project?
          </Label>
          <Controller
            name="audience"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose an audience" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {targetAudienceOptions.map((option, index) => (
                      <SelectItem key={index} value={option} className="text-white">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectType" className="text-sm text-slate-300">
            What type of project do you need?
          </Label>
          <Controller
            name="projectType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose a project type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {projectTypeOptions.map((option, index) => (
                      <SelectItem key={index} value={option} className="text-white">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monetization" className="text-sm text-slate-300">
            How will the project generate revenue (if applicable)?
          </Label>
          <Controller
            name="monetization"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose monetization option" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {monetizationOptions.map((option, index) => (
                      <SelectItem key={index} value={option} className="text-white">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}

