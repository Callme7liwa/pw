'use client'

import Link from 'next/link'
import { siteConfig } from '@/data/site'

// Section 13 · floating pill navbar. Resolved the open [TBD] toward SOFT
// ANCHORS: brand + smooth-scroll jump-links + one solid black CTA pill. Gives
// busy founders an escape hatch (html { scroll-behavior: smooth } handles the
// glide) without breaking the first-time linear narrative.
// 'Work' is a real route (/work); the others are homepage anchors written as
// /#… so they work from any page (they navigate home, then scroll).
const links = [
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/#act4' },
  { label: 'Contact', href: '/#act6' },
]

export function Nav() {
  return (
    <div className="nav-shell">
      <nav className="nav-pill" aria-label="Primary">
        <Link href="/" className="nav-brand">
          {siteConfig.initials}
          <span style={{ color: 'var(--indigo)' }}>.</span>
        </Link>

        <div className="nav-links">
          {links.map(({ label, href }) =>
            href.includes('#') ? (
              <a key={href} href={href} className="nav-link">
                {label}
              </a>
            ) : (
              <Link key={href} href={href} className="nav-link">
                {label}
              </Link>
            )
          )}
          <a
            href={siteConfig.calLink}
            className="nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>
        </div>
      </nav>
    </div>
  )
}
