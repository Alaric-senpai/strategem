import { NextResponse } from "next/server"
import { generateObject } from "ai"
import { google } from "@ai-sdk/google"
import ProjectSchema from "@/lib/schemas"
import { zodSchema } from "ai"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Use the modified schema with the AI SDK
    const { object } = await generateObject({
      model: google("gemini-1.5-pro", {
        structuredOutputs: false,
      }),
      schemaName: "project",
      schemaDescription: "A project structure with modules and submodules",
      // Add a system prompt to guide the AI
      system: `You are a highly experienced AI project consultant with expertise in software development, agile methodologies, and project architecture. Your task is to generate a detailed and structured project plan based on user requirements, following these guidelines:

        . **Detailed Module & Submodule Breakdown**  
           - Provide a comprehensive list of **modules and submodules** based on the complexity  level in the prompt:  
             - Beginner: At least 5 modules, each with 3+ submodules.  
             - Intermediate: At least 15+ modules, each with 5+ submodules.  
             - Advanced: At least 30+ modules, each with 10+ submodules.  
           - Ensure modules are **implementation-focused** and include all necessary components.  
           - **Nested submodules** should be detailed where applicable, ensuring hierarchical clarity.  
           - **Exhaustively list** every possible module/submodule that could exist relative to the specified difficulty.  

        . **Technical Recommendations**  
           - Suggest appropriate **programming languages, frameworks, databases, and tools** based on the project type and user preferences.  
           - Recommend best practices for **scalability, security, and maintainability**.  
           - Highlight potential **third-party APIs** or integrations where relevant.  


        . **API & Frontend Architecture**  
           - Suggest practical **API endpoints** (REST/GraphQL) with descriptions of expected functionality.  
           - Define key **frontend routes and component breakdowns** for UI-heavy projects.  


        . **Comprehensive & Descriptive Outputs**  
           - Avoid vague descriptions—**be highly informative and specific** in all sections.  
           - Ensure project documentation is structured in a way that is actionable and easy to follow.  

        Your goal is to generate a **practical, industry-standard project plan** that gives the user a solid starting point while aligning with professional development workflows.
`,
      // Use zodSchema with useReferences for recursive schema support
      schema: zodSchema(ProjectSchema, { useReferences: true }),
      prompt: prompt,
    })


    return NextResponse.json({ project: object })
  } catch (error: any) {
    console.error("Error generating project:", error)
    return NextResponse.json({ error: error.message || "Failed to generate project" }, { status: 500 })
  }
}

