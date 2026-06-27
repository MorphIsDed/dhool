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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPm10, currentAqi, loading])

  useEffect(() => {
    const titleTween = titleRef.current ? animateTextIn(titleRef.current, 0.15) : null
    let revealCleanup = () => {}
    if (panelsRef.current) {
      const cards = panelsRef.current.querySelectorAll('.science-card')
      revealCleanup = scrollReveal(cards, { stagger: 0.12 })
    }
    return () => {
      titleTween?.kill()
      revealCleanup()
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
    <section ref={zoneRef} className="zone zone-surface editorial-section overflow-hidden" id="Zone3Science">
      <div className="section-shell relative z-10">
        <div className="w-full">
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <div className="mb-5 flex justify-center">
              <span className="zone-badge">Why the numbers miss the dust</span>
            </div>
            <h2 ref={titleRef} className="section-title">
              The Measurement Blindspot
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted md:text-base">
              Standard AQI is weighted toward PM2.5 and gases. In industrial corridors, coarse dust (PM10) is the hidden load that often stays out of frame.
            </p>
          </div>

          <div ref={panelsRef} className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="science-card zone-panel p-6 md:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="eyebrow">Standard AQI</div>
                  <div className="mt-2 text-lg font-semibold text-sand-light">The headline number</div>
                </div>
                <span className="zone-badge">Weighted down</span>
              </div>

              <div className="mt-7 flex flex-col items-center text-center">
                <div className="relative mb-6 h-44 w-44">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 176 176">
                    <circle
                      cx="88"
                      cy="88"
                      r={radius}
                      className="fill-none stroke-white/5"
                      strokeWidth="6"
                    />
                    <circle
                      cx="88"
                      cy="88"
                      r={radius}
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
                    <span className="mt-1 text-[10px] font-mono uppercase tracking-widest text-haze-grey">Index</span>
                  </div>
                </div>
                <div className="text-xl font-bold tracking-wide" style={{ color: aqiColor }}>
                  {aqiSeverity}
                </div>
                <p className="mt-4 max-w-sm text-xs leading-relaxed text-haze-grey">
                  AQI can still look manageable while coarse dust is already coating roads, stalls, and schoolyards.
                </p>
              </div>
            </div>

            <div className="science-card zone-panel relative overflow-hidden p-6 md:p-7">
              {currentPm10 > 250 && <div className="absolute inset-0 pointer-events-none bg-rust-red/5" />}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="eyebrow">True PM10</div>
                  <div className="mt-2 text-lg font-semibold text-sand-light">The buried signal</div>
                </div>
                <span className="zone-badge border-rust-red/25 text-rust-red/85">Corridor pressure</span>
              </div>

              <div className="mt-7 flex flex-col items-center text-center">
                <div className="relative mb-6 h-44 w-44">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 176 176">
                    <circle
                      cx="88"
                      cy="88"
                      r={radius}
                      className="fill-none stroke-white/5"
                      strokeWidth="6"
                    />
                    <circle
                      cx="88"
                      cy="88"
                      r={radius}
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
                    <span className="mt-1 text-[10px] font-mono uppercase tracking-widest text-haze-grey">µg/m³</span>
                  </div>
                </div>
                <div className="text-xl font-bold tracking-wide" style={{ color: pm10Color }}>
                  {pm10Severity}
                </div>
                <p className="mt-4 max-w-sm text-xs leading-relaxed text-haze-grey">
                  The corridor frequently doubles the standard safe limit of 100 µg/m³ in dry, high-traffic months.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-2xl zone-panel p-6">
            <label className="mb-4 block text-center font-mono text-xs uppercase tracking-[0.18em] text-sand-light">
              Seasonal simulation: {mults.label}
            </label>
            <input 
              type="range" 
              min="0" max="3" step="1" 
              value={seasonIdx}
              onChange={(e) => setSeasonIdx(parseInt(e.target.value))}
              className="h-1 w-full cursor-pointer rounded-lg bg-white/10 accent-dust-brown focus:outline-none"
              aria-label="Season slider"
            />
            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[10px] font-mono uppercase tracking-wider text-haze-grey">
              <span>Monsoon</span>
              <span>Post-monsoon</span>
              <span>Winter</span>
              <span>Summer</span>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/5 pt-4 text-[10px] font-mono">
              {loading ? (
                <span className="text-haze-grey/70 animate-pulse">Querying live sensor stations...</span>
              ) : error || data?.fallback ? (
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rust-red/60" />
                  <span className="text-haze-grey/80">Cached snapshot - Raipur center</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-hope opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-hope" />
                  </span>
                  <span className="text-green-hope">Live OpenAQ feed - Raipur (8673)</span>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 text-center text-[9px] font-mono text-rust-red/60">
                API connection offline, loaded static historical model.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
