const ZONES = ['Entry', 'The Land', 'The People', 'The Science', 'Solutions', 'Pledge']
const ZONE_IDS = ['Zone0Entry', 'Zone1Land', 'Zone2People', 'Zone3Science', 'Zone4Solutions', 'Zone5Pledge']

export default function ZoneIndicator({ activeZone }) {
  const handleScroll = (index) => {
    const target = document.getElementById(ZONE_IDS[index])
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav 
      aria-label="Zone Indicator Navigation" 
      className="fixed right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-[1000]"
    >
      {ZONES.map((zone, i) => (
        <button
          key={i}
          onClick={() => handleScroll(i)}
          aria-label={`Scroll to ${zone}`}
          className="group relative flex items-center justify-end focus:outline-none"
        >
          {/* Tooltip */}
          <span className="absolute right-8 px-2 py-1 rounded bg-earth-dark/95 border border-dust-brown/30 text-[10px] tracking-widest uppercase text-sand-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            {zone}
          </span>
          
          {/* Indicator Dot */}
          <span 
            className={`rounded-full transition-all duration-300 ease-out cursor-pointer ${
              i === activeZone 
                ? 'w-3 h-3 bg-particle-glow opacity-100' 
                : 'w-2 h-2 bg-haze-grey/50 group-hover:bg-sand-light opacity-60'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}
