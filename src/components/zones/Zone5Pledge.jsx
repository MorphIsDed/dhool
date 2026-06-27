import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useScrollZone } from '@hooks/useScrollZone'
import { useScrollReveal } from '@hooks/useScrollReveal'
import { SOLUTIONS } from '@data/solutions'

const PLEDGE_ITEMS = [
  'Demand dust suppression at worksites and unpaved roads.',
  'Report sources that keep PM10 visible and unchallenged.',
]

export default function Zone5Pledge({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 5)
  const sectionRef = useRef(null)
  const [name, setName] = useState('')
  const [pledged, setPledged] = useState(false)

  useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.12 })

  const handlePrint = () => window.print()

  return (
    <section ref={zoneRef} className="zone zone-surface editorial-section overflow-hidden" id="Zone5Pledge">
      <div ref={sectionRef} className="section-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="reveal-item zone-panel p-8">
            <span className="zone-badge border-green-hope/30 text-green-hope">Final action</span>
            <h2 className="mt-6 text-3xl font-semibold text-sand-light">Clear the Air</h2>
            <p className="mt-5 max-w-md text-body">
              Add your name to the community pledge and back the corridor plan.
            </p>

            <ul className="mt-8 content-stack">
              {PLEDGE_ITEMS.map((item, idx) => (
                <li key={item} className="flex gap-4 rounded-lg border border-white/10 bg-black/20 p-4">
                  <span className="shrink-0 font-mono text-sm text-dust-brown">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-item zone-panel p-8">
            <div className="mb-6 border-b border-white/10 pb-5">
              <div className="eyebrow">Community pledge</div>
              <div className="mt-2 text-xl font-semibold text-sand-light">Sign your name</div>
            </div>

            {!pledged ? (
              <div className="content-stack">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Your full name for the pledge"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-5 py-4 text-base text-ui-cream placeholder-haze-grey/60 focus:border-green-hope focus:outline-none focus:ring-1 focus:ring-green-hope"
                />
                <button
                  onClick={() => name.trim() && setPledged(true)}
                  disabled={!name.trim()}
                  aria-label="Sign the digital dust pledge"
                  className="w-full rounded-lg bg-dust-brown px-6 py-4 font-semibold text-earth-dark transition-colors hover:bg-sand-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Sign Pledge
                </button>
                <p className="text-xs text-muted">
                  Your name is a civic signal — it shows the corridor wants cleaner air now.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-green-hope/40 bg-green-hope/15 p-7">
                <h3 className="text-lg font-semibold text-sand-light">Thank you, {name}.</h3>
                <p className="mt-2 text-sm text-body">
                  Your commitment has been added to the community record.
                </p>
              </div>
            )}

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm text-muted">
                Municipal authority or policymaker? Download the printable clean-air brief.
              </p>
              <button
                onClick={handlePrint}
                aria-label="Download PDF Policy Brief"
                className="mt-4 rounded-lg border border-dust-brown px-5 py-3 font-mono text-xs uppercase tracking-wider text-dust-brown transition-colors hover:bg-dust-brown hover:text-earth-dark"
              >
                Download Policy Brief
              </button>
            </div>
          </div>
        </div>
      </div>

      {createPortal(
        <div id="print-brief" className="hidden print:block bg-white text-black p-12">
          <div className="border-b-2 border-black pb-6 mb-8">
            <h1 className="text-4xl font-bold uppercase tracking-wider">DHOOL (धूल)</h1>
            <h2 className="text-lg text-gray-600 mt-1 uppercase tracking-widest">Policy Brief & Action Report</h2>
            <p className="text-xs text-gray-500 mt-2">Raipur–Bhilai–Durg Corridor PM10 Mitigation Project</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase border-b border-gray-300 pb-2 mb-4">I. Key Targets</h3>
            <p className="text-sm leading-relaxed mb-2">
              Standard AQI measurements underrepresent PM10 in industrial corridor centers. Construction, slag dust, and heavy truck movement regularly drive local PM10 past 300 µg/m³.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase border-b border-gray-300 pb-2 mb-4">II. Proposed Interventions</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">For Authorities</h4>
                <ul className="space-y-4 text-xs">
                  {SOLUTIONS.authorities.map((sol) => (
                    <li key={sol.id} className="border-b border-gray-100 pb-3 last:border-0">
                      <span className="font-bold">{sol.title}</span> — {sol.description}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">For Citizens</h4>
                <ul className="space-y-4 text-xs">
                  {SOLUTIONS.citizens.map((sol) => (
                    <li key={sol.id} className="border-b border-gray-100 pb-3 last:border-0">
                      <span className="font-bold">{sol.title}</span> — {sol.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-black pt-6 mt-16 text-center text-[10px] text-gray-500">
            Generated dynamically by citizen action.
          </div>
        </div>,
        document.body,
      )}
    </section>
  )
}
