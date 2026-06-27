import { useEffect, useRef, useState, useCallback, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import Zone0Entry from '@components/zones/Zone0Entry'
import Zone1Land from '@components/zones/Zone1Land'
import Zone2People from '@components/zones/Zone2People'
import Zone3Science from '@components/zones/Zone3Science'
import Zone4Solutions from '@components/zones/Zone4Solutions'
import Zone5Pledge from '@components/zones/Zone5Pledge'
import Navbar from '@components/ui/Navbar'
import LoadingScreen from '@components/ui/LoadingScreen'
import ZoneIndicator from '@components/ui/ZoneIndicator'
import ErrorBoundary from '@components/ui/ErrorBoundary'
import Footer from '@components/ui/Footer'

import WorldCamera from '@components/three/WorldCamera'
import DustParticles from '@components/three/DustParticles'
import TerrainMesh from '@components/three/TerrainMesh'
import DustHaze from '@components/three/DustHaze'

import { useAudio } from '@hooks/useAudio'

const ZONE_IDS = [
  'Zone0Entry',
  'Zone1Land',
  'Zone2People',
  'Zone3Science',
  'Zone4Solutions',
  'Zone5Pledge',
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (pointer: coarse)')
    setMobile(mq.matches)
    const handler = (e) => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return mobile
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [activeZone, setActiveZone] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)
  const rafRef = useRef(0)

  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  const { playWind, stopWind, playStorm, playClean } = useAudio()

  const setZone = useCallback((index) => {
    setActiveZone(index)
  }, [])

  const zoneHandlers = useRef({
    0: () => setZone(0),
    1: () => setZone(1),
    2: () => setZone(2),
    3: () => setZone(3),
    4: () => setZone(4),
    5: () => setZone(5),
  })

  useEffect(() => {
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(touchCheck)
    if (touchCheck) return

    let hasMoved = false

    const move = (e) => {
      if (!hasMoved) {
        hasMoved = true
        if (cursorRef.current) cursorRef.current.style.opacity = '1'
        if (cursorRingRef.current) cursorRingRef.current.style.opacity = '1'
      }

      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`
        }
        if (cursorRingRef.current) {
          cursorRingRef.current.style.transform = `translate3d(${e.clientX - 18}px, ${e.clientY - 18}px, 0)`
        }
      })
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        'a, button, input, select, textarea, [role="button"], .cursor-pointer, .solution-card-wrapper',
      )
      if (target) {
        cursorRef.current?.classList.add('cursor-hover')
        cursorRingRef.current?.classList.add('cursor-ring-hover')
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target.closest(
        'a, button, input, select, textarea, [role="button"], .cursor-pointer, .solution-card-wrapper',
      )
      if (target) {
        cursorRef.current?.classList.remove('cursor-hover')
        cursorRingRef.current?.classList.remove('cursor-ring-hover')
      }
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  useEffect(() => {
    if (!loaded) return

    const refresh = () => ScrollTrigger.refresh()
    const t1 = setTimeout(refresh, 150)
    const t2 = setTimeout(refresh, 800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [loaded])

  useEffect(() => {
    if (!loaded) return

    if (activeZone === 0) playWind()
    else if (activeZone === 1) playStorm(0.2)
    else if (activeZone >= 2 && activeZone <= 3) playWind()
    else if (activeZone === 4) stopWind()
    else if (activeZone === 5) playClean()
  }, [activeZone, loaded, playWind, playStorm, stopWind, playClean])

  useEffect(() => {
    if (!loaded) return
    const nextHash = ZONE_IDS[activeZone]
    if (window.location.hash.replace('#', '') !== nextHash) {
      window.history.replaceState(null, '', `#${nextHash}`)
    }
  }, [activeZone, loaded])

  useEffect(() => {
    if (!loaded) return
    const hash = window.location.hash.replace('#', '')
    const targetIdx = ZONE_IDS.indexOf(hash)
    if (targetIdx !== -1) {
      setActiveZone(targetIdx)
      requestAnimationFrame(() => {
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [loaded])

  useEffect(() => {
    if (!loaded) return

    const handleKeyDown = (e) => {
      if (e.key >= '1' && e.key <= '6') {
        const idx = parseInt(e.key, 10) - 1
        document.getElementById(ZONE_IDS[idx])?.scrollIntoView({ behavior: 'smooth' })
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIdx = Math.min(activeZone + 1, ZONE_IDS.length - 1)
        document.getElementById(ZONE_IDS[nextIdx])?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIdx = Math.max(activeZone - 1, 0)
        document.getElementById(ZONE_IDS[prevIdx])?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeZone, loaded])

  const show3D = !prefersReducedMotion

  return (
    <ErrorBoundary>
      {!isTouchDevice && (
        <>
          <div ref={cursorRef} className="cursor">
            <div className="cursor-dot" />
          </div>
          <div ref={cursorRingRef} className="cursor-ring">
            <div className="cursor-circle" />
          </div>
        </>
      )}

      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          <Navbar activeZone={activeZone} />
          <ZoneIndicator activeZone={activeZone} />

          {show3D && (
            <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-earth-dark opacity-40">
              <Suspense fallback={null}>
                <Canvas
                  dpr={isMobile ? [1, 1.25] : [1, 1.5]}
                  gl={{
                    antialias: !isMobile,
                    powerPreference: 'high-performance',
                    alpha: false,
                  }}
                  camera={{ position: [0, 2, 15], fov: 45, near: 0.1, far: 200 }}
                >
                  <ambientLight intensity={0.55} />
                  <directionalLight position={[10, 15, 5]} intensity={1} />
                  <WorldCamera activeZone={activeZone} />
                  <DustParticles activeZone={activeZone} lowPower={isMobile} />
                  <TerrainMesh activeZone={activeZone} lowPower={isMobile} />
                  <DustHaze activeZone={activeZone} />
                </Canvas>
              </Suspense>
            </div>
          )}

          <main className="relative z-10 w-full">
            <Zone0Entry onEnter={zoneHandlers.current[0]} />
            <Zone1Land onEnter={zoneHandlers.current[1]} />
            <Zone2People onEnter={zoneHandlers.current[2]} />
            <Zone3Science onEnter={zoneHandlers.current[3]} />
            <Zone4Solutions onEnter={zoneHandlers.current[4]} />
            <Zone5Pledge onEnter={zoneHandlers.current[5]} />
            <Footer />
          </main>
        </>
      )}
    </ErrorBoundary>
  )
}
