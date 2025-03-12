"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, useState } from "react"

interface CtxButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "lg" | "sm"
  glowColor?: string
}

export default function CtxButton({
  className,
  children = " Get Started",
  variant = "default",
  size = "default",
  glowColor = "purple",
  ...props
}: CtxButtonProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Handle mouse movement for the glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Color variants
  const colorMap = {
    emerald: "from-emerald-600 to-emerald-400 ring-emerald-500/50 hover:shadow-emerald-500/20",
    blue: "from-blue-600 to-blue-400 ring-blue-500/50 hover:shadow-blue-500/20",
    purple: "from-purple-600 to-purple-400 ring-purple-500/50 hover:shadow-purple-500/20",
    amber: "from-amber-500 to-amber-400 ring-amber-400/50 hover:shadow-amber-400/20",
  }

  // Size variants
  const sizeClasses = {
    sm: "py-2 px-4 text-sm min-h-10",
    default: "p-4 text-lg min-h-14",
    lg: "p-5 text-xl min-h-16",
  }

  // Variant styles
  const variantClasses = {
    default: `bg-gradient-to-r ${colorMap[glowColor as keyof typeof colorMap] || colorMap.emerald} text-white`,
    outline: `bg-transparent border-2 border-${glowColor}-500 text-${glowColor}-500 hover:bg-${glowColor}-500/10`,
    ghost: `bg-transparent hover:bg-${glowColor}-500/10 text-${glowColor}-500`,
  }

  return (
    <button
      {...props}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full max-w-[450px] my-6 rounded-lg font-semibold shadow-lg outline-none ring-offset-2 transition-all duration-300 ease-out hover:ring-2 hover:ring-offset-4 hover:shadow-xl overflow-hidden group",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {/* Main content */}
      <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:scale-105">
        {children}
      </span>

      {/* Animated highlight bar */}
      <span
        className={cn(
          "absolute top-0 bottom-0 left-full w-full bg-white/20 transform transition-all duration-500 ease-in-out",
          isHovering ? "left-0 opacity-100" : "left-full opacity-0",
        )}
      />

      {/* Glow effect that follows cursor */}
      {isHovering && (
        <span
          className="absolute w-32 h-32 rounded-full bg-white/30 blur-xl transition-all duration-200 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
          }}
        />
      )}

      {/* Subtle pulse animation */}
      <span
        className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-1000 rounded-lg",
          colorMap[glowColor as keyof typeof colorMap] || colorMap.emerald,
          isHovering ? "animate-pulse opacity-30" : "",
        )}
      />

      {/* Backdrop blur glow */}
      <span className="absolute inset-0 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
    </button>
  )
}

