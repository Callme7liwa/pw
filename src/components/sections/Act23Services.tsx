'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Globe, Smartphone, Rocket, Bot, Workflow, type LucideIcon } from 'lucide-react'

type Service = {
  key: string
  title: string
  desc: string
  color: string // flat panel flood color when open
  textOn: string // readable text color on that flood
  Icon: LucideIcon
}

const SERVICES: Service[] = [
  { key: 'web', title: 'Web Dev', desc: 'Fast, scalable web apps and platforms — Next.js front to back.', color: '#2F6BFF', textOn: '#FFFFFF', Icon: Globe },
  { key: 'mobile', title: 'Mobile Dev', desc: 'Cross-platform mobile apps that feel native on every device.', color: '#EC2C86', textOn: '#FFFFFF', Icon: Smartphone },
  { key: 'saas', title: 'SaaS MVP', desc: 'Idea to launched product in weeks — built to scale after.', color: '#0FB874', textOn: '#08281C', Icon: Rocket },
  { key: 'chatbots', title: 'AI Agent Chatbots', desc: 'Chat agents that qualify, support and convert around the clock.', color: '#7B3FE4', textOn: '#FFFFFF', Icon: Bot },
  { key: 'automation', title: 'Workflow Automation', desc: 'Agents and pipelines that take manual work off your team.', color: '#F5901E', textOn: '#1A1814', Icon: Workflow },
]

const PAPER = '#F5F0E8'
const INK_SOFT = '#3D3830'
const spring = { type: 'spring' as const, stiffness: 320, damping: 26 }

export function Act23Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const entered = useInView(sectionRef, { once: true, amount: 0.4 })
  const [active, setActive] = useState<number | null>(null)
  const [autoPlaying, setAutoPlaying] = useState(false)

  // First scroll into view → quick auto-cycle preview, then settle collapsed.
  useEffect(() => {
    if (!entered) return
    setAutoPlaying(true)
    setActive(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      if (i >= SERVICES.length) {
        clearInterval(id)
        setActive(null)
        setAutoPlaying(false)
      } else {
        setActive(i)
      }
    }, 900)
    return () => clearInterval(id)
  }, [entered])

  const enter = (i: number) => { if (!autoPlaying) setActive(i) }
  const leaveAll = () => { if (!autoPlaying) setActive(null) }
  const click = (i: number) => { if (!autoPlaying) setActive((a) => (a === i ? null : i)) }

  return (
    <section id="services" ref={sectionRef} className="services-section">
      <h2 className="services-title reveal">What we work on</h2>

      <div className="svc-accordion" onMouseLeave={leaveAll}>
        {SERVICES.map((s, i) => {
          const isActive = active === i
          return (
            <motion.div
              key={s.key}
              className={`svc-tab${isActive ? ' is-active' : ''}`}
              data-active={isActive}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={s.title}
              onMouseEnter={() => enter(i)}
              onFocus={() => enter(i)}
              onClick={() => click(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); click(i) }
              }}
              // Width via flex-grow (6 open / 1 collapsed), plus color flood + text color.
              animate={{
                flexGrow: isActive ? 6 : 1,
                backgroundColor: isActive ? s.color : PAPER,
                color: isActive ? s.textOn : INK_SOFT,
              }}
              transition={spring}
            >
              {/* Icon — bouncy scale/rotate in on open */}
              <motion.span
                className="svc-icon"
                animate={{ scale: isActive ? 1.16 : 0.94, rotate: isActive ? 0 : -6 }}
                transition={{ type: 'spring', stiffness: 480, damping: 12 }}
              >
                <s.Icon size={28} strokeWidth={2.25} aria-hidden="true" />
              </motion.span>

              {/* Title — vertical-rl (contained in this tab), horizontal when open */}
              <div className="svc-title">{s.title}</div>

              {/* Description — slides/fades in after the title settles */}
              <AnimatePresence>
                {isActive && (
                  <motion.p
                    className="svc-desc"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.16, type: 'spring', stiffness: 260, damping: 24 }}
                  >
                    {s.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
