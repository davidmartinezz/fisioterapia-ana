export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, createServerSupabaseClient } from '@/lib/supabase/server'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const seccion = req.nextUrl.searchParams.get('seccion')
  const sb = createServerSupabaseClient()
  let query = sb.from('galeria_fotos').select('*').order('orden')
  if (seccion) query = query.eq('seccion', seccion)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ fotos: data })
}

export async function POST(req: NextRequest) {
  if (!getSessionFromRequest(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const body = await req.json()
  const sb = createServiceClient()
  const { data, error } = await sb.from('galeria_fotos').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ foto: data }, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  if (!getSessionFromRequest(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id, ...fields } = await req.json()
  const sb = createServiceClient()
  const { error } = await sb.from('galeria_fotos').update(fields).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!getSessionFromRequest(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id, path } = await req.json()
  const sb = createServiceClient()
  if (path) {
    await sb.storage.from('fisioterapia-media').remove([path])
  }
  const { error } = await sb.from('galeria_fotos').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
