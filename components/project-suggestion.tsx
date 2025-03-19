"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ChevronDown, ChevronUp, Code, FileCode, Layers, LayoutGrid, MessageSquare } from "lucide-react"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/schemas"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ProjectSuggestionProps {
  project: Project | undefined
  loading: boolean
  generateProject: (prompt: string) => Promise<void>
  prevStep: () => void
  formData: Record<string, any>
}

export default function ProjectSuggestion({
  project,
  loading,
  generateProject,
  prevStep,
  formData,
}: ProjectSuggestionProps) {
  const [isFormDataOpen, setIsFormDataOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Count how many form fields have values
  const filledFieldsCount = Object.values(formData).filter((value) => value).length
  const totalFieldsCount = Object.keys(formData).length

  return (
    <Card className="bg-slate-700/50 border-slate-700 border-2 rounded-[15px] mb-5">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Project Suggestion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form Data Display Section */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg text-blue-400">Form Data Submitted</CardTitle>
              <Badge className="px-2 py-0">
                {filledFieldsCount}/{totalFieldsCount} fields
              </Badge>
            </div>

          </CardHeader>
          <CardContent>
            <Collapsible open={isFormDataOpen} onOpenChange={setIsFormDataOpen}>
              <CollapsibleTrigger asChild>
                <Button  size="sm" className="h-8 w-full p-0">
                  {isFormDataOpen ? <span className="flex w-full px-4 flex-row-reverse items-center justify-between"><ChevronUp className="h-4 w-4" />  Collapse </span>  : <span className="flex w-full px-4 flex-row-reverse items-center justify-between"><ChevronDown className="h-4 w-4" />  Expand </span> }

                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-4 ">
                  {filledFieldsCount > 0 ? (
                    <div className="bg-slate-700/30 rounded-lg p-4 overflow-auto max-h-[300px] w-full m-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(formData).map(([key, value]) =>
                          value ? (
                            <div key={key} className="flex flex-col">
                              <span className="text-xs text-slate-400 capitalize">{key}</span>
                              <span className="text-sm text-white font-medium">{value as string}</span>
                            </div>
                          ) : null,
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                      <p className="text-slate-400">No form data submitted or all fields are empty.</p>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Project Display Section */}
        {project ? (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2 border-b border-slate-700">
              <div className="flex flex-col gap-2">
                <CardTitle className="text-xl text-blue-400">{project.project_title}</CardTitle>
                <p className="text-slate-300 text-sm">{project.description}</p>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs defaultValue="modules" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="modules" className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    <span className="hidden sm:inline">Modules</span>
                  </TabsTrigger>
                  <TabsTrigger value="technologies" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span className="hidden sm:inline">Technologies</span>
                  </TabsTrigger>
                  <TabsTrigger value="routes" className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    <span className="hidden sm:inline">Routes</span>
                  </TabsTrigger>
                  <TabsTrigger value="details" className="flex items-center gap-2">
                    <FileCode className="h-4 w-4" />
                    <span className="hidden sm:inline">Details</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="modules" className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    {project.modules.map((module, index) => (
                      <AccordionItem key={index} value={`module-${index}`} className="border-slate-700">
                        <AccordionTrigger className="text-blue-400 hover:text-blue-300">
                          {module.module_name}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4 border-l-2 border-slate-700 mb-4">
                            <p className="text-slate-300 mb-4">{module.module_description}</p>

                            {module.submodules && module.submodules.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="text-sm font-medium text-slate-400">Submodules:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {module.submodules.map((submodule, subIndex) => (
                                    <Card key={subIndex} className="bg-slate-700/30 border-slate-600">
                                      <CardHeader className="p-3 pb-2">
                                        <CardTitle className="text-sm text-blue-300">
                                          {submodule.submodule_name}
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-3 pt-0">
                                        <p className="text-xs text-slate-300">{submodule.submodule_description}</p>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>

                <TabsContent value="technologies" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(project.recommended_technologies).map(([category, techs]) => (
                      <Card key={category} className="bg-slate-700/30 border-slate-600">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-sm text-blue-300">{category}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="routes" className="space-y-4">
                  {project.suggested_routes && project.suggested_routes.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-slate-700">
                            <th className="text-left py-2 px-4 text-slate-400 font-medium">Path</th>
                            <th className="text-left py-2 px-4 text-slate-400 font-medium">Method</th>
                            <th className="text-left py-2 px-4 text-slate-400 font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.suggested_routes.map((route, index) => (
                            <tr key={index} className="border-b border-slate-700">
                              <td className="py-2 px-4 font-mono text-sm text-blue-300">{route.path}</td>
                              <td className="py-2 px-4">
                                <Badge
                                  variant="outline"
                                  className={
                                    route.method === "GET"
                                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                                      : route.method === "POST"
                                        ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                        : route.method === "PUT"
                                          ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                          : route.method === "DELETE"
                                            ? "bg-red-500/20 text-red-300 border-red-500/30"
                                            : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                                  }
                                >
                                  {route.method || "ANY"}
                                </Badge>
                              </td>
                              <td className="py-2 px-4 text-slate-300">{route.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                      <p className="text-slate-400">No routes suggested for this project.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-blue-400 mb-3">Project Overview</h3>
                    <p className="text-slate-300 mb-4">{project.description}</p>

                    <h4 className="text-md font-medium text-blue-300 mb-2">Key Features</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300 mb-4">
                      {project.modules.map((module, index) => (
                        <li key={index}>
                          {module.module_name}: {module.module_description}
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-md font-medium text-blue-300 mb-2">Technology Stack</h4>
                    <div className="space-y-2">
                      {Object.entries(project.recommended_technologies).map(([category, techs]) => (
                        <div key={category} className="flex flex-wrap items-center gap-2">
                          <span className="text-slate-400">{category}:</span>
                          <div className="flex flex-wrap gap-1">
                            {techs.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <div className="bg-slate-800 border-slate-700 rounded-lg p-8 text-center">
            <MessageSquare className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-200 mb-2">Generating Your Project</h3>
            <p className="text-slate-400 mb-6">
              {loading
                ? "We're creating a custom project based on your requirements..."
                : "Click the button below to generate a project based on your requirements."}
            </p>
            <Button
              onClick={() => {
                // Generate AI prompt dynamically
                const prompt = `
                  You are an AI project consultant. Based on the following user-provided project requirements, suggest a suitable project idea.
              
                  ### User Requirements:
                  - **Purpose:** ${formData.purpose || "Not specified"}
                  - **Target Audience:** ${formData.audience || "Not specified"}
                  - **Project Type:** ${formData.projectType || "Not specified"}
                  - **Monetization Model:** ${formData.monetization || "Not specified"}
                  - **Preferred Tech Stack:** ${formData.techStack || "Not specified"}
                  - **Framework:** ${formData.framework || "Not specified"}
                  - **Complexity Level:** ${formData.complexity || "Not specified"}
                  - **Scalability Needs:** ${formData.scalability || "Not specified"}
                  - **Security Requirements:** ${formData.security || "Not specified"}
                  - **Estimated Duration:** ${formData.duration || "Not specified"}
                  - **Team Size:** ${formData.teamSize || "Not specified"}
                  - **Budget:** ${formData.budget || "Not specified"}
                  - **Maintenance Expectation:** ${formData.maintenance || "Not specified"}
              
                  ### Instructions:
                  Generate a project idea that fits these constraints, including a description, relevant modules, technologies, and suggested routes where applicable.
                `
                generateProject(prompt)
              }}
              className="bg-blue-500 hover:bg-blue-600"
              disabled={loading}
              size="lg"
            >
              {loading ? "Generating..." : "Generate Project"}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t border-slate-600 pt-5">
        <Button
          variant="outline"
          onClick={prevStep}
          className="bg-transparent border-slate-500 hover:bg-slate-700 text-white"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Form
        </Button>
        {project && <Button className="bg-green-500 hover:bg-green-600">Save Project</Button>}
      </CardFooter>
    </Card>
  )
}

