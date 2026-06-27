import { useEffect, useRef, useState } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { scrollReveal, animateTextIn } from '@utils/gsapHelpers'
import { PEOPLE } from '@data/people'

export default function Zone2People({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 2)
  const titleRef = useRef(null)
  const containerRef = useRef(null)
  const [activePerson, setActivePerson] = useState(null)

  useEffect(() => {
    // Scroll reveal for cards
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.person-card')
      scrollReveal(elements)
    }
    // Animate title in
    if (titleRef.current) {
      animateTextIn(titleRef.current, 0.2)
    }
  }, [])

  return (
    <section ref={zoneRef} className="zone flex flex-col items-center justify-center min-h-screen py-24 relative overflow-hidden" id="Zone2People">
      {/* Background radial dust glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(196,149,106,0.05)_0%,transparent_60%)] pointer-events-none mix-blend-color-dodge" />

      <div className="max-w-5xl w-full px-6 relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-sand-light mb-16 text-center"
        >
          The Human Cost
        </h2>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {PEOPLE.map((person) => (
            <div 
              key={person.id}
              className="person-card relative flex flex-col items-center"
            >
              {/* Silhouette Avatar Button */}
              <button 
                onClick={() => setActivePerson(activePerson === person.id ? null : person.id)}
                aria-expanded={activePerson === person.id}
                aria-label={`Toggle story of ${person.label}`}
                className="w-48 h-64 rounded-t-full border-2 border-transparent transition-all duration-300 hover:-translate-y-2 focus:outline-none overflow-hidden relative group cursor-pointer"
                style={{ 
                  background: `linear-gradient(to top, ${person.color}33, transparent)`,
                  borderColor: activePerson === person.id ? person.color : 'rgba(255,255,255,0.1)'
                }}
              >
                {/* Abstract CSS Silhouette */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-40 bg-earth-dark rounded-t-[3rem] border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-36 left-1/2 -translate-x-1/2 w-16 h-20 bg-earth-dark rounded-full border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* Subtle moving dust overlay inside the silhouette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] mix-blend-overlay animate-pulse" />
                
                {/* Glow effect when active */}
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-300"
                  style={{ 
                    opacity: activePerson === person.id ? 0.15 : 0, 
                    background: person.color 
                  }}
                />
              </button>

              <h3 
                className="mt-6 text-xl font-medium mb-2 text-center" 
                style={{ color: person.color }}
              >
                {person.label}
              </h3>
            </div>
          ))}
        </div>

        {/* Centralized Story Spotlight Panel */}
        <div className="w-full max-w-3xl mx-auto min-h-[160px] transition-all duration-500 ease-in-out">
          {activePerson ? (
            (() => {
              const person = PEOPLE.find(p => p.id === activePerson)
              return (
                <div className="bg-earth-dark/95 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl animate-fade-in flex flex-col md:flex-row gap-6 md:gap-8 items-center text-left">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-3" style={{ color: person.color }}>
                      {person.label}'s Chronicle
                    </h4>
                    <p className="text-haze-grey text-xs md:text-sm leading-relaxed">
                      {person.story}
                    </p>
                  </div>
                  <div className="w-full md:w-64 p-4 bg-white/5 rounded-xl border-l-4 shadow-inner flex flex-col justify-center" style={{ borderColor: person.color }}>
                    <p className="font-mono text-sand-light text-[11px] leading-relaxed tracking-wide">
                      {person.stat}
                    </p>
                  </div>
                </div>
              )
            })()
          ) : (
            <div className="text-haze-grey text-xs italic opacity-60 border border-white/10 rounded-2xl p-6 text-center bg-black/25 backdrop-blur-sm">
              Click a portrait profile above to listen to their personal story.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
