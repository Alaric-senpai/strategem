/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useAuth } from "@clerk/nextjs";
import AppSidebar from "./app-sidebar";

type wrapperProps = {
    isAdmin: boolean;
}

export default function sidebarWrapper({isAdmin}: wrapperProps) {



    // return <> <AppSidebar isLoaded={isLoaded} userId={userId} sessionId={sessionId} isAdmin={isAdmin}  /> </>;
}