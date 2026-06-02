'use client'
import { useState, useEffect, useCallback } from 'react'
import { DayPicker } from 'react-day-picker'
import { es } from 'date-fns/locale'
import { format } from 'date-fns'
import { Servicio } from '@/types'
import { Clock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import 'react-day-picker/dist/style.css'

interface BookingCalendarProps {
  servicios: Servicio[]
}

interface FormData {
  nombre: string
  telefono: string
  email: string
  motivo: string
}

type Step = 'servicio' | 'fecha' | 'hora' | 'datos' | 'exito'

export default function BookingCalendar({ servicios }: BookingCalendarProps) {
  const [step, setStep] = useState<Step>('servicio')
  const [servicioId, setServicioId] = useState<string>('')
  const [fecha, setFecha] = useState<Date | undefined>()
  const [hora, setHora] = useState<string>('')
  const [huecos, setHuecos] = useState<string[]>([])
  const [loadingHuecos, setLoadingHuecos] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>('')
  const [form, setForm] = useState<FormData>({ nombre: '', telefono: '', email: '', motivo: '' })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const fetchHuecos = useCallback(async (d: Date) => {
    setLoadingHuecos(true)
    setHuecos([])
    setHora('')
    try {
      const fechaStr = format(d, 'yyyy-MM-dd')
      const res = await fetch(`/api/huecos?fecha=${fechaStr}`)
      const data = await res.json()
      setHuecos(data.huecos ?? [])
    } catch {
      setHuecos([])
    } finally {
      setLoadingHuecos(false)
    }
  }, [])

  const handleDaySelect = (day: Date | undefined) => {
    if (!day) return
    setFecha(day)
    fetchHuecos(day)
    setStep('hora')
  }

  const handleSubmit = async () => {
    if (!form.nombre.trim()) { setError('El nombre es obligatorio'); return }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          servicio_id: servicioId || null,
          fecha: format(fecha!, 'yyyy-MM-dd'),
          hora_inicio: hora,
          ...form,
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? 'Error al enviar la solicitud')
        return
      }
      setStep('exito')
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 'exito') {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">¡Solicitud enviada!</h2>
        <p className="text-slate-500 mb-2">
          Hemos recibido tu solicitud de cita para el{' '}
          <strong>{fecha && format(fecha, "EEEE d 'de' MMMM", { locale: es })}</strong> a las{' '}
          <strong>{hora}</strong>.
        </p>
        <p className="text-slate-400 text-sm mb-6">
          Recibirás un email de confirmación en breve. Ana revisará tu solicitud y te la confirmará lo antes posible.
        </p>
        <Button onClick={() => { setStep('servicio'); setFecha(undefined); setHora(''); setForm({ nombre:'',telefono:'',email:'',motivo:'' }) }}>
          Hacer otra reserva
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {(['servicio', 'fecha', 'hora', 'datos'] as Step[]).map((s, i) => {
          const stepIndex = ['servicio', 'fecha', 'hora', 'datos'].indexOf(step)
          const thisIndex = i
          return (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                thisIndex < stepIndex ? 'bg-teal-600 text-white' :
                thisIndex === stepIndex ? 'bg-teal-600 text-white ring-4 ring-teal-100' :
                'bg-slate-200 text-slate-500'
              }`}>{i + 1}</div>
              {i < 3 && <div className={`w-8 h-0.5 ${thisIndex < stepIndex ? 'bg-teal-600' : 'bg-slate-200'}`} />}
            </div>
          )
        })}
      </div>

      {/* Step 1: Servicio */}
      {step === 'servicio' && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">¿Qué tipo de sesión necesitas?</h2>
          <div className="space-y-2 mb-6">
            <button
              onClick={() => { setServicioId(''); setStep('fecha') }}
              className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-teal-400 hover:bg-teal-50 text-left transition-colors"
            >
              <p className="font-medium text-slate-700">Sin preferencia</p>
              <p className="text-sm text-slate-400">Ana se adaptará a tus necesidades</p>
            </button>
            {servicios.map((s) => (
              <button
                key={s.id}
                onClick={() => { setServicioId(s.id); setStep('fecha') }}
                className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-teal-400 hover:bg-teal-50 text-left transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-slate-700">{s.nombre}</p>
                    {s.descripcion && <p className="text-sm text-slate-400 mt-0.5 line-clamp-2">{s.descripcion}</p>}
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    {s.precio != null && <p className="font-bold text-teal-700">{s.precio} €</p>}
                    {s.duracion_min && <p className="text-xs text-slate-400">{s.duracion_min} min</p>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Fecha */}
      {step === 'fecha' && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">¿Qué día te viene bien?</h2>
          <div className="flex justify-center">
            <DayPicker
              mode="single"
              selected={fecha}
              onSelect={handleDaySelect}
              locale={es}
              disabled={{ before: today }}
              className="!font-sans"
              classNames={{
                day_selected: '!bg-teal-600 !text-white',
                day_today: '!font-bold !text-teal-600',
              }}
            />
          </div>
          <div className="text-center mt-2">
            <button onClick={() => setStep('servicio')} className="text-sm text-slate-400 hover:text-slate-600">
              ← Volver
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Hora */}
      {step === 'hora' && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1 text-center">¿A qué hora?</h2>
          {fecha && (
            <p className="text-center text-slate-500 text-sm mb-6 capitalize">
              {format(fecha, "EEEE d 'de' MMMM", { locale: es })}
            </p>
          )}

          {loadingHuecos ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
          ) : huecos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500 mb-4">No hay huecos disponibles este día.</p>
              <Button variant="outline" onClick={() => setStep('fecha')}>Elegir otro día</Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
              {huecos.map((h) => (
                <button
                  key={h}
                  onClick={() => { setHora(h); setStep('datos') }}
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 border-slate-200 hover:border-teal-400 hover:bg-teal-50 font-medium text-slate-700 transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-teal-500" />
                  {h}
                </button>
              ))}
            </div>
          )}
          <div className="text-center">
            <button onClick={() => setStep('fecha')} className="text-sm text-slate-400 hover:text-slate-600">
              ← Cambiar día
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Datos */}
      {step === 'datos' && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1 text-center">Tus datos</h2>
          <p className="text-center text-slate-500 text-sm mb-6">
            Cita para el{' '}
            <strong className="capitalize">{fecha && format(fecha, "EEEE d 'de' MMMM", { locale: es })}</strong>
            {' '}a las <strong>{hora}</strong>
          </p>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nombre y apellidos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                placeholder="600 000 000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                placeholder="tu@email.com"
              />
              <p className="text-xs text-slate-400 mt-1">Te enviaremos la confirmación aquí</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Motivo de la consulta <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <textarea
                value={form.motivo}
                onChange={(e) => setForm({ ...form, motivo: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm resize-none"
                placeholder="Describe brevemente tu lesión o lo que buscas..."
              />
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-4 mb-6">
            Al enviar este formulario aceptas nuestra{' '}
            <a href="/privacidad" className="underline">política de privacidad</a>.
            Tus datos solo se usarán para gestionar la cita.
          </p>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep('hora')} className="flex-1">
              ← Volver
            </Button>
            <Button variant="cta" onClick={handleSubmit} disabled={submitting} className="flex-1">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {submitting ? 'Enviando...' : 'Solicitar cita'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
