'use client'
import { useState, useEffect, useRef } from 'react'
import { Upload, Trash2, Loader2, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { GaleriaFoto } from '@/types'

const SECCIONES = [
  { value: 'hero', label: 'Foto de portada' },
  { value: 'sobre_mi', label: 'Fotos de "Sobre mí"' },
  { value: 'equipamiento', label: 'Equipamiento' },
  { value: 'general', label: 'Galería general' },
]

export default function AdminFotosPage() {
  const [fotos, setFotos] = useState<GaleriaFoto[]>([])
  const [seccionActiva, setSeccionActiva] = useState('sobre_mi')
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  const fetchFotos = async () => {
    setLoading(true)
    const res = await fetch(`/api/fotos?seccion=${seccionActiva}`)
    const data = await res.json()
    setFotos(data.fotos ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchFotos() }, [seccionActiva])

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', seccionActiva)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const { url } = await res.json()
      if (url) {
        await fetch('/api/fotos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, seccion: seccionActiva, orden: fotos.length + 1 }),
        })
      }
    }
    await fetchFotos()
    setUploading(false)
  }

  const handleDelete = async (foto: GaleriaFoto) => {
    if (!confirm('¿Eliminar esta foto?')) return
    const path = foto.url.split('/fisioterapia-media/')[1]
    await fetch('/api/fotos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: foto.id, path }),
    })
    await fetchFotos()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleUpload(e.dataTransfer.files)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Fotos</h1>
      <p className="text-slate-500 mb-6">Sube y gestiona todas las imágenes de tu web</p>

      {/* Secciones */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SECCIONES.map((s) => (
          <button
            key={s.value}
            onClick={() => setSeccionActiva(s.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              seccionActiva === s.value
                ? 'bg-teal-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Upload zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-teal-300 rounded-xl p-8 text-center cursor-pointer hover:bg-teal-50 transition-colors mb-6"
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            <p className="text-teal-600 font-medium">Subiendo fotos...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-teal-400" />
            <p className="font-medium text-slate-700">Arrastra tus fotos aquí</p>
            <p className="text-sm text-slate-400">o haz clic para seleccionarlas</p>
            <p className="text-xs text-slate-300">JPG, PNG, WebP hasta 5MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* Grid fotos */}
      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-teal-500" /></div>
      ) : fotos.length === 0 ? (
        <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
          <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
          No hay fotos en esta sección todavía
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {fotos.map((foto) => (
            <div key={foto.id} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image src={foto.url} alt={foto.alt_texto || ''} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDelete(foto)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
