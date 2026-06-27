import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const ref = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ onComplete })
    tl.to(ref.current, { opacity: 0, duration: 0.8, delay: 2.2, ease: 'power2.in' })
  }, [onComplete])

  return (
    <div ref={ref} style={{
      position: 'fixed', inset: 0, background: 'var(--earth-dark)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9000, gap: '1.5rem',
    }}>
      <div style={{ fontSize: '3rem', letterSpacing: '0.2em', color: 'var(--dust-brown)', fontFamily: 'var(--font-display)' }}>
        धूल
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--haze-grey)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        Loading the air of Raipur–Bhilai–Durg
      </div>
      <div style={{ width: '200px', height: '2px', background: 'var(--earth-dark)', border: '1px solid var(--dust-brown)', borderRadius: '1px', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: 'var(--dust-brown)', animation: 'load 2s ease forwards' }} />
      </div>
      <style>{`@keyframes load { from { width: 0 } to { width: 100% } }`}</style>
    </div>
  )
}
