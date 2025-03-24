import AppSidebar from "@/components/app-sidebar";
import SidebarWrapper from "@/components/sidebarWrapper";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AvatarComponent from "@/components/UserAvarar";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AdminLayout({children}:PropsWithChildren){

    const isAdmin = await checkRole('admin')

    if(!isAdmin){
        redirect('/')
    }

    return (
        <SidebarProvider>
        {/* <SidebarWrapper isAdmin={isAdmin} /> */}
        <AppSidebar isAdmin={isAdmin} />
        <SidebarInset className="bg-transparent">
          <div className="w-full flex items-center flex-row justify-between p-4 h-12 divide-y border-b border-b-white ">
            <SidebarTrigger className="w-8 h-8 rounded-full text-white border-white border" />
            <AvatarComponent />
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    )
}