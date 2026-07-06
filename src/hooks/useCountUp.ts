'use client'

import { useEffect, useRef, useState } from 'react'

export function useCountUp(
  target: number,
  suffix: string = '',
  duration: number = 1800
) {
  const [display, setDisplay] = useState('0' + suffix)
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const startTime = performance.now()

            const step = (timestamp: number) => {
              const elapsed = timestamp - startTime
              const progress = Math.min(elapsed / duration, 1)
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = Math.round(eased * target)
              setDisplay(current + suffix)
              if (progress < 1) requestAnimationFrame(step)
            }

            requestAnimationFrame(step)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, duration])

  return { ref, display }
}
