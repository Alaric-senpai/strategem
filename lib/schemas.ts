import { z } from "zod";

const SubmoduleSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    submodule_name: z.string(),
    submodule_description: z.string(),
    submodules: z.array(SubmoduleSchema).optional(), // Allows nested submodules
  })
);

const ModuleSchema = z.object({
  module_name: z.string(),
  module_description: z.string(),
  submodules: z.array(SubmoduleSchema).optional(),
});

const SuggestedRouteSchema = z.object({
  path: z.string(),
  method: z.string().optional(), // Optional since frontend routes may not have methods
  description: z.string(),
});

const ProjectSchema = z.object({
  project_title: z.string(),
  description: z.string(),
  modules: z.array(ModuleSchema),
  recommended_technologies: z.record(z.string(), z.array(z.string())), // Malleable field
  suggested_routes: z.array(SuggestedRouteSchema).optional(),
});

export default ProjectSchema;
export type Project = z.infer<typeof ProjectSchema>

