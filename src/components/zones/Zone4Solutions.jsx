import { useEffect, useRef } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { scrollReveal } from '@utils/gsapHelpers'
import { SOLUTIONS } from '@data/solutions'
import SolutionCard from '@components/ui/SolutionCard'

export default function Zone4Solutions({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 4)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.solution-card-wrapper')
    scrollReveal(cards, { stagger: 0.1 })
  }, [])

  return (
    <section ref={zoneRef} className="zone min-h-screen py-24 bg-earth-dark/90 backdrop-blur-sm" id="Zone4Solutions">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-sand-light mb-6">The Path Forward</h2>
          <p className="text-xl text-haze-grey max-w-3xl mx-auto">
            Clearing the air requires a dual-track approach. Both municipal authorities and everyday citizens have a role to play in reducing PM10 exposure.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Authorities Column */}
          <div>
            <h3 className="text-2xl font-bold text-ui-cream mb-8 flex items-center gap-3 border-b border-dust-brown/30 pb-4">
              <span className="text-dust-brown">I.</span> For Authorities
            </h3>
            <div className="flex flex-col gap-6">
              {SOLUTIONS.authorities.map((sol) => (
                <div key={sol.id} className="solution-card-wrapper">
                  <SolutionCard {...sol} />
                </div>
              ))}
            </div>
          </div>

          {/* Citizens Column */}
          <div>
            <h3 className="text-2xl font-bold text-ui-cream mb-8 flex items-center gap-3 border-b border-green-hope/50 pb-4">
              <span className="text-green-hope">II.</span> For Citizens
            </h3>
            <div className="flex flex-col gap-6">
              {SOLUTIONS.citizens.map((sol) => (
                <div key={sol.id} className="solution-card-wrapper">
                  <SolutionCard {...sol} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
