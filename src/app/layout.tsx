import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/data/site'

// Section 13: ONE confident, rounded-geometric, high-x-height sans for the
// hero + navbar. Self-hosted via next/font (no render-blocking Google request)
// so it doesn't cost us the Core Web Vitals the brief cares about. Exposed as a
// CSS variable and applied only where Section 13 asks — Acts 2–6 keep their own
// display/body/mono voices untouched.
const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  // Deployed base URL (GitHub Pages project site) so relative OG/twitter image
  // paths resolve to absolute URLs. Change this if you move to a custom domain.
  metadataBase: new URL('https://callme7liwa.github.io/pw/'),
  title: `${siteConfig.name} — Full-stack Developer & AI Architect`,
  description:
    'I build products and make them intelligent with AI agents. Complex full-stack builds shipped clean, agentic workflow automation built to last. Available for freelance and startup projects.',
  keywords: [
    'freelance Next.js developer',
    'AI automation developer',
    'agentic workflow developer',
    'full-stack developer for startups',
    'white-label web developer',
    'LangGraph developer',
    'Next.js portfolio',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — Full-stack Developer & AI Architect`,
    description:
      'Complex products, shipped clean. Intelligent automation, built to last.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={sans.variable}>
      <body>{children}</body>
    </html>
  )
}
