'use client'

import { useState } from 'react'
import { rapidProjects } from '@/data/site'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function RapidStrip() {
  return (
    <div
      style={{
        background: 'var(--paper)',
        padding: '80px 48px',
        borderTop: '1px solid rgba(26,24,20,0.1)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionLabel>More projects</SectionLabel>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 2,
          }}
        >
          {rapidProjects.map((p) => (
            <StripItem key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StripItem({ project }: { project: (typeof rapidProjects)[number] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        padding: '28px 24px',
        border: '1px solid rgba(26,24,20,0.08)',
        background: hovered ? 'var(--ink)' : 'var(--paper)',
        cursor: 'none',
        transition: 'background 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: hovered ? 'rgba(245,240,232,0.6)' : project.dotColor,
          marginBottom: 16,
          transition: 'background 0.2s ease',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: hovered ? 'rgba(245,240,232,0.4)' : 'var(--ink-muted)',
          marginBottom: 8,
          transition: 'color 0.2s ease',
        }}
      >
        {project.vertical}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          color: hovered ? 'var(--paper)' : 'var(--ink)',
          marginBottom: 12,
          transition: 'color 0.2s ease',
        }}
      >
        {project.name}
      </div>
      <div
        style={{
          fontSize: 13,
          color: hovered ? 'rgba(245,240,232,0.55)' : 'var(--ink-muted)',
          lineHeight: 1.5,
          transition: 'color 0.2s ease',
        }}
      >
        {project.outcome}
      </div>
    </div>
  )
}
