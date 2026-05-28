'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

interface CameraRigProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

export default function CameraRig({ mouse }: CameraRigProps) {
  const { camera } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame(() => {
    // Smooth damp toward mouse position
    target.current.x += (mouse.current.x * 0.8 - target.current.x) * 0.04
    target.current.y += (mouse.current.y * 0.5 - target.current.y) * 0.04

    camera.position.x = target.current.x
    camera.position.y = target.current.y + 0.3
    camera.lookAt(0, 0, 0)
  })

  return null
}
