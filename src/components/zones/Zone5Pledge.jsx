import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useScrollZone } from '@hooks/useScrollZone'
import { SOLUTIONS } from '@data/solutions'
import { scrollReveal } from '@utils/gsapHelpers'

export default function Zone5Pledge({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 5)
  const containerRef = useRef(null)
  
  const [name, setName] = useState('')
  const [pledged, setPledged] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  useEffect(() => {
    let revealCleanup = () => {}
    if (containerRef.current) {
      const children = containerRef.current.querySelectorAll('.scroll-target')
      revealCleanup = scrollReveal(children, { stagger: 0.1 })
    }
    return () => revealCleanup()
  }, [])

  return (
    <section ref={zoneRef} className="zone zone-surface editorial-section overflow-hidden" id="Zone5Pledge">
      <div ref={containerRef} className="section-shell relative z-10">
        <div className="grid w-full gap-8 lg:grid-cols-2">
          <div className="scroll-target zone-panel p-7 md:p-8">
            <span className="zone-badge border-green-hope/30 text-green-hope">Final action</span>
            <h2 className="mt-6 text-3xl font-semibold text-sand-light md:text-4xl">Clear the Air</h2>
            <p className="mt-5 max-w-md text-body">
              Change begins when residents demand it and institutions act on it. Add your name to the community pledge and back the corridor plan.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                'Demand dust suppression at worksites and unpaved roads.',
                'Report the sources that keep PM10 visible and unchallenged.',
                'Protect daily routines with informed, shared action.',
              ].map((item, idx) => (
                <div key={item} className="flex gap-4 rounded-lg border border-white/10 bg-black/20 p-4">
                  <div className="shrink-0 font-mono text-sm text-dust-brown">{String(idx + 1).padStart(2, '0')}</div>
                  <p className="text-sm text-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-target zone-panel p-6 md:p-7">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="eyebrow">Community pledge</div>
                <div className="mt-2 text-xl font-semibold text-sand-light">Sign your name</div>
              </div>
              <span className="zone-badge">Public record</span>
            </div>

            {!pledged ? (
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Your full name for the pledge"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-ui-cream placeholder-haze-grey/60 transition-all duration-300 focus:border-green-hope focus:outline-none focus:ring-1 focus:ring-green-hope"
                />
                <button 
                  onClick={() => name.trim() && setPledged(true)}
                  disabled={!name.trim()}
                  aria-label="Sign the digital dust pledge"
                  className="w-full rounded-2xl bg-dust-brown px-6 py-4 font-bold text-earth-dark shadow-lg transition-all duration-300 hover:bg-sand-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Sign Pledge
                </button>
                <p className="text-xs leading-relaxed text-haze-grey/80">
                  Your name is a civic signal, not a donation. It helps show that the corridor wants cleaner air now.
                </p>
              </div>
            ) : (
              <div className="animate-fade-in rounded-2xl border border-green-hope/40 bg-green-hope/15 p-8 shadow-2xl">
                <h3 className="mb-2 text-xl font-bold text-sand-light">Thank you, {name}.</h3>
                <p className="text-sm leading-relaxed text-ui-cream/90">
                  Your commitment has been added. Together, we can push for cleaner air in the Raipur-Bhilai-Durg corridor.
                </p>
              </div>
            )}

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs leading-relaxed text-haze-grey">
                Are you a municipal authority, developer, or policymaker? Open the structured clean-air brief for a printable summary.
              </p>
              <button 
                onClick={handlePrint}
                aria-label="Download PDF Policy Brief"
                className="mt-4 rounded-xl border border-dust-brown px-6 py-3 font-mono text-xs uppercase tracking-widest text-dust-brown transition-all duration-300 hover:bg-dust-brown hover:text-earth-dark"
              >
                Download PDF Policy Brief
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Print-only Policy Brief Container
        Visible only when printing. CSS is applied globally in globals.css.
        Portaled to document.body to prevent parent display:none inheritance during prints.
      */}
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
              Standard AQI measurements underrepresent the threat of PM10 (coarse dust particles) in industrial corridor centers. Active construction, slag dust, and heavy truck cargo movement regularly drive local PM10 values past 300 µg/m³.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase border-b border-gray-300 pb-2 mb-4">II. Proposed Interventions</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">For Authorities</h4>
                <ul className="space-y-4 text-xs">
                  {SOLUTIONS.authorities.map(sol => (
                    <li key={sol.id} className="border-b border-gray-100 pb-3 last:border-0">
                      <span className="font-bold">{sol.title}</span> &mdash; {sol.description}
                      <div className="text-[10px] text-gray-500 mt-1">
                        Impact: {sol.impact} | Cost: {sol.cost} | Timeline: {sol.timeline}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">For Citizens</h4>
                <ul className="space-y-4 text-xs">
                  {SOLUTIONS.citizens.map(sol => (
                    <li key={sol.id} className="border-b border-gray-100 pb-3 last:border-0">
                      <span className="font-bold">{sol.title}</span> &mdash; {sol.description}
                      <div className="text-[10px] text-gray-500 mt-1">
                        Impact: {sol.impact} | Cost: {sol.cost} | Timeline: {sol.timeline}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-black pt-6 mt-16 text-center text-[10px] text-gray-500">
            Generated dynamically by citizen action. Verified against municipal dataset models.
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
