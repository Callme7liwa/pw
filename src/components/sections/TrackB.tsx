'use client'

import { agentProjects } from '@/data/site'
import type { AgentProject } from '@/data/site'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function TrackB() {
  return (
    <div id="track-b" style={{ background: 'var(--ink)' }}>
      {/* Track label */}
      <div
        style={{
          padding: '40px 48px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ width: 20, height: 1, background: 'rgba(0,119,204,0.7)', display: 'block' }} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(0,119,204,0.7)',
          }}
        >
          Track B — AI & automation
        </span>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--cyan)',
              marginBottom: 24,
            }}
          >
            <span style={{ width: 24, height: 1, background: 'var(--cyan)', display: 'block' }} />
            Agentic systems
            <span style={{ width: 24, height: 1, background: 'var(--cyan)', display: 'block' }} />
          </div>

          <h2
            className="reveal"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6vw, 80px)',
              fontWeight: 800,
              lineHeight: 0.93,
              letterSpacing: '-0.03em',
              color: 'var(--paper)',
              marginBottom: 24,
            }}
          >
            Chaos →{' '}
            <span style={{ color: 'var(--cyan)' }}>order.</span>
            <br />
            Automatically.
          </h2>

          <p
            className="reveal reveal-delay-1"
            style={{
              fontSize: 17,
              color: 'rgba(245,240,232,0.5)',
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            I build agents and workflows that replace repetitive, high-cost human processes. 
            The result is a system that thinks, acts, and reports — while your team focuses 
            on what actually needs them.
          </p>
        </div>

        {/* Agent flow cards */}
        <div
          className="reveal reveal-delay-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {agentProjects.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AgentCard({ agent }: { agent: AgentProject }) {
  return (
    <div
      style={{
        border: '1px solid rgba(0,119,204,0.2)',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(0,119,204,0.04)',
      }}
    >
      {/* Top glow line */}
      <div className="glow-line" />

      {/* Index */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--cyan)',
          marginBottom: 16,
        }}
      >
        Agent {agent.index} / {agent.label}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 700,
          color: 'var(--paper)',
          letterSpacing: '-0.01em',
          marginBottom: 12,
          lineHeight: 1.2,
        }}
      >
        {agent.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: 'rgba(245,240,232,0.5)',
          marginBottom: 24,
        }}
      >
        {agent.description}
      </p>

      {/* Node flow */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexWrap: 'wrap',
          marginBottom: 20,
        }}
      >
        {agent.nodes.map((node, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 10px',
                border: `1px solid ${agent.activeNodes.includes(i) ? 'var(--cyan)' : 'rgba(0,119,204,0.25)'}`,
                background: agent.activeNodes.includes(i) ? 'rgba(0,119,204,0.1)' : 'transparent',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: agent.activeNodes.includes(i) ? 'var(--cyan)' : 'rgba(245,240,232,0.35)',
              }}
            >
              {node}
            </span>
            {i < agent.nodes.length - 1 && (
              <span style={{ color: 'rgba(245,240,232,0.2)', fontSize: 11 }}>→</span>
            )}
          </span>
        ))}
      </div>

      {/* Metric */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 36,
          fontWeight: 800,
          color: 'var(--cyan)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {agent.metric.value}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.35)',
          marginBottom: 16,
          marginTop: 4,
        }}
      >
        {agent.metric.label}
      </div>

      {/* Quote */}
      <div
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: 'rgba(245,240,232,0.4)',
          borderLeft: '2px solid var(--cyan)',
          paddingLeft: 14,
          fontStyle: 'italic',
        }}
      >
        &ldquo;{agent.quote}&rdquo;
      </div>
    </div>
  )
}
