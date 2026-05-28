'use client'

import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./components/Scene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }} />
  ),
})

export default function Home() {
  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      background: '#ffffff',
      overflow: 'hidden',
    }}>
      <Scene />
    </main>
  )
}
