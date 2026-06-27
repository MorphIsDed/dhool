import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { displaceGeometry } from '@utils/threeHelpers'

const BROWN_COLOR = new THREE.Color('#382015')
const GREEN_COLOR = new THREE.Color('#20331E')

export default function TerrainMesh({ activeZone, lowPower = false }) {
  const meshRef1 = useRef()
  const matRef1 = useRef()
  const matRef2 = useRef()

  const segments = lowPower ? 48 : 64

  const geom1 = useMemo(() => {
    const geo = new THREE.PlaneGeometry(220, 220, segments, segments)
    geo.rotateX(-Math.PI / 2)
    return displaceGeometry(geo, 2.0, 3.2)
  }, [segments])

  const geom2 = useMemo(() => {
    const geo = new THREE.PlaneGeometry(220, 220, Math.floor(segments * 0.6), Math.floor(segments * 0.6))
    geo.rotateX(-Math.PI / 2)
    return displaceGeometry(geo, 1.5, 2.4)
  }, [segments])

  useFrame((state, delta) => {
    const targetColor = activeZone >= 4 ? GREEN_COLOR : BROWN_COLOR

    if (matRef1.current) matRef1.current.color.lerp(targetColor, delta * 1.6)
    if (matRef2.current) matRef2.current.color.lerp(targetColor, delta * 1.6)

    if (meshRef1.current && !lowPower) {
      meshRef1.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.018) * 0.035
    }
  })

  return (
    <group position={[0, -3, 0]}>
      <mesh ref={meshRef1} geometry={geom1}>
        <meshStandardMaterial
          ref={matRef1}
          color={BROWN_COLOR.clone()}
          roughness={0.96}
          metalness={0.03}
          flatShading
        />
      </mesh>

      <mesh geometry={geom2} position={[0, -1.5, -10]}>
        <meshStandardMaterial
          ref={matRef2}
          color={BROWN_COLOR.clone()}
          roughness={0.98}
          metalness={0.02}
          opacity={0.55}
          transparent
          flatShading
        />
      </mesh>
    </group>
  )
}
