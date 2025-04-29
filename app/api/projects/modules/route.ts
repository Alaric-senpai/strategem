import { NextRequest, NextResponse } from "next/server";
import { updateModule, updateSubmodule } from "@/lib/projects/modules/update-module";

export async function PUT(
  req: NextRequest
) {
  try {
    const body = await req.json();
    const { id, type, data } = body;
    
    if (!id || !type || !data) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: id, type, or data",
        },
        { status: 400 }
      );
    }

    // Use the appropriate update function based on type
    const result = type === 'module' 
      ? await updateModule(id, data)
      : await updateSubmodule(id, data);
    
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || `Failed to update ${type}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message || `${type} updated successfully`,
      data: result.data
    });
  } catch (error: any) {
    console.error(`Error updating module/submodule:`, error);
    
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred while updating",
      },
      { status: 500 }
    );
  }
}