import { useEffect } from 'react'
import { scrollReveal } from '@utils/gsapHelpers'

/**
 * Attach scroll-triggered reveals to children matching `selector` inside `containerRef`.
 */
export function useScrollReveal(containerRef, selector, options = {}) {
  const { stagger = 0.1, start, y } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const targets = container.querySelectorAll(selector)
    if (!targets.length) return

    return scrollReveal(targets, {
      trigger: container,
      stagger,
      start,
      y,
    })
  }, [containerRef, selector, stagger, start, y])
}
