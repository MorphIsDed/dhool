import { useEffect, useRef, useState } from 'react'
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

import WorldCamera     from '@components/three/WorldCamera'
import DustParticles   from '@components/three/DustParticles'
import TerrainMesh     from '@components/three/TerrainMesh'

export default function App() {
  const [loaded, setLoaded]       = useState(false)
  const [activeZone, setActiveZone] = useState(0)
  const cursorRef     = useRef(null)
  const cursorRingRef = useRef(null)

  // Custom cursor tracking
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 6 + 'px'
        cursorRef.current.style.top  = e.clientY - 6 + 'px'
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = e.clientX - 18 + 'px'
        cursorRingRef.current.style.top  = e.clientY - 18 + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorRef}     className="cursor" />
      <div ref={cursorRingRef} className="cursor-ring" />

      {/* Loading Gate */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Persistent UI & World */}
      {loaded && (
        <>
          <Navbar activeZone={activeZone} />
          <ZoneIndicator activeZone={activeZone} />

          {/* Global 3D Scene */}
          <div className="fixed inset-0 z-0 bg-earth-dark pointer-events-none">
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <WorldCamera />
              <DustParticles />
              <TerrainMesh />
            </Canvas>
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
    </>
  )
}
