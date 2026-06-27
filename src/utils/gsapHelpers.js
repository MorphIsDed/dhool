import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/**
 * Animate text in by splitting into chars and staggering entry
 */
export function animateTextIn(selector, delay = 0) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector
  if (!el) return
  const split = new SplitText(el, { type: 'chars,words' })
  return gsap.from(split.chars, {
    opacity: 0,
    y: 40,
    rotateX: -90,
    stagger: 0.03,
    duration: 0.7,
    ease: 'back.out(1.7)',
    delay,
  })
}

/**
 * Fade + slide up a set of elements on scroll entry
 */
export function scrollReveal(targets, options = {}) {
  return gsap.from(targets, {
    scrollTrigger: {
      trigger: targets[0] || targets,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 60,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    ...options,
  })
}

/**
 * Horizontal parallax drift for background layers
 */
export function parallaxDrift(el, speed = 0.3) {
  return gsap.to(el, {
    scrollTrigger: {
      scrub: speed,
    },
    yPercent: -20,
    ease: 'none',
  })
}
