import { createProject, myProjects } from "@/lib/projects/projects";
import { Project } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    try {
        const { project } = await req.json()
    
        console.log('from projects api routes')
        console.log(project)
    
        const projectinfo = project as Project
    
        const create = await createProject(projectinfo)

    
        return NextResponse.json(create)
        
    } catch (error:any) {

        console.log(project)

        return NextResponse.json({
            message: error.message,
            success: false
        })
    }


}

export async function GET(){
    try{

        console.log('method invoked')

        const projects = await myProjects()


        return NextResponse.json(projects)
    }catch(error:any){
        return NextResponse.json({
            message: error.message,
            success:false
        })
    }
}