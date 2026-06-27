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
      className="zone min-h-[150vh] relative w-full" 
      id="Zone0Entry"
    >
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--color-earth-dark)_90%)] pointer-events-none z-[1]" />

      {/* Sticky viewport container centered for scrollytelling visual stability */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between py-20 px-6 pointer-events-none">
        
        {/* Spacer to push title content down slightly */}
        <div className="h-0 md:h-[10vh]" />

        {/* Title & Tagline Content */}
        <div className="max-w-4xl px-4 select-none pointer-events-auto z-10 text-center">
          <h1 
            ref={titleRef} 
            className="text-7xl md:text-9xl font-bold tracking-[0.15em] text-dust mb-6 drop-shadow-2xl" 
            style={{ fontFamily: 'var(--font-display)' }}
          >
            DHOOL / धूल
          </h1>
          
          <p 
            ref={taglineRef} 
            className="text-xl md:text-2xl text-haze-grey font-light tracking-wide"
          >
            Step into the air of Raipur–Bhilai–Durg
          </p>
        </div>

        {/* Downward Scrolling Indicator */}
        <div 
          ref={promptRef} 
          className="flex flex-col items-center gap-4 z-10 select-none opacity-0 pointer-events-auto"
        >
          <span className="text-[10px] text-sand-light tracking-[0.25em] uppercase opacity-60">
            Scroll down to enter
          </span>
          
          {/* Pulsing ring wrapping the bouncing chevron */}
          <div className="w-10 h-10 rounded-full border border-dust-brown/30 flex items-center justify-center bg-earth-dark/40 backdrop-blur-md shadow-[0_0_15px_rgba(196,149,106,0.1)] hover:border-dust-brown/60 transition-colors duration-300">
            <svg 
              className="w-4 h-4 text-sand-light animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  )
}
