'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { workProjects, workSectors, getWorkSector, projectImages } from '@/data/work'

const FILTERS = [{ key: 'all', label: 'All' }, ...workSectors.map((s) => ({ key: s.key, label: s.label }))]

export function WorkGrid() {
  const [active, setActive] = useState('all')
  const shown = active === 'all' ? workProjects : workProjects.filter((p) => p.sector === active)

  return (
    <>
      {/* Pill filter bar — matches the navbar's rounded language */}
      <div className="work-filters" role="tablist" aria-label="Filter projects by sector">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={active === f.key}
            className={`work-filter${active === f.key ? ' is-active' : ''}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="work-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => {
            const sector = getWorkSector(p.sector)
            const imgs = projectImages(p)
            const cover = p.cover ?? imgs[0]
            // Second image revealed on hover — first project shot that isn't the cover.
            const hover = imgs.find((src) => src !== cover)
            return (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Link href={`/work/${p.slug}`} className="work-card">
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
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </>
  )
}
