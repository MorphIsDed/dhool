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
    const titleTween = titleRef.current ? animateTextIn(titleRef.current, 0.15) : null
    let revealCleanup = () => {}
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.solution-card-wrapper')
      revealCleanup = scrollReveal(cards, { stagger: 0.08 })
    }
    return () => {
      titleTween?.kill()
      revealCleanup()
    }
  }, [])

  return (
    <section ref={zoneRef} className="zone zone-surface-raised editorial-section overflow-hidden" id="Zone4Solutions">
      <div className="zone-divider absolute top-0 left-0 right-0" />
      <div className="section-shell relative z-10">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <div className="mb-5 flex justify-center">
            <span className="zone-badge">Two-track intervention plan</span>
          </div>
          <h2 ref={titleRef} className="section-title">
            The Path Forward
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted md:text-base">
            Clearing the air requires both source control and personal protection. Municipal enforcement and everyday habit changes need to move together.
          </p>
        </div>

        <div ref={containerRef} className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="zone-panel p-6 md:p-7">
            <h3 className="mb-3 flex items-center gap-3 border-b border-dust-brown/25 pb-3 text-lg font-semibold text-ui-cream">
              <span className="font-mono text-sm text-dust-brown">01.</span> For Authorities
            </h3>
            <p className="mb-8 text-muted">
              Focus on enforcement, monitoring, and infrastructure changes that directly lower corridor dust at the source.
            </p>
            <div className="grid gap-4">
              {SOLUTIONS.authorities.map((sol) => (
                <div key={sol.id} className="solution-card-wrapper">
                  <SolutionCard {...sol} />
                </div>
              ))}
            </div>
          </div>

          <div className="zone-panel p-6 md:p-7">
            <h3 className="mb-3 flex items-center gap-3 border-b border-green-hope/35 pb-3 text-lg font-semibold text-ui-cream">
              <span className="font-mono text-sm text-green-hope">02.</span> For Citizens
            </h3>
            <p className="mb-8 text-muted">
              Small, repeated actions matter: masks, reporting, indoor filtration, and community pressure all reduce direct exposure.
            </p>
            <div className="grid gap-4">
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
