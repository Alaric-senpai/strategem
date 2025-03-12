import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    className?: string;
    children?: ReactNode;
}

export default function Heading({ className, children, ...props }: HeadingProps) {
    return (
        <h1 
            {...props} 
            className={cn(
                "font-extrabold text-5xl md:text-6xl lg:text-7xl w-full text-center flex items-center justify-center flex-col gap-4",
                "text-transparent bg-gradient-to-r from-blue-700 via-purple-500 to-blue-400 bg-clip-text",
                "drop-shadow-lg animate-fade-in",
                className
            )}
        >
            {children}
        </h1>
    );
}
