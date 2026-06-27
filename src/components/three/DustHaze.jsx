import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const HAZE_CONFIGS = [
  { color: '#402a1e', density: 0.038 },
  { color: '#4a3224', density: 0.03 },
  { color: '#402a1e', density: 0.034 },
  { color: '#33231a', density: 0.022 },
  { color: '#1f2e22', density: 0.011 },
  { color: '#162419', density: 0.007 },
]

const TARGET_COLORS = HAZE_CONFIGS.map((c) => new THREE.Color(c.color))

export default function DustHaze({ activeZone }) {
  const fogRef = useRef()
  const colorRef = useRef(TARGET_COLORS[0].clone())
  const densityRef = useRef(HAZE_CONFIGS[0].density)

  useFrame((_, delta) => {
    const idx = activeZone ?? 0
    const targetColor = TARGET_COLORS[idx] ?? TARGET_COLORS[0]
    const targetDensity = HAZE_CONFIGS[idx]?.density ?? HAZE_CONFIGS[0].density

    densityRef.current = THREE.MathUtils.lerp(densityRef.current, targetDensity, delta * 1.6)
    colorRef.current.lerp(targetColor, delta * 1.6)

    if (fogRef.current) {
      fogRef.current.density = densityRef.current
      fogRef.current.color.copy(colorRef.current)
    }
  })

  const initial = HAZE_CONFIGS[0]

  return <fogExp2 ref={fogRef} attach="fog" color={initial.color} density={initial.density} />
}
