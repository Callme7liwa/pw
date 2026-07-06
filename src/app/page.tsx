import { Nav } from '@/components/layout/Nav'
import { Act1Hook } from '@/components/sections/Act1Hook'
import { Act15Book } from '@/components/sections/Act15Book'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Act22Sectors } from '@/components/sections/Act22Sectors'
import { Act23Services } from '@/components/sections/Act23Services'
import { TechStrip } from '@/components/sections/TechStrip'
import { Act4Process } from '@/components/sections/Act4Process'
import { Act6CTA } from '@/components/sections/Act6CTA'
import { RevealProvider } from '@/components/ui/RevealProvider'
import fs from 'node:fs'
import path from 'node:path'

// Read collaboration logos from /public/collaborations at build time (SSG) so
// the hero marquee stays in sync whenever files are added or removed — no
// hardcoded list to maintain. Runs on the server; returns web paths.
function getCollaborationLogos(): string[] {
  const dir = path.join(process.cwd(), 'public', 'collaborations')
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpe?g|svg|webp|avif|gif)$/i.test(f))
      .sort()
      .map((f) => `/collaborations/${f}`)
  } catch {
    return [] // folder missing/empty → marquee simply doesn't render
  }
}

export default function Home() {
  const collaborationLogos = getCollaborationLogos()

  return (
    <>
      <Nav />
      <RevealProvider>
        <main>
          {/* Act 1 — Hook */}
          <Act1Hook logos={collaborationLogos} />

          {/* Act 1.5 — Quick book (live scheduler) */}
          <Act15Book />

          {/* Selected work — 3 featured case studies → /work */}
          <SelectedWork />

          {/* Act 2.2 — Sectors we work in (animated fan) */}
          <Act22Sectors />

          {/* Act 2.3 — What we work on (expanding tab accordion) */}
          <Act23Services />

          {/* Compact tools / tech-stack strip */}
          <TechStrip />

          {/* Act 4 — Process */}
          <Act4Process />

          {/* Act 6 — CTA */}
          <Act6CTA />
        </main>
      </RevealProvider>
    </>
  )
}
