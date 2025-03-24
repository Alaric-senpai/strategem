"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Code,
  FileCode,
  Layers,
  LayoutGrid,
  MessageSquare,
  Clock,
} from "lucide-react"
import { useState, useTransition } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/schemas"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Toaster } from "./ui/sonner"
import { createProject } from "@/lib/projects/projects"
import { toast } from "sonner"

interface ProjectSuggestionProps {
  project: Project | undefined
  setProject: React.Dispatch<React.SetStateAction<Project | undefined>>
  loading: boolean
  generateProject: (prompt: string) => Promise<void>
  prevStep: () => void
  formData: Record<string, any>
}

export default function ProjectSuggestion({
  project,
  setProject,
  loading,
  generateProject,
  prevStep,
  formData,
}: ProjectSuggestionProps) {
  const [isPending, startTransition] = useTransition()
  const [isFormDataOpen, setIsFormDataOpen] = useState(true)

  // Count how many form fields have values
  const filledFieldsCount = Object.values(formData).filter((value) => value).length
  const totalFieldsCount = Object.keys(formData).length

  const genNewProject = () => {
    // Clear the existing project first
    setProject(undefined)

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
  }

const saveProject = async () => {
    if (!project) {
      toast.error('Project is not yet available')
      return
    }
    
    startTransition(async () => {
      try {
        // Ensure we're not mutating the original project object
        // Deep clone to avoid any reference issues
      
        
        console.log('Original Project', project)

        // // Ensure all required fields conform to the schema
        // if (!projectToSave.estimated_total_hours) {
        //   // Calculate total hours if not available
        //   projectToSave.estimated_total_hours = projectToSave.modules.reduce(
        //     (total, module) => total + module.estimated_effort_hours, 0
        //   )
        // }
        
        console.log("Project to save")
        // Submit via server action
        // const response = await createProject(projectToSave)

        const request = await fetch('/api/projects',{
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({ project })

        })

        const response = await request.json()

        console.log('api call request response', response)
        
        if (response.success) {
          toast.success(response.message)
        } else {
          toast.error(response.message)
        }
      } catch (error) {
        console.error("Error saving project:", error)
        toast.error(`Failed to save project: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    })
  }
  return (
    <>
      <Toaster position="top-right" />
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
            {project && <Button onClick={genNewProject}>Regenerate</Button>}
          </CardHeader>
          <CardContent>
            <Collapsible open={isFormDataOpen} onOpenChange={setIsFormDataOpen}>
              <CollapsibleTrigger asChild>
                <Button size="sm" className="h-8 w-full p-0">
                  {isFormDataOpen ? (
                    <span className="flex w-full px-4 flex-row-reverse items-center justify-between">
                      <ChevronUp className="h-4 w-4" /> Collapse
                    </span>
                  ) : (
                    <span className="flex w-full px-4 flex-row-reverse items-center justify-between">
                      <ChevronDown className="h-4 w-4" /> Expand
                    </span>
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-4">
                  {filledFieldsCount > 0 ? (
                    <div className="bg-slate-700/30 rounded-lg p-4 overflow-auto max-h-[300px] w-full m-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(formData).map(([key, value]) => value ? (
                          <div key={key} className="flex flex-col">
                            <span className="text-xs text-slate-400 capitalize">{key}</span>
                            <span className="text-sm text-white font-medium">{value as string}</span>
                          </div>
                        ) : null
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
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-blue-400">{project.project_title}</CardTitle>
                  <Badge className="bg-blue-500/20 text-blue-300 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {project.estimated_total_hours} hours
                  </Badge>
                </div>
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
                          <div className="flex justify-between w-full pr-4">
                            <span>{module.module_name}</span>
                            <Badge className="bg-blue-500/20 text-blue-300">
                              {module.estimated_effort_hours} hours
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4 border-l-2 border-slate-700 mb-4">
                            <p className="text-slate-300 mb-4">{module.module_description}</p>

                            {module.dependencies && module.dependencies.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-slate-400 mb-2">Dependencies:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {module.dependencies.map((dep, depIndex) => (
                                    <Badge
                                      key={depIndex}
                                      variant="outline"
                                      className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                                    >
                                      {dep}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {module.submodules && module.submodules.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="text-sm font-medium text-slate-400">Submodules:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {module.submodules.map((submodule, subIndex) => (
                                    <Card key={subIndex} className="bg-slate-700/30 border-slate-600">
                                      <CardHeader className="p-3 pb-2">
                                        <div className="flex justify-between items-start">
                                          <CardTitle className="text-sm text-blue-300">
                                            {submodule.submodule_name}
                                          </CardTitle>
                                          <Badge className="bg-blue-500/10 text-blue-300 text-xs">
                                            {submodule.estimated_effort_hours} hrs
                                          </Badge>
                                        </div>
                                      </CardHeader>
                                      <CardContent className="p-3 pt-0">
                                        <p className="text-xs text-slate-300 mb-2">{submodule.submodule_description}</p>

                                        {submodule.dependencies && submodule.dependencies.length > 0 && (
                                          <div className="mt-2">
                                            <h5 className="text-xs font-medium text-slate-400 mb-1">Dependencies:</h5>
                                            <div className="flex flex-wrap gap-1">
                                              {submodule.dependencies.map((dep: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, depIndex: React.Key | null | undefined) => (
                                                <Badge
                                                  key={depIndex}
                                                  variant="outline"
                                                  className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/20"
                                                >
                                                  {dep}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {submodule.submodules && submodule.submodules.length > 0 && (
                                          <div className="mt-2">
                                            <Accordion type="single" collapsible className="w-full">
                                              <AccordionItem value="nested-submodules" className="border-slate-600">
                                                <AccordionTrigger className="text-xs text-slate-400 py-1">
                                                  Nested Submodules ({submodule.submodules.length})
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                  <div className="space-y-2 mt-1">
                                                    {submodule.submodules.map((nestedSub: { submodule_name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; estimated_effort_hours: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; submodule_description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }, nestedIndex: React.Key | null | undefined) => (
                                                      <div
                                                        key={nestedIndex}
                                                        className="bg-slate-700/50 p-2 rounded border border-slate-600"
                                                      >
                                                        <div className="flex justify-between items-start">
                                                          <span className="text-xs font-medium text-blue-300">
                                                            {nestedSub.submodule_name}
                                                          </span>
                                                          <Badge className="bg-blue-500/10 text-blue-300 text-xs">
                                                            {nestedSub.estimated_effort_hours} hrs
                                                          </Badge>
                                                        </div>
                                                        <p className="text-xs text-slate-300 mt-1">
                                                          {nestedSub.submodule_description}
                                                        </p>
                                                      </div>
                                                    ))}
                                                  </div>
                                                </AccordionContent>
                                              </AccordionItem>
                                            </Accordion>
                                          </div>
                                        )}
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
                                  className={route.method === "GET"
                                    ? "bg-green-500/20 text-green-300 border-green-500/30"
                                    : route.method === "POST"
                                      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                      : route.method === "PUT"
                                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                        : route.method === "DELETE"
                                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                                          : "bg-slate-500/20 text-slate-300 border-slate-500/30"}
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

                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-blue-500/20 text-blue-300 flex items-center gap-1 px-3 py-1">
                        <Clock className="h-4 w-4" /> Total Effort: {project.estimated_total_hours} hours
                      </Badge>
                    </div>

                    <h4 className="text-md font-medium text-blue-300 mb-2">Key Features</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300 mb-4">
                      {project.modules.map((module, index) => (
                        <li key={index}>
                          <span className="font-medium">{module.module_name}</span>: {module.module_description}
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
            <Button onClick={genNewProject} className="bg-blue-500 hover:bg-blue-600" disabled={loading} size="lg">
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
          {project && 
          <Button 
            className="bg-green-500 hover:bg-green-600" 
            onClick={saveProject} 
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Project"}
          </Button>
        }
      </CardFooter>
    </Card>
    </>
  )
}

