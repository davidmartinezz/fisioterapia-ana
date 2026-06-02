export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { calcularHuecosLibres, esFechaValida } from '@/lib/slots'

export async function GET(req: NextRequest) {
  const fecha = req.nextUrl.searchParams.get('fecha')
  if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return NextResponse.json({ error: 'Fecha inválida' }, { status: 400 })
  }
  if (!esFechaValida(fecha)) {
    return NextResponse.json({ huecos: [] })
  }

  const sb = createServiceClient()

  const [{ data: disponibilidad }, { data: citas }, { data: bloqueos }] = await Promise.all([
    sb.from('disponibilidad_semanal').select('*').eq('activo', true),
    sb.from('citas').select('*').eq('fecha', fecha).neq('estado', 'cancelada'),
    sb.from('bloqueos').select('*'),
  ])

  const huecos = calcularHuecosLibres(
    fecha,
    disponibilidad ?? [],
    citas ?? [],
    bloqueos ?? []
  )

  return NextResponse.json({ huecos })
}
