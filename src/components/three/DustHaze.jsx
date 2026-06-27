import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const HAZE_CONFIGS = [
  { color: '#402a1e', density: 0.045 }, // Zone 0: Entry (dense dust storm)
  { color: '#4a3224', density: 0.035 }, // Zone 1: The Land (hazy map view)
  { color: '#402a1e', density: 0.040 }, // Zone 2: The People (street pollution)
  { color: '#33231a', density: 0.025 }, // Zone 3: Science (instrument panel)
  { color: '#1f2e22', density: 0.012 }, // Zone 4: Solutions (clearing air)
  { color: '#162419', density: 0.008 }  // Zone 5: Pledge (clean green future)
]

export default function DustHaze({ activeZone }) {
  const fogRef = useRef()

  // Track values in refs to lerp smoothly
  const colorRef = useRef(new THREE.Color(HAZE_CONFIGS[0].color))
  const densityRef = useRef(HAZE_CONFIGS[0].density)

  useFrame((state, delta) => {
    const config = HAZE_CONFIGS[activeZone] || HAZE_CONFIGS[0]
    const targetColor = new THREE.Color(config.color)
    const targetDensity = config.density

    // Lerp density and color values
    densityRef.current = THREE.MathUtils.lerp(densityRef.current, targetDensity, delta * 2.0)
    colorRef.current.lerp(targetColor, delta * 2.0)

    if (fogRef.current) {
      fogRef.current.density = densityRef.current
      fogRef.current.color.copy(colorRef.current)
    }
  })

  const initial = HAZE_CONFIGS[0]

  return (
    <fogExp2 
      ref={fogRef}
      attach="fog" 
      color={initial.color} 
      density={initial.density} 
    />
  )
}
