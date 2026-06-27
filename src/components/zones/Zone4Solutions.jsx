import { useEffect, useRef } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { scrollReveal, animateTextIn } from '@utils/gsapHelpers'
import { SOLUTIONS } from '@data/solutions'
import SolutionCard from '@components/ui/SolutionCard'

export default function Zone4Solutions({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 4)
  const titleRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.solution-card-wrapper')
      scrollReveal(cards, { stagger: 0.1 })
    }
    if (titleRef.current) {
      animateTextIn(titleRef.current, 0.2)
    }
  }, [])

  return (
    <section ref={zoneRef} className="zone min-h-screen py-24 bg-earth-dark/90 backdrop-blur-sm" id="Zone4Solutions">
      <div className="zone-divider absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-14">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-sand-light mb-6"
          >
            The Path Forward
          </h2>
          <p className="text-sm md:text-base text-haze-grey max-w-3xl mx-auto leading-relaxed">
            Clearing the air requires a dual-track approach. Both municipal authorities and everyday citizens have a role to play in reducing PM10 exposure.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-start">
          
          {/* Authorities Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-ui-cream mb-4 flex items-center gap-3 border-b border-dust-brown/30 pb-4">
              <span className="text-dust-brown font-mono text-sm">01.</span> For Authorities
            </h3>
            <div className="flex flex-col gap-6">
              {SOLUTIONS.authorities.map((sol) => (
                <div key={sol.id} className="solution-card-wrapper">
                  <SolutionCard {...sol} />
                </div>
              ))}
            </div>
          </div>

          {/* Styled Vertical Gradient Separator (hidden on mobile) */}
          <div className="hidden lg:block w-[1px] bg-gradient-to-b from-dust-brown/30 via-green-hope/40 to-transparent self-stretch my-10" />

          {/* Citizens Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-ui-cream mb-4 flex items-center gap-3 border-b border-green-hope/50 pb-4">
              <span className="text-green-hope font-mono text-sm">02.</span> For Citizens
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
