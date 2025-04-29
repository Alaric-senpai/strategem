"use server"

import { DATABASE_ID, databases, MODULES_COLLECTION, SUBMODULES_COLLECTION } from "@/utils/database"

// Maximum number of retries for database operations
const MAX_RETRIES = 3
// Delay between retries (in milliseconds)
const RETRY_DELAY = 1000

// Helper function to wait
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

interface UpdateResponse {
  success: boolean
  message: string
  data?: any
};

export async function updateModule(moduleId: string, data: any): Promise<UpdateResponse> {
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      // Validate input data
      if (!moduleId) {
        return { success: false, message: "Module ID is required" }
      }

      const updated = await databases.updateDocument(
        DATABASE_ID,
        MODULES_COLLECTION,
        moduleId,
        data
      )

      if (!updated.$id) {
        console.warn("Module update returned without an ID:", moduleId)
        retries++
        await wait(RETRY_DELAY)
        continue
      }

      console.log(`Successfully updated module with ID: ${updated.$id}`)

      return { success: true, message: "Module updated successfully", data: updated }
    } catch (error: any) {
      console.error(`Attempt ${retries + 1} failed for module update ${moduleId}:`, error)

      // Check if it's a network error or rate limit (which might be temporary)
      if (error.code === 429 || error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
        retries++
        // Exponential backoff
        await wait(RETRY_DELAY * retries)
      } else {
        // For other errors, don't retry
        console.error("Non-recoverable error in updateModule:", error)
        return { success: false, message: error.message || "Failed to update module" }
      }
    }
  }

  return { success: false, message: `Failed to update module after ${MAX_RETRIES} attempts` }
}

export async function updateSubmodule(submoduleId: string, data: any): Promise<UpdateResponse> {
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      // Validate input data
      if (!submoduleId) {
        return { success: false, message: "Submodule ID is required" }
      }

      const updated = await databases.updateDocument(
        DATABASE_ID,
        SUBMODULES_COLLECTION,
        submoduleId,
        data
      )

      if (!updated.$id) {
        console.warn("Submodule update returned without an ID:", submoduleId)
        retries++
        await wait(RETRY_DELAY)
        continue
      }

      console.log(`Successfully updated submodule with ID: ${updated.$id}`)

      return { success: true, message: "Submodule updated successfully", data: updated }
    } catch (error: any) {
      console.error(`Attempt ${retries + 1} failed for submodule update ${submoduleId}:`, error)

      // Check if it's a network error or rate limit (which might be temporary)
      if (error.code === 429 || error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
        retries++
        // Exponential backoff
        await wait(RETRY_DELAY * retries)
      } else {
        // For other errors, don't retry
        console.error("Non-recoverable error in updateSubmodule:", error)
        return { success: false, message: error.message || "Failed to update submodule" }
      }
    }
  }

  return { success: false, message: `Failed to update submodule after ${MAX_RETRIES} attempts` }
}