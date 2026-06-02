import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import MobileBookingBar from '@/components/ui/MobileBookingBar'
import { SITE } from '@/lib/static-data'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Ana María González Gómez · Fisioterapeuta en Leganés',
  description:
    'Fisioterapeuta colegiada especializada en tratamiento del dolor y recuperación funcional. Atención personalizada en Leganés y a domicilio, Madrid.',
  keywords: 'fisioterapeuta, leganés, madrid, punción seca, terapia manual, dolor lumbar, fisioterapia domicilio',
  openGraph: {
    title: 'Ana María González Gómez · Fisioterapeuta',
    description:
      'Fisioterapeuta colegiada especializada en tratamiento del dolor y recuperación funcional.',
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const contacto = {
    email_contacto: SITE.email,
    direccion: SITE.ubicacionTexto,
    whatsapp: SITE.whatsapp,
  }

  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header nombre={SITE.nombre} mapsUrl="#contacto" />
        <main className="flex-1">{children}</main>
        <Footer nombre={SITE.nombre} contacto={contacto} />
        {SITE.whatsapp && <WhatsAppButton numero={SITE.whatsapp} />}
        <MobileBookingBar />
      </body>
    </html>
  )
}
