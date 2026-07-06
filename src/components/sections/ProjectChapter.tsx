'use client'

import type { HeroProject } from '@/data/site'

interface Props {
  project: HeroProject
}

export function ProjectChapter({ project }: Props) {
  const {
    index, vertical, accent, accentBg, accentBorder,
    mockAccentLight, mockAccentMid,
    problem, description, metric, quote, stack, flip,
  } = project

  const content = (
    <div style={{ position: 'relative' }}>
      {/* Giant hollow chapter number — the signature element */}
      <div
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(120px, 16vw, 200px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          WebkitTextStroke: `2px ${accent}`,
          color: 'transparent',
          position: 'absolute',
          top: -40,
          left: -20,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          opacity: 0.15,
        }}
      >
        {index}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#fff',
            background: accent,
            padding: '5px 12px',
            marginBottom: 24,
          }}
        >
          {vertical}
        </div>

        {/* Problem statement */}
        <h3
          className="reveal text-display-md"
          style={{ color: 'var(--ink)', marginBottom: 20 }}
        >
          {problem}
        </h3>

        <p
          className="reveal reveal-delay-1"
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--ink-soft)',
            marginBottom: 28,
          }}
        >
          {description}
        </p>

        {/* Metric — hard offset card */}
        <div
          className="reveal reveal-delay-2"
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 8,
            padding: '14px 20px',
            border: `2px solid ${accent}`,
            boxShadow: `4px 4px 0 ${accent}`,
            marginBottom: 24,
            color: accent,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            {metric.value}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
            }}
          >
            {metric.label}
          </span>
        </div>

        {/* Quote */}
        <div
          className="reveal reveal-delay-3"
          style={{
            fontSize: 14,
            lineHeight: 1.65,
            color: 'var(--ink-soft)',
            borderLeft: `3px solid ${accent}`,
            paddingLeft: 16,
            fontStyle: 'italic',
          }}
        >
          &ldquo;{quote.text}&rdquo;
          <strong
            style={{
              display: 'block',
              marginTop: 8,
              fontStyle: 'normal',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.06em',
              fontWeight: 500,
            }}
          >
            — {quote.author}, {quote.role}
          </strong>
        </div>
      </div>
    </div>
  )

  const visual = (
    <div className="reveal reveal-delay-1" style={{ position: 'relative' }}>
      {/* Mock screen */}
      <div
        style={{
          background: '#fff',
          border: '2px solid var(--ink)',
          boxShadow: '8px 8px 0 var(--ink)',
          overflow: 'hidden',
          aspectRatio: '4 / 3',
        }}
      >
        {/* Browser bar */}
        <div
          style={{
            height: 32,
            background: accent,
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: 8,
          }}
        >
          {[1, 2, 3].map((d) => (
            <div
              key={d}
              style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>

        {/* Mock UI body */}
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ height: 10, borderRadius: 2, background: mockAccentMid, opacity: 0.7, width: '60%' }} />
          <div style={{ height: 8, borderRadius: 2, background: '#F0EDE8', width: '90%' }} />
          <div style={{ height: 8, borderRadius: 2, background: '#F0EDE8', width: '75%' }} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              marginTop: 8,
            }}
          >
            {[1, 2, 3, 4].map((d) => (
              <div
                key={d}
                style={{
                  height: 56,
                  background: mockAccentLight,
                  border: `1px solid ${accentBorder}`,
                  borderRadius: 3,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stack badge */}
      <div
        style={{
          position: 'absolute',
          bottom: -16,
          right: -16,
          background: 'var(--paper)',
          border: `2px solid ${accent}`,
          boxShadow: `4px 4px 0 ${accent}`,
          padding: '10px 16px',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.06em',
          color: accent,
        }}
      >
        {stack.join(' · ')}
      </div>
    </div>
  )

  return (
    <section
      style={{
        background: accentBg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Crosshair motifs */}
      <div className="crosshair" style={{ top: 32, right: 48 }} />
      <div className="crosshair" style={{ bottom: 32, left: 48 }} />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
          padding: '100px 48px',
        }}
      >
        {flip ? (
          <>
            <div>{visual}</div>
            <div>{content}</div>
          </>
        ) : (
          <>
            <div>{content}</div>
            <div>{visual}</div>
          </>
        )}
      </div>
    </section>
  )
}
