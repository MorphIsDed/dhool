import { PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'

export default function WorldCamera() {
  const cameraRef = useRef()

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2, 10]}
      fov={45}
      near={0.1}
      far={1000}
    />
  )
}
