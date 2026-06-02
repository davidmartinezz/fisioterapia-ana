import { Star } from 'lucide-react'

interface Testimonio {
  id: string
  nombre_paciente: string
  texto: string
  puntuacion: number
  fecha?: string
}

interface Props {
  testimonios: Testimonio[]
}

export default function StaticTestimonials({ testimonios }: Props) {
  if (!testimonios.length) return null

  return (
    <section id="resenas" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-teal-600 uppercase">Opiniones</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2 mb-3">
            Lo que dicen mis pacientes
          </h2>
          <p className="text-slate-500">Opiniones reales de personas que ya han confiado en mí</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonios.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-md hover:border-teal-100 transition-all duration-300 relative"
            >
              <div className="text-5xl text-teal-100 font-serif absolute top-5 right-6 leading-none select-none">
                &ldquo;
              </div>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < t.puntuacion ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.texto}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-800 text-sm">— {t.nombre_paciente}</p>
                {t.fecha && (
                  <span className="text-xs text-slate-400">{t.fecha}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
