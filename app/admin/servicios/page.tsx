'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, Loader2, GripVertical } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { Servicio } from '@/types'

const EMPTY_SERVICIO = { nombre: '', descripcion: '', duracion_min: 60, precio: null as number | null, foto_url: '', activo: true, orden: 0 }

export default function AdminServiciosPage() {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<typeof EMPTY_SERVICIO>(EMPTY_SERVICIO)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetch_ = async () => {
    setLoading(true)
    const r = await fetch('/api/servicios')
    const d = await r.json()
    setServicios(d.servicios ?? [])
    setLoading(false)
  }

  useEffect(() => { fetch_() }, [])

  const openNew = () => {
    setForm({ ...EMPTY_SERVICIO, orden: servicios.length + 1 })
    setEditId(null)
    setModal(true)
  }

  const openEdit = (s: Servicio) => {
    setForm({ nombre: s.nombre, descripcion: s.descripcion, duracion_min: s.duracion_min ?? 60, precio: s.precio, foto_url: s.foto_url, activo: s.activo, orden: s.orden })
    setEditId(s.id)
    setModal(true)
  }

  const handleSave = async () => {
    if (!form.nombre.trim()) return
    setSaving(true)
    if (editId) {
      await fetch('/api/servicios', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editId, ...form }),
      })
    } else {
      await fetch('/api/servicios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }
    await fetch_()
    setModal(false)
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este servicio?')) return
    await fetch('/api/servicios', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await fetch_()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Servicios y precios</h1>
          <p className="text-slate-500 text-sm mt-1">Añade, edita o elimina los tratamientos que ofreces</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4" /> Nuevo servicio</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /></div>
      ) : (
        <div className="space-y-3">
          {servicios.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
              <GripVertical className="w-4 h-4 text-slate-300 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-800">{s.nombre}</p>
                  {!s.activo && <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">Inactivo</span>}
                </div>
                {s.descripcion && <p className="text-sm text-slate-500 truncate">{s.descripcion}</p>}
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                  {s.duracion_min && <span>{s.duracion_min} min</span>}
                  {s.precio != null && <span className="font-semibold text-teal-700">{s.precio} €</span>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => openEdit(s)}>Editar</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id)} className="text-red-500 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          {servicios.length === 0 && (
            <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
              No tienes servicios todavía. ¡Crea el primero!
            </div>
          )}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'Editar servicio' : 'Nuevo servicio'}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Nombre del servicio *</label>
            <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
              placeholder="Ej: Sesión de fisioterapia" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Descripción</label>
            <textarea rows={3} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm resize-none"
              placeholder="Explica en qué consiste este tratamiento..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Duración (minutos)</label>
              <input type="number" value={form.duracion_min} onChange={(e) => setForm({ ...form, duracion_min: parseInt(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Precio (€)</label>
              <input type="number" step="0.01" value={form.precio ?? ''} onChange={(e) => setForm({ ...form, precio: e.target.value ? parseFloat(e.target.value) : null })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
                placeholder="55.00" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Posición en la lista</label>
            <input type="number" value={form.orden} onChange={(e) => setForm({ ...form, orden: parseInt(e.target.value) })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm" />
            <p className="text-xs text-slate-400 mt-1">Los servicios con número menor aparecen primero</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="activo" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })}
              className="w-4 h-4 accent-teal-600" />
            <label htmlFor="activo" className="text-sm text-slate-700">Visible en la web</label>
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-5">
          <Button variant="outline" size="sm" onClick={() => setModal(false)}>Cancelar</Button>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
