import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Premium Tooth',
  description: 'Cinematic 3D tooth animation experience',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ background: '#ffffff', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
