import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Animate a heading on mount (hero titles, section headers).
 */
export function animateTextIn(selector, delay = 0) {
  if (prefersReducedMotion()) return null

  const el = typeof selector === 'string' ? document.querySelector(selector) : selector
  if (!el) return null

  return gsap.fromTo(
    el,
    { autoAlpha: 0, y: 20 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      ease: 'power2.out',
      delay,
      clearProps: 'transform,visibility,opacity',
    },
  )
}

/**
 * Scroll-triggered stagger reveal. Uses `once: true` so content never
 * re-hides on scroll-back. Falls back to visible if trigger never fires.
 */
export function scrollReveal(targets, options = {}) {
  const elements = gsap.utils.toArray(targets)
  if (!elements.length) return () => {}

  const {
    stagger = 0.1,
    y = 28,
    duration = 0.7,
    trigger,
    start = 'top 85%',
  } = options

  if (prefersReducedMotion()) {
    gsap.set(elements, { clearProps: 'all' })
    return () => {}
  }

  gsap.killTweensOf(elements)

  const triggerEl = trigger || elements[0]
  gsap.set(elements, { autoAlpha: 0, y })

  const tween = gsap.to(elements, {
    autoAlpha: 1,
    y: 0,
    duration,
    stagger,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: triggerEl,
      start,
      toggleActions: 'play none none none',
      once: true,
    },
    clearProps: 'transform,visibility,opacity',
  })

  const st = tween.scrollTrigger

  // If the section is already on screen (e.g. after loading), play immediately
  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
    if (st && st.progress === 1) {
      gsap.set(elements, { clearProps: 'all' })
    }
  })

  // Safety net: never leave content hidden
  const fallback = setTimeout(() => {
    elements.forEach((el) => {
      const opacity = parseFloat(getComputedStyle(el).opacity)
      if (opacity < 0.1) {
        gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'all' })
      }
    })
  }, 2000)

  return () => {
    clearTimeout(fallback)
    st?.kill()
    tween.kill()
    gsap.set(elements, { clearProps: 'all' })
  }
}

/**
 * Horizontal parallax drift for background layers
 */
export function parallaxDrift(el, speed = 0.3) {
  if (prefersReducedMotion() || !el) return null

  const tween = gsap.to(el, {
    scrollTrigger: { scrub: speed },
    yPercent: -12,
    ease: 'none',
  })

  return tween
}
