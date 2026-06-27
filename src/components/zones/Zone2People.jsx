import { useEffect, useRef, useState } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { scrollReveal } from '@utils/gsapHelpers'
import { PEOPLE } from '@data/people'

export default function Zone2People({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 2)
  const containerRef = useRef(null)
  const [activePerson, setActivePerson] = useState(null)

  useEffect(() => {
    if (!containerRef.current) return
    const elements = containerRef.current.querySelectorAll('.person-card')
    scrollReveal(elements)
  }, [])

  return (
    <section ref={zoneRef} className="zone flex flex-col items-center justify-center min-h-screen py-24" id="Zone2People">
      <div className="max-w-5xl w-full px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-sand-light mb-16 text-center">
          The Human Cost
        </h2>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PEOPLE.map((person) => (
            <div 
              key={person.id}
              className="person-card relative flex flex-col items-center"
            >
              {/* Silhouette Avatar */}
              <button 
                onClick={() => setActivePerson(activePerson === person.id ? null : person.id)}
                className="w-48 h-64 rounded-t-full border-2 border-transparent transition-all duration-300 hover:-translate-y-2 focus:outline-none overflow-hidden relative group"
                style={{ 
                  background: `linear-gradient(to top, ${person.color}40, transparent)`,
                  borderColor: activePerson === person.id ? person.color : 'rgba(255,255,255,0.1)'
                }}
              >
                {/* Abstract CSS Silhouette */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-40 bg-earth-dark rounded-t-[3rem] border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-36 left-1/2 -translate-x-1/2 w-16 h-20 bg-earth-dark rounded-full border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* Glow effect when active */}
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-300"
                  style={{ opacity: activePerson === person.id ? 0.2 : 0, background: person.color }}
                />
              </button>

              <h3 className="mt-6 text-xl font-medium text-ui-cream mb-2 text-center" style={{ color: person.color }}>
                {person.label}
              </h3>

              {/* Story Reveal */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${activePerson === person.id ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
              >
                <div className="bg-earth-dark/80 backdrop-blur-md p-6 rounded-xl border border-white/10 text-sm">
                  <p className="text-haze-grey mb-4 leading-relaxed">
                    {person.story}
                  </p>
                  <div className="p-3 bg-white/5 rounded border-l-2" style={{ borderColor: person.color }}>
                    <p className="text-xs font-mono text-sand-light">{person.stat}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
