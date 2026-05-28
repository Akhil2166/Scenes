'use client'

import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

export default function ToothModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/model/scene.gltf')
  const clock = useRef(new THREE.Clock())
  const initialY = useRef(0)
  const hasAnimatedIn = useRef(false)

  useEffect(() => {
    if (!groupRef.current) return

    // Apply premium enamel material to all meshes
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true

        const mat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#f8f5f0'),         // warm ivory-white
          roughness: 0.08,
          metalness: 0.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          reflectivity: 1.0,
          transmission: 0.0,
          ior: 1.55,
          sheen: 0.15,
          sheenColor: new THREE.Color('#e8e0d8'),
          envMapIntensity: 2.2,
          side: THREE.FrontSide,
        })
        mesh.material = mat
      }
    })

    // Intro animation: scale + fade in
    groupRef.current.scale.set(0.0, 0.0, 0.0)
    groupRef.current.position.y = -0.6

    gsap.to(groupRef.current.scale, {
      x: 1, y: 1, z: 1,
      duration: 1.8,
      ease: 'expo.out',
      delay: 0.3,
    })
    gsap.to(groupRef.current.position, {
      y: initialY.current,
      duration: 1.8,
      ease: 'expo.out',
      delay: 0.3,
      onComplete: () => { hasAnimatedIn.current = true },
    })
  }, [scene])

  useFrame(() => {
    if (!groupRef.current) return
    const elapsed = clock.current.getElapsedTime()

    // Slow cinematic Y rotation
    groupRef.current.rotation.y += 0.003

    // Floating oscillation on Y axis
    if (hasAnimatedIn.current) {
      groupRef.current.position.y = initialY.current + Math.sin(elapsed * 0.9) * 0.07
    }

    // Subtle tilt breathing
    groupRef.current.rotation.z = Math.sin(elapsed * 0.4) * 0.018
    groupRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.01
  })

  return (
    <group ref={groupRef} rotation={[0.15, 0, 0]} scale={1.35}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/model/scene.gltf')
