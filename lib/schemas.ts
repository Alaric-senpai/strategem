/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod"

// Modified schema that makes nested submodules truly optional without minimum size constraints
const SubmoduleSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    submodule_name: z.string(),
    submodule_description: z.string(),
    estimated_effort_hours: z.number().min(1), // Effort estimation in hours
    dependencies: z.array(z.string()).optional(), // List of dependent submodules
    // Remove the min(2) constraint to make it truly optional with any number of items
    submodules: z.array(z.lazy(() => SubmoduleSchema)).optional(),
  }),
)

const ModuleSchema = z.object({
  module_name: z.string(),
  module_description: z.string(),
  estimated_effort_hours: z.number().min(2), // Minimum effort estimation
  dependencies: z.array(z.string()).optional(), // Dependencies on other modules
  submodules: z.array(SubmoduleSchema).min(1), // Enforce at least 3 submodules per module
})

const SuggestedRouteSchema = z.object({
  path: z.string(),
  method: z.string().optional(), // Optional since frontend routes may not have methods
  description: z.string(),
})

const ProjectSchema = z.object({
  project_title: z.string(),
  description: z.string(),
  modules: z.array(ModuleSchema).min(5), // Enforce at least 5 modules
  recommended_technologies: z.record(z.string(), z.array(z.string())), // Malleable field
  suggested_routes: z.array(SuggestedRouteSchema).optional(),
  estimated_total_hours: z.number(), // Optional but useful for planning
})

export default ProjectSchema
export type Project = z.infer<typeof ProjectSchema>

export type Module = z.infer<typeof ModuleSchema>
export type SubModule = z.infer<typeof SubmoduleSchema>

export type projectRoute = z.infer<typeof SuggestedRouteSchema>



