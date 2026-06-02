export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, createServerSupabaseClient } from '@/lib/supabase/server'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET() {
  const sb = createServerSupabaseClient()
  const { data, error } = await sb
    .from('bloqueos')
    .select('*')
    .order('inicio', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ bloqueos: data })
}

export async function POST(req: NextRequest) {
  if (!getSessionFromRequest(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const body = await req.json()
  const sb = createServiceClient()
  const { data, error } = await sb.from('bloqueos').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ bloqueo: data }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  if (!getSessionFromRequest(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await req.json()
  const sb = createServiceClient()
  const { error } = await sb.from('bloqueos').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
