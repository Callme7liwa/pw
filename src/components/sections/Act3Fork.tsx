'use client'

import { useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'

interface ForkButtonProps {
  href: string
  icon: string
  title: string
  sub: string
}

function ForkButton({ href, icon, title, sub }: ForkButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '20px 32px',
        border: '2px solid var(--ink)',
        cursor: 'none',
        textDecoration: 'none',
        color: hovered ? 'var(--paper)' : 'var(--ink)',
        background: hovered ? 'var(--ink)' : 'transparent',
        transition: 'all 0.25s ease',
        minWidth: 260,
        position: 'relative',
        flex: 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      <span style={{ fontSize: 24, flexShrink: 0 }} aria-hidden="true">{icon}</span>
      <span style={{ textAlign: 'left', flex: 1 }}>
        <strong
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 700,
            display: 'block',
          }}
        >
          {title}
        </strong>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: hovered ? 'rgba(245,240,232,0.5)' : 'var(--ink-muted)',
            transition: 'color 0.25s ease',
          }}
        >
          {sub}
        </span>
      </span>
      <span
        style={{
          fontSize: 18,
          transform: hovered ? 'translateX(5px)' : 'translateX(0)',
          transition: 'transform 0.2s ease',
        }}
      >
        →
      </span>
    </a>
  )
}

export function Act3Fork() {
  return (
    <section
      id="act3-fork"
      style={{
        padding: '80px 48px 60px',
        background: 'var(--paper)',
        borderTop: '1px solid rgba(26,24,20,0.1)',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <SectionLabel centered>Proof of work</SectionLabel>

        <h2
          className="reveal text-display-md"
          style={{ marginBottom: 16 }}
        >
          Where would you like to start?
        </h2>

        <p
          className="reveal reveal-delay-1"
          style={{
            fontSize: 15,
            color: 'var(--ink-muted)',
            marginBottom: 48,
          }}
        >
          Two tracks, same author. Pick what&apos;s relevant — or read both.
        </p>

        <div
          className="reveal reveal-delay-2"
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <ForkButton
            href="#track-a"
            icon="⬡"
            title="Product builds"
            sub="Real estate · Ed · CRM · Healthcare · More"
          />
          <ForkButton
            href="#track-b"
            icon="◈"
            title="AI & automation"
            sub="Agents · Workflows · Intelligent systems"
          />
        </div>
      </div>
    </section>
  )
}
