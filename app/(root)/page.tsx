"use client"

import CtaButton from "@/components/cta"
import Features from "@/components/features"
import Heading from "@/components/heading"
import ProjectSetup from "@/components/project-setup"

import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="landing flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
        }}
        transition={{
          duration: 1,
          delay: 0.2,
        }}
        className="mt-12"
      >
        <Heading className="max-w-4xl leading-tight">Strategem – The Ultimate AI-Powered Project Navigator</Heading>
      </motion.div>


      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
 
        transition={{
          duration: 1,
          delay: 0.4,
        }}
        className="my-4"
      >
          <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl w-full text-cneter ">
                  Unlock tailored project ideas, streamline execution, and collaborate seamlessly—powered by AI and built for
          innovators like you.
        </p>

          <div className="w-full my-3">
            <CtaButton />
          </div>
      </motion.div>


      <div className="my-1 space-y-4">
        <Features />
        <ProjectSetup />
      </div>
    </div>
  )
}

