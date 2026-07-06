'use client'

import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { siteConfig } from '@/data/site'

// Act 1.5 — "Let's talk!" quick-book. Live Cal.com scheduler embedded right
// under the hero so a convinced visitor can book immediately, before the rest
// of the story. Themed toward the site palette (paper bg, ink text, indigo
// brand, thin border + rounded corners like the navbar) so it reads native.
const CAL_NAMESPACE = '30min'

export function Act15Book() {
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      if (cancelled) return
      // Same palette for both themes — we force light, but the type wants both.
      const palette = {
        'cal-brand': '#3B2FC9', // indigo accent → buttons + selected slot
        'cal-text': '#1A1814',
        'cal-text-emphasis': '#1A1814',
        'cal-bg': '#F5F0E8', // paper canvas
        'cal-bg-emphasis': '#EDE8DF',
        'cal-bg-muted': '#EDE8DF',
        'cal-border': '#E3DCD0',
        'cal-border-emphasis': '#CBC2B4',
      }
      cal('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: { light: palette, dark: palette },
      })
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section
      id="book"
      className="hero-sans"
      style={{
        background: 'var(--paper)',
        padding: '96px 24px 84px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <h2
        className="reveal"
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: 'clamp(26px, 3vw, 40px)',
          letterSpacing: '-0.03em',
          color: 'var(--ink)',
          marginBottom: 12,
        }}
      >
        Let&apos;s talk<span className="hero-accent">!</span>
      </h2>
      <p
        className="reveal reveal-delay-1"
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          color: 'var(--ink-muted)',
          maxWidth: 520,
          margin: '0 auto 40px',
        }}
      >
        Grab a 30-minute slot — no forms, no back-and-forth. Just pick a time that works for you.
      </p>

      <div className="cal-embed-card reveal reveal-delay-2">
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={siteConfig.calEmbedLink}
          // Width only — NO height/overflow. The official embed auto-resizes the
          // iframe to its content height, so the calendar + slot list display in
          // full with no internal scrollbars (the page scrolls, not the widget).
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
          config={{ layout: 'month_view', theme: 'light', useSlotsViewOnSmallScreen: 'true' }}
        />
      </div>
    </section>
  )
}
