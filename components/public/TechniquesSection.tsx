import {
  Hand, Dumbbell, Droplets, Activity, Heart,
  Zap, Footprints, AlertTriangle,
  HeartPulse, Layers, Brain,
  LucideIcon,
} from 'lucide-react'
import { TECNICAS, PATOLOGIAS } from '@/lib/static-data'

function NeedleCustom({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="2" width="4" height="5" rx="2"/>
      <line x1="12" y1="7" x2="12" y2="21"/>
      <line x1="11" y1="21" x2="13" y2="21" strokeWidth="1"/>
    </svg>
  )
}

function NeckCustom({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Head */}
      <circle cx="12" cy="5" r="3.5"/>
      {/* Neck */}
      <path d="M10 8.5 L9.5 16 L14.5 16 L14 8.5"/>
      {/* Shoulders */}
      <path d="M5 20 Q7 16 9.5 16 L14.5 16 Q17 16 19 20"/>
    </svg>
  )
}

function SpineCustom({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="3.5" rx="1.2"/>
      <rect x="8" y="8" width="8" height="3.5" rx="1.2"/>
      <rect x="8" y="14" width="8" height="3.5" rx="1.2"/>
      <rect x="8" y="20" width="8" height="2" rx="1"/>
      <line x1="12" y1="5.5" x2="12" y2="8"/>
      <line x1="12" y1="11.5" x2="12" y2="14"/>
      <line x1="12" y1="17.5" x2="12" y2="20"/>
    </svg>
  )
}

function JawCustom({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Mandible bone - U shape with condyles */}
      <path d="M5 4 L5 15 Q5 21 12 21 Q19 21 19 15 L19 4"/>
      {/* Condyles (joint points at top) */}
      <circle cx="5" cy="4" r="2" fill="currentColor" stroke="none"/>
      <circle cx="19" cy="4" r="2" fill="currentColor" stroke="none"/>
      {/* Teeth dividers */}
      <line x1="8.5" y1="15" x2="8.5" y2="21"/>
      <line x1="12" y1="16" x2="12" y2="21"/>
      <line x1="15.5" y1="15" x2="15.5" y2="21"/>
    </svg>
  )
}

type CustomIcon = ({ className }: { className?: string }) => JSX.Element

const ICON_MAP: Record<string, LucideIcon | CustomIcon> = {
  Hand, Dumbbell, Droplets, Activity, Heart,
  Zap, Footprints, AlertTriangle, HeartPulse, Layers, Brain,
  NeedleCustom, NeckCustom, SpineCustom, JawCustom,
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
