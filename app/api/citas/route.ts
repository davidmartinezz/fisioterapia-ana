export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { getSessionFromRequest } from '@/lib/auth'
import { sendConfirmationToPatient, sendNotificationToAna } from '@/lib/email'

// GET — solo admin
export async function GET(req: NextRequest) {
  if (!getSessionFromRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const sb = createServiceClient()
  const url = req.nextUrl
  const estado = url.searchParams.get('estado')
  const fecha = url.searchParams.get('fecha')
  const mes = url.searchParams.get('mes') // 'YYYY-MM'

  let query = sb
    .from('citas')
    .select('*, servicios(nombre)')
    .order('fecha', { ascending: true })
    .order('hora_inicio', { ascending: true })

  if (estado) query = query.eq('estado', estado)
  if (fecha) query = query.eq('fecha', fecha)
  if (mes) {
    query = query
      .gte('fecha', `${mes}-01`)
      .lte('fecha', `${mes}-31`)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ citas: data })
}

// POST — público (reserva de cita)
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { servicio_id, fecha, hora_inicio, nombre_paciente, telefono, email, motivo } = body

  if (!fecha || !hora_inicio || !nombre_paciente) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
  }

  const sb = createServiceClient()

  // Verificar que el hueco sigue libre
  const { data: existing } = await sb
    .from('citas')
    .select('id')
    .eq('fecha', fecha)
    .eq('hora_inicio', hora_inicio)
    .neq('estado', 'cancelada')
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'Este hueco ya no está disponible' }, { status: 409 })
  }

  const { data: cita, error } = await sb
    .from('citas')
    .insert({ servicio_id: servicio_id || null, fecha, hora_inicio, nombre_paciente, telefono, email, motivo })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Obtener datos del servicio para el email
  let servicio = null
  if (servicio_id) {
    const { data } = await sb.from('servicios').select('*').eq('id', servicio_id).single()
    servicio = data
  }

  // Enviar emails (sin bloquear la respuesta)
  Promise.all([
    sendConfirmationToPatient(cita, servicio),
    sendNotificationToAna(cita, servicio),
  ]).catch(console.error)

  return NextResponse.json({ cita }, { status: 201 })
}
