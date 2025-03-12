import SidebarWrapper from "@/components/sidebarWrapper";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AvatarComponent from "@/components/UserAvarar";
import { ValidateUser } from "@/utils/user";
import { PropsWithChildren } from "react";

// export const metadata: Metadata = {
//   title: "Welcome to Strategem",
// };



export default async function ClientLayout({ children }: PropsWithChildren) {

  await ValidateUser()

  return(
    <SidebarProvider>
        <SidebarWrapper />
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
