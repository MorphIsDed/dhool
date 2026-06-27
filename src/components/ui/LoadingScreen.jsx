import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { DUST_IN_LANGUAGES } from '@data/languages'

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const progressRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const skipIntro =
      new URLSearchParams(window.location.search).has('skipIntro') ||
      window.sessionStorage.getItem('dhool-intro-seen') === 'true'

    if (skipIntro) {
      onComplete()
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      window.sessionStorage.setItem('dhool-intro-seen', 'true')
      onComplete()
      return
    }

    const words = containerRef.current.querySelectorAll('.lang-word')
    const tl = gsap.timeline({
      onComplete: () => {
        window.sessionStorage.setItem('dhool-intro-seen', 'true')
        onComplete()
      },
    })
    timelineRef.current = tl

    tl.to(progressRef.current, { width: '100%', duration: 1.6, ease: 'none' }, 0)

    words.forEach((word, idx) => {
      const isLast = idx === words.length - 1

      tl.fromTo(
        word,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' },
      )

      if (!isLast) {
        tl.to(word, { opacity: 0, y: -12, duration: 0.1, ease: 'power2.in' }, '+=0.04')
      } else {
        tl.to(word, { scale: 1.12, color: '#E8D5B7', duration: 0.2, ease: 'power2.out' })
        tl.to(word, { opacity: 0, scale: 1.2, duration: 0.22, ease: 'power2.in' }, '+=0.15')
      }
    })

    tl.to(containerRef.current, { opacity: 0, duration: 0.22, ease: 'power2.inOut' }, '-=0.12')

    return () => timelineRef.current?.kill()
  }, [onComplete])

  const handleSkip = () => {
    timelineRef.current?.kill()
    window.sessionStorage.setItem('dhool-intro-seen', 'true')
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.15,
      ease: 'power2.inOut',
      onComplete,
    })
  }

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      onKeyDown={(e) => e.key === 'Enter' && handleSkip()}
      role="button"
      tabIndex={0}
      aria-label="Loading screen. Press Enter or click to skip."
      className="fixed inset-0 z-[9000] flex cursor-pointer select-none flex-col items-center justify-center bg-earth-dark"
    >
      <div className="relative mb-8 flex h-20 w-full items-center justify-center overflow-hidden">
        {DUST_IN_LANGUAGES.map((lang) => (
          <span
            key={lang.language}
            className="lang-word absolute px-4 text-center text-3xl font-semibold tracking-wide text-dust-brown opacity-0 md:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {lang.word}
          </span>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="eyebrow text-haze-grey">Raipur–Bhilai–Durg Corridor</div>

        <div className="h-px w-44 overflow-hidden rounded-full bg-white/10">
          <div ref={progressRef} className="h-full w-0 bg-dust-brown" />
        </div>

        <div className="mt-1 text-[0.6875rem] tracking-[0.16em] text-haze-grey/55 uppercase">
          Click to skip
        </div>
      </div>
    </div>
  )
}
