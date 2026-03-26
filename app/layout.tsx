import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Vida en Fe | San Luis', template: '%s | Vida en Fe' },
  description: 'Iglesia Vida en Fe — Nuestra misión es alcanzar cada rincón de la provincia de San Luis, llevando un mensaje de vida y fe a cada persona.',
  keywords: ['iglesia', 'San Luis', 'Vida en Fe', 'fe', 'comunidad', 'evangelio'],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Vida en Fe | San Luis',
    description: 'Una iglesia, con templos en toda la provincia de San Luis, Argentina.',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
