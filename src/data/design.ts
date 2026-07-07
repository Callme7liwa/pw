// ─── Design work ──────────────────────────────────────────────────
// Standalone design pieces (landing pages, product UI) shown on /design.
// Kept separate from dev case studies (projects.json / /work) so design
// buyers get a focused destination.

export type DesignPiece = {
  slug: string
  category: string // 'Web Design' | 'Mobile Design'
  name: string // short label for the card
  title: string // full title on the detail page
  tagline: string // one-line hook
  color: string // category accent (matches the services-accordion tab)
  paragraphs: string[] // full write-up
  shots: string[] // all shot images, hero first
}

export const designPieces: DesignPiece[] = [
  {
    slug: 'banki-fintech-landing',
    category: 'Web Design',
    name: 'Banki — Fintech Landing',
    title: 'Banki — Banking & Fintech Landing Page',
    tagline: 'A serious, trust-first site for a financial services brand.',
    color: '#0FA9B8',
    paragraphs: [
      'Designed a serious, trust-first website for a financial services business. Clean lines, structured layouts, and a visual language that communicates stability and credibility.',
    ],
    shots: [
      '/design/landingpage-fintech/1.png',
      '/design/landingpage-fintech/2.png',
      '/design/landingpage-fintech/3.png',
      '/design/landingpage-fintech/4.png',
    ],
  },
  {
    slug: 'mobile-task-manager',
    category: 'Mobile Design',
    name: 'Task Manager App',
    title: 'Task Manager — Mobile App Concept',
    tagline: 'A calm, pastel productivity concept for everyday use.',
    color: '#E23B4B',
    paragraphs: [
      'Staying organized feels easier when tasks, plans, and details are always close at hand. This mobile task manager concept helps users keep track of daily priorities, schedule events, and break tasks into manageable steps.',
      'The shot presents three core screens: a main task list, a calendar view with the day’s schedule and events, and a task details screen with a description and checklist. Together, they show how users can move from planning their day to completing specific tasks.',
      'Soft pastel colors, gentle pink-blue gradients, and dark accents create a calm and modern visual style. The light palette keeps the interface clean and focused, while the darker elements help highlight key information and actions.',
      'The concept is designed around clarity and everyday use. Tasks are easy to scan, calendar plans feel structured, and checklists help users stay focused without making productivity feel overwhelming.',
    ],
    shots: [
      '/design/mobile-tasks/1.webp',
      '/design/mobile-tasks/2.webp',
      '/design/mobile-tasks/3.webp',
      '/design/mobile-tasks/4.webp',
    ],
  },
]
