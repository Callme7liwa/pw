'use client'

import { clsx } from 'clsx'

interface SectionLabelProps {
  children: React.ReactNode
  light?: boolean
  centered?: boolean
  className?: string
}

export function SectionLabel({ children, light, centered, className }: SectionLabelProps) {
  return (
    <div
      className={clsx('section-label', className)}
      style={{
        color: light ? 'rgba(245,240,232,0.35)' : undefined,
        justifyContent: centered ? 'center' : undefined,
      }}
    >
      {children}
    </div>
  )
}
