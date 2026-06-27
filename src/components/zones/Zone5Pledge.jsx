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
    if (containerRef.current) {
      const children = containerRef.current.querySelectorAll('.scroll-target')
      scrollReveal(children)
    }
  }, [])

  return (
    <section 
      ref={zoneRef} 
      className="zone flex flex-col items-center justify-center min-h-screen relative overflow-hidden" 
      id="Zone5Pledge"
    >
      {/* Green World Shift Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-hope/30 to-transparent mix-blend-color pointer-events-none transition-opacity duration-1000" />
      <div className="absolute inset-0 bg-earth-dark/75 backdrop-blur-sm pointer-events-none" />

      <div 
        ref={containerRef}
        className="max-w-3xl w-full px-6 relative z-10 text-center"
      >
        <h2 className="scroll-target text-5xl md:text-6xl font-bold text-sand-light mb-6 drop-shadow-lg">
          Clear the Air
        </h2>
        <p className="scroll-target text-base md:text-lg text-ui-cream mb-12 font-light leading-relaxed max-w-xl mx-auto">
          Change begins when citizens demand it and authorities act on it. Add your name to the community pledge.
        </p>

        {/* Pledge Form */}
        <div className="scroll-target">
          {!pledged ? (
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16 max-w-lg mx-auto">
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Your full name for the pledge"
                className="px-6 py-4 rounded-full bg-white/5 border border-white/15 text-ui-cream placeholder-haze-grey/60 focus:outline-none focus:border-green-hope focus:ring-1 focus:ring-green-hope w-full text-base transition-all duration-300"
              />
              <button 
                onClick={() => name.trim() && setPledged(true)}
                disabled={!name.trim()}
                aria-label="Sign the digital dust pledge"
                className="px-8 py-4 rounded-full bg-dust-brown text-earth-dark font-bold hover:bg-sand-light transition-all duration-300 w-full md:w-auto disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg hover:shadow-dust-brown/20"
              >
                Sign Pledge
              </button>
            </div>
          ) : (
            <div className="mb-16 p-8 bg-green-hope/15 border border-green-hope/40 rounded-2xl animate-fade-in max-w-lg mx-auto shadow-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-sand-light mb-2">Thank you, {name}.</h3>
              <p className="text-sm text-ui-cream/90 leading-relaxed">
                Your commitment has been added. Together, we can push for cleaner air in the Raipur–Bhilai–Durg corridor.
              </p>
            </div>
          )}
        </div>

        {/* Policy Brief Download */}
        <div className="scroll-target border-t border-white/10 pt-8 mt-8 max-w-xl mx-auto">
          <p className="text-xs text-haze-grey mb-6 tracking-wide leading-relaxed">
            Are you a municipal authority, developer, or policymaker? Access the full, structured clean air plan.
          </p>
          <button 
            onClick={handlePrint}
            aria-label="Download PDF Policy Brief"
            className="px-6 py-3 rounded-lg border border-dust-brown text-dust-brown hover:bg-dust-brown hover:text-earth-dark transition-all duration-300 font-mono text-xs tracking-widest uppercase cursor-pointer"
          >
            Download PDF Policy Brief
          </button>
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
