import { type NextRequest, NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import ProjectSchema from "@/lib/schemas"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const { object } = await generateObject({
      model: google("gemini-1.5-pro", {
        structuredOutputs: false,
      }),
      schema: ProjectSchema,
      prompt,
      temperature: 0.8,
      system: `You are a creative and knowledgeable AI project consultant. Your task is to generate detailed, 
            practical project ideas based on user requirements. Consider the following guidelines:

            1. Be creative but realistic - suggest projects that match the user's skill level, team size, and budget
            2. Provide detailed module descriptions that are implementation-focused
            3. Include at least 5 modules with at least 3 submodules each
            4. Recommend appropriate technologies based on the user's preferences
            5. Suggest practical API routes or frontend routes where applicable
            6. Consider scalability, security, and maintenance requirements in your suggestions
            7. Adapt your suggestions to the project type (web, mobile, desktop, etc.)
            8. Balance innovation with feasibility

            Your output should be comprehensive enough to give the user a clear starting point for their project.`,
    })

    console.log("Generated project:", object)

    return NextResponse.json(object)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

