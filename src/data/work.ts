// ─── Work / projects data ─────────────────────────────────────────
// Projects live in projects.json (the single source of truth for each
// project's info + images). Sector mood-colors reuse the site's palette
// (mid-tones chosen so near-black ink text stays legible on the flat panels).

import projectsData from './projects.json'

export type WorkSector = { key: string; label: string; color: string }

export const workSectors: WorkSector[] = [
  { key: 'agriculture', label: 'Agriculture', color: '#7FB03B' }, // fresh leaf green
  { key: 'automotive', label: 'Automotive', color: '#5B87E8' }, // electric blue
  { key: 'music', label: 'Music', color: '#B85CD6' }, // vivid purple-magenta
  { key: 'real-estate', label: 'Real Estate', color: '#E8A54A' }, // amber / terracotta
  { key: 'education', label: 'Education', color: '#EFCB4D' }, // yellow-blue
  { key: 'crm', label: 'CRM', color: '#8E86F5' }, // electric indigo
  { key: 'field-service', label: 'Field Service', color: '#C08457' }, // clay / bronze (trades & contractors)
  { key: 'healthcare', label: 'Healthcare', color: '#5FC7B4' }, // teal
  { key: 'marketplace', label: 'Marketplaces', color: '#EF6A54' }, // coral / red
  { key: 'fitness', label: 'Fitness', color: '#F2913E' }, // orange
  { key: 'sports', label: 'Sports', color: '#4F9E57' }, // green / gold
  { key: 'ai', label: 'AI & Automation', color: '#4FC3D6' }, // electric cyan / violet
]

// A section can carry a single `image` or several `images` (screens that
// belong to the same feature).
export type WorkSection = { title: string; body: string; image?: string; images?: string[] }

export type WorkProject = {
  slug: string
  name: string
  sector: string // → workSectors.key
  blurb: string
  cover?: string // card thumbnail; falls back to first section image
  type?: string
  tagline?: string
  seoTitle?: string
  seoDescription?: string
  overview?: string
  highlights?: string[]
  tech?: string[]
  tags?: string[] // category tags shown under the hero
  sections?: WorkSection[]
  gallery?: string[] // images-only case study (no per-section copy)
}

// Flatten a section's images regardless of which field was used.
export function sectionImages(s: WorkSection): string[] {
  return s.images ?? (s.image ? [s.image] : [])
}
// All images for a project (used to derive card cover + hover).
export function projectImages(p: WorkProject): string[] {
  return [...(p.sections ?? []).flatMap(sectionImages), ...(p.gallery ?? [])]
}

export const workProjects: WorkProject[] = projectsData as WorkProject[]

export function getWorkProject(slug: string): WorkProject | undefined {
  return workProjects.find((p) => p.slug === slug)
}
export function getWorkSector(key: string): WorkSector | undefined {
  return workSectors.find((s) => s.key === key)
}
