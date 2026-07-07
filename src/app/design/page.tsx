import type { Metadata } from 'next'
import { Nav } from '@/components/layout/Nav'
import { designPieces } from '@/data/design'
import { siteConfig } from '@/data/site'

// Raw <img> shots need the deployed base path (static export doesn't prefix it).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

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
            crafted to ship. A few recent pieces.
          </p>
        </header>

        {designPieces.map((p) => (
          <section key={p.slug} id={p.slug} className="design-piece">
            <div className="design-piece-head">
              <span className="design-cat" style={{ background: p.color }}>
                {p.category}
              </span>
              <h2 className="design-piece-title">{p.title}</h2>
              <p className="design-piece-tagline">{p.tagline}</p>
              {p.paragraphs.map((para, i) => (
                <p key={i} className="design-piece-body">
                  {para}
                </p>
              ))}
            </div>

            <div className="design-gallery">
              {p.shots.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  className="design-shot"
                  src={`${BASE}${src}`}
                  alt={`${p.title} — shot ${i + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        ))}

        <div className="design-cta">
          <h2 className="design-cta-title">Have a design project in mind?</h2>
          <p className="design-cta-sub">
            Landing page, redesign, or product UI — let’s make it look the part.
          </p>
          <a
            href={siteConfig.calLink}
            className="btn-pill"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get in touch →
          </a>
        </div>
      </main>
    </>
  )
}
