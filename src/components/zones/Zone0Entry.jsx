import { useEffect, useRef } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { useScrollReveal } from '@hooks/useScrollReveal'
import { animateTextIn } from '@utils/gsapHelpers'

const PROJECT_FACTS = [
  ['01', 'Pollutant', 'PM10 / coarse dust'],
  ['02', 'Geography', 'Raipur-Bhilai-Durg'],
]

export default function Zone0Entry({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 0)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.12, start: 'top 90%' })

  useEffect(() => {
    const timeout = setTimeout(() => animateTextIn(titleRef.current, 0.1), 200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section ref={zoneRef} className="zone relative flex min-h-[100svh] items-center overflow-hidden py-32" id="Zone0Entry">
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(105deg,rgba(26,14,9,0.97)_0%,rgba(26,14,9,0.75)_50%,rgba(26,14,9,0.9)_100%)]" />

      <div ref={sectionRef} className="section-shell relative z-10">
        <div className="grid items-end gap-20 lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="reveal-item eyebrow mb-8">Raipur-Bhilai-Durg corridor</div>
            <h1
              ref={titleRef}
              className="max-w-xl text-[clamp(3.25rem,8vw,5.75rem)] font-bold leading-[0.92] text-dust"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="block">DHOOL</span>
              <span className="mt-3 block text-[0.55em] tracking-normal">धूल</span>
            </h1>
            <p className="reveal-item mt-10 max-w-md text-lg leading-relaxed text-body">
              A visual investigation of the dust people breathe across Chhattisgarh's industrial corridor.
            </p>
          </div>

          <aside className="reveal-item border-l border-dust-brown/35 pl-8 md:pl-10">
            <div className="eyebrow">Field note 01</div>
            <h2 className="mt-5 max-w-sm text-2xl font-semibold leading-snug text-sand-light">
              The air looks ordinary. The exposure is not.
            </h2>
            <p className="mt-5 max-w-sm text-muted">
              Mapped hotspots, lived experience, measurement gaps, and practical interventions.
            </p>

            <dl className="mt-10 divide-y divide-white/12 border-y border-white/12">
              {PROJECT_FACTS.map(([number, label, value]) => (
                <div key={number} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4">
                  <dt className="font-mono text-xs text-dust-brown">{number}</dt>
                  <dd className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="text-sm text-muted">{label}</span>
                    <strong className="text-sm font-medium text-ui-cream">{value}</strong>
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href="#Zone1Land"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-sand-light transition-colors hover:text-particle-glow"
            >
              Enter the chronicle
              <span aria-hidden="true">↓</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
