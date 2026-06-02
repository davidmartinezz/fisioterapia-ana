import Link from 'next/link'
import { Sparkles } from 'lucide-react'

interface ProjectBlockProps {
  titulo: string
  texto: string
}

export default function ProjectBlock({ titulo, texto }: ProjectBlockProps) {
  if (!titulo && !texto) return null

  return (
    <section className="py-16 bg-gradient-to-r from-teal-700 to-teal-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-4 h-4" />
          Un proyecto con corazón
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{titulo}</h2>
        <div
          className="text-teal-100 text-base md:text-lg leading-relaxed max-w-3xl mx-auto prose prose-invert"
          dangerouslySetInnerHTML={{ __html: texto }}
        />
        <Link
          href="/reservar"
          className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-xl bg-white text-teal-700 font-bold hover:bg-teal-50 transition-colors shadow-lg text-base"
        >
          Reserva tu primera cita →
        </Link>
      </div>
    </section>
  )
}
