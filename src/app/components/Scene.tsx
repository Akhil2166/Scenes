'use client'

import { useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Environment,
  ContactShadows,
  OrbitControls,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import ToothModel from './ToothModel'
import CameraRig from './CameraRig'

export default function Scene() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <Canvas
      style={{ width: '100vw', height: '100vh', background: '#ffffff' }}
      camera={{ position: [0, 0.3, 5], fov: 32 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: 3, // ACESFilmicToneMapping
        toneMappingExposure: 1.15,
      }}
      shadows
      dpr={[1, 2]}
    >
      {/* Pure white scene background */}
      <color attach="background" args={['#ffffff']} />

      {/* === LIGHTING SETUP === */}
      {/* Key light — warm, from upper-left */}
      <directionalLight
        position={[-3, 5, 4]}
        intensity={2.8}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.001}
      />
      {/* Fill light — cool, from right */}
      <directionalLight
        position={[4, 2, -2]}
        intensity={1.2}
        color="#e8f0ff"
      />
      {/* Rim / back light — subtle warmth */}
      <directionalLight
        position={[0, -2, -5]}
        intensity={0.6}
        color="#fff5e8"
      />
      {/* Ambient — very soft white */}
      <ambientLight intensity={0.55} color="#ffffff" />

      {/* Point lights for reflective highlights */}
      <pointLight position={[-2, 3, 3]} intensity={1.5} color="#ffffff" decay={2} />
      <pointLight position={[3, -1, 2]} intensity={0.8} color="#f0f8ff" decay={2} />

      {/* Studio HDRI environment for reflections */}
      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={0.9} />
      </Suspense>

      {/* === TOOTH MODEL === */}
      <Suspense fallback={null}>
        <ToothModel />
      </Suspense>

      {/* === SOFT SHADOW === */}
      <ContactShadows
        position={[0, -1.45, 0]}
        opacity={0.18}
        scale={4}
        blur={3.5}
        far={2}
        color="#c0b8b0"
        frames={1}
      />

      {/* === CAMERA PARALLAX === */}
      <CameraRig mouse={mouse} />

      {/* === POST PROCESSING === */}
      <EffectComposer>
        <Bloom
          intensity={0.18}
          luminanceThreshold={0.85}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.12} darkness={0.28} />
      </EffectComposer>
    </Canvas>
  )
}
