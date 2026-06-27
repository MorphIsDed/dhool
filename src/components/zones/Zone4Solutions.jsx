import { useEffect, useRef } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { useScrollReveal } from '@hooks/useScrollReveal'
import { animateTextIn } from '@utils/gsapHelpers'
import { SOLUTIONS } from '@data/solutions'
import SolutionCard from '@components/ui/SolutionCard'

export default function Zone4Solutions({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 4)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.1 })

  useEffect(() => {
    const titleTween = titleRef.current ? animateTextIn(titleRef.current, 0.15) : null
    return () => titleTween?.kill()
  }, [])

  return (
    <section ref={zoneRef} className="zone zone-surface-raised editorial-section overflow-hidden" id="Zone4Solutions">
      <div className="zone-divider absolute top-0 left-0 right-0" />
      <div ref={sectionRef} className="section-shell relative z-10 content-stack-lg">
        <header className="reveal-item mx-auto max-w-xl text-center">
          <span className="zone-badge">Two-track intervention plan</span>
          <h2 ref={titleRef} className="section-title mt-5">
            The Path Forward
          </h2>
          <p className="mt-5 text-muted">
            Source control and personal protection need to move together.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="reveal-item zone-panel p-8">
            <h3 className="mb-2 flex items-center gap-3 border-b border-dust-brown/25 pb-4 text-lg font-semibold text-ui-cream">
              <span className="font-mono text-sm text-dust-brown">01.</span> For Authorities
            </h3>
            <p className="mb-8 text-sm text-muted">
              Enforcement, monitoring, and infrastructure that lowers corridor dust at the source.
            </p>
            <div className="content-stack">
              {SOLUTIONS.authorities.map((sol) => (
                <SolutionCard key={sol.id} {...sol} />
              ))}
            </div>
          </div>

          <div className="reveal-item zone-panel p-8">
            <h3 className="mb-2 flex items-center gap-3 border-b border-green-hope/35 pb-4 text-lg font-semibold text-ui-cream">
              <span className="font-mono text-sm text-green-hope">02.</span> For Citizens
            </h3>
            <p className="mb-8 text-sm text-muted">
              Masks, reporting, indoor filtration, and community pressure reduce direct exposure.
            </p>
            <div className="content-stack">
              {SOLUTIONS.citizens.map((sol) => (
                <SolutionCard key={sol.id} {...sol} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
