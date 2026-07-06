// Custom next/image loader for static export on GitHub Pages.
//
// With `output: 'export'`, next/image does NOT prepend basePath to image
// sources, so `/projects/x.png` would 404 at https://<user>.github.io/pw/.
// This loader prepends the base path to local `public/` assets (external URLs
// pass through untouched). Width/quality are ignored — the images are served
// as-is on a static host.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src)) return src
  return `${basePath}${src}`
}
