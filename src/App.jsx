import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import Zone0Entry      from '@components/zones/Zone0Entry'
import Zone1Land       from '@components/zones/Zone1Land'
import Zone2People     from '@components/zones/Zone2People'
import Zone3Science    from '@components/zones/Zone3Science'
import Zone4Solutions  from '@components/zones/Zone4Solutions'
import Zone5Pledge     from '@components/zones/Zone5Pledge'
import Navbar          from '@components/ui/Navbar'
import LoadingScreen   from '@components/ui/LoadingScreen'
import ZoneIndicator   from '@components/ui/ZoneIndicator'
import ErrorBoundary   from '@components/ui/ErrorBoundary'

import WorldCamera     from '@components/three/WorldCamera'
import DustParticles   from '@components/three/DustParticles'
import TerrainMesh     from '@components/three/TerrainMesh'
import DustHaze        from '@components/three/DustHaze'

import Footer          from '@components/ui/Footer'
import { useAudio }    from '@hooks/useAudio'

const ZONE_IDS = ['Zone0Entry', 'Zone1Land', 'Zone2People', 'Zone3Science', 'Zone4Solutions', 'Zone5Pledge']

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [activeZone, setActiveZone] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isDebug, setIsDebug] = useState(false)
  
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)

  const { playWind, stopWind, playStorm, playClean, stopAll } = useAudio()

  useEffect(() => {
    // Check URL parameters for debug stats
    const params = new URLSearchParams(window.location.search)
    setIsDebug(params.has('debug'))

    // Check if device supports touch to disable custom cursor
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(touchCheck)

    if (touchCheck) return

    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${e.clientX - 18}px, ${e.clientY - 18}px, 0)`
      }
    }
    
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Audio trigger effect based on activeZone
  useEffect(() => {
    if (!loaded) return

    // Standard crossfade mappings
    if (activeZone === 0) {
      playWind()
    } else if (activeZone === 1) {
      playStorm(0.2)
    } else if (activeZone >= 2 && activeZone <= 3) {
      playWind()
    } else if (activeZone === 4) {
      stopWind()
    } else if (activeZone === 5) {
      playClean()
    }

    return () => stopAll()
  }, [activeZone, loaded, playWind, playStorm, stopWind, playClean, stopAll])

  // Update hash when active zone changes
  useEffect(() => {
    if (!loaded) return
    window.location.hash = ZONE_IDS[activeZone]
  }, [activeZone, loaded])

  // Scroll to hash on mount
  useEffect(() => {
    if (!loaded) return
    const hash = window.location.hash.replace('#', '')
    const targetIdx = ZONE_IDS.indexOf(hash)
    if (targetIdx !== -1) {
      setActiveZone(targetIdx)
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }, [loaded])

  // Keyboard navigation listener
  useEffect(() => {
    if (!loaded) return
    
    const handleKeyDown = (e) => {
      // 1-6 keys jump to zones
      if (e.key >= '1' && e.key <= '6') {
        const idx = parseInt(e.key) - 1
        const el = document.getElementById(ZONE_IDS[idx])
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIdx = Math.min(activeZone + 1, ZONE_IDS.length - 1)
        const el = document.getElementById(ZONE_IDS[nextIdx])
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIdx = Math.max(activeZone - 1, 0)
        const el = document.getElementById(ZONE_IDS[prevIdx])
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeZone, loaded])

  return (
    <ErrorBoundary>
      {/* Custom Cursor (Fine pointer only) */}
      {!isTouchDevice && (
        <>
          <div ref={cursorRef} className="cursor" />
          <div ref={cursorRingRef} className="cursor-ring" />
        </>
      )}

      {/* Loading Gate */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Persistent UI & World */}
      {loaded && (
        <>
          <Navbar activeZone={activeZone} />
          <ZoneIndicator activeZone={activeZone} />

          {/* Global 3D Scene */}
          <div className="fixed inset-0 z-0 bg-earth-dark pointer-events-none w-full h-full">
            <Suspense fallback={null}>
              <Canvas gl={{ antialias: true, powerPreference: "high-performance" }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 15, 5]} intensity={1.2} castShadow />
                <WorldCamera activeZone={activeZone} />
                <DustParticles activeZone={activeZone} />
                <TerrainMesh activeZone={activeZone} />
                <DustHaze activeZone={activeZone} />
                {isDebug && <Stats />}
              </Canvas>
            </Suspense>
          </div>

          {/* World Journey */}
          <main className="relative z-10 w-full">
            <Zone0Entry     onEnter={() => setActiveZone(0)} />
            <Zone1Land      onEnter={() => setActiveZone(1)} />
            <Zone2People    onEnter={() => setActiveZone(2)} />
            <Zone3Science   onEnter={() => setActiveZone(3)} />
            <Zone4Solutions onEnter={() => setActiveZone(4)} />
            <Zone5Pledge    onEnter={() => setActiveZone(5)} />
            <Footer />
          </main>
        </>
      )}
    </ErrorBoundary>
  )
}
