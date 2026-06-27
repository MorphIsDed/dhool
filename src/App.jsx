import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
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

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [activeZone, setActiveZone] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)

  useEffect(() => {
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
          </main>
        </>
      )}
    </ErrorBoundary>
  )
}
