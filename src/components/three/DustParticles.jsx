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
    pos.z += uTime * aSpeed * uSpeedMultiplier;
    float zBound = 150.0;
    pos.z = mod(pos.z + zBound / 2.0, zBound) - zBound / 2.0;
    pos.x += sin(uTime * 0.15 + aPhase) * aAmplitude * 2.5;
    pos.y += cos(uTime * 0.12 + aPhase * 1.7) * aAmplitude * 1.6;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float sizePulse = 0.88 + 0.12 * sin(uTime * 0.5 + aPhase);
    gl_PointSize = aSize * sizePulse * (14.0 / -mvPosition.z);
    vAlpha = smoothstep(-5.0, -15.0, mvPosition.z);
  }
`

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uOpacityMultiplier;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    if (length(coord) > 0.5) discard;
    float mask = 1.0 - smoothstep(0.25, 0.5, length(coord));
    gl_FragColor = vec4(vColor, mask * vAlpha * uOpacityMultiplier * 0.65);
  }
`

const ZONE_SPEEDS = [2.0, 0.9, 1.4, 1.0, 0.5, 0.12]
const ZONE_OPACITIES = [0.9, 0.55, 0.75, 0.48, 0.3, 0.1]

export default function DustParticles({ activeZone, lowPower = false }) {
  const materialRef = useRef()
  const speedRef = useRef(ZONE_SPEEDS[0])
  const opacityRef = useRef(ZONE_OPACITIES[0])
  const count = lowPower ? 2200 : 4200

  const geometry = useMemo(() => {
    const geo = createDustGeometry(count, [150, 50, 150])
    const vertexCount = geo.attributes.position.count

    const colors = new Float32Array(vertexCount * 3)
    const speeds = new Float32Array(vertexCount)
    const sizes = new Float32Array(vertexCount)
    const phases = new Float32Array(vertexCount)
    const amplitudes = new Float32Array(vertexCount)

    for (let i = 0; i < vertexCount; i++) {
      const color = DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
      speeds[i] = Math.random() * 1.6 + 0.8
      sizes[i] = Math.random() * 1.6 + 0.5
      phases[i] = Math.random() * Math.PI * 2
      amplitudes[i] = Math.random() * 1.0 + 0.25
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    geo.setAttribute('aAmplitude', new THREE.BufferAttribute(amplitudes, 1))
    return geo
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeedMultiplier: { value: ZONE_SPEEDS[0] },
      uOpacityMultiplier: { value: ZONE_OPACITIES[0] },
    }),
    [],
  )

  useFrame((state, delta) => {
    const targetSpeed = ZONE_SPEEDS[activeZone] ?? ZONE_SPEEDS[0]
    const targetOpacity = ZONE_OPACITIES[activeZone] ?? ZONE_OPACITIES[0]

    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, delta * 1.8)
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity, delta * 1.8)

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uSpeedMultiplier.value = speedRef.current
      materialRef.current.uniforms.uOpacityMultiplier.value = opacityRef.current
    }
  })

  return (
    <points geometry={geometry}>
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
