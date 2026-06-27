import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollZone
 * Fires `onEnter` callback when a zone element enters the viewport.
 * Returns a ref to attach to the zone's root element.
 */
export function useScrollZone(onEnter, zoneIndex) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 60%',
      onEnter: () => onEnter?.(zoneIndex),
      onEnterBack: () => onEnter?.(zoneIndex),
    })
    return () => trigger.kill()
  }, [onEnter, zoneIndex])

  return ref
}
