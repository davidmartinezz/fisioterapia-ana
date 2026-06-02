import {
  Hand, Syringe, Dumbbell, Droplets, Activity, Heart,
  Stethoscope, Shield, Zap, MessageCircle, Footprints,
  AlertTriangle, HeartPulse, Layers, Brain,
  LucideIcon,
} from 'lucide-react'
import { TECNICAS, PATOLOGIAS } from '@/lib/static-data'

const ICON_MAP: Record<string, LucideIcon> = {
  Hand, Syringe, Dumbbell, Droplets, Activity, Heart,
  Stethoscope, Shield, Zap, MessageCircle, Footprints,
  AlertTriangle, HeartPulse, Layers, Brain,
}

function TechCard({ icono, titulo, descripcion }: { icono: string; titulo: string; descripcion: string }) {
  const Icon = ICON_MAP[icono] ?? Activity
  return (
    <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all duration-300 text-center">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 group-hover:bg-teal-600 flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
        <Icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="font-semibold text-slate-800 mb-2 text-base">{titulo}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{descripcion}</p>
    </div>
  )
}

function PathCard({ icono, titulo, descripcion }: { icono: string; titulo: string; descripcion: string }) {
  const Icon = ICON_MAP[icono] ?? Activity
  return (
    <div className="group flex items-start gap-4 bg-white rounded-xl p-4 border border-slate-100 hover:border-teal-200 hover:shadow-sm transition-all duration-200">
      <div className="w-11 h-11 rounded-xl bg-teal-50 group-hover:bg-teal-600 flex items-center justify-center shrink-0 transition-colors duration-300">
        <Icon className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors duration-300" />
      </div>
      <div>
        <p className="font-semibold text-slate-800 text-sm mb-0.5">{titulo}</p>
        <p className="text-slate-500 text-xs leading-relaxed">{descripcion}</p>
      </div>
    </div>
  )
}

export default function TechniquesSection() {
  return (
    <>
      {/* Técnicas */}
      <section id="tecnicas" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-teal-600 uppercase">Técnicas de tratamiento</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2 mb-3">¿Cómo te voy a tratar?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Cada sesión combina las técnicas más adecuadas para tu caso específico.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TECNICAS.map((t) => (
              <TechCard key={t.titulo} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Patologías */}
      <section id="patologias" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-teal-600 uppercase">Patologías</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2 mb-3">¿Qué patologías trato?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Experiencia en el abordaje de una amplia variedad de patologías del aparato locomotor y del dolor.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PATOLOGIAS.map((p) => (
              <PathCard key={p.titulo} {...p} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
