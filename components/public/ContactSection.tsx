'use client'
import { useState } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2, Phone, Calendar } from 'lucide-react'
import { SITE, DISPONIBILIDAD } from '@/lib/static-data'

type Estado = 'idle' | 'enviando' | 'ok' | 'error'

// Fecha mínima: mañana
function minDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition'

export default function ContactSection() {
  const [estado, setEstado] = useState<Estado>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEstado('enviando')

    const form = e.currentTarget
    const data = {
      nombre:    (form.elements.namedItem('nombre')    as HTMLInputElement).value,
      apellidos: (form.elements.namedItem('apellidos') as HTMLInputElement).value,
      telefono:  (form.elements.namedItem('telefono')  as HTMLInputElement).value,
      email:     (form.elements.namedItem('email')     as HTMLInputElement).value,
      fecha:     (form.elements.namedItem('fecha')     as HTMLInputElement).value,
      mensaje:   (form.elements.namedItem('mensaje')   as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Nueva consulta de ${data.nombre} ${data.apellidos}`,
          Nombre: `${data.nombre} ${data.apellidos}`,
          Teléfono: data.telefono || '—',
          Email: data.email,
          'Fecha preferida': data.fecha || '—',
          Mensaje: data.mensaje || '—',
        }),
      })

      if (res.ok) {
        setEstado('ok')
        form.reset()
      } else {
        setEstado('error')
      }
    } catch {
      setEstado('error')
    }
  }

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* Info */}
          <div className="md:col-span-2">
            <span className="text-xs font-semibold tracking-widest text-teal-600 uppercase">Contacto</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2 mb-4">
              ¿Tienes alguna consulta?
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Cuéntame tu caso y te respondo a la mayor brevedad posible. Sin compromiso y con toda la atención que mereces.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-teal-600" />
                </div>
                <a href={`mailto:${SITE.email}`} className="text-sm text-teal-700 hover:text-teal-900 font-medium transition-colors break-all">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-teal-600" />
                </div>
                <span className="text-sm text-slate-600">Leganés, Madrid · También a domicilio</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-teal-600" />
                </div>
                <ul className="text-sm text-slate-600 space-y-2">
                  {DISPONIBILIDAD.map((d) => (
                    <li key={d.dia} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-medium w-20 shrink-0">{d.dia}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {d.horas.map((h) => (
                          <span key={h} className="bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-full font-medium border border-teal-100">
                            {h}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-slate-50 rounded-2xl p-7 border border-slate-200">
            {estado === 'ok' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-14 h-14 text-teal-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">¡Mensaje enviado!</h3>
                <p className="text-slate-500 mb-6">Te responderé lo antes posible.</p>
                <button
                  onClick={() => setEstado('idle')}
                  className="text-sm text-teal-600 hover:text-teal-800 font-medium underline underline-offset-2 transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-slate-800 text-lg mb-1">Cuéntame tu caso</h3>
                <p className="text-slate-500 text-sm mb-6">Rellena el formulario y me pondré en contacto contigo.</p>

                {estado === 'error' && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>No se pudo enviar. Escríbeme directamente a <strong>{SITE.email}</strong></span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nombre y apellidos */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre *</label>
                      <input type="text" name="nombre" required placeholder="Tu nombre" className={INPUT_CLASS} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Apellidos *</label>
                      <input type="text" name="apellidos" required placeholder="Tus apellidos" className={INPUT_CLASS} />
                    </div>
                  </div>

                  {/* Teléfono y email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Teléfono</span>
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        placeholder="600 000 000"
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Correo electrónico *</label>
                      <input type="email" name="email" required placeholder="tu@correo.com" className={INPUT_CLASS} />
                    </div>
                  </div>

                  {/* Fecha preferida */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Fecha preferida</span>
                    </label>
                    <input
                      type="date"
                      name="fecha"
                      min={minDate()}
                      className={INPUT_CLASS + ' cursor-pointer'}
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cuéntame tu caso</label>
                    <textarea
                      name="mensaje"
                      rows={4}
                      placeholder="Describe brevemente tu situación, qué te ocurre y desde cuándo…"
                      className={INPUT_CLASS + ' resize-none'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={estado === 'enviando'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-400 text-white font-semibold rounded-xl transition-colors"
                  >
                    {estado === 'enviando' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Enviando…</>
                    ) : (
                      <><Send className="w-4 h-4" />Enviar consulta</>
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center">* Campos obligatorios</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
