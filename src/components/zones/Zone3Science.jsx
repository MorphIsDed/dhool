import { useState, useEffect, useRef } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { useAQIData } from '@hooks/useAQIData'
import { scrollReveal, animateTextIn } from '@utils/gsapHelpers'
import { gsap } from 'gsap'

// Simulated seasonal multipliers for divergence
const SEASON_MULTIPLIERS = {
  0: { label: 'Monsoon (Aug)', pm10Mult: 0.4, aqiMult: 0.6 },
  1: { label: 'Post-Monsoon (Oct)', pm10Mult: 1.0, aqiMult: 0.9 },
  2: { label: 'Winter (Jan)', pm10Mult: 1.5, aqiMult: 1.4 },
  3: { label: 'Summer (May)', pm10Mult: 2.2, aqiMult: 1.1 }, // Massive PM10 divergence due to dry dust
}

export default function Zone3Science({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 3)
  const titleRef = useRef(null)
  const panelsRef = useRef(null)
  
  const { data, loading, error } = useAQIData()
  const [seasonIdx, setSeasonIdx] = useState(1)

  const mults = SEASON_MULTIPLIERS[seasonIdx]
  
  // Base values from API or fallback
  const basePm10 = data ? data.pm10 : 100
  const baseAqi  = data ? data.aqi : 100
  
  const currentPm10 = Math.round(basePm10 * mults.pm10Mult)
  const currentAqi  = Math.round(baseAqi * mults.aqiMult)

  // Animated counting values
  const [animatedPm10, setAnimatedPm10] = useState(currentPm10)
  const [animatedAqi, setAnimatedAqi] = useState(currentAqi)

  useEffect(() => {
    if (loading) return
    
    const pmObj = { val: animatedPm10 }
    const aqiObj = { val: animatedAqi }

    const pmTween = gsap.to(pmObj, {
      val: currentPm10,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => setAnimatedPm10(Math.round(pmObj.val))
    })

    const aqiTween = gsap.to(aqiObj, {
      val: currentAqi,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => setAnimatedAqi(Math.round(aqiObj.val))
    })

    return () => {
      pmTween.kill()
      aqiTween.kill()
    }
  }, [currentPm10, currentAqi, loading])

  useEffect(() => {
    if (titleRef.current) {
      animateTextIn(titleRef.current, 0.2)
    }
    if (panelsRef.current) {
      const cards = panelsRef.current.querySelectorAll('.science-card')
      scrollReveal(cards, { stagger: 0.15 })
    }
  }, [])

  // Status mapping
  const pm10Severity = currentPm10 > 250 ? 'Critical' : currentPm10 > 150 ? 'Dangerous' : currentPm10 > 100 ? 'High' : 'Moderate'
  const pm10Color = currentPm10 > 250 ? 'var(--rust-red)' : currentPm10 > 150 ? 'var(--particle-glow)' : currentPm10 > 100 ? 'var(--dust-brown)' : 'var(--green-hope)'

  const aqiSeverity = currentAqi > 200 ? 'Poor' : currentAqi > 100 ? 'Moderate' : 'Good'
  const aqiColor = currentAqi > 200 ? 'var(--particle-glow)' : currentAqi > 100 ? 'var(--dust-brown)' : 'var(--green-hope)'

  // SVG circular properties
  const radius = 70
  const circ = 2 * Math.PI * radius // ~439.8

  // Safe percentage clampings
  const aqiPercent = Math.min(animatedAqi / 300, 1)
  const pmPercent = Math.min(animatedPm10 / 400, 1)

  const aqiOffset = circ - aqiPercent * circ
  const pmOffset = circ - pmPercent * circ

  return (
    <section ref={zoneRef} className="zone flex flex-col items-center justify-center min-h-screen py-24 bg-black/40 backdrop-blur-sm" id="Zone3Science">
      <div className="max-w-6xl w-full px-6">
        
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-sand-light mb-6"
          >
            The Measurement Blindspot
          </h2>
          <p className="text-sm md:text-base text-haze-grey max-w-3xl mx-auto leading-relaxed">
            Standard AQI is heavily weighted towards fine particles (PM2.5) and gases. In industrial zones, coarse dust (PM10) is the hidden killer that standard meters often downplay.
          </p>
        </div>

        {/* Gauge Split Screen */}
        <div ref={panelsRef} className="flex flex-col md:flex-row gap-8 mb-16">
          
          {/* Left: Standard AQI */}
          <div className="science-card flex-1 bg-earth-dark/95 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
            <h3 className="text-base font-mono text-haze-grey mb-6 tracking-widest uppercase">Standard AQI</h3>
            
            {/* SVG Circular Arc Gauge */}
            <div className="relative w-44 h-44 flex items-center justify-center mb-6">
              <svg className="w-full h-full -rotate-90">
                <circle 
                  cx="88" cy="88" r={radius} 
                  className="stroke-white/5 fill-none" 
                  strokeWidth="6" 
                />
                <circle 
                  cx="88" cy="88" r={radius} 
                  className="fill-none transition-[stroke-dashoffset] duration-300 ease-out" 
                  strokeWidth="6" 
                  strokeDasharray={circ}
                  strokeDashoffset={aqiOffset}
                  strokeLinecap="round"
                  style={{ stroke: aqiColor }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-mono font-bold" style={{ color: aqiColor }}>
                  {loading ? '...' : animatedAqi}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest mt-1 text-haze-grey">Index</span>
              </div>
            </div>

            <div className="text-xl font-bold tracking-wide" style={{ color: aqiColor }}>{aqiSeverity}</div>
            <p className="text-xs text-haze-grey mt-4 leading-relaxed max-w-xs">Often looks "Moderate" even when dust is choking the streets.</p>
          </div>

          {/* Right: True PM10 */}
          <div className="science-card flex-1 bg-earth-dark/95 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden">
            {currentPm10 > 250 && <div className="absolute inset-0 bg-rust-red/5 animate-pulse pointer-events-none" />}
            <h3 className="text-base font-mono text-haze-grey mb-6 tracking-widest uppercase">True PM10</h3>
            
            {/* SVG Circular Arc Gauge */}
            <div className="relative w-44 h-44 flex items-center justify-center mb-6">
              <svg className="w-full h-full -rotate-90">
                <circle 
                  cx="88" cy="88" r={radius} 
                  className="stroke-white/5 fill-none" 
                  strokeWidth="6" 
                />
                <circle 
                  cx="88" cy="88" r={radius} 
                  className="fill-none transition-[stroke-dashoffset] duration-300 ease-out" 
                  strokeWidth="6" 
                  strokeDasharray={circ}
                  strokeDashoffset={pmOffset}
                  strokeLinecap="round"
                  style={{ stroke: pm10Color }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-mono font-bold" style={{ color: pm10Color }}>
                  {loading ? '...' : animatedPm10}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest mt-1 text-haze-grey">µg/m³</span>
              </div>
            </div>

            <div className="text-xl font-bold tracking-wide" style={{ color: pm10Color }}>{pm10Severity}</div>
            <p className="text-xs text-haze-grey mt-4 leading-relaxed max-w-xs">Standard safe limit is 100 µg/m³. The corridor frequently doubles this.</p>
          </div>

        </div>

        {/* Season Slider */}
        <div className="max-w-2xl mx-auto bg-earth-dark/80 p-6 rounded-xl border border-dust-brown/20 shadow-xl">
          <label className="block text-center text-sand-light font-mono text-xs mb-6 uppercase tracking-widest">
            Simulate Seasonal Impact: {mults.label}
          </label>
          <input 
            type="range" 
            min="0" max="3" step="1" 
            value={seasonIdx}
            onChange={(e) => setSeasonIdx(parseInt(e.target.value))}
            className="w-full accent-dust-brown h-1 bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none"
            aria-label="Season slider"
          />
          <div className="flex justify-between text-[10px] font-mono text-haze-grey mt-4 px-1 uppercase tracking-wider">
            <span>Monsoon</span>
            <span>Post-Monsoon</span>
            <span>Winter</span>
            <span>Summer</span>
          </div>
        </div>

        {error && <div className="text-center text-[10px] text-rust-red mt-6 opacity-60">API fetch failed, utilizing historical snapshots.</div>}
      </div>
    </section>
  )
}
