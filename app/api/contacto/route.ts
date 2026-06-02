export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, createServerSupabaseClient } from '@/lib/supabase/server'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET() {
  const sb = createServerSupabaseClient()
  const { data, error } = await sb.from('contacto').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const map: Record<string, string> = {}
  for (const row of data ?? []) map[row.clave] = row.valor
  return NextResponse.json({ contacto: map })
}

export async function PATCH(req: NextRequest) {
  if (!getSessionFromRequest(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const updates = await req.json() // { clave, valor }[]
  const arr = Array.isArray(updates) ? updates : [updates]
  const sb = createServiceClient()
  for (const { clave, valor } of arr) {
    const { error } = await sb.from('contacto').update({ valor }).eq('clave', clave)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
