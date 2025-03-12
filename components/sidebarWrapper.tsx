'use client';

import { useAuth } from "@clerk/nextjs";
import AppSidebar from "./app-sidebar";

export default function sidebarWrapper(){
    const { isLoaded, sessionId, userId} = useAuth()

    return <> <AppSidebar isLoaded={isLoaded} userId={userId} sessionId={sessionId}  /> </>;
}