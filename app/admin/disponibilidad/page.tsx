'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { DisponibilidadSemanal } from '@/types'
import { DIAS_SEMANA } from '@/lib/utils'

export default function AdminDisponibilidadPage() {
  const [items, setItems] = useState<DisponibilidadSemanal[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ dia_semana: 1, hora_inicio: '09:00', hora_fin: '18:00', duracion_hueco_min: 60, activo: true })
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetch_ = async () => {
    setLoading(true)
    const r = await fetch('/api/disponibilidad')
    const d = await r.json()
    setItems(d.disponibilidad ?? [])
    setLoading(false)
  }
  useEffect(() => { fetch_() }, [])

  const openNew = () => { setForm({ dia_semana: 1, hora_inicio: '09:00', hora_fin: '18:00', duracion_hueco_min: 60, activo: true }); setEditId(null); setModal(true) }
  const openEdit = (d: DisponibilidadSemanal) => {
    setForm({ dia_semana: d.dia_semana, hora_inicio: d.hora_inicio, hora_fin: d.hora_fin, duracion_hueco_min: d.duracion_hueco_min, activo: d.activo })
    setEditId(d.id); setModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    if (editId) {
      await fetch('/api/disponibilidad', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editId, ...form }) })
    } else {
      await fetch('/api/disponibilidad', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    await fetch_(); setModal(false); setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este horario?')) return
    await fetch('/api/disponibilidad', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await fetch_()
  }

  const toggleActivo = async (d: DisponibilidadSemanal) => {
    await fetch('/api/disponibilidad', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: d.id, activo: !d.activo }) })
    await fetch_()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Horarios y disponibilidad</h1>
          <p className="text-slate-500 text-sm mt-1">Define qué días y horas ofreces citas</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4" /> Añadir horario</Button>
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6 text-sm text-teal-800">
        <p><strong>Cómo funciona:</strong> Aquí defines tu disponibilidad semanal. Para cada día indicas la hora de inicio, la hora de fin y la duración de cada hueco (ej: 60 minutos). El sistema calculará automáticamente los huecos disponibles y bloqueará los que ya tengan cita.</p>
      </div>

      {loading ? <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /></div> : (
        <div className="space-y-3">
          {items.sort((a, b) => a.dia_semana - b.dia_semana).map((d) => (
            <div key={d.id} className={`bg-white rounded-xl border p-4 flex items-center gap-4 ${d.activo ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-800">{DIAS_SEMANA[d.dia_semana]}</p>
                  {!d.activo && <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">Inactivo</span>}
                </div>
                <p className="text-sm text-slate-500">
                  {d.hora_inicio} – {d.hora_fin} · Huecos de {d.duracion_hueco_min} min
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleActivo(d)} className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${d.activo ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}>
                  {d.activo ? 'Desactivar' : 'Activar'}
                </button>
                <Button variant="outline" size="sm" onClick={() => openEdit(d)}>Editar</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(d.id)} className="text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
              No tienes horarios configurados. ¡Añade el primero!
            </div>
          )}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'Editar horario' : 'Nuevo horario'}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Día de la semana</label>
            <select value={form.dia_semana} onChange={(e) => setForm({ ...form, dia_semana: parseInt(e.target.value) })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm bg-white">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <option key={d} value={d}>{DIAS_SEMANA[d]}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Hora de inicio</label>
              <input type="time" value={form.hora_inicio} onChange={(e) => setForm({ ...form, hora_inicio: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Hora de fin</label>
              <input type="time" value={form.hora_fin} onChange={(e) => setForm({ ...form, hora_fin: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Duración de cada cita (minutos)</label>
            <select value={form.duracion_hueco_min} onChange={(e) => setForm({ ...form, duracion_hueco_min: parseInt(e.target.value) })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm bg-white">
              {[30, 45, 60, 75, 90, 120].map((m) => (
                <option key={m} value={m}>{m} minutos</option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1">
              Cada cuánto aparece un nuevo hueco disponible. Ej: si pones 60 min y trabajas 9:00-18:00, verás huecos a las 9:00, 10:00, 11:00...
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="activo_d" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} className="w-4 h-4 accent-teal-600" />
            <label htmlFor="activo_d" className="text-sm text-slate-700">Activo (visible para los pacientes)</label>
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
