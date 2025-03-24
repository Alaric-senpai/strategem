/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  CreditCard,
  FileText,
  Home,
  LogOut,
  type LucideIcon,
  LucideShieldEllipsis,
  MessageSquare,
  Settings,
  User,
  Users,
  Zap,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import AvatarComponent from "./UserAvatar";
import { SignOutButton, useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import AvatarComponent from "./UserAvarar"
import { Button } from "./ui/button"

interface SidebarProps {
  isAdmin: boolean
}

interface MenuLink {
  name: string
  link: string
  icon: LucideIcon
}

const AppSidebar = ({ isAdmin }: SidebarProps) => {
  const { user } = useUser()
  const pathname = usePathname()

  const menuLinks: MenuLink[] = isAdmin
    ? [
        { name: "Dashboard", link: "/admin", icon: Home },
        { name: "Users", link: "/admin/users", icon: Users },
        { name: "Projects", link: "/admin/projects", icon: FileText },
        { name: "Teams", link: "/admin/teams", icon: Users },
        { name: "Analytics", link: "/admin/analytics", icon: BarChart3 },
        { name: "Settings", link: "/admin/settings", icon: Settings },
      ]
    : [
        { name: "Dashboard", link: "/client", icon: Home },
        { name: "Projects", link: "/client/projects", icon: FileText },
        { name: "AI Chats", link: "/client/chats", icon: MessageSquare },
        { name: "Analytics", link: "/client/analytics", icon: BarChart3 },
        { name: "Activity", link: "/client/activity", icon: BarChart3 },
        { name: "Account", link: "/client/account", icon: User },
      ]

  return (
    <Sidebar className="">
      <SidebarHeader className="py-4 bg-slate-900 border-none shadow-md">
        <div className="flex items-center px-4">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <Zap className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Strategem</span>
          </div>
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-900 border-t-2 border-t-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="p-2 text-white">
              {menuLinks.map(({ name, link, icon: Icon }) => (
                <SidebarMenuItem key={link} className="h-12 w-full overflow-hidden">
                  <SidebarMenuButton asChild className="h-full w-full">
                    <Link
                      href={link}
                      className={cn(
                        "w-full h-full flex items-center gap-4 px-3 py-2 hover:bg-emerald-400/55 rounded-md transition-colors",
                        link === pathname ? "bg-slate-700 text-blue-500" : " text-white",
                      )}
                    >
                      <Icon size={22} className="" />
                      <span>{name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-slate-900 flex flex-row items-center gap-8 justify-between w-full">
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div className="text-white flex items-center justify-center">
               {user?.fullName} 
            
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="text-white cursor-pointer">
              <LucideShieldEllipsis size={30} />
            </div>
          </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href="/profile" legacyBehavior passHref>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      <SignOutButton>
                        <Button variant={"destructive"} className="w-full h-14 text-center bg-red-400 hover:bg-red-500">
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </SignOutButton>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar

