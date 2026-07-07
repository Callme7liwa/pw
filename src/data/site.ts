// ─── Portfolio Content Data ───────────────────────────────────────
// Fill in the [TBD] fields before shipping.
// All content lives here — zero hunting through component files.

export const siteConfig = {
  name: 'Ayoub Seddiki',
  initials: 'AYOUB SEDDIKI',    // nav wordmark + hero avatar fallback
  title: 'Full-stack developer & AI architect',
  email: 'ayoubseddiki132@gmail.com',
  calLink: 'https://cal.com/ayoub-seddiki-9t98e6/30min',
  // For the embedded scheduler (Act 1.5) — "cal-username/event-slug".
  calEmbedLink: 'ayoub-seddiki-9t98e6/30min',
  // Square photo in /public shown as the Section 13 human-trust avatar.
  // Set to null to fall back to a clean initials monogram.
  avatar: '/profile.jpeg' as string | null,
  social: {
    github: 'https://github.com/yourname',   // [TBD]
    linkedin: 'https://linkedin.com/in/yourname', // [TBD]
    twitter: 'https://x.com/yourname',       // [TBD]
  },
}

// ─── Hook (Act 1 · Section 13 anatomy) ───────────────────────────
export const hook = {
  // Two-line oversized headline. Exactly ONE word carries the accent color
  // (Section 13) — must appear verbatim in one of the two lines below.
  headlineTop: 'Your idea, shipped —',
  headlineBottom: 'as a product that thinks.',
  accentWord: 'thinks', // the single indigo word
  // sub: 'Complex products, shipped clean. Intelligent automation, built to last — for founders who need it done right, not just done.',
  // Compact trust line (Section 13 · one trust moment up high)
  trustCaption: 'Trusted by founders & agencies',
  primaryCta: { label: 'Book a call' },        // → siteConfig.calLink
  secondaryCta: { label: 'See All the work', href: '/work' },
  // Marquee captions (Act 1 trust rows). Logos themselves are read dynamically
  // from /public/collaborations at build time — nothing to list here.
  companiesCaption: 'Trusted by teams at',
  countriesCaption: 'Working with clients from',
  // Bottom-most row · platform proof, same visual weight as the logos above.
  platformBadges: ['Upwork Top Rated', 'Fiverr Top Rated'],
}

// Countries clients have come from — looping marquee row in Act 1.
// `code` is the ISO 3166-1 alpha-2 used to pick the flag SVG.
export const countries: { name: string; code: string }[] = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Germany', code: 'DE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Spain', code: 'ES' },
  { name: 'France', code: 'FR' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Jordan', code: 'JO' },
  { name: 'Australia', code: 'AU' },
  { name: 'Norway', code: 'NO' },
]

// ─── Capabilities (Act 2.5) ──────────────────────────────────────
export const capabilities = {
  build: [
    { label: 'Next.js / React',     hint: '→ Used across every product vertical' },
    { label: 'Node.js / APIs',       hint: '→ REST, GraphQL, serverless functions' },
    { label: 'Databases',            hint: '→ Postgres, Redis, Supabase, Prisma' },
    { label: 'Agent frameworks',     hint: '→ LangGraph, Anthropic SDK, custom pipelines' },
    { label: 'Automation tooling',   hint: '→ Make, n8n, Zapier, custom integrations' },
  ],
  design: [
    { label: 'Motion & interaction', hint: '→ GSAP, Framer Motion, CSS transitions' },
    { label: 'Design systems',       hint: '→ Built for scale, not just aesthetics' },
    { label: 'Prototyping',          hint: '→ Figma to production, fast' },
    { label: 'Typography & layout',  hint: '→ Detail-level craft, every screen' },
    { label: 'Brand systems',        hint: '→ Cohesive product identity from day one' },
  ],
}

// ─── Track A — Hero Projects ─────────────────────────────────────
// 2–4 projects get the full chapter treatment.
// Remaining go into the rapid strip below.
export const heroProjects: HeroProject[] = [
  {
    id: 'real-estate',
    index: '01',
    vertical: 'Real Estate Platform',
    accent: 'var(--amber)',
    accentBg: 'var(--amber-bg)',
    accentBorder: 'var(--amber-border)',
    mockAccentLight: '#FEF3DC',
    mockAccentMid: '#E8C77A',
    problem: 'A listings platform that actually converts — not just displays.',
    description: 'Built a full-stack marketplace with ML-powered property matching, virtual tour integration, and a CRM layer for agents. Zero to launch in 9 weeks.',
    metric: { value: '+38%', label: 'Lead capture rate vs. old site' },
    quote: {
      text: 'It felt like working with someone who understood both the business and the code — rare combination.',
      author: 'Sarah K.',
      role: 'Founder',
    },
    stack: ['Next.js', 'Supabase', 'Mapbox'],
    flip: false,
  },
  {
    id: 'crm',
    index: '02',
    vertical: 'CRM + Agent Layer',
    accent: 'var(--indigo)',
    accentBg: 'var(--indigo-bg)',
    accentBorder: 'var(--indigo-border)',
    mockAccentLight: '#EEEDFE',
    mockAccentMid: '#AFA9EC',
    problem: 'A CRM that qualifies leads while the team sleeps.',
    description: 'Custom CRM with an embedded AI agent that scores inbound leads, sends personalised follow-ups, and flags hot prospects — eliminating 14 hours of manual work per week.',
    metric: { value: '3×', label: 'Response speed to new leads' },
    quote: {
      text: 'The automation paid for itself in the first month. I haven\'t opened a spreadsheet for follow-ups since.',
      author: 'Marcus T.',
      role: 'Sales Director',
    },
    stack: ['React', 'Node.js', 'LangGraph'],
    flip: true,
    hasBothTracks: true, // cross-references into Track B
  },
  {
    id: 'healthcare',
    index: '03',
    vertical: 'Healthcare Platform',
    accent: 'var(--teal)',
    accentBg: 'var(--teal-bg)',
    accentBorder: 'var(--teal-border)',
    mockAccentLight: '#E0F4F0',
    mockAccentMid: '#6DCFBF',
    problem: 'Appointment scheduling that patients actually use.',
    description: 'Rebuilt the patient intake and scheduling system for a multi-site clinic — HIPAA-compliant, mobile-first, integrated with their existing EHR. Launched in 6 weeks.',
    metric: { value: '−62%', label: 'Front desk booking calls' },
    quote: {
      text: 'Patients love it. Staff love it. I wish we\'d done this two years ago.',
      author: 'Dr. Aisha Patel',
      role: 'Clinical Director',
    },
    stack: ['Next.js', 'HIPAA-compliant infra', 'Twilio'],
    flip: false,
  },
]

// ─── Track A — Rapid Strip ────────────────────────────────────────
export const rapidProjects: RapidProject[] = [
  {
    id: 'fitness',
    vertical: 'Fitness',
    name: 'Coaching platform',
    outcome: '2,400 active users in 3 months post-launch',
    dotColor: 'var(--orange)',
  },
  {
    id: 'football',
    vertical: 'Sports',
    name: 'Football analytics',
    outcome: 'Used by 14 clubs across two leagues',
    dotColor: '#2B5E1A',
  },
  {
    id: 'marketplace',
    vertical: 'E-marketplace',
    name: 'Niche B2B marketplace',
    outcome: '€1.2M GMV in first 6 months',
    dotColor: 'var(--coral)',
  },
  {
    id: 'edtech',
    vertical: 'Ed-tech',
    name: 'Learning platform',
    outcome: '92% course completion rate',
    dotColor: '#1A6DB5',
  },
]

// ─── Track B — AI Agents ──────────────────────────────────────────
export const agentProjects: AgentProject[] = [
  {
    id: 'lead-qualification',
    index: '01',
    label: 'Lead qualification',
    title: 'Inbound → qualified → in your CRM.',
    description: 'An agent monitors inbound channels, scores and enriches each lead using 12 data signals, writes a personalised first-touch email, and creates a CRM record — no human in the loop until a meeting is booked.',
    nodes: ['Inbound', 'Score', 'Enrich', 'Email', 'Human'],
    activeNodes: [0, 1, 2, 3],
    metric: { value: '14 hrs', label: 'Saved per week, per SDR' },
    quote: 'The agent handles the first 80% of the funnel. My team only sees hot leads now.',
  },
  {
    id: 'document-processing',
    index: '02',
    label: 'Document processing',
    title: 'From inbox to insight in under 60 seconds.',
    description: 'Ingests unstructured documents (PDFs, emails, forms), extracts structured data, validates against business rules, routes exceptions for human review, and updates downstream systems automatically.',
    nodes: ['Ingest', 'Extract', 'Validate', 'Route', 'Update'],
    activeNodes: [0, 1, 2, 3],
    metric: { value: '96%', label: 'Straight-through processing rate' },
    quote: 'What took a team of three, one agent now handles before 9am.',
  },
  {
    id: 'support-triage',
    index: '03',
    label: 'Customer support triage',
    title: 'Every ticket categorised, prioritised, and partially resolved.',
    description: 'Reads incoming support tickets, classifies intent and urgency, drafts a resolution if it\'s routine, escalates complex cases with full context — reducing first-response time from hours to seconds.',
    nodes: ['Ticket in', 'Classify', 'Draft', 'Escalate?'],
    activeNodes: [0, 1, 2],
    metric: { value: '4 min', label: 'Avg first response (was 6 hrs)' },
    quote: 'We closed 40% more tickets in the first week without adding headcount.',
  },
  {
    id: 'internal-knowledge',
    index: '04',
    label: 'Internal knowledge',
    title: 'Your docs, your Slack, your brain — answerable in seconds.',
    description: 'RAG-powered internal assistant that indexes company documentation, past decisions, and process docs. Answers employee questions and surfaces relevant precedents as source docs change.',
    nodes: ['Query', 'Retrieve', 'Generate', 'Cite'],
    activeNodes: [0, 1, 2, 3],
    metric: { value: '−70%', label: '"Can you find that doc?" Slacks' },
    quote: 'Onboarding a new hire used to take 2 weeks of hand-holding. Now it\'s 3 days.',
  },
]

// ─── Process (Act 4) ─────────────────────────────────────────────
export const processSteps = [
  {
    num: '01',
    title: 'Discovery call',
    description: '30 minutes. You explain the problem, I ask pointed questions about constraints, timeline, and what success looks like. No sales pitch — just a real conversation to see if we\'re a fit.',
    duration: '30 min · Free',
  },
  {
    num: '02',
    title: 'Scope & proposal',
    description: 'Within 48 hours, you get a written scope doc: what gets built, what doesn\'t, timeline, and a flat-fee price. No billing surprises.',
    duration: '48 hrs turnaround',
  },
  {
    num: '03',
    title: 'Build, with weekly check-ins',
    description: 'You get a private staging link from day one. Weekly short updates — not endless meetings. You\'re involved when decisions need you, not pulled in for status theatre.',
    duration: 'Weekly touchpoints',
  },
  {
    num: '04',
    title: 'Launch & handover',
    description: 'Production deploy, documentation written for humans, a handover call where you actually leave understanding what was built. 30 days of support included.',
    duration: '30-day support included',
  },
]

// ─── Trust (Act 5) ───────────────────────────────────────────────
export const stats = [
  { id: 'projects', value: 24, suffix: '+', label: 'Projects shipped' },
  { id: 'weeks',    value: 7,  suffix: '',  label: 'Avg weeks to launch' },
  { id: 'hours',    value: 200, suffix: '+', label: 'Hrs automated per client' },
  { id: 'repeat',   value: 8,  suffix: '',  label: 'Repeat clients' },
]

export const testimonials = [
  {
    text: 'I\'ve worked with a lot of developers. The difference is that they usually make you manage them. With this person, I didn\'t have to think about it — things just appeared.',
    name: 'Emma R.',
    role: 'Co-founder, Series A SaaS',
  },
  {
    text: 'The automation project saved us hiring two people. We put that budget into marketing instead. Best ROI decision we\'ve made this year.',
    name: 'James O.',
    role: 'CEO, B2B Marketplace',
  },
  {
    text: 'Rare to find someone who can think at the product level and still write clean code. Usually it\'s one or the other.',
    name: 'Priya S.',
    role: 'CPO, Healthcare startup',
  },
  {
    text: 'The staging environment on day one was the thing that won me over. I could actually see progress. No more "trust me, it\'s coming along."',
    name: 'Daniel M.',
    role: 'Founder, Real Estate tech',
  },
]

// ─── Types ───────────────────────────────────────────────────────
export interface HeroProject {
  id: string
  index: string
  vertical: string
  accent: string
  accentBg: string
  accentBorder: string
  mockAccentLight: string
  mockAccentMid: string
  problem: string
  description: string
  metric: { value: string; label: string }
  quote: { text: string; author: string; role: string }
  stack: string[]
  flip: boolean
  hasBothTracks?: boolean
}

export interface RapidProject {
  id: string
  vertical: string
  name: string
  outcome: string
  dotColor: string
}

export interface AgentProject {
  id: string
  index: string
  label: string
  title: string
  description: string
  nodes: string[]
  activeNodes: number[]
  metric: { value: string; label: string }
  quote: string
}
