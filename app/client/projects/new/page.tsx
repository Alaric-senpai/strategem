'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import markdownit from 'markdown-it'

export default function NewProject() {
  const [text, setText] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const md = markdownit()

  const generateProject = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: "Create a project plan for a new software application"
        }),
      })

      const data = await response.json()
      if (data.text) {
        setText(data.text)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card className=" w=full m-auto md:w-10/12 p-4 bg-slate-600/50 border-slate-700">
      
      </Card>
    </>
  )
}