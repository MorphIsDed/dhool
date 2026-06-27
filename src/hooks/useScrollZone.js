import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Fires `onEnter` when a zone element crosses the viewport midpoint.
 * Uses a ref for the callback so ScrollTrigger isn't recreated every render.
 */
export function useScrollZone(onEnter, zoneIndex) {
  const ref = useRef(null)
  const onEnterRef = useRef(onEnter)

  useEffect(() => {
    onEnterRef.current = onEnter
  }, [onEnter])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 55%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) {
          onEnterRef.current?.(zoneIndex)
        }
      },
    })

    return () => trigger.kill()
  }, [zoneIndex])

  return ref
}
