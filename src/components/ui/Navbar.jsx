import { useState } from 'react'

const ZONES = ['Entry', 'The Land', 'The People', 'The Science', 'Solutions', 'Pledge']
const ZONE_IDS = ['Zone0Entry', 'Zone1Land', 'Zone2People', 'Zone3Science', 'Zone4Solutions', 'Zone5Pledge']

export default function Navbar({ activeZone }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = (e, index) => {
    e.preventDefault()
    const target = document.getElementById(ZONE_IDS[index])
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav 
      aria-label="Main Navigation" 
      className="fixed top-0 right-0 left-0 z-[1000] flex items-center justify-between border-b border-white/10 bg-[#1a0e09]/95 px-5 py-3.5 backdrop-blur-md md:px-8"
    >
      {/* Title logo */}
      <div 
        className="text-2xl font-bold text-dust-brown select-none"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        धूल
      </div>
      
      {/* Desktop Links (Hidden on Mobile) */}
      <div className="hidden md:flex gap-6">
        {ZONES.map((z, i) => (
          <a 
            key={z} 
            href={`#${ZONE_IDS[i]}`}
            onClick={(e) => handleScroll(e, i)}
            aria-current={activeZone === i ? 'page' : undefined}
            className={`relative pb-1 text-xs font-medium tracking-[0.14em] uppercase transition-colors ${
              activeZone === i ? 'text-particle-glow' : 'text-haze-grey hover:text-sand-light'
            }`}
          >
            {z}
            {activeZone === i && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-particle-glow rounded-full animate-fade-in" />
            )}
          </a>
        ))}
      </div>

      {/* Hamburger Toggle Button (Hidden on Desktop) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        className="block md:hidden text-dust-brown focus:outline-none cursor-pointer"
      >
        {menuOpen ? (
          // Close Icon
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Menu Hamburger Icon
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Slide-down Panel */}
      <div 
        className={`absolute top-[100%] left-0 right-0 bg-earth-dark/95 border-b border-dust-brown/20 flex flex-col items-center gap-4 py-6 md:hidden shadow-2xl z-50 transition-all duration-300 ease-in-out origin-top ${
          menuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        {ZONES.map((z, i) => (
          <a 
            key={z} 
            href={`#${ZONE_IDS[i]}`}
            onClick={(e) => {
              handleScroll(e, i)
              setMenuOpen(false)
            }}
            aria-current={activeZone === i ? 'page' : undefined}
            className={`text-xs tracking-widest uppercase transition-colors duration-300 font-medium py-2 ${
              activeZone === i ? 'text-particle-glow' : 'text-haze-grey hover:text-sand-light'
            }`}
          >
            {z}
          </a>
        ))}
      </div>
    </nav>
  )
}
