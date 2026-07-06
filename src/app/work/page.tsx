import type { Metadata } from 'next'
import { Nav } from '@/components/layout/Nav'
import { WorkGrid } from '@/components/work/WorkGrid'

export const metadata: Metadata = {
  title: 'Selected work — projects across products & AI',
  description:
    'A filterable index of product builds and AI automation projects across real estate, education, CRM, healthcare, marketplaces, fitness, sports and more.',
}

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="work-page hero-sans">
        <header className="work-head">
          <h1 className="work-title">Selected work</h1>
          <p className="work-sub">
            Product builds and intelligent systems across eight sectors. Filter by the one
            you care about.
          </p>
        </header>
        <WorkGrid />
      </main>
    </>
  )
}
