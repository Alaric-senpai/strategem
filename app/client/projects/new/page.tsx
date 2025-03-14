'use client'
import { useState } from "react"
// import { generateAiText } from "./_actions"
import { Button } from "@/components/ui/button"
import { run } from "./_actions"

export default function NewProject(){

  const [text, setText]=useState<any>(null)

  const generateProject = async()=>{

    const test = await run()

    console.log(test)

    setText(test)

  }

  return (
    <>

        <Button variant={'default'} onClick={generateProject}>test Ai </Button>

        {text && (
          {text}
        )}
    
    </>
  )
}