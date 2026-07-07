import Link from 'next/link'
import type { CSSProperties } from 'react'
import { designPieces } from '@/data/design'

// Raw <img> covers need the deployed base path prefixed; `fill` makes them fill
// the card media box like next/image fill.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''
const fill: CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }

// Curated trio surfaced on the homepage; falls back to the first pieces so it
// never renders empty.
const FEATURED = ['estateo-investment-landing', 'estore-marketplace', 'mobile-task-manager']

function featuredDesign() {
  const picked = FEATURED.map((slug) => designPieces.find((p) => p.slug === slug)).filter(
    (p): p is (typeof designPieces)[number] => Boolean(p)
  )
  const seen = new Set(picked.map((p) => p.slug))
  for (const p of designPieces) {
    if (picked.length >= 3) break
    if (!seen.has(p.slug)) picked.push(p)
  }
  return picked.slice(0, 3)
}

export function SelectedDesign() {
  const pieces = featuredDesign()

  return (
    <section id="selected-design" className="selected">
      <div className="selected-inner">
        <div className="selected-head reveal">
          <p className="selected-eyebrow">Selected design</p>
          <h2 className="selected-title">Design that sells the work.</h2>
          <p className="selected-sub">
            Landing pages and product UI, crafted to convert. A few pieces — the rest live on the
            design page.
          </p>
        </div>

        <div className="work-grid selected-grid reveal reveal-delay-1">
          {pieces.map((p) => (
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

        <div className="selected-cta reveal reveal-delay-2">
          <Link href="/design" className="btn-pill">
            View all design <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
