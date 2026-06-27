import { useEffect, useRef, useState } from 'react'
import { useScrollZone } from '@hooks/useScrollZone'
import { HOTSPOTS, SEVERITY_COLORS } from '@data/hotspots'
import { scrollReveal } from '@utils/gsapHelpers'
import DataCard from '@components/ui/DataCard'

export default function Zone1Land({ onEnter }) {
  const zoneRef = useScrollZone(onEnter, 1)
  const mapContainerRef = useRef(null)
  const uiContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [activeHotspot, setActiveHotspot] = useState(null)

  const totalAffectedPop = HOTSPOTS.reduce((sum, spot) => sum + spot.affectedPop, 0)

  useEffect(() => {
    if (!mapContainerRef.current) return
    if (mapContainerRef.current._leaflet_id) return

    let mapInstance = null
    let cancelled = false

    import('@utils/mapHelpers').then(({ initializeMap, createMarkerElement, L }) => {
      if (cancelled || !mapContainerRef.current || mapContainerRef.current._leaflet_id) return

      mapInstance = initializeMap(mapContainerRef.current)
      mapRef.current = mapInstance

      HOTSPOTS.forEach((hotspot) => {
        const color = SEVERITY_COLORS[hotspot.severity]
        const el = createMarkerElement(color)

        el.addEventListener('mouseenter', () => setActiveHotspot(hotspot))
        el.addEventListener('mouseleave', () => setActiveHotspot(null))
        el.addEventListener('click', (e) => {
          e.stopPropagation()
          setActiveHotspot((prev) => (prev?.id === hotspot.id ? null : hotspot))
        })

        const customIcon = L.divIcon({
          html: el,
          className: 'leaflet-marker-custom',
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        })

        L.marker(hotspot.coords, { icon: customIcon }).addTo(mapInstance)
      })
    }).catch((err) => {
      console.warn('Leaflet dynamic import failed.', err)
    })

    let revealCleanup = () => {}
    if (uiContainerRef.current) {
      const children = uiContainerRef.current.querySelectorAll('.scroll-target')
      revealCleanup = scrollReveal(children, { stagger: 0.08 })
    }

    return () => {
      cancelled = true
      revealCleanup()
      if (mapInstance) mapInstance.remove()
    }
  }, [])

  return (
    <section ref={zoneRef} className="zone zone-surface relative min-h-[48rem] overflow-hidden md:min-h-[52rem]" id="Zone1Land">
      <div
        ref={mapContainerRef}
        className="absolute inset-0 z-0 h-full w-full opacity-50 mix-blend-luminosity sepia contrast-[1.05] saturate-[1.1]"
      />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(26,14,9,0.92)_0%,rgba(26,14,9,0.55)_42%,rgba(26,14,9,0.75)_100%)] pointer-events-none" />

      <div
        ref={uiContainerRef}
        className="relative z-20 flex min-h-[48rem] items-center justify-center p-6 md:min-h-[52rem] md:justify-end md:px-10 lg:pr-[6%]"
      >
        <div className="zone-panel w-full max-w-md p-7 md:max-w-lg md:p-8">
          <div className="scroll-target mb-7 flex flex-wrap items-start justify-between gap-4 border-b border-white/12 pb-6">
            <div>
              <div className="eyebrow">The landscape</div>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-sand-light md:text-3xl">
                A corridor shaped by dust
              </h2>
            </div>
            <span className="zone-badge">Live map</span>
          </div>

          <p className="scroll-target text-muted">
            The Raipur-Bhilai-Durg corridor is a dense industrial belt. The dominant threat is coarse particulate matter — driven by mining, manufacturing, unpaved roads, and construction logistics.
          </p>

          <div className="scroll-target mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/25 p-4">
              <div className="eyebrow">Hotspots</div>
              <div className="mt-2 text-2xl font-semibold tabular-nums text-sand-light">{HOTSPOTS.length}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/25 p-4">
              <div className="eyebrow">Exposure</div>
              <div className="mt-2 text-xl font-semibold tabular-nums leading-tight text-sand-light md:text-2xl">
                {totalAffectedPop.toLocaleString()}+
              </div>
            </div>
            <div className="rounded-lg border border-rust-red/25 bg-rust-red/10 p-4">
              <div className="eyebrow text-rust-red">Risk</div>
              <div className="mt-2 text-base font-semibold text-sand-light">Active warning</div>
            </div>
          </div>

          <div className="scroll-target mt-8 min-h-[10rem]">
            {activeHotspot ? (
              <DataCard
                title={activeHotspot.name}
                value={activeHotspot.pm10}
                unit="µg/m³ PM10"
                sub={activeHotspot.description}
                color={SEVERITY_COLORS[activeHotspot.severity]}
                animate
              />
            ) : (
              <div className="flex h-full min-h-[10rem] items-center justify-center rounded-lg border border-dashed border-white/12 bg-black/20 p-6 text-center text-sm text-muted">
                Hover a hotspot on the map to inspect local PM10 readings.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
