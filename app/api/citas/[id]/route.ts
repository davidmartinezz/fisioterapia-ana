export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { getSessionFromRequest } from '@/lib/auth'
import { sendConfirmationStatusToPatient } from '@/lib/email'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!getSessionFromRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const sb = createServiceClient()

  const { data: cita, error } = await sb
    .from('citas')
    .update(body)
    .eq('id', params.id)
    .select('*, servicios(nombre)')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Si se cambió el estado a confirmada o cancelada, notificar al paciente
  if (body.estado && (body.estado === 'confirmada' || body.estado === 'cancelada')) {
    const servicio = cita.servicios ? { nombre: (cita.servicios as { nombre: string }).nombre } : null
    sendConfirmationStatusToPatient(cita, servicio as any).catch(console.error)
  }

  return NextResponse.json({ cita })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!getSessionFromRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const sb = createServiceClient()
  const { error } = await sb.from('citas').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
