import AppSidebar from "@/components/app-sidebar";
import SidebarWrapper from "@/components/sidebarWrapper";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AvatarComponent from "@/components/UserAvarar";
import { ValidateUser } from "@/utils/user";
import { PropsWithChildren } from "react";

export default async function ClientLayout({ children }: PropsWithChildren) {
  // await ValidateUser();

  return (
    <SidebarProvider>
      <AppSidebar isAdmin={false} />
      <SidebarInset className="bg-transparent">
        <div className="w-full flex items-center flex-row justify-between p-4 py-5 h-12 divide-y border-b border-b-white ">
          <SidebarTrigger className="w-8 h-8 rounded-full text-white border-white border" />
          <AvatarComponent />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
