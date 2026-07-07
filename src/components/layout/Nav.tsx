'use client'

import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/data/site'

// Section 13 · floating pill navbar. Resolved the open [TBD] toward SOFT
// ANCHORS: brand + smooth-scroll jump-links + one solid black CTA pill. Gives
// busy founders an escape hatch (html { scroll-behavior: smooth } handles the
// glide) without breaking the first-time linear narrative.
// 'Work' is a real route (/work); the others are homepage anchors written as
// /#… so they work from any page (they navigate home, then scroll).
const links = [
  { label: 'Work', href: '/work' },
  { label: 'Design', href: '/design' },
  { label: 'Process', href: '/#act4' },
  { label: 'Contact', href: '/#act6' },
]

// Raw <a> homepage-anchor links don't get basePath auto-applied (unlike
// next/link), so prepend it manually for the deployed /pw site.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function Nav() {
  return (
    <div className="nav-shell">
      <nav className="nav-pill" aria-label="Primary">
        <Link href="/" className="nav-brand" aria-label={siteConfig.name}>
          {/* Size lives on the element (width/height attrs), not just CSS, so a
              stale globals.css chunk can never let it render at full resolution. */}
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={39}
            height={29}
            className="nav-logo"
            priority
          />
        </Link>

        <div className="nav-links">
          {links.map(({ label, href }) =>
            href.includes('#') ? (
              <a key={href} href={`${BASE}${href}`} className="nav-link">
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
