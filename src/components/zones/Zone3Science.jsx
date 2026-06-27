import { useState, useEffect, useRef } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { useScrollReveal } from '@hooks/useScrollReveal'
import { useAQIData } from '@hooks/useAQIData'
import { animateTextIn } from '@utils/gsapHelpers'
import { gsap } from 'gsap'

const SEASON_MULTIPLIERS = {
  0: { label: 'Monsoon (Aug)', pm10Mult: 0.4, aqiMult: 0.6 },
  1: { label: 'Post-Monsoon (Oct)', pm10Mult: 1.0, aqiMult: 0.9 },
  2: { label: 'Winter (Jan)', pm10Mult: 1.5, aqiMult: 1.4 },
  3: { label: 'Summer (May)', pm10Mult: 2.2, aqiMult: 1.1 },
}

export default function Zone3Science({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 3)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  const { data, loading, error } = useAQIData()
  const [seasonIdx, setSeasonIdx] = useState(1)

  useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.12 })

  const mults = SEASON_MULTIPLIERS[seasonIdx]
  const basePm10 = data ? data.pm10 : 100
  const baseAqi = data ? data.aqi : 100
  const currentPm10 = Math.round(basePm10 * mults.pm10Mult)
  const currentAqi = Math.round(baseAqi * mults.aqiMult)

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
      onUpdate: () => setAnimatedPm10(Math.round(pmObj.val)),
    })

    const aqiTween = gsap.to(aqiObj, {
      val: currentAqi,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => setAnimatedAqi(Math.round(aqiObj.val)),
    })

    return () => {
      pmTween.kill()
      aqiTween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPm10, currentAqi, loading])

  useEffect(() => {
    const titleTween = titleRef.current ? animateTextIn(titleRef.current, 0.15) : null
    return () => titleTween?.kill()
  }, [])

  const pm10Severity = currentPm10 > 250 ? 'Critical' : currentPm10 > 150 ? 'Dangerous' : currentPm10 > 100 ? 'High' : 'Moderate'
  const pm10Color = currentPm10 > 250 ? 'var(--rust-red)' : currentPm10 > 150 ? 'var(--particle-glow)' : currentPm10 > 100 ? 'var(--dust-brown)' : 'var(--green-hope)'
  const aqiSeverity = currentAqi > 200 ? 'Poor' : currentAqi > 100 ? 'Moderate' : 'Good'
  const aqiColor = currentAqi > 200 ? 'var(--particle-glow)' : currentAqi > 100 ? 'var(--dust-brown)' : 'var(--green-hope)'

  const radius = 70
  const circ = 2 * Math.PI * radius
  const aqiOffset = circ - Math.min(animatedAqi / 300, 1) * circ
  const pmOffset = circ - Math.min(animatedPm10 / 400, 1) * circ

  return (
    <section ref={zoneRef} className="zone zone-surface editorial-section overflow-hidden" id="Zone3Science">
      <div ref={sectionRef} className="section-shell relative z-10 content-stack-lg">
        <header className="reveal-item mx-auto max-w-xl text-center">
          <span className="zone-badge">Why the numbers miss the dust</span>
          <h2 ref={titleRef} className="section-title mt-5">
            The Measurement Blindspot
          </h2>
          <p className="mt-5 text-muted">
            Standard AQI weights PM2.5 and gases. In industrial corridors, coarse dust (PM10) is the hidden load.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="reveal-item zone-panel p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="eyebrow">Standard AQI</div>
                <div className="mt-2 font-semibold text-sand-light">The headline number</div>
              </div>
              <span className="zone-badge">Weighted down</span>
            </div>

            <div className="mt-8 flex flex-col items-center text-center">
              <div className="relative mb-5 h-40 w-40">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 176 176">
                  <circle cx="88" cy="88" r={radius} className="fill-none stroke-white/8" strokeWidth="6" />
                  <circle
                    cx="88" cy="88" r={radius}
                    className="fill-none transition-[stroke-dashoffset] duration-300"
                    strokeWidth="6"
                    strokeDasharray={circ}
                    strokeDashoffset={aqiOffset}
                    strokeLinecap="round"
                    style={{ stroke: aqiColor }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-mono font-bold" style={{ color: aqiColor }}>
                    {loading ? '…' : animatedAqi}
                  </span>
                  <span className="mt-1 text-[10px] font-mono uppercase tracking-widest text-muted">Index</span>
                </div>
              </div>
              <div className="text-lg font-semibold" style={{ color: aqiColor }}>{aqiSeverity}</div>
              <p className="mt-4 max-w-xs text-sm text-muted">
                AQI can look manageable while coarse dust coats roads and schoolyards.
              </p>
            </div>
          </div>

          <div className="reveal-item zone-panel p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="eyebrow">True PM10</div>
                <div className="mt-2 font-semibold text-sand-light">The buried signal</div>
              </div>
              <span className="zone-badge border-rust-red/25 text-rust-red">Corridor pressure</span>
            </div>

            <div className="mt-8 flex flex-col items-center text-center">
              <div className="relative mb-5 h-40 w-40">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 176 176">
                  <circle cx="88" cy="88" r={radius} className="fill-none stroke-white/8" strokeWidth="6" />
                  <circle
                    cx="88" cy="88" r={radius}
                    className="fill-none transition-[stroke-dashoffset] duration-300"
                    strokeWidth="6"
                    strokeDasharray={circ}
                    strokeDashoffset={pmOffset}
                    strokeLinecap="round"
                    style={{ stroke: pm10Color }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-mono font-bold" style={{ color: pm10Color }}>
                    {loading ? '…' : animatedPm10}
                  </span>
                  <span className="mt-1 text-[10px] font-mono uppercase tracking-widest text-muted">µg/m³</span>
                </div>
              </div>
              <div className="text-lg font-semibold" style={{ color: pm10Color }}>{pm10Severity}</div>
              <p className="mt-4 max-w-xs text-sm text-muted">
                The corridor often doubles the 100 µg/m³ safe limit in dry months.
              </p>
            </div>
          </div>
        </div>

        <div className="reveal-item zone-panel mx-auto w-full max-w-xl p-7">
          <label className="mb-5 block text-center font-mono text-xs uppercase tracking-wider text-sand-light">
            Seasonal simulation: {mults.label}
          </label>
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={seasonIdx}
            onChange={(e) => setSeasonIdx(parseInt(e.target.value, 10))}
            className="h-1 w-full cursor-pointer rounded-lg bg-white/10 accent-dust-brown focus:outline-none"
            aria-label="Season slider"
          />
          <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[10px] font-mono uppercase text-muted">
            <span>Monsoon</span>
            <span>Post-monsoon</span>
            <span>Winter</span>
            <span>Summer</span>
          </div>
          <div className="mt-5 border-t border-white/8 pt-4 text-center text-xs font-mono text-muted">
            {loading ? 'Loading sensor data…' : error || data?.fallback ? 'Cached snapshot — Raipur center' : 'Live OpenAQ feed — Raipur (8673)'}
          </div>
        </div>
      </div>
    </section>
  )
}
