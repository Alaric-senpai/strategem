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

export default function ProjectConstraintsSection() {
  const { control } = useFormContext()

  const projectDurationOptions = ["Short-Term (Less than 1 month)", "Medium-Term (1-6 months)", "Long-Term (6+ months)"]

  const teamSizeOptions = [
    "Solo Developer",
    "Small Team (2-5 members)",
    "Medium Team (6-15 members)",
    "Large Team (16+ members)",
  ]

  const budgetOptions = [
    "No Budget (Hobby/Personal Project)",
    "Small Budget ($0 - $1,000)",
    "Medium Budget ($1,000 - $10,000)",
    "Large Budget ($10,000+)",
  ]

  const maintenanceRequirementOptions = [
    "No Maintenance (One-time project)",
    "Low Maintenance (Occasional updates)",
    "High Maintenance (Frequent updates, ongoing development)",
  ]

  return (
    <Card className="bg-slate-600/30 border-slate-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-blue-400">Project Constraints</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-sm text-slate-300">
            What is your estimated project duration?
          </Label>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose duration" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {projectDurationOptions.map((option, index) => (
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
          <Label htmlFor="teamSize" className="text-sm text-slate-300">
            What is your team size?
          </Label>
          <Controller
            name="teamSize"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose team size" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {teamSizeOptions.map((option, index) => (
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
          <Label htmlFor="budget" className="text-sm text-slate-300">
            What is your budget range?
          </Label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose budget range" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {budgetOptions.map((option, index) => (
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
          <Label htmlFor="maintenance" className="text-sm text-slate-300">
            What are your expected maintenance requirements?
          </Label>
          <Controller
            name="maintenance"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose requirements" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {maintenanceRequirementOptions.map((option, index) => (
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

