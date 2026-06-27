import { useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createDustGeometry, DUST_COLORS } from '@utils/threeHelpers'

const vertexShader = `
  uniform float uTime;
  uniform float uSpeedMultiplier;
  attribute float aSpeed;
  attribute float aSize;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = color;
    vec3 pos = position;
    
    // Move particles along Z axis (towards camera)
    pos.z += uTime * aSpeed * uSpeedMultiplier;
    
    // Wrap around Z bounds [-75, 75]
    float zBound = 150.0;
    pos.z = mod(pos.z + zBound / 2.0, zBound) - zBound / 2.0;

    // Add subtle wave swaying on X and Y
    pos.x += sin(uTime * 0.1 + position.y) * 2.0;
    pos.y += cos(uTime * 0.08 + position.x) * 1.5;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation (gets larger as it approaches camera)
    gl_PointSize = aSize * (15.0 / -mvPosition.z);
    
    // Fade out particles that get too close to prevent popping
    vAlpha = smoothstep(-5.0, -15.0, mvPosition.z);
  }
`

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Round particles instead of default square points
    vec2 coord = gl_PointCoord - vec2(0.5);
    if (length(coord) > 0.5) discard;
    
    // Soft circle boundary
    float mask = 1.0 - smoothstep(0.2, 0.5, length(coord));
    gl_FragColor = vec4(vColor, mask * vAlpha * 0.7);
  }
`

const ZONE_SPEEDS = [2.2, 1.0, 1.6, 1.2, 0.6, 0.15]

export default function DustParticles({ activeZone }) {
  const pointsRef = useRef()
  const materialRef = useRef()
  
  // Keep track of lerped speed
  const speedRef = useRef(ZONE_SPEEDS[0])

  // Custom attributes geometry
  const geometry = useMemo(() => {
    const geo = createDustGeometry(8000, [150, 50, 150])
    const count = geo.attributes.position.count
    
    const colors = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Color
      const color = DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
      
      // Variable speed per particle
      speeds[i] = Math.random() * 2.0 + 1.0

      // Custom base size
      sizes[i] = Math.random() * 1.8 + 0.6
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeedMultiplier: { value: ZONE_SPEEDS[0] }
  }), [])

  // Smoothly lerp speed target based on activeZone
  useFrame((state, delta) => {
    const targetSpeed = ZONE_SPEEDS[activeZone] ?? ZONE_SPEEDS[0]
    // Smooth lerping
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, delta * 2.0)

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
      materialRef.current.uniforms.uSpeedMultiplier.value = speedRef.current
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexColors
      />
    </points>
  )
}
