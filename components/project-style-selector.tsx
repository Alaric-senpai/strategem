"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightIcon, CheckCircle, DatabaseIcon, Edit3Icon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectStyleSelectorProps {
  style: string | undefined
  setStyle: (style: string) => void
  nextStep: () => void
}

export default function ProjectStyleSelector({ style, setStyle, nextStep }: ProjectStyleSelectorProps) {
  const projectStyles = [
    {
      identifier: "preset",
      title: "Use presaved Presets",
      icon: <DatabaseIcon size={55} className="text-yellow-400" />,
      subtitle: "Select a saved frameworks preferences from saved presets",
      pointers: ["Save on time", "Simpler workflow", "Standardized setup"],
    },
    {
      identifier: "custom",
      title: "Custom project",
      icon: <Edit3Icon size={55} className="text-green-400" />,
      subtitle: "Switch up on your development. Explore other frameworks",
      pointers: ["Efficient for customizability", "Full control over tech stack", "Tailored to specific needs"],
    },
  ]

  return (
    <Card className="bg-slate-700/50 border-slate-700 border-2 rounded-[15px] mb-5">
      <CardHeader className="w-full">
        <CardTitle className="text-xl md:text-2xl">Choose Project Style</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {projectStyles.map((item, index) => (
          <button key={index} onClick={() => setStyle(item.identifier)} className="cursor-pointer">
            <Card
              className={cn(
                "bg-slate-600/30 rounded-[16px] border border-slate-700/35 h-full hover:bg-slate-700 duration-500 transition-all",
                item.identifier === style ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-800" : "",
              )}
            >
              <CardHeader className="flex items-center md:flex-row gap-4">
                {item.icon}
                <div className="w-full">
                  <h1 className="text-blue-400 font-semibold">{item.title}</h1>
                  <p className="line-clamp-2 text-slate-300 text-sm">{item.subtitle}</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-none space-y-2.5">
                  {item.pointers.map((innerone, i) => (
                    <li key={i} className="flex flex-row gap-4 leading-7">
                      <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-1" />
                      <span>{innerone}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </button>
        ))}
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between border-t border-slate-600 pt-5">
        <Button variant="destructive" className="rounded-[20px]">
          Reset
        </Button>
        <Button className="rounded-[20px] bg-blue-500 hover:bg-blue-600" onClick={nextStep} disabled={!style}>
          Proceed <ArrowRightIcon size={18} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}

