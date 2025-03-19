"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import UserRequirementsSection from "./form-sections/user-requirements-section"
import TechnicalPreferencesSection from "./form-sections/technical-preference-section"
import ProjectConstraintsSection from "./form-sections/project-constraints-section"

interface CustomProjectFormProps {
  prevStep: () => void
  onSubmit: () => void // Changed to accept the wrapped handleSubmit function
  selectedTechStack: string | null
  setSelectedTechStack: (stack: string) => void
  loading: boolean
}

export default function CustomProjectForm({
  prevStep,
  onSubmit,
  selectedTechStack,
  setSelectedTechStack,
  loading,
}: CustomProjectFormProps) {
  return (
    <Card className="bg-slate-700/50 border-slate-700 border-2 rounded-[15px] mb-5">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Setting up a custom project</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <UserRequirementsSection />
            <TechnicalPreferencesSection
              selectedTechStack={selectedTechStack}
              setSelectedTechStack={setSelectedTechStack}
            />
            <ProjectConstraintsSection />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-slate-600 pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="bg-transparent border-slate-500 hover:bg-slate-700 text-white"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={loading}>
            {loading ? "Generating..." : "Generate Project"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

