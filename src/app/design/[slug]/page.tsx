import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { designPieces } from '@/data/design'
import { siteConfig } from '@/data/site'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function generateStaticParams() {
  return designPieces.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = designPieces.find((x) => x.slug === slug)
  if (!p) return { title: 'Design' }
  return {
    title: `${p.title} — Design | Ayoub Seddiki`,
    description: p.tagline,
    openGraph: {
      title: p.title,
      description: p.tagline,
      type: 'article',
      images: [`${BASE}${p.shots[0]}`],
    },
  }
}

export default async function DesignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = designPieces.find((x) => x.slug === slug)
  if (!p) notFound()

  return (
    <>
      <Nav />
      <main className="design-page design-detail">
        <div className="design-detail-head">
          <Link href="/design" className="work-back">
            ← Back to design
          </Link>
          <span className="design-cat" style={{ background: p.color }}>
            {p.category}
          </span>
          <h1 className="design-piece-title">{p.title}</h1>
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

        <div className="design-cta">
          <p className="design-cta-eyebrow">Let’s work together</p>
          <h2 className="design-cta-title">Have a design project in mind?</h2>
          <p className="design-cta-sub">
            Landing page, redesign, or product UI — let’s make it look the part.
          </p>
          <a
            href={siteConfig.calLink}
            className="btn-pill design-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get in touch →
          </a>
          <a href={`mailto:${siteConfig.email}`} className="design-cta-mail">
            or {siteConfig.email}
          </a>
        </div>
      </main>
    </>
  )
}
