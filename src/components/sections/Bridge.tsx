'use client'

import { useState } from 'react'

interface BridgeProps {
  text: string
  linkLabel: string
  href: string
}

export function Bridge({ text, linkLabel, href }: BridgeProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        background: 'var(--ink)',
        padding: '60px 48px',
        textAlign: 'center',
        borderTop: '1px solid rgba(245,240,232,0.07)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(16px, 2vw, 24px)',
          fontWeight: 600,
          color: 'rgba(245,240,232,0.45)',
          letterSpacing: '-0.01em',
          marginBottom: 20,
        }}
      >
        {text}
      </p>
      <a
        href={href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: hovered ? 'var(--cyan-light)' : 'var(--cyan)',
          textDecoration: 'none',
          borderBottom: `1px solid ${hovered ? 'rgba(51,170,255,0.5)' : 'rgba(0,119,204,0.4)'}`,
          paddingBottom: 4,
          transition: 'color 0.2s ease, border-color 0.2s ease',
          cursor: 'none',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor-hover
      >
        {linkLabel}
        <span style={{ transform: hovered ? 'translateX(4px)' : 'none', transition: 'transform 0.2s ease' }}>
          →
        </span>
      </a>
    </div>
  )
}
