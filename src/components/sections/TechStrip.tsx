'use client'

import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import {
  SiNextdotjs,
  SiReact,
  SiNestjs,
  SiSupabase,
  SiSpringboot,
  SiPostgresql,
  SiLangchain,
  SiKubernetes,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { TbBrandAzure } from 'react-icons/tb'
import { Bot, Workflow } from 'lucide-react'

type Tool = {
  key: string
  name: string
  color: string // real brand color, revealed on hover
  Icon: ComponentType<{ size?: number }>
}

const TOOLS: Tool[] = [
  { key: 'nextjs', name: 'Next.js', color: '#000000', Icon: SiNextdotjs },
  { key: 'react', name: 'React', color: '#61DAFB', Icon: SiReact },
  { key: 'nestjs', name: 'NestJS', color: '#E0234E', Icon: SiNestjs },
  { key: 'supabase', name: 'Supabase', color: '#3ECF8E', Icon: SiSupabase },
  { key: 'spring', name: 'Spring Boot', color: '#6DB33F', Icon: SiSpringboot },
  { key: 'postgres', name: 'Postgres', color: '#4169E1', Icon: SiPostgresql },
  { key: 'langchain', name: 'LangChain', color: '#1C7D6B', Icon: SiLangchain },
  { key: 'langgraph', name: 'LangGraph', color: '#7C4DFF', Icon: Workflow },
  { key: 'agents', name: 'AI Agents', color: '#3B2FC9', Icon: Bot },
  { key: 'k8s', name: 'Kubernetes', color: '#326CE5', Icon: SiKubernetes },
  { key: 'aws', name: 'AWS', color: '#FF9900', Icon: FaAws },
  { key: 'azure', name: 'Azure', color: '#0078D4', Icon: TbBrandAzure },
]

// Quick staggered scale/fade-in when the strip scrolls into view.
const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 420, damping: 24 } },
}

export function TechStrip() {
  return (
    <div className="techstrip-wrap">
      <motion.div
        className="techstrip"
        role="list"
        aria-label="Tools & tech stack"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ show: { transition: { staggerChildren: 0.045 } } }}
      >
        {TOOLS.map((t, i) => (
          <motion.span
            key={t.key}
            className="tech-item"
            role="listitem"
            variants={itemVariants}
            title={t.name}
            // Per-icon brand color + desynced breathing (negative delay so they
            // start mid-cycle, varied duration so no two share a rhythm).
            style={
              {
                '--brand': t.color,
                '--breathe-delay': `${(-(i * 0.43)).toFixed(2)}s`,
                '--breathe-dur': `${(3 + (i % 4) * 0.35).toFixed(2)}s`,
              } as React.CSSProperties
            }
          >
            <span className="tech-breathe" aria-hidden="true">
              <t.Icon size={20} />
            </span>
            <span className="tech-label">{t.name}</span>
          </motion.span>
        ))}
      </motion.div>
      <p className="techstrip-note">
        Grounded in a Data Science &amp; IoT Engineering background (ENSIAS, Morocco) and Software
        Engineering (ISIMA, France).
      </p>
    </div>
  )
}
