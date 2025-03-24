import { DATABASE_ID, databases, ROUTES_COLLECTION } from "@/utils/database"
import type { projectRoute } from "../../schemas"
import { ID } from "@/utils/appwrite"

// Maximum number of retries for database operations
const MAX_RETRIES = 3
// Delay between retries (in milliseconds)
const RETRY_DELAY = 1000

// Helper function to wait
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function RegisterRoutes(project: string, routes: projectRoute[]) {
  try {
    const results = []
    for (const route of routes) {
      try {
        const result = await AddRoute(project, route)
        if (result) results.push(result)
      } catch (routeError) {
        // Log but continue with other routes
        console.error(`Error registering route ${route.path}:`, routeError)
      }
    }
    return results
  } catch (error) {
    console.error("Error in RegisterRoutes:", error)
    // Don't throw, just log and return empty array
    return []
  }
}

interface HandleRoute {
  project_id: string
  path: string
  method?: string | null
  description?: string | null
}

export async function AddRoute(project: string, route: projectRoute) {
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      // Validate input data
      if (!project || !route.path) {
        console.error("Invalid route data:", { project, path: route.path })
        return null // Return null instead of throwing
      }

      const data: HandleRoute = {
        project_id: project,
        path: route.path,
        description: route.description || null,
        method: route.method || null,
      }

      const create = await databases.createDocument(DATABASE_ID, ROUTES_COLLECTION, ID.unique(), data)

      if (!create.$id) {
        console.warn("Route creation returned without an ID:", route.path)
        retries++
        await wait(RETRY_DELAY)
        continue
      }

      console.log(`Successfully created route: ${route.path} with ID: ${create.$id}`)
      return create
    } catch (error: any) {
      console.error(`Attempt ${retries + 1} failed for route ${route.path}:`, error)

      // Check if it's a network error or rate limit (which might be temporary)
      if (error.code === 429 || error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
        retries++
        // Exponential backoff
        await wait(RETRY_DELAY * retries)
      } else {
        // For other errors, don't retry
        console.error("Non-recoverable error in AddRoute:", error)
        return null // Return null instead of throwing
      }
    }
  }

  console.error(`Failed to create route after ${MAX_RETRIES} attempts: ${route.path}`)
  return null // Return null after max retries
}

