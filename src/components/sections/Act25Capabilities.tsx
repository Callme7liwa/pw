'use client'

import { useState } from 'react'
import { capabilities } from '@/data/site'
import { SectionLabel } from '@/components/ui/SectionLabel'

interface NodeProps {
  label: string
  hint: string
  align?: 'left' | 'right'
}

function CapNode({ label, hint, align = 'left' }: NodeProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 0',
        position: 'relative',
        cursor: 'none',
        flexDirection: align === 'right' ? 'row-reverse' : 'row',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      {/* Node dot */}
      <div
        style={{
          width: 8,
          height: 8,
          border: `1.5px solid ${hovered ? 'var(--ink)' : 'var(--ink-muted)'}`,
          borderRadius: '50%',
          background: hovered ? 'var(--ink)' : 'transparent',
          flexShrink: 0,
          transform: hovered ? 'scale(1.4)' : 'scale(1)',
          transition: 'all 0.2s ease',
        }}
      />

      <div style={{ position: 'relative' }}>
        {/* Label */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 500,
            color: 'var(--ink)',
            display: 'block',
          }}
        >
          {label}
        </span>

        {/* Hint — appears on hover */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink-muted)',
            letterSpacing: '0.04em',
            display: 'block',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {hint}
        </span>
      </div>
    </div>
  )
}

export function Act25Capabilities() {
  return (
    <section
      id="act25"
      style={{
        padding: '100px 48px',
        background: 'var(--paper)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <SectionLabel>Capabilities</SectionLabel>

        {/* Three-column: build | connector | design */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 0,
            alignItems: 'center',
          }}
        >
          {/* Build cluster */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginBottom: 24,
              }}
            >
              Build
            </div>
            {capabilities.build.map((cap) => (
              <CapNode key={cap.label} label={cap.label} hint={cap.hint} align="left" />
            ))}
          </div>

          {/* Centre connector */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0 40px',
            }}
          >
            <div
              style={{
                width: 1,
                flex: 1,
                minHeight: 100,
                background: 'linear-gradient(to bottom, transparent, var(--ink-muted), transparent)',
                opacity: 0.2,
              }}
            />
            <div
              style={{
                width: 52,
                height: 52,
                border: '1.5px solid var(--ink)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--paper)',
                flexShrink: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.04em',
                color: 'var(--ink)',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              One<br />author
            </div>
            <div
              style={{
                width: 1,
                flex: 1,
                minHeight: 100,
                background: 'linear-gradient(to bottom, transparent, var(--ink-muted), transparent)',
                opacity: 0.2,
              }}
            />
          </div>

          {/* Design cluster */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginBottom: 24,
                textAlign: 'right',
              }}
            >
              Design
            </div>
            {capabilities.design.map((cap) => (
              <CapNode key={cap.label} label={cap.label} hint={cap.hint} align="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
