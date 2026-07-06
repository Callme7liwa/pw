'use client'

import { useEffect, useRef, useCallback } from 'react'

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  const updateCursor = useCallback(() => {
    const el = cursorRef.current
    if (!el) return
    el.style.left = posRef.current.x + 'px'
    el.style.top = posRef.current.y + 'px'
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateCursor)
    }

    const onEnter = () => cursor.classList.add('hover')
    const onLeave = () => cursor.classList.remove('hover')

    const trackBEl = document.getElementById('track-b')

    const onScroll = () => {
      if (!trackBEl) return
      const rect = trackBEl.getBoundingClientRect()
      const inB = rect.top < window.innerHeight * 0.75 && rect.bottom > 0
      cursor.classList.toggle('track-b', inB)
    }

    // Attach hover to interactive elements
    const updateHoverTargets = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    document.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    updateHoverTargets()

    // Also observe for dynamic elements
    const mutObs = new MutationObserver(updateHoverTargets)
    mutObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      mutObs.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateCursor])

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />
}
