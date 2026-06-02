export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, createServerSupabaseClient } from '@/lib/supabase/server'
import { getSessionFromRequest } from '@/lib/auth'

// GET — público (la web pública lee contenido)
export async function GET() {
  const sb = createServerSupabaseClient()
  const { data, error } = await sb.from('contenido_sitio').select('clave, valor, tipo')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const map: Record<string, string> = {}
  for (const row of data ?? []) map[row.clave] = row.valor
  return NextResponse.json({ contenido: map })
}

// PATCH — solo admin
export async function PATCH(req: NextRequest) {
  if (!getSessionFromRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json() // { clave: string, valor: string }[]
  const updates: { clave: string; valor: string }[] = Array.isArray(body) ? body : [body]

  const sb = createServiceClient()
  for (const { clave, valor } of updates) {
    const { error } = await sb
      .from('contenido_sitio')
      .update({ valor })
      .eq('clave', clave)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
