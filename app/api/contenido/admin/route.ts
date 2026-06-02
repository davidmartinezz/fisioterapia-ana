export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  if (!getSessionFromRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('contenido_sitio')
    .select('clave, valor, tipo, etiqueta, ayuda')
    .order('clave')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ campos: data })
}
