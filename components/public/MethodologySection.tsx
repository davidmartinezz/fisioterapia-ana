import { ClipboardList, Stethoscope, TrendingUp, LucideIcon } from 'lucide-react'
import { METODOLOGIA, BIO } from '@/lib/static-data'

const ICON_MAP: Record<string, LucideIcon> = {
  ClipboardList, Stethoscope, TrendingUp,
}

export default function MethodologySection() {
  return (
    <section id="metodologia" className="py-20 bg-gradient-to-br from-teal-800 to-teal-700 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-teal-300 uppercase">Metodología</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-3">Mi forma de trabajar</h2>
          <p className="text-teal-200 max-w-xl mx-auto">
            Totalmente individualizado, con una valoración clínica rigurosa y seguimiento continuo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {METODOLOGIA.map((m) => {
            const Icon = ICON_MAP[m.icono] ?? Stethoscope
            return (
              <div
                key={m.numero}
                className="bg-white/10 rounded-2xl p-7 border border-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="text-5xl font-bold text-white/20 leading-none mb-3">{m.numero}</div>
                <Icon className="w-7 h-7 text-teal-300 mb-3" />
                <h3 className="font-semibold text-white text-lg mb-2">{m.titulo}</h3>
                <p className="text-teal-200 text-sm leading-relaxed">{m.descripcion}</p>
              </div>
            )
          })}
        </div>

        <blockquote className="text-center bg-white/8 rounded-2xl border border-white/15 px-8 py-8 max-w-2xl mx-auto">
          <p className="text-white/90 text-lg italic leading-relaxed mb-3">
            &ldquo;{BIO.cita}&rdquo;
          </p>
          <cite className="text-teal-300 text-sm font-medium not-italic">
            — Ana María González Gómez · Fisioterapeuta
          </cite>
        </blockquote>
      </div>
    </section>
  )
}
