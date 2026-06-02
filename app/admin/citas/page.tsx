'use client'
import { useState, useEffect, useCallback } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isSameMonth, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Loader2, CheckCircle2, XCircle, Trash2, StickyNote, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { Cita } from '@/types'
import { ESTADO_COLORS, ESTADO_LABELS, formatFechaLarga } from '@/lib/utils'

export default function AdminCitasPage() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [loading, setLoading] = useState(true)
  const [mes, setMes] = useState(new Date())
  const [selected, setSelected] = useState<Date | null>(null)
  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null)
  const [notaModal, setNotaModal] = useState(false)
  const [nota, setNota] = useState('')
  const [bloqueoModal, setBloqueoModal] = useState(false)
  const [bloqueoForm, setBloqueoForm] = useState({ inicio: '', fin: '', motivo: '' })
  const [bloqueos, setBloqueos] = useState<any[]>([])
  const [saving, setSaving] = useState(false)

  const fetchCitas = useCallback(async () => {
    setLoading(true)
    const mesStr = format(mes, 'yyyy-MM')
    const res = await fetch(`/api/citas?mes=${mesStr}`)
    const data = await res.json()
    setCitas(data.citas ?? [])
    setLoading(false)
  }, [mes])

  const fetchBloqueos = useCallback(async () => {
    const res = await fetch('/api/bloqueos')
    const data = await res.json()
    setBloqueos(data.bloqueos ?? [])
  }, [])

  useEffect(() => { fetchCitas(); fetchBloqueos() }, [fetchCitas, fetchBloqueos])

  const cambiarEstado = async (id: string, estado: string) => {
    setSaving(true)
    await fetch(`/api/citas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado }),
    })
    await fetchCitas()
    setCitaSeleccionada(null)
    setSaving(false)
  }

  const guardarNota = async () => {
    if (!citaSeleccionada) return
    setSaving(true)
    await fetch(`/api/citas/${citaSeleccionada.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notas_admin: nota }),
    })
    await fetchCitas()
    setNotaModal(false)
    setSaving(false)
  }

  const eliminarCita = async (id: string) => {
    if (!confirm('¿Eliminar esta cita permanentemente?')) return
    await fetch(`/api/citas/${id}`, { method: 'DELETE' })
    await fetchCitas()
    setCitaSeleccionada(null)
  }

  const crearBloqueo = async () => {
    if (!bloqueoForm.inicio || !bloqueoForm.fin) return
    setSaving(true)
    await fetch('/api/bloqueos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inicio: bloqueoForm.inicio, fin: bloqueoForm.fin, motivo: bloqueoForm.motivo }),
    })
    setBloqueoModal(false)
    setBloqueoForm({ inicio: '', fin: '', motivo: '' })
    await fetchBloqueos()
    setSaving(false)
  }

  const eliminarBloqueo = async (id: string) => {
    await fetch('/api/bloqueos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await fetchBloqueos()
  }

  // Calendar grid
  const diasMes = eachDayOfInterval({ start: startOfMonth(mes), end: endOfMonth(mes) })
  const primerDia = getDay(startOfMonth(mes)) // 0=Sunday

  const citasDelDia = (dia: Date) =>
    citas.filter((c) => c.fecha === format(dia, 'yyyy-MM-dd'))

  const citasDiaSeleccionado = selected ? citasDelDia(selected) : []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Gestión de citas</h1>
        <Button variant="outline" size="sm" onClick={() => setBloqueoModal(true)}>
          <Plus className="w-4 h-4" /> Bloquear días
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setMes(subMonths(mes, 1))} className="p-1 hover:bg-slate-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="font-semibold text-slate-800 capitalize">
              {format(mes, 'MMMM yyyy', { locale: es })}
            </h2>
            <button onClick={() => setMes(addMonths(mes, 1))} className="p-1 hover:bg-slate-100 rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-2">
            {['L','M','X','J','V','S','D'].map((d) => <div key={d}>{d}</div>)}
          </div>

          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-teal-500" /></div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {/* Offset for first day — ISO starts Monday */}
              {Array.from({ length: primerDia === 0 ? 6 : primerDia - 1 }).map((_, i) => <div key={i} />)}
              {diasMes.map((dia) => {
                const dCitas = citasDelDia(dia)
                const isSelected = selected && isSameDay(dia, selected)
                const hasPendientes = dCitas.some((c) => c.estado === 'pendiente')
                const hasConfirmadas = dCitas.some((c) => c.estado === 'confirmada')
                return (
                  <button
                    key={dia.toISOString()}
                    onClick={() => setSelected(isSameDay(dia, selected ?? new Date(0)) ? null : dia)}
                    className={`relative p-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isSelected ? 'bg-teal-600 text-white' :
                      dCitas.length > 0 ? 'bg-teal-50 text-teal-700 hover:bg-teal-100' :
                      'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {format(dia, 'd')}
                    {dCitas.length > 0 && (
                      <span className={`absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full ${
                        hasPendientes ? 'bg-amber-400' : 'bg-green-500'
                      }`} />
                    )}
                  </button>
                )
              })}
            </div>
          )}

          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Pendiente</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Confirmada</span>
          </div>
        </div>

        {/* Citas del día */}
        <div>
          {selected ? (
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h2 className="font-semibold text-slate-800 mb-3 capitalize">
                {formatFechaLarga(format(selected, 'yyyy-MM-dd'))}
              </h2>
              {citasDiaSeleccionado.length === 0 ? (
                <p className="text-slate-400 text-sm">Sin citas este día</p>
              ) : (
                <div className="space-y-3">
                  {citasDiaSeleccionado.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => { setCitaSeleccionada(c); setNota(c.notas_admin || '') }}
                      className="p-3 rounded-lg border border-slate-200 hover:border-teal-300 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{c.hora_inicio} · {c.nombre_paciente}</p>
                          <p className="text-xs text-slate-500">{(c.servicios as any)?.nombre || '—'}</p>
                          {c.telefono && <p className="text-xs text-slate-400">{c.telefono}</p>}
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${ESTADO_COLORS[c.estado]}`}>
                          {ESTADO_LABELS[c.estado]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400 text-sm">
              Haz clic en un día del calendario para ver sus citas
            </div>
          )}

          {/* Bloqueos próximos */}
          {bloqueos.length > 0 && (
            <div className="mt-4 bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-700 text-sm mb-3">Días bloqueados</h3>
              <div className="space-y-2">
                {bloqueos.map((b) => (
                  <div key={b.id} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">
                      {format(parseISO(b.inicio), 'dd/MM/yyyy HH:mm')} → {format(parseISO(b.fin), 'dd/MM/yyyy HH:mm')}
                      {b.motivo && ` · ${b.motivo}`}
                    </span>
                    <button onClick={() => eliminarBloqueo(b.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal detalle cita */}
      <Modal
        open={!!citaSeleccionada}
        onClose={() => setCitaSeleccionada(null)}
        title={citaSeleccionada ? `Cita de ${citaSeleccionada.nombre_paciente}` : ''}
      >
        {citaSeleccionada && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-slate-400 text-xs">Fecha y hora</p><p className="font-medium">{formatFechaLarga(citaSeleccionada.fecha)} · {citaSeleccionada.hora_inicio}</p></div>
              <div><p className="text-slate-400 text-xs">Servicio</p><p className="font-medium">{(citaSeleccionada.servicios as any)?.nombre || '—'}</p></div>
              <div><p className="text-slate-400 text-xs">Teléfono</p><p className="font-medium">{citaSeleccionada.telefono || '—'}</p></div>
              <div><p className="text-slate-400 text-xs">Email</p><p className="font-medium text-xs">{citaSeleccionada.email || '—'}</p></div>
              {citaSeleccionada.motivo && <div className="col-span-2"><p className="text-slate-400 text-xs">Motivo</p><p>{citaSeleccionada.motivo}</p></div>}
            </div>

            <div>
              <p className="text-slate-400 text-xs mb-1">Estado actual</p>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${ESTADO_COLORS[citaSeleccionada.estado]}`}>
                {ESTADO_LABELS[citaSeleccionada.estado]}
              </span>
            </div>

            {citaSeleccionada.notas_admin && (
              <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600">
                <p className="text-xs text-slate-400 mb-1">Notas</p>
                {citaSeleccionada.notas_admin}
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {citaSeleccionada.estado !== 'confirmada' && (
                <Button variant="cta" size="sm" onClick={() => cambiarEstado(citaSeleccionada.id, 'confirmada')} disabled={saving}>
                  <CheckCircle2 className="w-4 h-4" /> Confirmar
                </Button>
              )}
              {citaSeleccionada.estado !== 'cancelada' && (
                <Button variant="danger" size="sm" onClick={() => cambiarEstado(citaSeleccionada.id, 'cancelada')} disabled={saving}>
                  <XCircle className="w-4 h-4" /> Cancelar
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => { setNotaModal(true) }}>
                <StickyNote className="w-4 h-4" /> Añadir nota
              </Button>
              <Button variant="ghost" size="sm" onClick={() => eliminarCita(citaSeleccionada.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="w-4 h-4" /> Eliminar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal nota */}
      <Modal open={notaModal} onClose={() => setNotaModal(false)} title="Nota interna">
        <textarea
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm resize-none mb-3"
          placeholder="Notas internas sobre esta cita..."
        />
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={() => setNotaModal(false)}>Cancelar</Button>
          <Button size="sm" onClick={guardarNota} disabled={saving}>Guardar nota</Button>
        </div>
      </Modal>

      {/* Modal bloqueo */}
      <Modal open={bloqueoModal} onClose={() => setBloqueoModal(false)} title="Bloquear días/horas">
        <p className="text-sm text-slate-500 mb-4">
          Bloquea un período de tiempo para que no aparezcan huecos disponibles en la web.
          Útil para vacaciones, días festivos, uso propio, etc.
        </p>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Desde</label>
            <input type="datetime-local" value={bloqueoForm.inicio}
              onChange={(e) => setBloqueoForm({ ...bloqueoForm, inicio: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Hasta</label>
            <input type="datetime-local" value={bloqueoForm.fin}
              onChange={(e) => setBloqueoForm({ ...bloqueoForm, fin: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Motivo (opcional)</label>
            <input type="text" value={bloqueoForm.motivo}
              onChange={(e) => setBloqueoForm({ ...bloqueoForm, motivo: e.target.value })}
              placeholder="Vacaciones, festivo..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm" />
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="outline" size="sm" onClick={() => setBloqueoModal(false)}>Cancelar</Button>
          <Button size="sm" onClick={crearBloqueo} disabled={saving}>Bloquear</Button>
        </div>
      </Modal>
    </div>
  )
}
