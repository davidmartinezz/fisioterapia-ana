import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, MapPin } from 'lucide-react'

interface HeroProps {
  titulo: string
  eslogan: string
  fotoUrl: string
  mapsUrl: string
}

export default function Hero({ titulo, eslogan, fotoUrl, mapsUrl }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-teal-300 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
            Fisioterapeuta colegiada · Leganés Norte, Madrid
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            {titulo || 'Ana María González'}
          </h1>
          <p className="text-teal-100 text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0">
            {eslogan || 'Fisioterapia profesional en tu propia casa, en Leganés Norte'}
          </p>

          {/* CTAs — visible en desktop, ocultos en móvil (hay barra fija) */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              href="#contacto"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-teal-800 hover:bg-teal-50 font-semibold text-base transition-colors shadow-lg"
            >
              <CalendarDays className="w-5 h-5" />
              Consultar tu caso
            </a>
            <a
              href="#tecnicas"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-base backdrop-blur-sm transition-colors border border-white/30"
            >
              Ver tratamientos
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="shrink-0">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
            <Image
              src="/ana_red.png"
              alt={`Foto de ${titulo}`}
              width={288}
              height={288}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
