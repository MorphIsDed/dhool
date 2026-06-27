import { useScrollZone } from '@hooks/useScrollZone'
import { PEOPLE } from '@data/people'

export default function Zone2People({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 2)

  return (
    <section ref={zoneRef} className="zone zone-surface-raised editorial-section overflow-hidden" id="Zone2People">
      <div className="section-shell relative z-10">
        <header className="section-heading grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="eyebrow">02 / The people</div>
            <h2 className="section-title mt-4">The Human Cost</h2>
          </div>
          <p className="section-lead lg:max-w-md lg:justify-self-end">
            Dust exposure is not abstract. It settles into school routes, roadside work, factory shifts, and lungs with no clean-air fallback.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PEOPLE.map((person, index) => (
            <article
              key={person.id}
              className="group flex flex-col rounded-xl border border-white/10 bg-[#2a1810] p-7 transition-colors hover:border-white/18 md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-wide text-muted">
                  Profile {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: person.color }} />
              </div>

              <div
                className="relative mx-auto my-8 h-28 w-full max-w-[10rem] overflow-hidden rounded-t-[3rem] rounded-b-lg bg-black/30"
                style={{ borderTop: `3px solid ${person.color}` }}
              >
                <div className="absolute bottom-0 left-1/2 h-20 w-16 -translate-x-1/2 rounded-t-full bg-[#1a0e09]" />
                <div className="absolute bottom-12 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-[#1a0e09]" />
              </div>

              <h3 className="text-xl font-semibold text-sand-light">{person.label}</h3>
              <p className="mt-4 text-muted">{person.story}</p>

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
