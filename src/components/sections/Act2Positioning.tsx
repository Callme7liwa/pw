'use client'

export function Act2Positioning() {
  return (
    <section
      id="act2"
      style={{
        padding: '100px 48px',
        background: 'var(--ink)',
        color: 'var(--paper)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Big ghost number */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(200px, 30vw, 420px)',
          fontWeight: 800,
          WebkitTextStroke: '1px rgba(245,240,232,0.04)',
          color: 'transparent',
          right: -60,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        02
      </div>

      {/* Grid motif reversed */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(245,240,232,1) 0.5px, transparent 0.5px)',
          backgroundSize: '28px 28px',
          opacity: 0.03,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Label */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            marginBottom: 40,
          }}
        >
          <span style={{ width: 24, height: 1, background: 'var(--ink-muted)', display: 'block' }} />
          What I do
          <span style={{ width: 24, height: 1, background: 'var(--ink-muted)', display: 'block' }} />
        </div>

        {/* Headline */}
        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4.5vw, 60px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--paper)',
            marginBottom: 32,
          }}
        >
          I build products — and I make them{' '}
          <span style={{ color: 'var(--amber)' }}>intelligent</span>{' '}
          with AI agents.
        </h2>

        {/* Body */}
        <p
          className="reveal reveal-delay-1"
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: 'rgba(245,240,232,0.55)',
            maxWidth: 660,
            margin: '0 auto',
          }}
        >
          Two service lines, one thinking brain. Whether you need a product built from scratch
          or your existing workflows made 10× faster through automation —
          both come from the same systems-level perspective.
        </p>
      </div>
    </section>
  )
}
