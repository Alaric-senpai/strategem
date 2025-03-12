import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AdminLayout({children}:PropsWithChildren){

    const isAdmin = await checkRole('admin')

    if(!isAdmin){
        redirect('/')
    }

    return (
        {children}
    )
}