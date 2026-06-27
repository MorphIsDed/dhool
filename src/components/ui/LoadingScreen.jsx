import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { DUST_IN_LANGUAGES } from '@data/languages'

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const progressRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const words = containerRef.current.querySelectorAll('.lang-word')
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      }
    })
    timelineRef.current = tl

    // Animate progress bar width
    tl.to(progressRef.current, {
      width: '100%',
      duration: 6.8,
      ease: 'none'
    }, 0)

    // Cycle through language words
    words.forEach((word, idx) => {
      const isLast = idx === words.length - 1
      
      // Fade in & slide up
      tl.to(word, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.15,
        ease: 'power2.out'
      })
      
      // Hold then fade out (except the last one)
      if (!isLast) {
        tl.to(word, {
          opacity: 0,
          y: -20,
          rotateX: 10,
          duration: 0.12,
          delay: 0.12,
          ease: 'power2.in'
        })
      } else {
        // Last word (Hindi "धूल") - dramatic scale up and hold
        tl.to(word, {
          scale: 1.25,
          color: '#E8D5B7', // var(--sand-light)
          duration: 0.5,
          ease: 'back.out(2)'
        })
        tl.to(word, {
          opacity: 0,
          scale: 1.5,
          filter: 'blur(10px)',
          duration: 0.8,
          delay: 0.6,
          ease: 'power2.inOut'
        })
      }
    })

    // Fade out the entire screen
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '-=0.4')

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [onComplete])

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.kill()
    }
    // Fade out immediately and complete
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete
    })
  }

  return (
    <div 
      ref={containerRef} 
      onClick={handleSkip}
      className="fixed inset-0 bg-earth-dark flex flex-col items-center justify-center z-[9000] cursor-pointer select-none"
    >
      {/* Cinematic Word Cycle */}
      <div className="relative h-24 flex items-center justify-center w-full overflow-hidden mb-8">
        {DUST_IN_LANGUAGES.map((lang, idx) => (
          <span 
            key={lang.language} 
            className="absolute opacity-0 translate-y-8 rotate-x-[-45deg] lang-word text-4xl md:text-6xl font-bold tracking-widest text-dust-brown text-center px-4"
            style={{ 
              fontFamily: 'var(--font-display)',
              transformOrigin: 'bottom center',
              backfaceVisibility: 'hidden'
            }}
          >
            {lang.word}
          </span>
        ))}
      </div>

      {/* Progress & Skip Prompt */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-xs text-haze-grey tracking-[0.3em] uppercase">
          Raipur–Bhilai–Durg Corridor
        </div>
        
        {/* Clean styled progress bar */}
        <div className="w-48 h-[2px] bg-earth-dark border border-dust-brown/30 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full bg-dust-brown w-0" />
        </div>

        <div className="text-[10px] text-haze-grey/50 tracking-[0.2em] uppercase mt-2 hover:text-sand-light transition-colors">
          Click anywhere to skip
        </div>
      </div>
    </div>
  )
}
