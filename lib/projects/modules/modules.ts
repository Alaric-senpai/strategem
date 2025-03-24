import { DATABASE_ID, databases, MODULES_COLLECTION, SUBMODULES_COLLECTION } from "@/utils/database"
import type { Module, SubModule } from "@/lib/schemas"
import { ID } from "@/utils/appwrite"

// Maximum number of retries for database operations
const MAX_RETRIES = 3
// Delay between retries (in milliseconds)
const RETRY_DELAY = 1000

// Helper function to wait
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function RegisterModules(project: string, modules: Module[]) {
  try {
    for (const module of modules) {
      await CreateModule(project, module)
    }
  } catch (error) {
    console.error("Error in RegisterModules:", error)
    // Don't throw here, just log the error and continue
    // This allows partial success of module creation
    console.log("Some modules may not have been created properly")
  }
}

interface ModuleHolder {
  project_id: string
  name: string
  description: string
  estimated_hours: number
  dependencies?: string[]
  status?: string
}

export async function CreateModule(project: string, module: Module) {
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      // Validate input data
      if (!project || !module.module_name) {
        console.error("Invalid module data:", { project, moduleName: module.module_name })
        return null // Return null instead of throwing to allow other modules to be created
      }

      const data: ModuleHolder = {
        project_id: project,
        name: module.module_name,
        description: module.module_description || "",
        estimated_hours: module.estimated_effort_hours || 0,
        dependencies: module.dependencies || [],
        status: "pending", // Default status
      }

      const create = await databases.createDocument(DATABASE_ID, MODULES_COLLECTION, ID.unique(), data)

      if (!create.$id) {
        console.warn("Module creation returned without an ID:", module.module_name)
        retries++
        await wait(RETRY_DELAY)
        continue
      }

      console.log(`Successfully created module: ${module.module_name} with ID: ${create.$id}`)

      // Create submodules if they exist
      if (module.submodules && module.submodules.length > 0) {
        for (const submodule of module.submodules) {
          try {
            await createSubModule(create.$id, submodule)
          } catch (submoduleError) {
            // Log but continue with other submodules
            console.error(`Error creating submodule ${submodule.submodule_name}:`, submoduleError)
          }
        }
      }

      return create
    } catch (error: any) {
      console.error(`Attempt ${retries + 1} failed for module ${module.module_name}:`, error)

      // Check if it's a network error or rate limit (which might be temporary)
      if (error.code === 429 || error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
        retries++
        // Exponential backoff
        await wait(RETRY_DELAY * retries)
      } else {
        // For other errors, don't retry
        console.error("Non-recoverable error in CreateModule:", error)
        return null // Return null instead of throwing
      }
    }
  }

  console.error(`Failed to create module after ${MAX_RETRIES} attempts: ${module.module_name}`)
  return null // Return null after max retries
}

interface SubModuleHolder {
  module_id: string
  name: string
  description: string
  estimated_hours: number
  dependencies: string[]
  status?: string
}

export async function createSubModule(moduleId: string, submodule: SubModule) {
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      // Validate input data
      if (!moduleId || !submodule.submodule_name) {
        console.error("Invalid submodule data:", { moduleId, submoduleName: submodule.submodule_name })
        return null // Return null instead of throwing
      }

      const data: SubModuleHolder = {
        module_id: moduleId,
        name: submodule.submodule_name,
        description: submodule.submodule_description || "",
        estimated_hours: submodule.estimated_effort_hours || 0,
        dependencies: submodule.dependencies || [],
        status: "pending", // Default status
      }

      const create = await databases.createDocument(DATABASE_ID, SUBMODULES_COLLECTION, ID.unique(), data)

      if (!create.$id) {
        console.warn("Submodule creation returned without an ID:", submodule.submodule_name)
        retries++
        await wait(RETRY_DELAY)
        continue
      }

      console.log(`Successfully created submodule: ${submodule.submodule_name} with ID: ${create.$id}`)

      // Recursively create nested submodules
      if (submodule.submodules?.length > 0) {
        for (const nested of submodule.submodules) {
          try {
            await createSubModule(create.$id, nested)
          } catch (nestedError) {
            // Log but continue with other nested submodules
            console.error(`Error creating nested submodule ${nested.submodule_name}:`, nestedError)
          }
        }
      }

      return create
    } catch (error: any) {
      console.error(`Attempt ${retries + 1} failed for submodule ${submodule.submodule_name}:`, error)

      // Check if it's a network error or rate limit (which might be temporary)
      if (error.code === 429 || error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
        retries++
        // Exponential backoff
        await wait(RETRY_DELAY * retries)
      } else {
        // For other errors, don't retry
        console.error("Non-recoverable error in createSubModule:", error)
        return null // Return null instead of throwing
      }
    }
  }

  console.error(`Failed to create submodule after ${MAX_RETRIES} attempts: ${submodule.submodule_name}`)
  return null // Return null after max retries
}

