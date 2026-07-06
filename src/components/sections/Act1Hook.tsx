'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { Star } from 'lucide-react'
import { hook, siteConfig, countries } from '@/data/site'
import US from 'country-flag-icons/react/3x2/US'
import GB from 'country-flag-icons/react/3x2/GB'
import SG from 'country-flag-icons/react/3x2/SG'
import DE from 'country-flag-icons/react/3x2/DE'
import CH from 'country-flag-icons/react/3x2/CH'
import ES from 'country-flag-icons/react/3x2/ES'
import FR from 'country-flag-icons/react/3x2/FR'
import MA from 'country-flag-icons/react/3x2/MA'
import JO from 'country-flag-icons/react/3x2/JO'
import AU from 'country-flag-icons/react/3x2/AU'
import NO from 'country-flag-icons/react/3x2/NO'

// Map ISO code → flag SVG component (accurate, cross-platform — unlike emoji
// flags, which degrade to letter codes on Windows).
const FLAGS: Record<string, React.FC<{ title?: string; className?: string }>> = {
  US, GB, SG, DE, CH, ES, FR, MA, JO, AU, NO,
}

// ── Laurel ornament (Section 13) — one decorative .avif, mirrored per side ──
// Served from /public via <Image>. width/height are locked to the file's true
// natural ratio (659×1024) so it's never distorted, then rendered small. The
// right instance reuses the same source and is flipped with scaleX(-1) — the
// file is never duplicated. Served as-is via the custom static-export image
// loader (no re-encoding). Purely decorative → alt='', aria-hidden. Grayscale /
// opacity / positioning live in .laurel.
const LAUREL_NATURAL = { w: 659, h: 1024 }
const LAUREL_W = 62
const LAUREL_H = Math.round((LAUREL_W * LAUREL_NATURAL.h) / LAUREL_NATURAL.w)
function Laurel({ side }: { side: 'left' | 'right' }) {
  return (
    <Image
      src="/laurel.avif"
      alt=""
      aria-hidden="true"
      className="laurel"
      width={LAUREL_W}
      height={LAUREL_H}
      style={{
        [side]: 'calc(50% - clamp(320px, 40vw, 430px))',
        transform: `translateY(-50%) ${side === 'right' ? 'scaleX(-1)' : ''}`,
      }}
    />
  )
}

// ── Magnetic CTA (Section 7 · signature interaction #2) ──
function MagneticLink({
  href,
  className,
  children,
  external,
}: {
  href: string
  className: string
  children: React.ReactNode
  external?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  // Internal root-absolute links need the basePath (raw <a> doesn't get it like
  // next/link) plus a trailing slash to match the static export's file layout.
  let resolved = href
  if (!external && href.startsWith('/')) {
    resolved = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${href}`
    if (!/[#?]/.test(resolved) && !resolved.endsWith('/')) resolved += '/'
  }
  return (
    <a
      ref={ref}
      href={resolved}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transition: 'transform 0.25s var(--ease-out-quart), background 0.2s, color 0.2s, border-color 0.2s' }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

// Split a headline line so exactly the accent word renders in indigo.
function renderLine(line: string, accentWord: string) {
  const i = line.toLowerCase().indexOf(accentWord.toLowerCase())
  if (i === -1) return line
  return (
    <>
      {line.slice(0, i)}
      <span className="hero-accent">{line.slice(i, i + accentWord.length)}</span>
      {line.slice(i + accentWord.length)}
    </>
  )
}

// ── Marquee (Act 1 trust rows) ──────────────────────────────────────
// Pure-CSS infinite loop: the child set is rendered twice inside the track and
// the keyframe translates it by -50% (exactly one set width) → seamless. No
// scroll listener. Duration (set per row) drives speed; hover pauses it. The
// edge fade + grayscale live in .marquee / item classes in globals.css.
// The track is two identical halves; the keyframe translates it -50% (exactly
// one half) for a seamless wrap. That only looks gapless if a half is at least
// as wide as the container — otherwise the content runs out before the wrap and
// you see empty space. So we repeat the base set enough times that one half
// clears MARQUEE_MIN_HALF. Duration is derived from the half's width so every
// row scrolls at the same pixels/second regardless of how many items it holds.
const MARQUEE_MIN_HALF = 1000 // px — safely above the hero container (~900)
const MARQUEE_SPEED = 40 // px per second

function Marquee<T>({
  items,
  renderItem,
  itemWidth,
  ariaLabel,
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemWidth: number // approx rendered width incl. gap, used to size the loop
  ariaLabel: string
}) {
  const setWidth = Math.max(1, items.length * itemWidth)
  const copies = Math.max(1, Math.ceil(MARQUEE_MIN_HALF / setWidth))
  const half = Array.from({ length: copies }, () => items).flat()
  const halfWidth = half.length * itemWidth
  const seconds = Math.max(12, Math.round(halfWidth / MARQUEE_SPEED))
  const renderHalf = () => half.map((item, i) => renderItem(item, i))
  return (
    <div
      className="marquee"
      role="group"
      aria-label={ariaLabel}
      style={{ ['--marquee-duration']: `${seconds}s` } as React.CSSProperties}
    >
      <div className="marquee-track">
        <div className="marquee-group">{renderHalf()}</div>
        {/* Duplicate half — decorative, hidden from assistive tech */}
        <div className="marquee-group" aria-hidden="true">
          {renderHalf()}
        </div>
      </div>
    </div>
  )
}

// Derive a readable logo alt from its filename (e.g. /…/chezpluie.avif → Chezpluie)
function logoAlt(src: string): string {
  const name = (src.split('/').pop() ?? '').replace(/\.[^.]+$/, '')
  return name.charAt(0).toUpperCase() + name.slice(1)
}

// Upwork "Top Rated" badge
function UpworkTopRatedBadge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" viewBox="0 0 28 28" role="img">
      <path
        fill="#1F57C3"
        d="M12 1.155a4 4 0 014 0l8.124 4.69a4 4 0 012 3.464v9.382a4 4 0 01-2 3.464L16 26.845a4 4 0 01-4 0l-8.124-4.69a4 4 0 01-2-3.464V9.309a4 4 0 012-3.464L12 1.155z"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        clipRule="evenodd"
        d="M14.761 7.542l1.188 3.201 3.285.184a.78.78 0 01.448.173c.13.104.226.247.277.41a.9.9 0 01.01.504.858.858 0 01-.261.422L17.15 14.6l.854 3.328a.907.907 0 01-.025.507.857.857 0 01-.291.404.785.785 0 01-.919.02L14 16.984l-2.764 1.862a.784.784 0 01-.916-.012.855.855 0 01-.294-.4.906.906 0 01-.031-.505l.847-3.314-2.55-2.18a.858.858 0 01-.26-.421.9.9 0 01.01-.504.853.853 0 01.276-.41.782.782 0 01.448-.173l3.285-.184 1.188-3.201a.86.86 0 01.302-.394.79.79 0 01.918 0 .86.86 0 01.302.394z"
      />
    </svg>
  )
}

export function Act1Hook({ logos }: { logos: string[] }) {
  return (
    <section
      id="act1"
      className="hero-sans"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '128px 24px 48px',
        background: 'var(--paper)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dotted-grid motif behind hero type (Section 6) */}
      <div className="grid-bg" style={{ opacity: 0.03 }} />

      <div style={{ position: 'relative', maxWidth: 900, width: '100%' }}>
        {/* 1 · Avatar — instant human trust */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
          <div className="avatar-mono" title={siteConfig.name}>
            {siteConfig.avatar ? (
              <Image src={siteConfig.avatar} alt={siteConfig.name} width={72} height={72} />
            ) : (
              siteConfig.initials
            )}
          </div>
        </div>

        {/* 2 · One compact trust line */}
        <div
          className="reveal reveal-delay-1"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}
        >
          <span className="trust-line">
            {/* 3 enterprise logos — small optimized images from /public/collaborations */}
            <span className="trust-logos">
              {logos.slice(0, 3).map((src) => (
                <span key={src} className="trust-logo-img">
                  <Image
                    src={src}
                    alt={logoAlt(src)}
                    fill
                    sizes="40px"
                    style={{ objectFit: 'contain' }}
                    draggable={false}
                  />
                </span>
              ))}
            </span>
            <span className="star-row">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            {hook.trustCaption}
          </span>
        </div>

        {/* 2b · Upwork credentials — sit right under the trust line */}
        <div className="reveal reveal-delay-1 hero-creds" style={{ marginBottom: 30 }}>
          <span className="cred">
            <UpworkTopRatedBadge />
            Top Rated
          </span>
          <span className="cred-sep" aria-hidden="true">·</span>
          <span className="cred">
            <span className="cred-jss">100%</span>
            Job Success
          </span>
          <span className="cred-sep" aria-hidden="true">·</span>
          <span className="cred">
            <span className="cred-num">50+</span>
            Projects delivered
          </span>
        </div>

        {/* 3 · Headline — two lines, exactly one accent word. Laurel flanks it. */}
        <div style={{ position: 'relative' }}>
          <Laurel side="left" />
          <Laurel side="right" />
          <h1
            className="reveal reveal-delay-2"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
              margin: '0 auto 22px',
              maxWidth: 'min(720px, 100%)',
            }}
          >
            <span style={{ display: 'block' }}>{renderLine(hook.headlineTop, hook.accentWord)}</span>
            <span style={{ display: 'block' }}>{renderLine(hook.headlineBottom, hook.accentWord)}</span>
          </h1>
        </div>


        {/* 5 · Two CTAs — solid primary + outlined secondary (magnetic) */}
        <div
          className="reveal reveal-delay-3"
          style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 52 }}
        >
          <MagneticLink href={siteConfig.calLink} className="btn-pill" external>
            {hook.primaryCta.label}
          </MagneticLink>
          <MagneticLink href={hook.secondaryCta.href} className="btn-pill-outline">
            {hook.secondaryCta.label} →
          </MagneticLink>
        </div>

        {/* 6a · Company logo marquee — horizontal auto-scroll, dynamic from
            /public/collaborations. Logos are contained to a uniform box and
            served through next/image so they're delivered optimized. */}
        {logos.length > 0 && (
          <div className="reveal reveal-delay-4" style={{ width: '100%', marginBottom: 22 }}>
            <p className="hero-eyebrow">{hook.companiesCaption}</p>
            <Marquee
              items={logos}
              itemWidth={176} /* 112px cell + 64px gap */
              ariaLabel="Companies we have collaborated with"
              renderItem={(src, i) => (
                // Fixed-size cell → every logo lands in the same small footprint,
                // fill + contain scales each to fit without distortion.
                <span key={i} className="marquee-logo">
                  <Image
                    src={src}
                    alt={logoAlt(src)}
                    fill
                    sizes="112px"
                    style={{ objectFit: 'contain' }}
                    draggable={false}
                  />
                </span>
              )}
            />
          </div>
        )}

        {/* 6b · Country marquee — same loop mechanic + edge fade */}
        <div className="reveal reveal-delay-4" style={{ width: '100%', marginBottom: 34 }}>
          <p className="hero-eyebrow">{hook.countriesCaption}</p>
          <Marquee
            items={countries}
            itemWidth={65} /* ~33px flag + 32px gap */
            ariaLabel="Countries our clients are based in"
            renderItem={(c, i) => {
              const Flag = FLAGS[c.code]
              return (
                <span
                  key={i}
                  className="marquee-flag"
                  role="img"
                  aria-label={c.name}
                  title={c.name}
                >
                  {Flag ? <Flag /> : null}
                </span>
              )
            }}
          />
        </div>

        {/* 8 · Platform badges — bottom-most, same visual weight as logos */}
        <div className="reveal reveal-delay-4 hero-badges">
          {hook.platformBadges.map((b) => (
            <span key={b} className="hero-badge">
              <Star size={13} fill="currentColor" strokeWidth={0} />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
