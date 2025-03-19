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
import { useEffect } from "react"

interface TechnicalPreferencesSectionProps {
  selectedTechStack: string | null
  setSelectedTechStack: (stack: string) => void
}

export default function TechnicalPreferencesSection({
  selectedTechStack,
  setSelectedTechStack,
}: TechnicalPreferencesSectionProps) {
  const { control, setValue, watch } = useFormContext()

  // Watch for changes to techStack field
  const techStackValue = watch("techStack")

  // Update the parent component's state when techStack changes
  useEffect(() => {
    if (techStackValue) {
      setSelectedTechStack(techStackValue)
    }
  }, [techStackValue, setSelectedTechStack])

  const techStackOptions = [
    "Frontend",
    "Backend",
    "Full-Stack",
    "AI/ML",
    "Blockchain",
    "IoT (Internet of Things)",
    "Game Development",
    "DevOps & Cloud",
  ]

  const frameworkLanguageOptions: Record<string, string[]> = {
    Frontend: ["React", "Angular", "Vue.js", "Svelte", "Next.js", "Nuxt.js", "SolidJS", "Qwik"],
    Backend: [
      "Node.js",
      "Django",
      "Flask",
      "Spring Boot",
      "Express.js",
      "FastAPI",
      "Ruby on Rails",
      "ASP.NET Core",
      "NestJS",
    ],
    "Full-Stack": [
      "MERN Stack",
      "MEAN Stack",
      "Next.js + Express",
      "Django + React",
      "Ruby on Rails + React",
      "Laravel + Vue",
      "ASP.NET Core + Angular",
    ],
    "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Hugging Face Transformers"],
    Blockchain: ["Ethereum (Solidity)", "Hyperledger Fabric", "Polkadot (Substrate)", "Cosmos SDK"],
    "IoT (Internet of Things)": ["Arduino", "Raspberry Pi", "ESP32", "Mbed OS", "Zephyr"],
    "Game Development": ["Unity", "Unreal Engine", "Godot", "Phaser"],
    "DevOps & Cloud": ["Docker", "Kubernetes", "Terraform", "Ansible", "Pulumi"],
  }

  const complexityOptions = ["Beginner", "Intermediate", "Advanced"]

  const scalabilityOptions = [
    "Small-scale (Personal or MVP)",
    "Medium-scale (Growing User Base)",
    "Enterprise-level (Highly Scalable & Distributed)",
  ]

  const securityOptions = [
    "Basic (Low-Sensitivity Data)",
    "Standard (Moderate Security Needs)",
    "High (Critical Data Protection)",
  ]

  return (
    <Card className="bg-slate-600/30 border-slate-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-blue-400">Technical Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="techStack" className="text-sm text-slate-300">
            What is your preferred tech stack?
          </Label>
          <Controller
            name="techStack"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  // Clear framework selection when tech stack changes
                  setValue("framework", "")
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose a stack" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {techStackOptions.map((option, index) => (
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
          <Label htmlFor="framework" className="text-sm text-slate-300">
            Do you have any preferred programming languages or frameworks?
          </Label>
          <Controller
            name="framework"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedTechStack}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder={selectedTechStack ? "Select framework" : "Select tech stack first"} />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  {selectedTechStack && (
                    <SelectGroup>
                      <SelectLabel className="text-slate-300">{selectedTechStack} options</SelectLabel>
                      {frameworkLanguageOptions[selectedTechStack]?.map((option, index) => (
                        <SelectItem key={index} value={option} className="text-white">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="complexity" className="text-sm text-slate-300">
            What is the expected complexity of the project?
          </Label>
          <Controller
            name="complexity"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose complexity option" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {complexityOptions.map((option, index) => (
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
          <Label htmlFor="scalability" className="text-sm text-slate-300">
            How scalable should the project be?
          </Label>
          <Controller
            name="scalability"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose scalability option" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {scalabilityOptions.map((option, index) => (
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
          <Label htmlFor="security" className="text-sm text-slate-300">
            How important is security in this project?
          </Label>
          <Controller
            name="security"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Choose security level" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectGroup>
                    <SelectLabel className="text-slate-300">Available options</SelectLabel>
                    {securityOptions.map((option, index) => (
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

