'use client'

import { useEffect, useRef, useState } from 'react'

type Step = { key: string; title: string; desc: string }

// Placeholder copy — to be refined later.
const STEPS: Step[] = [
  { key: 'discovery', title: 'Discovery', desc: 'We map the problem, constraints, and what success actually looks like.' },
  { key: 'scope', title: 'Scope', desc: 'A clear written plan — what gets built, the timeline, and a fixed price.' },
  { key: 'build', title: 'Build', desc: 'A live staging link from day one and short weekly check-ins as it grows.' },
  { key: 'launch', title: 'Launch', desc: 'Production deploy, docs written for humans, and a real handover call.' },
  { key: 'support', title: 'Support', desc: 'Thirty days of support included — and I stay reachable well after.' },
]

export function Act4Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set())

  // No pin, no scrub, no scroll-jack: native page scroll throughout. Each step
  // reveals once as it scrolls into view and stays visible — we unobserve it
  // after the first intersection, so scrolling back up never re-triggers it.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const steps = Array.from(section.querySelectorAll<HTMLElement>('[data-step]'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const idx = Number(e.target.getAttribute('data-step'))
          setRevealed((prev) => {
            if (prev.has(idx)) return prev
            const next = new Set(prev)
            next.add(idx)
            return next
          })
          io.unobserve(e.target)
        })
      },
      { threshold: 0.4, rootMargin: '0px 0px -12% 0px' }
    )
    steps.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="act4" ref={sectionRef} className="process-section">
      <div className="process-inner">
        <h2 className="process-heading">How we work together</h2>

        <ol className="process-steps">
          {STEPS.map((s, i) => (
            <li
              key={s.key}
              data-step={i}
              className={`process-step${revealed.has(i) ? ' is-on' : ''}`}
            >
              <div className="process-rail" aria-hidden="true">
                <span className="process-node" />
                {i < STEPS.length - 1 && <span className="process-connector" />}
              </div>
              <div className="process-content">
                <div className="process-index">{`0${i + 1}`}</div>
                <h3 className="process-title">{s.title}</h3>
                <p className="process-desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
