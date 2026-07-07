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
    slug: 'crookeries-ecommerce',
    category: 'Web Design',
    name: 'HomeDine — Kitchenware Store',
    title: 'HomeDine — Eco-Friendly Kitchenware E-commerce',
    tagline: 'A warm, sustainable storefront for eco kitchenware & crockery.',
    color: '#0FA9B8',
    paragraphs: [
      'A storefront concept for an eco-friendly kitchenware and crockery brand, built to make sustainable shopping feel warm and effortless. The page leads with an editorial hero, then flows into curated product rails, best-sellers, new arrivals, and a browsable inspiration gallery.',
      'A calm, natural palette — sage greens, warm neutrals, and rich lifestyle photography — carries the brand’s eco-conscious positioning, while clear pricing, quick add-to-cart chips, and a 4.9-star review wall keep the path to purchase obvious.',
      'Every section is designed to balance mood and merchandising: the imagery sells the lifestyle, the layout keeps products scannable, and the sustainability story runs through the whole page without ever getting in the way of the buy.',
    ],
    shots: [
      '/design/crookeries-ecommerce/1.webp',
      '/design/crookeries-ecommerce/4.webp',
      '/design/crookeries-ecommerce/2.webp',
      '/design/crookeries-ecommerce/3.webp',
    ],
  },
  {
    slug: 'ecommerce-platform',
    category: 'Web Design',
    name: 'Shopcart — E-commerce Platform',
    title: 'Shopcart — Multi-Category E-commerce Platform',
    tagline: 'A full storefront: browse, filter, product detail and checkout.',
    color: '#0FA9B8',
    paragraphs: [
      'An end-to-end e-commerce platform design covering the whole buying journey — a filterable category storefront, rich product-detail pages with variants and financing, and a streamlined checkout with order summary and payment.',
      'Built for scale and clarity: faceted filters (type, price, review, color, material, offer) make a large catalog shoppable, star-rated product cards with instant add-to-cart keep browsing frictionless, and a clean green-and-neutral system keeps the focus on the products.',
      'Popular-category shortcuts, a wishlist, and a persistent cart round out a storefront designed to move shoppers from discovery to purchase without a wasted click.',
    ],
    shots: [
      '/design/ecommerce-products/1.webp',
      '/design/ecommerce-products/2.webp',
      '/design/ecommerce-products/3.webp',
    ],
  },
  {
    slug: 'estore-marketplace',
    category: 'Web Design',
    name: 'ESTORE — Online Marketplace',
    title: 'ESTORE — Large Online Marketplace',
    tagline: 'A clean, minimalist marketplace across every product category.',
    color: '#0FA9B8',
    paragraphs: [
      'A design concept for a large online marketplace where users shop across many categories — from electronics and furniture to fashion and beauty. The goal was a pleasant, user-friendly interface that makes a huge catalog feel calm and easy to browse.',
      'The page is organized into clear blocks: a slider showcasing the most current products, cards of popular items, a lookbook featuring the latest collection, and highlights of popular brands — each block designed to showcase product photography at its best.',
      'A soft, light palette and minimalist layout keep the focus on the products, while orange — the vibrant signature color — highlights key elements and calls to action throughout. The clean aesthetic is built to enhance the shopping experience rather than compete with it.',
    ],
    shots: [
      '/design/marketplace/1.webp',
      '/design/marketplace/2.webp',
      '/design/marketplace/3.webp',
      '/design/marketplace/4.webp',
      '/design/marketplace/5.webp',
      '/design/marketplace/6.webp',
    ],
  },
  {
    slug: 'real-estate-website',
    category: 'Web Design',
    name: 'Real Estate — Property Rentals',
    title: 'Real Estate Website — Property Rentals & Apartments',
    tagline: 'A warm, human take on a property rentals & investment platform.',
    color: '#0FA9B8',
    paragraphs: [
      'We wanted this real estate website to feel different — less corporate, more human. Traditional property sites often prioritize cold efficiency; here the focus was a welcoming, lifestyle-driven experience that balances approachability with the precision high-value investments demand — clarity without sacrificing warmth in the UI.',
      'The visual language reinforces that balance. A neutral color palette builds trust and calm, while soft shadows and rounded corners add subtle friendliness. A clean sans-serif keeps things readable and understated — professional but inviting for users exploring residential rentals or hospitality features.',
    ],
    shots: [
      '/design/realestate/1.png',
      '/design/realestate/2.webp',
      '/design/realestate/3.webp',
      '/design/realestate/4.webp',
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
