import { Check, MapPin, Clock } from 'lucide-react'
import { TARIFAS, DISPONIBILIDAD } from '@/lib/static-data'

export default function PricingSection() {
  return (
    <section id="tarifas" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-teal-600 uppercase">Tarifas</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2 mb-3">Inversión en tu salud</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Pricing cards */}
          <div className="space-y-3">
            {TARIFAS.map((t) => (
              <div
                key={t.nombre}
                className={`flex items-center justify-between rounded-2xl px-6 py-5 border transition-shadow hover:shadow-md ${
                  t.destacada
                    ? 'bg-teal-700 border-teal-700 text-white shadow-lg'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${t.destacada ? 'text-teal-300' : 'text-teal-600'}`}>
                    {t.etiqueta}
                  </p>
                  <p className={`font-semibold text-base ${t.destacada ? 'text-white' : 'text-slate-800'}`}>
                    {t.nombre}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-bold leading-none ${t.destacada ? 'text-white' : 'text-teal-700'}`}>
                    {t.precio}€
                  </p>
                  <p className={`text-xs mt-0.5 ${t.destacada ? 'text-teal-300' : 'text-slate-500'}`}>
                    {t.unidad}
                  </p>
                  {t.ahorro && (
                    <span className={`inline-block text-xs font-semibold mt-1 px-2 py-0.5 rounded-full ${
                      t.destacada ? 'bg-white/20 text-white' : 'bg-teal-50 text-teal-700'
                    }`}>
                      {t.ahorro}
                    </span>
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mt-4">
              <MapPin className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-800">
                <strong>Sesiones a domicilio:</strong> Llevo todo el material necesario. La tarifa puede variar según la ubicación — consúltame.
              </p>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-slate-800 text-lg">Disponibilidad</h3>
            </div>
            <p className="text-slate-500 text-sm mb-6">Horario actual de consulta</p>

            <ul className="space-y-2 mb-6">
              {DISPONIBILIDAD.map((d) => (
                <li
                  key={d.dia}
                  className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3"
                >
                  <span className="font-semibold text-slate-700 text-sm w-28 shrink-0">{d.dia}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {d.horas.map((h) => (
                      <span key={h} className="text-teal-700 font-medium text-sm bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">{h}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-3 bg-teal-50 rounded-xl px-4 py-3">
              <MapPin className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <div className="text-sm text-teal-800">
                <strong>Leganés, Madrid</strong><br />
                <span className="text-teal-600">Dirección exacta facilitada al concertar cita</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
