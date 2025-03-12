import NavBar from "@/components/navbar";
import NavbarWrapper from "@/components/NavbarWrapper";
import { PropsWithChildren } from "react";

export default function BaseLayout({children}:PropsWithChildren){
    return(
        <>
            <main className=" block min-h-screen bg-slate-900 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950 via-blue-950/90 to-black w-full"> 
                <NavbarWrapper /> 
                {children}
            </main>

        </>
    )

}