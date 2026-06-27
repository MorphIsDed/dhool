import * as THREE from 'three'

/**
 * Create a dust particle geometry
 * Returns a BufferGeometry with randomised positions inside a box
 */
export function createDustGeometry(count = 5000, spread = [100, 30, 100]) {
  const geo = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const sizes     = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * spread[0]
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread[1]
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread[2]
    sizes[i] = Math.random() * 2 + 0.5
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))
  return geo
}

/**
 * Earthy dust colour palette as THREE.Color array
 */
export const DUST_COLORS = [
  new THREE.Color('#C4956A'),
  new THREE.Color('#B8A898'),
  new THREE.Color('#D4C4A8'),
  new THREE.Color('#A0522D'),
]

/**
 * Simple perlin-like displacement for terrain mesh
 */
export function displaceGeometry(geo, scale = 3, intensity = 2) {
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const z = pos.getZ(i)
    const y = Math.sin(x * scale * 0.1) * Math.cos(z * scale * 0.1) * intensity
    pos.setY(i, y)
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}
