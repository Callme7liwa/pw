'use client'

import { stats, testimonials } from '@/data/site'
import { useCountUp } from '@/hooks/useCountUp'
import { SectionLabel } from '@/components/ui/SectionLabel'

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, display } = useCountUp(value, suffix)

  return (
    <div
      style={{
        padding: '40px 32px',
        background: 'rgba(245,240,232,0.03)',
        border: '1px solid rgba(245,240,232,0.06)',
      }}
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(40px, 5vw, 68px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--paper)',
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.35)',
        }}
      >
        {label}
      </div>
    </div>
  )
}

export function Act5Trust() {
  return (
    <section
      id="act5"
      style={{
        background: 'var(--ink)',
        padding: '100px 48px',
        color: 'var(--paper)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionLabel light>Results</SectionLabel>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 2,
            marginBottom: 80,
          }}
        >
          {stats.map((s) => (
            <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>

        {/* Testimonials */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 4)}` : ''}`}
              style={{
                padding: '32px',
                border: '1px solid rgba(245,240,232,0.08)',
                position: 'relative',
              }}
            >
              {/* Top rule */}
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 32, right: 32,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(245,240,232,0.12), transparent)',
                }}
              />

              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: 'rgba(245,240,232,0.72)',
                  fontStyle: 'italic',
                  marginBottom: 24,
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--paper)',
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.35)',
                    marginTop: 4,
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
