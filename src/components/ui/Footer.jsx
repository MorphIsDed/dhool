export default function Footer() {
  return (
    <footer className="w-full bg-earth-dark/95 border-t border-white/5 py-12 px-6 text-center select-none z-20 relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center gap-2">
          <span 
            className="text-xl font-bold text-dust-brown"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            धूल / DHOOL
          </span>
          <p className="text-[10px] text-haze-grey uppercase tracking-widest">
            Raipur–Bhilai–Durg Corridor Pollution Project
          </p>
        </div>

        {/* Data Source Citations */}
        <div className="text-[10px] text-haze-grey/60 max-w-xl leading-relaxed font-mono">
          Data Sources: National Air Quality Index (CPCB India), OpenAQ v3 Real-time feeds (Station 8673), Raipur Municipal Corporation budget briefs, Chhattisgarh State Environment Conservation Board reports, and composite citizen field journals.
        </div>

        {/* Copyright & Credit */}
        <div className="text-[10px] text-haze-grey/40 border-t border-white/5 pt-6 w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} DHOOL. All rights reserved.</span>
          <span className="font-mono hover:text-sand-light transition-colors cursor-pointer">
            Engineered with React + Three.js + Mapbox GL
          </span>
        </div>

      </div>
    </footer>
  )
}
