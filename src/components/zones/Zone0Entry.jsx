import { useEffect, useRef } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { animateTextIn, parallaxDrift } from '@utils/gsapHelpers'

export default function Zone0Entry({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 0)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const promptRef = useRef(null)

  useEffect(() => {
    // Wait slightly for loading screen to clear
    const timeout = setTimeout(() => {
      if (titleRef.current) animateTextIn(titleRef.current, 0.2)
      if (taglineRef.current) {
        animateTextIn(taglineRef.current, 0.8)
        // Add parallax drift scroll binding
        parallaxDrift(taglineRef.current, 0.5)
      }
      if (promptRef.current) animateTextIn(promptRef.current, 1.4)
    }, 500)
    
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section 
      ref={zoneRef} 
      className="zone flex flex-col items-center justify-between min-h-[150vh] text-center pointer-events-none relative py-20" 
      id="Zone0Entry"
    >
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--color-earth-dark)_90%)] pointer-events-none z-[1]" />

      {/* Title & Tagline Content */}
      <div className="max-w-4xl px-4 select-none pointer-events-auto mt-[20vh] z-10">
        <h1 
          ref={titleRef} 
          className="text-7xl md:text-9xl font-bold tracking-[0.15em] text-dust mb-6 drop-shadow-2xl" 
          style={{ fontFamily: 'var(--font-display)' }}
        >
          DHOOL / धूल
        </h1>
        
        <p 
          ref={taglineRef} 
          className="text-xl md:text-2xl text-haze-grey font-light tracking-wide mb-16"
        >
          Step into the air of Raipur–Bhilai–Durg
        </p>
      </div>

      {/* Downward Scrolling Indicator */}
      <div 
        ref={promptRef} 
        className="flex flex-col items-center gap-2 mb-10 z-10 select-none opacity-0"
      >
        <span className="text-[10px] text-sand-light tracking-[0.25em] uppercase opacity-70">
          Scroll down to enter
        </span>
        
        {/* Bouncing SVG Chevron */}
        <svg 
          className="w-5 h-5 text-sand-light animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  )
}
