"use client"

import { Code, GitBranch, Package } from "lucide-react"
import { motion } from "framer-motion"

export default function ProjectSetup() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">

        <motion.h2
        initial={{ opacity: 0, y:60 }}
        whileInView={{opacity: 1, y:0}}
        transition={{ duration: .5, delay: 0 }}
        className="text-4xl font-bold text-center mb-12 text-blue-500 animate-in"
        >
          One-Click Project Setup
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-8 flex-1"
          >
            <Code size={48} className="text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-emerald-400">Configure Templates</h3>
            <p className="text-gray-300">Start your project instantly by selecting the projects criteria.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-8 flex-1"
          >
            <Package size={48} className="text-purple-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-emerald-400">Tech Stack Selection</h3>
            <p className="text-gray-300">Choose your preferred languages and frameworks with ease.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 rounded-lg p-8 flex-1"
          >
            <GitBranch size={48} className="text-green-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-emerald-400">AI chat</h3>
            <p className="text-gray-300">Discuss with the AI to come up with the structure of your project</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

