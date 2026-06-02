export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, createServerSupabaseClient } from '@/lib/supabase/server'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET() {
  const sb = createServerSupabaseClient()
  const { data, error } = await sb
    .from('servicios')
    .select('*')
    .eq('activo', true)
    .order('orden')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ servicios: data })
}

export async function POST(req: NextRequest) {
  if (!getSessionFromRequest(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const body = await req.json()
  const sb = createServiceClient()
  const { data, error } = await sb.from('servicios').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ servicio: data }, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  if (!getSessionFromRequest(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const body = await req.json() // [{ id, ...fields }] or { id, ...fields }
  const updates = Array.isArray(body) ? body : [body]
  const sb = createServiceClient()
  for (const { id, ...fields } of updates) {
    const { error } = await sb.from('servicios').update(fields).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!getSessionFromRequest(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await req.json()
  const sb = createServiceClient()
  const { error } = await sb.from('servicios').update({ activo: false }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
