import { useEffect, useRef } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { animateTextIn } from '@utils/gsapHelpers'

export default function Zone0Entry({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 0)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const promptRef = useRef(null)

  useEffect(() => {
    // Wait slightly for loading screen to clear
    const timeout = setTimeout(() => {
      if (titleRef.current) animateTextIn(titleRef.current, 0.2)
      if (taglineRef.current) animateTextIn(taglineRef.current, 0.8)
      if (promptRef.current) animateTextIn(promptRef.current, 1.4)
    }, 500)
    
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section ref={zoneRef} className="zone flex flex-col items-center justify-center min-h-screen text-center pointer-events-none" id="Zone0Entry">
      <div className="max-w-4xl px-4 select-none pointer-events-auto">
        <h1 
          ref={titleRef} 
          className="text-7xl md:text-9xl font-bold tracking-widest text-dust mb-6 drop-shadow-xl" 
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

        <div ref={promptRef} className="animate-pulse">
          <p className="text-sm text-sand-light tracking-widest uppercase opacity-70">
            Scroll down to enter
          </p>
        </div>
      </div>
    </section>
  )
}
