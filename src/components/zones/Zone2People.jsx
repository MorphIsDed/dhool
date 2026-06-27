import { useRef } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { useScrollReveal } from '@hooks/useScrollReveal'
import { PEOPLE } from '@data/people'

export default function Zone2People({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 2)
  const sectionRef = useRef(null)

  useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.14 })

  return (
    <section ref={zoneRef} className="zone zone-surface-raised editorial-section overflow-hidden" id="Zone2People">
      <div ref={sectionRef} className="section-shell relative z-10">
        <header className="section-heading grid gap-10 lg:grid-cols-2 lg:items-end">
          <div className="reveal-item">
            <div className="eyebrow">02 / The people</div>
            <h2 className="section-title mt-4">The Human Cost</h2>
          </div>
          <p className="reveal-item section-lead lg:justify-self-end">
            Dust settles into school routes, roadside work, and factory shifts — with no clean-air fallback.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {PEOPLE.map((person, index) => (
            <article
              key={person.id}
              className="reveal-item flex flex-col rounded-xl border border-white/10 bg-[#2a1810] p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted">
                  Profile {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: person.color }} />
              </div>

              <div
                className="relative mx-auto my-8 h-24 w-full max-w-[8rem] overflow-hidden rounded-t-[2.5rem] rounded-b-md bg-black/30"
                style={{ borderTop: `3px solid ${person.color}` }}
              >
                <div className="absolute bottom-0 left-1/2 h-16 w-14 -translate-x-1/2 rounded-t-full bg-[#1a0e09]" />
                <div className="absolute bottom-10 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-[#1a0e09]" />
              </div>

              <h3 className="text-lg font-semibold text-sand-light">{person.label}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{person.story}</p>

              <blockquote
                className="mt-8 border-l-2 py-1 pl-4 text-sm font-medium leading-relaxed text-body"
                style={{ borderColor: person.color }}
              >
                {person.stat}
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
