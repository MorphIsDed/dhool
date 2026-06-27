import { useMemo } from 'react'
import * as THREE from 'three'
import { displaceGeometry } from '@utils/threeHelpers'

export default function TerrainMesh() {
  const geometry = useMemo(() => {
    // Create a large plane with many segments for displacement
    const geo = new THREE.PlaneGeometry(200, 200, 150, 150)
    // Rotate so it lies flat on the XZ plane
    geo.rotateX(-Math.PI / 2)
    // Apply procedural displacement
    return displaceGeometry(geo, 2.5, 3.5)
  }, [])

  return (
    <mesh geometry={geometry} position={[0, -2, 0]}>
      <meshStandardMaterial
        color="#2C1810" // var(--earth-dark) equivalent
        roughness={0.9}
        metalness={0.1}
        flatShading
      />
    </mesh>
  )
}
