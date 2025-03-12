"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Filter, Lightbulb, Code, GitBranch, Package, Users, CalendarClock, MessageCircle, GraduationCap, TrendingUp, BookOpenText, FileClock, History, Github, UsersRound, Trophy, Handshake } from 'lucide-react';
import Heading from "./heading";

const features = [
  {
    title: "AI-Powered Recommendations",
    description: "Get personalized project suggestions based on your skills and interests.",
    icon: <BrainCircuit className="h-6 w-6 text-emerald-400" />,
    delay: 0
  },
  {
    title: "One-Click Project Setup",
    description: "Start coding instantly with preconfigured templates and tech stack selection.",
    icon: <Code className="h-6 w-6 text-blue-400" />,
    delay: 0.1
  },
  // {
  //   title: "Real-Time Collaboration",
  //   description: "Work seamlessly with team members with live chat and AI-powered suggestions.",
  //   icon: <Users className="h-6 w-6 text-purple-400" />,
  //   delay: 0.2
  // },
  {
    title: "AI Insights & Learning",
    description: "Identify skill gaps and get personalized learning recommendations.",
    icon: <GraduationCap className="h-6 w-6 text-amber-400" />,
    delay: 0
  },
  // {
  //   title: "Version Control & Backup",
  //   description: "Never lose progress with automatic saving, syncing, and GitHub integration.",
  //   icon: <Github className="h-6 w-6 text-slate-400" />,
  //   delay: 0.1
  // },
  // {
  //   title: "Community & Networking",
  //   description: "Connect with other developers, join leaderboards, and find mentors.",
  //   icon: <UsersRound className="h-6 w-6 text-pink-400" />,
  //   delay: 0.2
  // }
];

export default function Features() {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            <Heading className="text-2xl leading-relaxed">
                Supercharge Your Projects
            </Heading>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Strategem combines AI intelligence with powerful collaboration tools to transform how you manage projects.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/80 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
