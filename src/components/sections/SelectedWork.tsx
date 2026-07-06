import Link from 'next/link'
import Image from 'next/image'
import { workProjects, getWorkSector, projectImages } from '@/data/work'

// Curated trio surfaced on the homepage (order = display order). Falls back to
// the first projects in the data if a slug is ever renamed, so this never
// renders empty.
const FEATURED = ['realtiintel', 'vevvo', 'periochart-pro']

function featuredProjects() {
  const picked = FEATURED.map((slug) => workProjects.find((p) => p.slug === slug)).filter(
    (p): p is (typeof workProjects)[number] => Boolean(p)
  )
  const seen = new Set(picked.map((p) => p.slug))
  for (const p of workProjects) {
    if (picked.length >= 3) break
    if (!seen.has(p.slug)) picked.push(p)
  }
  return picked.slice(0, 3)
}

export function SelectedWork() {
  const projects = featuredProjects()

  return (
    <section id="selected-work" className="selected">
      <div className="selected-inner">
        <div className="selected-head reveal">
          <p className="selected-eyebrow">Selected work</p>
          <h2 className="selected-title">A few things I&apos;ve shipped</h2>
          <p className="selected-sub">
            Real products, real case studies — from farm ops to dental charting. Here are three;
            the rest live on the work page.
          </p>
        </div>

        <div className="work-grid selected-grid reveal reveal-delay-1">
          {projects.map((p) => {
            const sector = getWorkSector(p.sector)
            const imgs = projectImages(p)
            const cover = p.cover ?? imgs[0]
            const hover = imgs.find((src) => src !== cover)
            return (
              <Link key={p.slug} href={`/work/${p.slug}`} className="work-card">
                <div className="work-card-media" style={{ background: sector?.color }}>
                  {cover && (
                    <Image
                      src={cover}
                      alt={p.name}
                      fill
                      sizes="(max-width: 900px) 50vw, 360px"
                      style={{ objectFit: 'cover' }}
                      className="work-card-img"
                    />
                  )}
                  {hover && (
                    <Image
                      src={hover}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 900px) 50vw, 360px"
                      style={{ objectFit: 'cover' }}
                      className="work-card-img work-card-img-hover"
                    />
                  )}
                </div>
                <div className="work-card-foot">
                  <div className="work-card-foot-top">
                    <span className="work-card-name">{p.name}</span>
                    <span className="work-card-tag" style={{ background: sector?.color }}>
                      {sector?.label}
                    </span>
                  </div>
                  <p className="work-card-desc">{p.blurb}</p>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="selected-cta reveal reveal-delay-2">
          <Link href="/work" className="btn-pill">
            View all work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
