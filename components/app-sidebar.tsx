import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "./ui/sidebar";


type sidebarProps ={
    isLoaded:boolean| undefined;
    userId:any;
    sessionId:any
}


export default function AppSidebar(props:sidebarProps){
    return (
        <Sidebar>
            <SidebarHeader>

            </SidebarHeader>
            <SidebarContent>

            </SidebarContent>
            <SidebarFooter>
                
            </SidebarFooter>
        </Sidebar>
    )
}