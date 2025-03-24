"use client"

import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import ProjectStyleSelector from "@/components/project-style-selector"
import PresetProjectForm from "@/components/preset-project-form"
import CustomProjectForm from "@/components/custom-project-form"
import ProjectSuggestion from "@/components/project-suggestion"
import type { Project } from "@/lib/schemas"

export default function NewProject() {
  // Initialize form methods at the top level to maintain state between steps
  const methods = useForm({
    defaultValues: {
      purpose: "",
      audience: "",
      projectType: "",
      monetization: "",
      techStack: "",
      framework: "",
      complexity: "",
      scalability: "",
      security: "",
      duration: "",
      teamSize: "",
      budget: "",
      maintenance: "",
    },
  })

  const [project, setProject] = useState<Project>()
  const [loading, setLoading] = useState(false)
  const [style, setStyle] = useState<string | undefined>(undefined)
  const [step, setStep] = useState(1)
  const [selectedTechStack, setSelectedTechStack] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const onSubmit = (data: any) => {
    setFormData(data)
    nextStep()
  }

  const generateProject = async (prompt: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (data && !data.error) {
        setProject(data.project) // Make sure this matches the response structure
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen md:w-11/12 m-auto text-white">
      <div className="container mx-auto py-8">
        <h1 className="font-bold text-3xl mb-6">Create a new project</h1>

        <FormProvider {...methods}>
          {step === 1 && <ProjectStyleSelector style={style} setStyle={setStyle} nextStep={nextStep} />}

          {step === 2 && style === "preset" && <PresetProjectForm prevStep={prevStep} />}

          {step === 2 && style === "custom" && (
            <CustomProjectForm
              prevStep={prevStep}
              onSubmit={methods.handleSubmit(onSubmit)}
              selectedTechStack={selectedTechStack}
              setSelectedTechStack={setSelectedTechStack}
              loading={loading}
            />
          )}

          {step === 3 && (
            <ProjectSuggestion
              project={project}
              setProject={setProject}
              loading={loading}
              generateProject={generateProject}
              prevStep={prevStep}
              formData={formData}
            />
          )}
        </FormProvider>
      </div>
    </div>
  )
}

