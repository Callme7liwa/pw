# Portfolio — Next.js

Cinematic scroll-story developer portfolio built with Next.js 16 (App Router), TypeScript, and Tailwind CSS.

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Fill in your details

**All content lives in one file:** `src/data/site.ts`

Open it and replace every `[TBD]` field:

| Field | What to fill in |
|-------|----------------|
| `siteConfig.name` | Your full name |
| `siteConfig.initials` | 2-letter initials for nav + hero bg |
| `siteConfig.email` | Your contact email |
| `siteConfig.calLink` | Calendly or Cal.com booking link |
| `siteConfig.social.*` | GitHub, LinkedIn, X links |
| `hook.lines` | Your Act 1 headline (3 lines) |
| `heroProjects[*].metric` | Real numbers per project |
| `heroProjects[*].quote` | Real client quotes |
| `stats[*].value` | Your real aggregate stats |
| `testimonials[*]` | Real testimonial text + names |

## Architecture

```
src/
├── app/
│   ├── layout.tsx       # Metadata + root layout
│   ├── page.tsx         # Main page — assembles all sections
│   └── globals.css      # Design tokens + utility classes
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Act1Hook.tsx
│   │   ├── Act2Positioning.tsx
│   │   ├── Act25Capabilities.tsx
│   │   ├── Act3Fork.tsx
│   │   ├── ProjectChapter.tsx   # Reusable hero chapter (Track A)
│   │   ├── RapidStrip.tsx
│   │   ├── Bridge.tsx
│   │   ├── TrackB.tsx           # AI agent section
│   │   ├── Act4Process.tsx
│   │   ├── Act5Trust.tsx
│   │   └── Act6CTA.tsx
│   └── ui/
│       ├── Cursor.tsx
│       ├── SectionLabel.tsx
│       └── RevealProvider.tsx
├── data/
│   └── site.ts          # ← ALL content lives here
└── hooks/
    ├── useReveal.ts
    └── useCountUp.ts
```

## Add a new project

In `src/data/site.ts`, add an entry to `heroProjects` (full chapter treatment) or `rapidProjects` (grid strip). Hero projects are automatically rendered in order.

## Deploy to Vercel

```bash
npx vercel
```

The project is statically generated (SSG) — every piece of content is in the DOM at render time, which is crawlable by search engines even with the animation layer on top.

## Design decisions

- **Warm paper base** (`#F5F0E8`) — not stark white
- **Flat color + hard offset shadows** — no gradients or soft blur
- **Three typefaces:** Syne (display), Inter (body), JetBrains Mono (labels/metrics)
- **Signature element:** hollow giant chapter numbers (stroke-only) behind project content
- **Custom cursor** that shifts to cyan square inside Track B
- **Scroll reveal** via IntersectionObserver — no heavy libraries needed
- **Counting stats** animate on scroll entry
