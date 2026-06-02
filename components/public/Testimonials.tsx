import { Star } from 'lucide-react'
import { Testimonio } from '@/types'

interface TestimonialsProps {
  testimonios: Testimonio[]
}

export default function Testimonials({ testimonios }: TestimonialsProps) {
  if (!testimonios?.length) return null

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            Lo que dicen mis pacientes
          </h2>
          <p className="text-slate-500">Opiniones reales de personas que ya han confiado en mí</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonios.map((t) => (
            <div key={t.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-sm transition-shadow">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < t.puntuacion ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">"{t.texto}"</p>
              <p className="font-semibold text-slate-800 text-sm">— {t.nombre_paciente}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
