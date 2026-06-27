import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createDustGeometry, DUST_COLORS } from '@utils/threeHelpers'

export default function DustParticles() {
  const pointsRef = useRef()

  // Generate geometry and add random vertex colors from the palette
  const geometry = useMemo(() => {
    const geo = createDustGeometry(8000, [150, 50, 150])
    const count = geo.attributes.position.count
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const color = DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [])

  // Animate particles drifting towards camera and swaying
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.position.z += delta * 2.0 // drift towards camera
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      
      // Loop particles if they pass the camera
      if (pointsRef.current.position.z > 50) {
        pointsRef.current.position.z = -50
      }
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}
