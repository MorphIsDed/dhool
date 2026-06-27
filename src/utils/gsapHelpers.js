import { gsap } from 'gsap'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Animate a heading without rewriting its DOM or destroying intentional line breaks.
 */
export function animateTextIn(selector, delay = 0) {
  if (prefersReducedMotion()) return null

  const el = typeof selector === 'string' ? document.querySelector(selector) : selector
  if (!el) return null

  return gsap.fromTo(
    el,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      delay,
      clearProps: 'transform,opacity',
    },
  )
}

/**
 * One-shot reveal driven by IntersectionObserver — avoids ScrollTrigger layout thrash.
 * Returns a cleanup function for use inside useEffect.
 */
export function scrollReveal(targets, options = {}) {
  const elements = gsap.utils.toArray(targets)
  if (!elements.length) return () => {}

  const { stagger = 0 } = options

  if (prefersReducedMotion()) {
    gsap.set(elements, { clearProps: 'opacity,transform,visibility' })
    return () => {}
  }

  gsap.killTweensOf(elements)
  gsap.set(elements, { opacity: 0, y: 16 })

  const reveal = (el, delay = 0) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      delay,
      ease: 'power2.out',
      clearProps: 'transform,opacity',
    })
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target
        const index = elements.indexOf(el)
        const delay = index >= 0 ? index * stagger : 0
        reveal(el, delay)
        observer.unobserve(el)
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
  )

  elements.forEach((el) => {
    observer.observe(el)
    // Safety: ensure content is visible even if observer never fires
    setTimeout(() => {
      if (getComputedStyle(el).opacity === '0') reveal(el, 0)
    }, 1200)
  })

  return () => observer.disconnect()
}

/**
 * Horizontal parallax drift for background layers
 */
export function parallaxDrift(el, speed = 0.3) {
  if (prefersReducedMotion() || !el) return null

  return gsap.to(el, {
    scrollTrigger: { scrub: speed },
    yPercent: -12,
    ease: 'none',
  })
}
