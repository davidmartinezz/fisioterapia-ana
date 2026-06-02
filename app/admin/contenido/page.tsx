'use client'
import { useState, useEffect } from 'react'
import { Save, Loader2, CheckCircle2, HelpCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

interface Campo {
  clave: string
  valor: string
  tipo: string
  etiqueta: string | null
  ayuda: string | null
}

const SECCIONES = [
  {
    titulo: 'Portada (lo que ven nada más entrar)',
    claves: ['hero_titulo', 'hero_eslogan', 'hero_foto_url'],
  },
  {
    titulo: 'Sobre mí',
    claves: ['sobre_mi_bio', 'sobre_mi_foto_url'],
  },
  {
    titulo: 'Bloque "Mi proyecto de clínica"',
    claves: ['proyecto_clinica_titulo', 'proyecto_clinica_texto'],
  },
  {
    titulo: '¿Por qué elegirme? (iconos)',
    claves: ['por_que_elegirme_items'],
    nota: 'Este campo es avanzado. Contiene los 4 bloques de "Por qué elegirme" en formato técnico. Edítalo con cuidado o pídele ayuda a tu diseñador.',
  },
  {
    titulo: 'Ubicación',
    claves: ['ubicacion_direccion', 'ubicacion_maps_embed_url', 'ubicacion_maps_link', 'ubicacion_notas'],
  },
  {
    titulo: 'SEO (cómo te encuentra Google)',
    claves: ['seo_titulo', 'seo_descripcion', 'seo_palabras_clave'],
  },
  {
    titulo: 'Textos legales',
    claves: ['aviso_legal_texto', 'privacidad_texto'],
    nota: 'Estos textos contienen HTML básico. Solo modifica el texto visible, no elimines las etiquetas.',
  },
]

export default function AdminContenidoPage() {
  const [campos, setCampos] = useState<Record<string, Campo>>({})
  const [valores, setValores] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/contenido')
      .then((r) => r.json())
      .then((data) => {
        // Fetch full data with labels from admin
        fetch('/api/contenido?full=1')
          .then(() => {})
          .catch(() => {})
        setValores(data.contenido ?? {})
      })
    // Fetch full info (etiqueta + ayuda)
    fetch('/api/contenido/admin')
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, Campo> = {}
        for (const item of data.campos ?? []) map[item.clave] = item
        setCampos(map)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async (clave: string) => {
    setSaving({ ...saving, [clave]: true })
    await fetch('/api/contenido', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clave, valor: valores[clave] ?? '' }),
    })
    setSaving({ ...saving, [clave]: false })
    setSaved({ ...saved, [clave]: true })
    setTimeout(() => setSaved((s) => ({ ...s, [clave]: false })), 2000)
  }

  const campo = (clave: string) => campos[clave]
  const etiqueta = (clave: string) => campo(clave)?.etiqueta ?? clave
  const ayuda = (clave: string) => campo(clave)?.ayuda
  const tipo = (clave: string) => campo(clave)?.tipo ?? 'texto'

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /></div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Textos de la web</h1>
      <p className="text-slate-500 mb-8">
        Aquí puedes cambiar absolutamente todo el texto de tu web. Guarda cada campo por separado.
      </p>

      <div className="space-y-8">
        {SECCIONES.map((seccion) => (
          <div key={seccion.titulo} className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-1">{seccion.titulo}</h2>
            {seccion.nota && (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
                <HelpCircle className="w-4 h-4 mt-0.5 shrink-0" />
                {seccion.nota}
              </div>
            )}
            <div className="space-y-5 mt-4">
              {seccion.claves.map((clave) => (
                <div key={clave}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {etiqueta(clave)}
                  </label>
                  {ayuda(clave) && (
                    <p className="text-xs text-slate-400 mb-1.5">{ayuda(clave)}</p>
                  )}
                  {tipo(clave) === 'html' || tipo(clave) === 'json' || (valores[clave]?.length ?? 0) > 120 ? (
                    <textarea
                      rows={tipo(clave) === 'json' ? 8 : 5}
                      value={valores[clave] ?? ''}
                      onChange={(e) => setValores({ ...valores, [clave]: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm font-mono resize-y"
                    />
                  ) : (
                    <input
                      type="text"
                      value={valores[clave] ?? ''}
                      onChange={(e) => setValores({ ...valores, [clave]: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
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
          </div>
        ))}
      </div>
    </div>
  )
}
