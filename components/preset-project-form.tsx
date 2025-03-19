"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Pickaxe } from "lucide-react"

interface PresetProjectFormProps {
  prevStep: () => void
}

export default function PresetProjectForm({ prevStep }: PresetProjectFormProps) {
  return (
    <Card className="bg-slate-700/50 border-slate-700 border-2 rounded-[15px] mb-5">
      <CardHeader className="w-full">
        <CardTitle className="text-xl md:text-2xl flex items-center">Using a pre-saved template</CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="rounded-xl border-slate-700/50 w-full md:w-8/12 mx-auto p-8 bg-slate-600/30">
          <CardContent className="flex items-center justify-center flex-col gap-6">
            <Pickaxe size={70} className="text-red-400" />
            <div className="text-emerald-500 text-center text-lg font-medium">This feature is still in works</div>
            <p className="text-slate-300 text-center">
              We're building a library of pre-configured templates to help you get started faster. Check back soon!
            </p>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex justify-center pt-5">
        <Button
          className="h-12 bg-emerald-500 hover:bg-emerald-600 font-medium text-lg rounded-xl flex items-center gap-2"
          onClick={prevStep}
        >
          <ArrowLeft size={18} /> Go Back
        </Button>
      </CardFooter>
    </Card>
  )
}

