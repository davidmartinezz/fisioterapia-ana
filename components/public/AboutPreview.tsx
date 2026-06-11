import Image from 'next/image'
import { GraduationCap, Award, CheckCircle, BadgeCheck } from 'lucide-react'
import { BIO, FORMACION, SITE } from '@/lib/static-data'

export default function AboutPreview() {
  return (
    <section id="sobre-mi" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Photo */}
          <div className="relative hidden md:block">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-teal-100">
              <Image
                src="/ana_red.png"
                alt={`Foto de ${SITE.nombre}`}
                width={480}
                height={640}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-teal-700 text-white rounded-2xl px-5 py-4 shadow-xl text-center">
              <p className="text-xs text-teal-300 font-medium">Nº Colegiada</p>
              <p className="text-2xl font-bold">{SITE.numeroColegiada}</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-xs font-semibold tracking-widest text-teal-600 uppercase">Sobre mí</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2 mb-4">
              Fisioterapia con vocación<br className="hidden md:block" /> y criterio profesional
            </h2>
            <div className="w-10 h-1 bg-teal-500 rounded-full mb-6" />

            {BIO.parrafos.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-4">{p}</p>
            ))}

            <div className="mt-6 space-y-3">
              {FORMACION.map((f, i) => {
                const icons = [GraduationCap, Award, CheckCircle, CheckCircle, CheckCircle]
                const Icon = icons[i] ?? CheckCircle
                return (
                  <div key={i} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-600">
                      <span className="font-medium text-slate-800">{f.titulo}</span>
                      {f.institucion && (
                        <span className="text-slate-500"> · {f.institucion}</span>
                      )}
                    </div>
                  </div>
                )
              })}
              <div className="flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600">
                  <span className="font-medium text-slate-800">Fisioterapeuta Colegiada</span>
                  <span className="text-slate-500"> · Nº {SITE.numeroColegiada}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
