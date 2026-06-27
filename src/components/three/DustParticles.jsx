import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createDustGeometry, DUST_COLORS } from '@utils/threeHelpers'

const vertexShader = `
  uniform float uTime;
  uniform float uSpeedMultiplier;
  attribute float aSpeed;
  attribute float aSize;
  attribute float aPhase;
  attribute float aAmplitude;
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

    // Independent drift per particle on X and Y using phase & amplitude
    pos.x += sin(uTime * 0.15 + aPhase) * aAmplitude * 3.0;
    pos.y += cos(uTime * 0.12 + aPhase * 1.7) * aAmplitude * 2.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation & subtle size pulsing per particle
    float sizePulse = 0.85 + 0.15 * sin(uTime * 0.5 + aPhase);
    gl_PointSize = aSize * sizePulse * (15.0 / -mvPosition.z);
    
    // Fade out particles that get too close to prevent popping
    vAlpha = smoothstep(-5.0, -15.0, mvPosition.z);
  }
`

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uOpacityMultiplier;

  void main() {
    // Round particles instead of default square points
    vec2 coord = gl_PointCoord - vec2(0.5);
    if (length(coord) > 0.5) discard;
    
    // Soft circle boundary
    float mask = 1.0 - smoothstep(0.2, 0.5, length(coord));
    gl_FragColor = vec4(vColor, mask * vAlpha * uOpacityMultiplier * 0.7);
  }
`

const ZONE_SPEEDS = [2.2, 1.0, 1.6, 1.2, 0.6, 0.15]
const ZONE_OPACITIES = [1.0, 0.65, 0.85, 0.55, 0.35, 0.12]

export default function DustParticles({ activeZone }) {
  const pointsRef = useRef()
  const materialRef = useRef()
  
  // Track lerping speed and opacity multiplier
  const speedRef = useRef(ZONE_SPEEDS[0])
  const opacityRef = useRef(ZONE_OPACITIES[0])

  // Custom attributes geometry
  const geometry = useMemo(() => {
    const geo = createDustGeometry(8000, [150, 50, 150])
    const count = geo.attributes.position.count
    
    const colors = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    const amplitudes = new Float32Array(count)

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

      // Per-particle phase and amplitude for wave dynamics
      phases[i] = Math.random() * Math.PI * 2
      amplitudes[i] = Math.random() * 1.2 + 0.3
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    geo.setAttribute('aAmplitude', new THREE.BufferAttribute(amplitudes, 1))
    return geo
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeedMultiplier: { value: ZONE_SPEEDS[0] },
    uOpacityMultiplier: { value: ZONE_OPACITIES[0] }
  }), [])

  // Smoothly lerp speed and opacity based on activeZone
  useFrame((state, delta) => {
    const targetSpeed = ZONE_SPEEDS[activeZone] ?? ZONE_SPEEDS[0]
    const targetOpacity = ZONE_OPACITIES[activeZone] ?? ZONE_OPACITIES[0]

    // Smooth lerps
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, delta * 2.0)
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity, delta * 2.0)

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
      materialRef.current.uniforms.uSpeedMultiplier.value = speedRef.current
      materialRef.current.uniforms.uOpacityMultiplier.value = opacityRef.current
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
