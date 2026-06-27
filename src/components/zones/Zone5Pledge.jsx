import { useState } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { SOLUTIONS } from '@data/solutions'

export default function Zone5Pledge({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 5)
  const [name, setName] = useState('')
  const [pledged, setPledged] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  return (
    <section ref={zoneRef} className="zone flex flex-col items-center justify-center min-h-screen relative overflow-hidden" id="Zone5Pledge">
      {/* Green World Shift Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-hope/40 to-transparent mix-blend-color pointer-events-none transition-opacity duration-1000" />
      <div className="absolute inset-0 bg-earth-dark/70 backdrop-blur-sm pointer-events-none" />

      <div className="max-w-3xl w-full px-6 relative z-10 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-sand-light mb-8 drop-shadow-lg">
          Clear the Air
        </h2>
        <p className="text-xl text-ui-cream mb-12 font-light">
          Change begins when citizens demand it and authorities act on it. Add your name to the community pledge.
        </p>

        {/* Pledge Form */}
        {!pledged ? (
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-ui-cream focus:outline-none focus:border-green-hope w-full md:w-96 text-lg transition-colors"
            />
            <button 
              onClick={() => name.trim() && setPledged(true)}
              disabled={!name.trim()}
              className="px-8 py-4 rounded-full bg-dust-brown text-earth-dark font-bold hover:bg-sand-light transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Pledge
            </button>
          </div>
        ) : (
          <div className="mb-16 p-8 bg-green-hope/20 border border-green-hope/50 rounded-2xl animate-fade-in">
            <h3 className="text-2xl text-sand-light mb-2">Thank you, {name}.</h3>
            <p className="text-ui-cream">Your pledge has been recorded. Share this with your community.</p>
          </div>
        )}

        {/* Policy Brief Download */}
        <div className="border-t border-white/10 pt-12 mt-12">
          <p className="text-haze-grey mb-6">Are you a municipal authority, journalist, or researcher?</p>
          <button 
            onClick={handlePrint}
            className="px-6 py-3 rounded-lg border border-dust-brown text-dust-brown hover:bg-dust-brown hover:text-earth-dark transition-colors font-mono text-sm tracking-widest uppercase"
          >
            Download PDF Policy Brief
          </button>
        </div>
      </div>

      {/* 
        Print-only Policy Brief 
        This is hidden on screen and only visible when printing.
      */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-brief, #print-brief * { visibility: visible; }
          #print-brief { position: absolute; left: 0; top: 0; width: 100%; color: black; background: white; padding: 2cm; }
          .no-print { display: none !important; }
        }
      `}</style>
      
      <div id="print-brief" className="hidden print:block absolute top-0 left-0 w-full bg-white text-black p-8 z-50">
        <h1 className="text-3xl font-bold mb-2">DHOOL: Policy Brief</h1>
        <h2 className="text-xl text-gray-600 mb-8">Raipur-Bhilai-Durg Corridor PM10 Mitigation Strategy</h2>
        
        <h3 className="text-lg font-bold mb-4 border-b pb-2">Proposed Authority Interventions</h3>
        <ul className="mb-8 space-y-4">
          {SOLUTIONS.authorities.map(sol => (
            <li key={sol.id}>
              <strong>{sol.title}:</strong> {sol.description}<br/>
              <em className="text-sm text-gray-600">Impact: {sol.impact} | Cost: {sol.cost} | Timeline: {sol.timeline}</em>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-500 mt-12 border-t pt-4">Generated via DHOOL Interactive Web Experience.</p>
      </div>
    </section>
  )
}
