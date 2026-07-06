'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  Building2,
  GraduationCap,
  TrendingUp,
  Stethoscope,
  ShoppingCart,
  Dumbbell,
  Trophy,
  Bot,
  type LucideIcon,
} from 'lucide-react'

type Sector = {
  key: string
  name: string
  short: string
  emoji: string
  desc: string
  Icon: LucideIcon
  color: string
}

// 8 sectors, each a flat saturated panel color (ink-legible mid tones).
const SECTORS: Sector[] = [
  { key: 'real-estate', name: 'Real Estate', short: 'Real Estate', emoji: '🏠', desc: 'Listings, portals & agent CRMs that convert.', Icon: Building2, color: '#E8A54A' },
  { key: 'education', name: 'Education', short: 'Education', emoji: '🎓', desc: 'Learning platforms with real completion rates.', Icon: GraduationCap, color: '#EFCB4D' },
  { key: 'crm', name: 'CRM & Sales Ops', short: 'Sales Ops', emoji: '📈', desc: 'Pipelines that qualify and follow up for you.', Icon: TrendingUp, color: '#8E86F5' },
  { key: 'healthcare', name: 'Healthcare', short: 'Healthcare', emoji: '🩺', desc: 'HIPAA-minded intake & scheduling, mobile-first.', Icon: Stethoscope, color: '#5FC7B4' },
  { key: 'marketplace', name: 'Marketplaces', short: 'Marketplace', emoji: '🛒', desc: 'Two-sided platforms built to reach liquidity.', Icon: ShoppingCart, color: '#EF6A54' },
  { key: 'fitness', name: 'Fitness & Wellness', short: 'Fitness', emoji: '💪', desc: 'Coaching & habit apps people actually keep.', Icon: Dumbbell, color: '#F2913E' },
  { key: 'sports', name: 'Sports', short: 'Sports', emoji: '⚽', desc: 'Analytics & fan products for clubs and leagues.', Icon: Trophy, color: '#4F9E57' },
  { key: 'ai', name: 'AI Agents & Automation', short: 'AI Agents', emoji: '🤖', desc: 'Agents that take real work off your plate.', Icon: Bot, color: '#4FC3D6' },
]

// Fan geometry — symmetric arc, even rotation steps across all 8 cards.
const MID = (SECTORS.length - 1) / 2
const EXPANDED = { x: 104, y: 18, rot: 6.5 } // wide centered fan
const TIGHT = { x: 64, y: 12, rot: 5 } // re-fan inside the right column
function fan(i: number, c: { x: number; y: number; rot: number }) {
  const d = i - MID
  return { x: d * c.x, y: Math.abs(d) * c.y, rotate: d * c.rot }
}

const INK = '#1A1814'
const shadow = (n: number) => `${n}px ${n}px 0 ${INK}`

type CardState = 'stacked' | 'fanned' | 'collapsed'

// Explicit per-card target so a shared `hovered` index can lift one card and
// recede the rest. Hover only applies in the fanned resting state.
function cardTarget(i: number, state: CardState, hovered: number | null) {
  if (state === 'stacked') return { x: 0, y: 0, rotate: 0, scale: 0.8, opacity: 0, boxShadow: shadow(6) }
  if (state === 'collapsed') {
    const b = fan(i, TIGHT)
    return { ...b, scale: 0.86, opacity: 1, boxShadow: shadow(6) }
  }
  // fanned
  const b = fan(i, EXPANDED)
  if (hovered === i) {
    // lifted out of the stack: straightened, scaled up, nudged up, deeper shadow
    return { x: b.x, y: b.y - 26, rotate: 0, scale: 1.14, opacity: 1, boxShadow: shadow(14) }
  }
  if (hovered !== null) {
    // recede so focus is unambiguous
    return { ...b, scale: 0.9, opacity: 0.5, boxShadow: shadow(4) }
  }
  return { ...b, scale: 1, opacity: 1, boxShadow: shadow(6) }
}

function cardTransition(i: number, state: CardState, introDone: boolean) {
  if (state === 'stacked') return { duration: 0 }
  if (state === 'collapsed') return { delay: i * 0.03, type: 'spring' as const, stiffness: 280, damping: 26 }
  // fanned: staggered on the first fan-out, then snappy for hover
  return introDone
    ? { type: 'spring' as const, stiffness: 420, damping: 28 }
    : { delay: 0.35 + i * 0.06, type: 'spring' as const, stiffness: 220, damping: 22 }
}

export function Act22Sectors() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const entered = useInView(stageRef, { once: true, amount: 0.4 })
  const [collapsed, setCollapsed] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [introDone, setIntroDone] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // < 768px → swap the fan for a native swipe carousel (below).
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  // After the staggered fan-out finishes, switch to snappy hover transitions.
  useEffect(() => {
    if (!entered || introDone) return
    const t = setTimeout(() => setIntroDone(true), 1400)
    return () => clearTimeout(t)
  }, [entered, introDone])

  // Phase 4 — collapse as the section scrolls up through its own height (no
  // sticky pin, so no reserved dead scroll). progress 0 = section top at
  // viewport top, 1 = section fully scrolled past; collapse early so the
  // two-column state resolves while the section is still comfortably in view.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCollapsed(v > 0.35)
  })

  const cardState: CardState = collapsed ? 'collapsed' : entered ? 'fanned' : 'stacked'
  const hoverable = cardState === 'fanned'

  return (
    <section id="sectors" ref={sectionRef} className="sectors">
      <div className={`sectors-inner${!isMobile && collapsed ? ' is-collapsed' : ''}`}>
          {/* Phase 1 · headline masks in */}
          <motion.div layout="position" className="sectors-copy">
            <motion.h2
              className="sectors-title"
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={entered || isMobile ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : undefined}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Sectors we work in
            </motion.h2>
            <p className="sectors-support">
              Eight industries, one playbook: understand the domain, ship the thing that
              moves the number, make it intelligent. Whatever you&apos;re building, the
              craft carries over.
            </p>
          </motion.div>

          {/* Mobile (< 768px): native swipe carousel — no fan/tag/collapse */}
          {isMobile && (
            <div className="sectors-carousel">
              {SECTORS.map((s) => (
                <div
                  key={s.key}
                  className="sector-card sector-card-static"
                  style={{ background: s.color }}
                >
                  <s.Icon size={26} strokeWidth={2} aria-hidden="true" />
                  <div>
                    <div className="sector-card-name">{s.name}</div>
                    <div className="sector-card-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Desktop (≥ 768px): the fanning card stage (unchanged) */}
          {!isMobile && (
          <motion.div
            layout="position"
            ref={stageRef}
            className="sectors-stage"
            onMouseLeave={() => setHovered(null)}
          >
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.key}
                className="sector-card"
                style={{
                  background: s.color,
                  zIndex: hoverable && hovered === i ? 100 : i,
                }}
                initial={{ x: 0, y: 0, rotate: 0, scale: 0.8, opacity: 0 }}
                animate={cardTarget(i, cardState, hoverable ? hovered : null)}
                transition={cardTransition(i, cardState, introDone)}
                onMouseEnter={() => hoverable && setHovered(i)}
              >
                <s.Icon size={26} strokeWidth={2} aria-hidden="true" />
                <div>
                  <div className="sector-card-name">{s.name}</div>
                  <div className="sector-card-desc">{s.desc}</div>
                </div>

                {/* Phase 3 · floating tag pops in with a spring, fades on collapse */}
                <div className="sector-pill-anchor">
                  <motion.span
                    className="sector-pill"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      entered && !collapsed
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{
                      delay: entered && !collapsed ? 0.95 + i * 0.06 : 0,
                      type: 'spring',
                      stiffness: 520,
                      damping: 15,
                    }}
                  >
                    <span aria-hidden="true">{s.emoji}</span> {s.short}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          )}
        </div>
    </section>
  )
}
