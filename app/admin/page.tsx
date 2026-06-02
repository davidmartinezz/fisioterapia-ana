export const dynamic = 'force-dynamic'
import { createServiceClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { CalendarClock, CheckCircle2, Clock, XCircle, ArrowRight } from 'lucide-react'
import { ESTADO_COLORS, ESTADO_LABELS, formatFechaCorta } from '@/lib/utils'
import { Cita } from '@/types'

export default async function AdminDashboard() {
  const sb = createServiceClient()
  const today = new Date().toISOString().split('T')[0]

  const [
    { data: pendientes },
    { data: hoy },
    { count: totalMes },
  ] = await Promise.all([
    sb.from('citas').select('*, servicios(nombre)').eq('estado', 'pendiente').order('fecha').limit(5),
    sb.from('citas').select('*, servicios(nombre)').eq('fecha', today).neq('estado', 'cancelada').order('hora_inicio'),
    sb.from('citas').select('*', { count: 'exact', head: true })
      .gte('fecha', `${today.slice(0, 7)}-01`)
      .lte('fecha', `${today.slice(0, 7)}-31`)
      .neq('estado', 'cancelada'),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">¡Hola, Ana! 👋</h1>
      <p className="text-slate-500 mb-8">Resumen de tu agenda y citas pendientes</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Pendientes de confirmar</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">{pendientes?.length ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Citas hoy</p>
          <p className="text-3xl font-bold text-teal-600 mt-1">{hoy?.length ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 col-span-2 md:col-span-1">
          <p className="text-sm text-slate-500">Citas este mes</p>
          <p className="text-3xl font-bold text-slate-700 mt-1">{totalMes ?? 0}</p>
        </div>
      </div>

      {/* Citas de hoy */}
      {(hoy?.length ?? 0) > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-teal-600" />
            Agenda de hoy
          </h2>
          <div className="space-y-3">
            {hoy!.map((c: Cita) => (
              <div key={c.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="text-sm font-bold text-teal-700 w-12 shrink-0">{c.hora_inicio}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 text-sm truncate">{c.nombre_paciente}</p>
                  <p className="text-xs text-slate-400">{(c.servicios as any)?.nombre || 'Sin especificar'}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${ESTADO_COLORS[c.estado]}`}>
                  {ESTADO_LABELS[c.estado]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pendientes */}
      {(pendientes?.length ?? 0) > 0 && (
        <div className="bg-white rounded-xl border border-amber-200 p-5 mb-6">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            Solicitudes pendientes de confirmar
          </h2>
          <div className="space-y-3">
            {pendientes!.map((c: Cita) => (
              <div key={c.id} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 text-sm">{c.nombre_paciente}</p>
                  <p className="text-xs text-slate-400">
                    {formatFechaCorta(c.fecha)} a las {c.hora_inicio} · {(c.servicios as any)?.nombre || '—'}
                  </p>
                </div>
                <Link
                  href="/admin/citas"
                  className="text-xs text-teal-600 hover:text-teal-800 font-medium flex items-center gap-1"
                >
                  Gestionar <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { href: '/admin/citas', label: 'Ver todas las citas', icon: CalendarClock },
          { href: '/admin/disponibilidad', label: 'Cambiar horarios', icon: Clock },
          { href: '/admin/contenido', label: 'Editar textos de la web', icon: ArrowRight },
        ].map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-colors text-sm font-medium text-slate-700"
          >
            <Icon className="w-4 h-4 text-teal-600 shrink-0" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
