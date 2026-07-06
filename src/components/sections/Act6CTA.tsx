'use client'

import { siteConfig } from '@/data/site'

export function Act6CTA() {
  return (
    <section id="act6" className="cta-section hero-sans">
      {/* Faint dotted grid — echoes the hero, nothing louder */}
      <div className="grid-bg" style={{ opacity: 0.03 }} />

      <div className="cta-inner">
        {/* 1 · status badge with a slow, calm pulsing dot */}
        <span className="cta-badge reveal">
          <span className="cta-badge-dot" aria-hidden="true" />
          Available for new projects
        </span>

        {/* 2 · closing headline — bold but smaller than the hero, one accent word */}
        <h2 className="cta-heading reveal reveal-delay-1">
          Got a problem? Let&apos;s <span className="hero-accent">talk.</span>
        </h2>

        {/* 3 · muted subtext */}
        <p className="cta-sub reveal reveal-delay-2">
          Book a 30-minute call — no commitment, no deck, just a real conversation about
          whether I can help.
        </p>

        {/* 4 · solid pill primary + plain low-emphasis mail link */}
        <div className="cta-actions reveal reveal-delay-3">
          <a
            href={siteConfig.calLink}
            className="btn-pill"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>
          <a href={`mailto:${siteConfig.email}`} className="cta-mail">
            or {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  )
}
