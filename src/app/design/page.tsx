import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { designPieces } from '@/data/design'

// Raw <img> shots need the deployed base path (static export doesn't prefix it).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''
// Make a plain <img> fill the card media box (like next/image fill).
const fill: CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }

export const metadata: Metadata = {
  title: 'Design — Landing Pages & Product UI | Ayoub Seddiki',
  description:
    'Web and mobile design work — trust-first landing pages and clean product UI for startups and businesses. Structured, credible, and built to ship.',
}

export default function DesignPage() {
  return (
    <>
      <Nav />
      <main className="design-page">
        <header className="design-head">
          <p className="design-eyebrow">Design</p>
          <h1 className="design-title">Interfaces that earn trust — and convert.</h1>
          <p className="design-intro">
            Landing pages and product UI for startups and businesses: structured, credible, and
            crafted to ship. Pick a project to see the full case.
          </p>
        </header>

        <div className="design-grid">
          {designPieces.map((p) => (
            <Link key={p.slug} href={`/design/${p.slug}`} className="work-card">
              <div className="work-card-media" style={{ background: p.color }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${BASE}${p.shots[0]}`} alt={p.title} className="work-card-img" style={fill} />
              </div>
              <div className="work-card-foot">
                <div className="work-card-foot-top">
                  <span className="work-card-name">{p.name}</span>
                  <span className="work-card-tag" style={{ background: p.color, color: '#fff' }}>
                    {p.category}
                  </span>
                </div>
                <p className="work-card-desc">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
