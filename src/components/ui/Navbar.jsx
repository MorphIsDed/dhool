const ZONES = ['Entry', 'The Land', 'The People', 'The Science', 'Solutions', 'Pledge']
const ZONE_IDS = ['Zone0Entry', 'Zone1Land', 'Zone2People', 'Zone3Science', 'Zone4Solutions', 'Zone5Pledge']

export default function Navbar({ activeZone }) {
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
      className="fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-8 py-4 bg-earth-dark/70 backdrop-blur-md border-b border-dust-brown/20"
    >
      <div 
        className="text-2xl font-bold text-dust-brown"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        धूल
      </div>
      
      <div className="flex gap-6">
        {ZONES.map((z, i) => (
          <a 
            key={z} 
            href={`#${ZONE_IDS[i]}`}
            onClick={(e) => handleScroll(e, i)}
            aria-current={activeZone === i ? 'page' : undefined}
            className={`text-xs tracking-widest uppercase transition-colors duration-300 font-medium ${
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
