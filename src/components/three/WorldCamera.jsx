import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Camera configuration per zone: pos (position), look (lookAt target), fov
const CAMERA_CONFIGS = [
  // Zone 0: Entry - looking forward into the storm
  {
    pos: new THREE.Vector3(0, 2, 15),
    look: new THREE.Vector3(0, 0, 0),
    fov: 45
  },
  // Zone 1: The Land - elevated aerial view
  {
    pos: new THREE.Vector3(0, 22, 28),
    look: new THREE.Vector3(0, -3, 0),
    fov: 50
  },
  // Zone 2: The People - low angle street perspective
  {
    pos: new THREE.Vector3(-6, 1.2, 10),
    look: new THREE.Vector3(0, 0.5, 0),
    fov: 40
  },
  // Zone 3: The Science - instrumentation overview
  {
    pos: new THREE.Vector3(6, 3, 12),
    look: new THREE.Vector3(0, 1.0, 0),
    fov: 45
  },
  // Zone 4: Solutions - floating over a flattening horizon
  {
    pos: new THREE.Vector3(0, 5, 18),
    look: new THREE.Vector3(0, -2, -5),
    fov: 42
  },
  // Zone 5: Pledge - ground level clean serenity
  {
    pos: new THREE.Vector3(0, 1.2, 7),
    look: new THREE.Vector3(0, 0, -2),
    fov: 35
  }
]

export default function WorldCamera({ activeZone }) {
  const { camera } = useThree()
  
  // Track current target we are looking at
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    // Initialise camera position to Zone 0 configuration immediately
    const initial = CAMERA_CONFIGS[0]
    camera.position.copy(initial.pos)
    currentLookAt.current.copy(initial.look)
    camera.lookAt(currentLookAt.current)
    camera.fov = initial.fov
    camera.updateProjectionMatrix()
  }, [camera])

  useFrame((state, delta) => {
    const target = CAMERA_CONFIGS[activeZone] || CAMERA_CONFIGS[0]
    
    // Lerp position
    camera.position.lerp(target.pos, delta * 2.2)
    
    // Lerp lookAt target
    currentLookAt.current.lerp(target.look, delta * 2.2)
    camera.lookAt(currentLookAt.current)
    
    // Lerp FOV
    if (Math.abs(camera.fov - target.fov) > 0.05) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, target.fov, delta * 2.2)
      camera.updateProjectionMatrix()
    }
  })

  return null // This component only controls the parent Canvas camera
}
