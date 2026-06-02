'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, Loader2, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { Testimonio } from '@/types'

export default function AdminTestimoniosPage() {
  const [items, setItems] = useState<Testimonio[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ nombre_paciente: '', texto: '', puntuacion: 5, activo: true })
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetch_ = async () => {
    setLoading(true)
    const r = await fetch('/api/testimonios')
    const d = await r.json()
    setItems(d.testimonios ?? [])
    setLoading(false)
  }
  useEffect(() => { fetch_() }, [])

  const openNew = () => { setForm({ nombre_paciente: '', texto: '', puntuacion: 5, activo: true }); setEditId(null); setModal(true) }
  const openEdit = (t: Testimonio) => { setForm({ nombre_paciente: t.nombre_paciente, texto: t.texto, puntuacion: t.puntuacion, activo: t.activo }); setEditId(t.id); setModal(true) }

  const handleSave = async () => {
    if (!form.nombre_paciente.trim() || !form.texto.trim()) return
    setSaving(true)
    if (editId) {
      await fetch('/api/testimonios', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editId, ...form }) })
    } else {
      await fetch('/api/testimonios', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    await fetch_(); setModal(false); setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Ocultar este testimonio?')) return
    await fetch('/api/testimonios', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await fetch_()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Opiniones de pacientes</h1>
          <p className="text-slate-500 text-sm mt-1">Gestiona los testimonios que aparecen en la web</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4" /> Añadir opinión</Button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /></div> : (
        <div className="space-y-3">
          {items.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-slate-800">{t.nombre_paciente}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < t.puntuacion ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">"{t.texto}"</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => openEdit(t)}>Editar</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)} className="text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">Añade las opiniones de tus pacientes</div>}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'Editar opinión' : 'Nueva opinión'}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Nombre del paciente *</label>
            <input type="text" value={form.nombre_paciente} onChange={(e) => setForm({ ...form, nombre_paciente: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
              placeholder="Ej: María J." />
            <p className="text-xs text-slate-400 mt-1">Puedes poner solo el nombre o nombre + inicial del apellido</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Opinión *</label>
            <textarea rows={4} value={form.texto} onChange={(e) => setForm({ ...form, texto: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm resize-none"
              placeholder="Escribe aquí la opinión del paciente..." />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Puntuación</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setForm({ ...form, puntuacion: n })} type="button">
                  <Star className={`w-6 h-6 transition-colors ${n <= form.puntuacion ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="activo_t" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="w-4 h-4 accent-teal-600" />
            <label htmlFor="activo_t" className="text-sm text-slate-700">Visible en la web</label>
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-5">
          <Button variant="outline" size="sm" onClick={() => setModal(false)}>Cancelar</Button>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar
          </Button>
        </div>
      </Modal>
    </div>
  )
}
