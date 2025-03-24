"use server"

import { ID } from "@/utils/appwrite"
import {
  DATABASE_ID,
  databases,
  MODULES_COLLECTION,
  PROJECTS_COLLECTION,
  ROUTES_COLLECTION,
  SUBMODULES_COLLECTION,
} from "@/utils/database"
import type { Project } from "../schemas"
import { currentUser } from "@clerk/nextjs/server"
import { RegisterModules } from "./modules/modules"
import { RegisterRoutes } from "./routes/routes"
import { Query } from "appwrite"

// Maximum number of retries for database operations
const MAX_RETRIES = 3
// Delay between retries (in milliseconds)
const RETRY_DELAY = 1000

// Helper function to wait
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface ProjectResponse {
  success: boolean
  message: string
  projectId?: string
}

export async function createProject(project: Project): Promise<ProjectResponse> {
  try {
    const user = await currentUser()
    if (!user || !user.id) {
      return { success: false, message: "User not authenticated" }
    }

    // Convert tech stack to valid format
    const techs = Object.entries(project.recommended_technologies || {}).map(
      ([category, technologies]) => `${category}: ${technologies.join(", ")}`,
    )

    const projectData = {
      title: project.project_title,
      description: project.description || "",
      estimated_hours: project.estimated_total_hours || 0,
      userid: user.id,
      techstack: techs, // Now a valid string array
      status: "not-started", // Default status
    }

    // Create the project in Appwrite with retry logic
    let create
    let retries = 0

    while (retries < MAX_RETRIES) {
      try {
        create = await databases.createDocument(DATABASE_ID, PROJECTS_COLLECTION, ID.unique(), projectData)

        if (create.$id) break

        retries++
        await wait(RETRY_DELAY)
      } catch (error) {
        console.error(`Project creation attempt ${retries + 1} failed:`, error)

        if (retries < MAX_RETRIES - 1) {
          retries++
          await wait(RETRY_DELAY * retries) // Exponential backoff
        } else {
          throw error // Re-throw on final attempt
        }
      }
    }

    if (!create || !create.$id) {
      return { success: false, message: "Project creation failed after multiple attempts" }
    }

    // Register modules - continue even if some modules fail
    try {
      await RegisterModules(create.$id, project.modules || [])
    } catch (moduleError) {
      console.error("Warning: Some modules may not have been created properly:", moduleError)
      // Continue with project creation even if modules have issues
    }

    // Register routes if they exist - continue even if some routes fail
    if (project.suggested_routes && project.suggested_routes.length > 0) {
      try {
        await RegisterRoutes(create.$id, project.suggested_routes)
      } catch (routeError) {
        console.error("Warning: Some routes may not have been created properly:", routeError)
        // Continue with project creation even if routes have issues
      }
    }

    return {
      success: true,
      message: "Project created successfully (some components may need attention)",
      projectId: create.$id,
    }
  } catch (error) {
    console.error("Error in createProject:", error)
    return {
      success: false,
      message: `Project creation failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

export async function myProjects() {
  try {
    const user = await currentUser()

    const userid = user?.id

    const results = await databases.listDocuments(DATABASE_ID, PROJECTS_COLLECTION, [Query.equal("userid", userid!)])

    if (!results) {
      return {
        message: "Error fetching documents",
        success: false,
      }
    }

    return {
      message: "Records fetched successfully",
      success: true,
      records: results,
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Server error",
    }
  }
}

export async function getProjectById(id: string) {
  try {
    const modulesArray = []

    const record = await databases.getDocument(DATABASE_ID, PROJECTS_COLLECTION, id)

    if (!record.$id) {
      return {
        message: "Query error accessing the project info",
        success: false,
      }
    }

    // Get modules with retry logic
    let modules
    let retries = 0

    while (retries < MAX_RETRIES) {
      try {
        modules = await databases.listDocuments(DATABASE_ID, MODULES_COLLECTION, [Query.equal("project_id", id)])
        break
      } catch (error) {
        console.error(`Module fetch attempt ${retries + 1} failed:`, error)

        if (retries < MAX_RETRIES - 1) {
          retries++
          await wait(RETRY_DELAY * retries)
        } else {
          modules = { documents: [] } // Empty modules on failure
          break
        }
      }
    }

    if (!modules) {
      modules = { documents: [] } // Provide default empty modules
    }

    for (const module of modules.documents) {
      try {
        // Get submodules with retry logic
        let submodules
        retries = 0

        while (retries < MAX_RETRIES) {
          try {
            submodules = await databases.listDocuments(DATABASE_ID, SUBMODULES_COLLECTION, [
              Query.equal("module_id", module.$id),
            ])
            break
          } catch (error) {
            console.error(`Submodule fetch attempt ${retries + 1} failed:`, error)

            if (retries < MAX_RETRIES - 1) {
              retries++
              await wait(RETRY_DELAY * retries)
            } else {
              submodules = { documents: [] } // Empty submodules on failure
              break
            }
          }
        }

        if (!submodules) {
          submodules = { documents: [] } // Provide default empty submodules
        }

        const moduleInfo = {
          ...module,
          submodules: submodules.documents,
        }

        modulesArray.push(moduleInfo)
      } catch (submoduleError) {
        console.error(`Error processing submodules for module ${module.$id}:`, submoduleError)
        // Add the module without submodules
        modulesArray.push({
          ...module,
          submodules: [],
        })
      }
    }

    // Get routes with retry logic
    let suggestedRoutes
    retries = 0

    while (retries < MAX_RETRIES) {
      try {
        suggestedRoutes = await databases.listDocuments(DATABASE_ID, ROUTES_COLLECTION, [Query.equal("project_id", id)])
        break
      } catch (error) {
        console.error(`Routes fetch attempt ${retries + 1} failed:`, error)

        if (retries < MAX_RETRIES - 1) {
          retries++
          await wait(RETRY_DELAY * retries)
        } else {
          suggestedRoutes = { documents: [] } // Empty routes on failure
          break
        }
      }
    }

    if (!suggestedRoutes) {
      suggestedRoutes = { documents: [] } // Provide default empty routes
    }

    const routes = suggestedRoutes.documents

    const project = {
      ...record,
      modules: modulesArray,
      routes: routes,
      message: "project found",
      success: true,
    }

    return project
  } catch (error) {
    console.error("Error fetching project:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

