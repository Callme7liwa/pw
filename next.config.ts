import type { NextConfig } from 'next'

// GitHub Pages serves a project site under /<repo> (here: /pw). CI sets
// PAGES_BASE_PATH=/pw for the deployed build; locally it's empty so `next dev`
// and local builds stay at the root. basePath is applied automatically to
// next/image, next/link and /_next assets — raw <a>/fetch paths must prepend
// NEXT_PUBLIC_BASE_PATH themselves.
const basePath = process.env.PAGES_BASE_PATH || ''

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` — no Node server needed (GitHub Pages).
  output: 'export',
  // Pages resolves `/work/` -> `/work/index.html`; trailing slashes keep links
  // pointing at real files on a static host.
  trailingSlash: true,
  // The default image optimizer needs a server; serve images as-is instead.
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
  // Exposed to the client so components can prefix non-managed asset/hash URLs.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default nextConfig
