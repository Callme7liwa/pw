import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { workProjects, getWorkProject, getWorkSector, sectionImages } from '@/data/work'
import { siteConfig } from '@/data/site'

export function generateStaticParams() {
  return workProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getWorkProject(slug)
  if (!project) return { title: 'Work' }
  const title = project.seoTitle ?? `${project.name} — Selected work`
  const description = project.seoDescription ?? project.blurb
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: project.sections?.[0]?.image ? [project.sections[0].image] : undefined,
    },
  }
}

// Real image dimensions (read at build) so next/image keeps the true ratio.
// Supports PNG and WebP (VP8 / VP8L / VP8X).
function imageSize(src: string): { w: number; h: number } {
  try {
    const b = fs.readFileSync(path.join(process.cwd(), 'public', src.replace(/^\//, '')))
    if (b.readUInt32BE(0) === 0x89504e47) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) } // PNG
    if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
      const fourcc = b.toString('ascii', 12, 16)
      if (fourcc === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff }
      if (fourcc === 'VP8L') {
        const b1 = b[21], b2 = b[22], b3 = b[23], b4 = b[24]
        return {
          w: 1 + (((b2 & 0x3f) << 8) | b1),
          h: 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6)),
        }
      }
      if (fourcc === 'VP8X') {
        return {
          w: 1 + (b[24] | (b[25] << 8) | (b[26] << 16)),
          h: 1 + (b[27] | (b[28] << 8) | (b[29] << 16)),
        }
      }
    }
    return { w: 1600, h: 1000 }
  } catch {
    return { w: 1600, h: 1000 }
  }
}

function Shot({ src, alt, sizes }: { src: string; alt: string; sizes?: string }) {
  const dim = imageSize(src)
  return (
    <div className="case-shot">
      <div className="case-shot-bar" aria-hidden="true">
        <span className="case-shot-dot" />
        <span className="case-shot-dot" />
        <span className="case-shot-dot" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={dim.w}
        height={dim.h}
        sizes={sizes ?? '(max-width: 1128px) 100vw, 1080px'}
      />
    </div>
  )
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getWorkProject(slug)
  if (!project) notFound()
  const sector = getWorkSector(project.sector)
  const sections = project.sections ?? []
  const gallery = project.gallery ?? []
  const style = { '--accent': sector?.color } as CSSProperties

  return (
    <>
      <Nav />
      <main className="case hero-sans" style={style}>
        {/* Hero */}
        <header className="case-hero">
          <div className="case-wrap">
            <Link href="/work" className="work-back">
              ← Back to work
            </Link>
            <div className="case-meta">
              <span className="case-tag">{sector?.label}</span>
              {project.type && <span className="case-type">{project.type}</span>}
            </div>
            <h1 className="case-title">{project.name}</h1>
            {project.tagline && <p className="case-tagline">{project.tagline}</p>}
            <p className="case-overview">{project.overview ?? project.blurb}</p>
            {project.highlights && project.highlights.length > 0 && (
              <ul className="case-highlights">
                {project.highlights.map((h) => (
                  <li key={h} className="case-highlight">
                    {h}
                  </li>
                ))}
              </ul>
            )}
            {project.tech && project.tech.length > 0 && (
              <div className="case-tech">
                <span className="case-tech-label">Built with</span>
                {project.tech.map((t) => (
                  <span key={t} className="case-tech-item">
                    {t}
                  </span>
                ))}
              </div>
            )}
            {project.tags && project.tags.length > 0 && (
              <div className="case-tags">
                {project.tags.map((t) => (
                  <span key={t} className="case-tag-pill">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Alternating feature sections */}
        {sections.length > 0 && (
          <div className="case-wrap case-sections">
            {sections.map((s, i) => {
              const imgs = sectionImages(s)
              return (
              <section className="case-section" key={i}>
                <div className="case-copy">
                  <span className="case-num">{`0${i + 1}`}</span>
                  <h2 className="case-h2">{s.title}</h2>
                  <p className="case-body">{s.body}</p>
                </div>
                {imgs.length > 0 && (
                  <div className="case-shots">
                    {imgs.map((src, idx) => (
                      <Shot key={idx} src={src} alt={`${project.name} — ${s.title}`} />
                    ))}
                  </div>
                )}
              </section>
              )
            })}
          </div>
        )}

        {gallery.length > 0 && (
          <>
            {sections.length > 0 && <p className="case-more">More screens</p>}
            <div className="case-gallery">
              {gallery.map((src, i) => (
                <Shot
                  key={i}
                  src={src}
                  alt={`${project.name} — screen ${i + 1}`}
                  sizes="(max-width: 720px) 90vw, 440px"
                />
              ))}
            </div>
          </>
        )}

        {sections.length === 0 && gallery.length === 0 && (
          <div className="case-wrap">
            <div className="work-detail-note">
              Full case study coming soon — numbers, process and a client quote.
            </div>
          </div>
        )}

        {/* Closing CTA */}
        <div className="case-wrap case-cta">
          <h2 className="case-cta-title">Building something like this?</h2>
          <p className="case-cta-sub">
            If your operation is running on scattered spreadsheets and chats, I can help you turn
            it into one calm, predictable system.
          </p>
          <a
            href={siteConfig.calLink}
            className="btn-pill"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>
        </div>
      </main>
    </>
  )
}
