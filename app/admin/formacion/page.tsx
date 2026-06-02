'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { Formacion } from '@/types'

export default function AdminFormacionPage() {
  const [items, setItems] = useState<Formacion[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ titulo: '', institucion: '', anio: new Date().getFullYear(), orden: 0 })
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetch_ = async () => {
    setLoading(true)
    const r = await fetch('/api/formacion')
    const d = await r.json()
    setItems(d.formacion ?? [])
    setLoading(false)
  }
  useEffect(() => { fetch_() }, [])

  const openNew = () => { setForm({ titulo: '', institucion: '', anio: new Date().getFullYear(), orden: items.length + 1 }); setEditId(null); setModal(true) }
  const openEdit = (f: Formacion) => { setForm({ titulo: f.titulo, institucion: f.institucion, anio: f.anio ?? new Date().getFullYear(), orden: f.orden }); setEditId(f.id); setModal(true) }

  const handleSave = async () => {
    if (!form.titulo.trim()) return
    setSaving(true)
    if (editId) {
      await fetch('/api/formacion', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editId, ...form }) })
    } else {
      await fetch('/api/formacion', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    await fetch_(); setModal(false); setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este elemento?')) return
    await fetch('/api/formacion', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await fetch_()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Formación y titulaciones</h1>
          <p className="text-slate-500 text-sm mt-1">Tus estudios, másteres y cursos de especialización</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4" /> Añadir</Button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /></div> : (
        <div className="space-y-3">
          {items.map((f) => (
            <div key={f.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{f.titulo}</p>
                <p className="text-sm text-slate-500">{f.institucion}{f.institucion && f.anio ? ' · ' : ''}{f.anio}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => openEdit(f)}>Editar</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(f.id)} className="text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">Añade aquí tus titulaciones y cursos</div>}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'Editar formación' : 'Nueva formación'}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Título / nombre del curso *</label>
            <input type="text" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
              placeholder="Ej: Máster en Fisioterapia Avanzada" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Centro / Universidad</label>
            <input type="text" value={form.institucion} onChange={(e) => setForm({ ...form, institucion: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
              placeholder="Universidad, escuela o institución" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Año</label>
              <input type="number" value={form.anio} onChange={(e) => setForm({ ...form, anio: parseInt(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Posición</label>
              <input type="number" value={form.orden} onChange={(e) => setForm({ ...form, orden: parseInt(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm" />
            </div>
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
