import { useState } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { useAQIData } from '@hooks/useAQIData'

// Simulated seasonal multipliers for divergence
const SEASON_MULTIPLIERS = {
  0: { label: 'Monsoon (Aug)', pm10Mult: 0.4, aqiMult: 0.6 },
  1: { label: 'Post-Monsoon (Oct)', pm10Mult: 1.0, aqiMult: 0.9 },
  2: { label: 'Winter (Jan)', pm10Mult: 1.5, aqiMult: 1.4 },
  3: { label: 'Summer (May)', pm10Mult: 2.2, aqiMult: 1.1 }, // Massive PM10 divergence due to dry dust
}

export default function Zone3Science({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 3)
  const { data, loading, error } = useAQIData()
  const [seasonIdx, setSeasonIdx] = useState(1)

  const mults = SEASON_MULTIPLIERS[seasonIdx]
  
  // Base values from API or fallback
  const basePm10 = data ? data.pm10 : 100
  const baseAqi  = data ? data.aqi : 100
  
  const currentPm10 = Math.round(basePm10 * mults.pm10Mult)
  const currentAqi  = Math.round(baseAqi * mults.aqiMult)

  const pm10Severity = currentPm10 > 250 ? 'Critical' : currentPm10 > 150 ? 'Dangerous' : currentPm10 > 100 ? 'High' : 'Moderate'
  const pm10Color = currentPm10 > 250 ? '#FF3B3B' : currentPm10 > 150 ? '#FF8C00' : currentPm10 > 100 ? '#FFD700' : '#5A7A52'

  const aqiSeverity = currentAqi > 200 ? 'Poor' : currentAqi > 100 ? 'Moderate' : 'Good'
  const aqiColor = currentAqi > 200 ? '#FF8C00' : currentAqi > 100 ? '#FFD700' : '#5A7A52'

  return (
    <section ref={zoneRef} className="zone flex flex-col items-center justify-center min-h-screen py-24 bg-black/40 backdrop-blur-sm" id="Zone3Science">
      <div className="max-w-6xl w-full px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-sand-light mb-6">The Measurement Blindspot</h2>
          <p className="text-xl text-haze-grey max-w-3xl mx-auto">
            Standard AQI is heavily weighted towards fine particles (PM2.5) and gases. In industrial zones, coarse dust (PM10) is the hidden killer that standard meters often downplay.
          </p>
        </div>

        {/* Gauge Split Screen */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Left: Standard AQI */}
          <div className="flex-1 bg-earth-dark/90 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
            <h3 className="text-xl font-mono text-haze-grey mb-2">Standard AQI</h3>
            <div className="w-48 h-48 rounded-full border-8 flex flex-col items-center justify-center mb-6 transition-colors duration-500" style={{ borderColor: aqiColor }}>
              <span className="text-5xl font-mono font-bold" style={{ color: aqiColor }}>
                {loading ? '...' : currentAqi}
              </span>
              <span className="text-sm font-mono uppercase tracking-widest mt-2 text-haze-grey">Index</span>
            </div>
            <div className="text-2xl font-bold tracking-wide" style={{ color: aqiColor }}>{aqiSeverity}</div>
            <p className="text-sm text-haze-grey mt-4">Often looks "Moderate" even when dust is choking the streets.</p>
          </div>

          {/* Right: True PM10 */}
          <div className="flex-1 bg-earth-dark/90 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden">
            {/* Warning overlay for high PM10 */}
            {currentPm10 > 250 && <div className="absolute inset-0 bg-rust-red/10 animate-pulse pointer-events-none" />}
            
            <h3 className="text-xl font-mono text-haze-grey mb-2">True PM10</h3>
            <div className="w-48 h-48 rounded-full border-8 flex flex-col items-center justify-center mb-6 transition-colors duration-500" style={{ borderColor: pm10Color }}>
              <span className="text-5xl font-mono font-bold" style={{ color: pm10Color }}>
                {loading ? '...' : currentPm10}
              </span>
              <span className="text-sm font-mono uppercase mt-2 text-haze-grey">µg/m³</span>
            </div>
            <div className="text-2xl font-bold tracking-wide" style={{ color: pm10Color }}>{pm10Severity}</div>
            <p className="text-sm text-haze-grey mt-4">Standard safe limit is 100 µg/m³. The corridor frequently doubles this.</p>
          </div>
        </div>

        {/* Season Slider */}
        <div className="max-w-2xl mx-auto bg-earth-dark/80 p-6 rounded-xl border border-dust-brown/30">
          <label className="block text-center text-sand-light font-mono text-sm mb-6 uppercase tracking-widest">
            Simulate Seasonal Impact: {mults.label}
          </label>
          <input 
            type="range" 
            min="0" max="3" step="1" 
            value={seasonIdx}
            onChange={(e) => setSeasonIdx(parseInt(e.target.value))}
            className="w-full accent-dust-brown h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs font-mono text-haze-grey mt-4 px-1">
            <span>Monsoon</span>
            <span>Post-Monsoon</span>
            <span>Winter</span>
            <span>Summer</span>
          </div>
        </div>

        {error && <div className="text-center text-xs text-rust-red mt-4 opacity-50">API fetch failed, using fallback static data.</div>}
      </div>
    </section>
  )
}
