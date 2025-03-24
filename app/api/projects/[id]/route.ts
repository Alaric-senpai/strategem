import { getProjectById } from "@/lib/projects/projects";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params object before accessing its properties
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Project ID is required",
        },
        { status: 400 }
      );
    }

    const project = await getProjectById(id);
    
    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("Error fetching project:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred while fetching the project",
      },
      { status: 500 }
    );
  }
}

