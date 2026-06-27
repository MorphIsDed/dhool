import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { displaceGeometry } from '@utils/threeHelpers'

const BROWN_COLOR = new THREE.Color('#382015') // Earthy brown
const GREEN_COLOR = new THREE.Color('#20331E') // Green hope tint

export default function TerrainMesh({ activeZone }) {
  const meshRef1 = useRef()
  const meshRef2 = useRef()
  const matRef1 = useRef()
  const matRef2 = useRef()

  // Generate displaced geometries once
  const geom1 = useMemo(() => {
    const geo = new THREE.PlaneGeometry(240, 240, 100, 100)
    geo.rotateX(-Math.PI / 2)
    return displaceGeometry(geo, 2.0, 4.0)
  }, [])

  const geom2 = useMemo(() => {
    // Secondary visual depth layer (shifted slightly lower and offset)
    const geo = new THREE.PlaneGeometry(240, 240, 60, 60)
    geo.rotateX(-Math.PI / 2)
    return displaceGeometry(geo, 1.5, 3.0)
  }, [])

  useFrame((state, delta) => {
    // Select color target based on zone progress
    // Zones 0-3 are brown (dusty), Zones 4-5 transition to green (hope/solutions)
    const targetColor = activeZone >= 4 ? GREEN_COLOR : BROWN_COLOR

    // Lerp colors smoothly
    if (matRef1.current) {
      matRef1.current.color.lerp(targetColor, delta * 2.0)
    }
    if (matRef2.current) {
      matRef2.current.color.lerp(targetColor, delta * 2.0)
    }

    // Very gentle rotation/drift to make the ground feel "alive"
    if (meshRef1.current) {
      meshRef1.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.y = -Math.sin(state.clock.getElapsedTime() * 0.03) * 0.04
    }
  })

  return (
    <group position={[0, -3, 0]}>
      {/* Primary Terrain */}
      <mesh ref={meshRef1} geometry={geom1} castShadow receiveShadow>
        <meshStandardMaterial
          ref={matRef1}
          color={BROWN_COLOR.clone()}
          roughness={0.95}
          metalness={0.05}
          flatShading
        />
      </mesh>

      {/* Secondary Depth Layer */}
      <mesh 
        ref={meshRef2} 
        geometry={geom2} 
        position={[0, -1.5, -10]}
      >
        <meshStandardMaterial
          ref={matRef2}
          color={BROWN_COLOR.clone()}
          roughness={0.98}
          metalness={0.02}
          opacity={0.7}
          transparent
          flatShading
        />
      </mesh>
    </group>
  )
}
