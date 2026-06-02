'use client'
import { useState, useEffect } from 'react'
import { Save, Loader2, CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'

const CAMPOS = [
  { clave: 'whatsapp', label: 'Número de WhatsApp', ayuda: 'Solo números, incluyendo el prefijo internacional sin el +. Ej: 34612345678 (para el +34 612 345 678)', placeholder: '34600000000' },
  { clave: 'email_contacto', label: 'Email de contacto', ayuda: 'Email visible en el pie de página', placeholder: 'info@fisioterapiaana.es', type: 'email' },
  { clave: 'instagram', label: 'Instagram', ayuda: 'Tu nombre de usuario en Instagram, sin la @. Déjalo vacío si no tienes.', placeholder: 'ana.fisio' },
  { clave: 'facebook', label: 'Facebook', ayuda: 'URL completa de tu página de Facebook. Ej: https://facebook.com/anafisioterapia. Déjalo vacío si no tienes.', placeholder: 'https://facebook.com/...' },
  { clave: 'horario_texto', label: 'Horario de atención', ayuda: 'Texto que aparece en el pie de página. Puedes usar varias líneas.', multiline: true, placeholder: 'Lunes a Viernes: 9:00 - 18:00\nSábados: 9:00 - 14:00' },
]

export default function AdminContactoPage() {
  const [valores, setValores] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/contacto').then((r) => r.json()).then((data) => { setValores(data.contacto ?? {}); setLoading(false) })
  }, [])

  const handleSave = async (clave: string) => {
    setSaving({ ...saving, [clave]: true })
    await fetch('/api/contacto', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clave, valor: valores[clave] ?? '' }),
    })
    setSaving({ ...saving, [clave]: false })
    setSaved({ ...saved, [clave]: true })
    setTimeout(() => setSaved((s) => ({ ...s, [clave]: false })), 2000)
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Datos de contacto</h1>
      <p className="text-slate-500 mb-8">Estos datos aparecen en el pie de página y en los botones de la web</p>

      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-6">
        {CAMPOS.map(({ clave, label, ayuda, placeholder, multiline, type }) => (
          <div key={clave}>
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            {ayuda && <p className="text-xs text-slate-400 mb-1.5">{ayuda}</p>}
            {multiline ? (
              <textarea
                value={valores[clave] ?? ''}
                onChange={(e) => setValores({ ...valores, [clave]: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm resize-none"
                placeholder={placeholder}
              />
            ) : (
              <input
                type={type || 'text'}
                value={valores[clave] ?? ''}
                onChange={(e) => setValores({ ...valores, [clave]: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                placeholder={placeholder}
              />
            )}
            <div className="flex justify-end mt-2">
              <Button size="sm" onClick={() => handleSave(clave)} disabled={saving[clave]}>
                {saved[clave] ? (
                  <><CheckCircle2 className="w-4 h-4" /> Guardado</>
                ) : saving[clave] ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
                ) : (
                  <><Save className="w-4 h-4" /> Guardar</>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm text-teal-800">
        <p><strong>Recuerda:</strong> El número de WhatsApp y los links de Cómo llegar los cambias en la sección <strong>Textos de la web</strong> → Ubicación y Portada.</p>
      </div>
    </div>
  )
}
