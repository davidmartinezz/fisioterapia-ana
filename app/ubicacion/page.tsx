export const dynamic = 'force-dynamic'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import LocationSection from '@/components/public/LocationSection'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ubicación | Fisioterapeuta' }

export default async function UbicacionPage() {
  const sb = createServerSupabaseClient()
  const { data } = await sb
    .from('contenido_sitio')
    .select('clave, valor')
    .in('clave', ['ubicacion_direccion', 'ubicacion_maps_embed_url', 'ubicacion_maps_link', 'ubicacion_notas'])

  const c: Record<string, string> = {}
  for (const row of data ?? []) c[row.clave] = row.valor

  return (
    <>
      <section className="bg-gradient-to-br from-teal-700 to-teal-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Cómo llegar</h1>
          <p className="text-teal-100 mt-2">Consulta a domicilio en Leganés Norte, Madrid</p>
        </div>
      </section>

      <LocationSection
        direccion={c.ubicacion_direccion || ''}
        mapsEmbedUrl={c.ubicacion_maps_embed_url || ''}
        mapsLink={c.ubicacion_maps_link || '#'}
        notas={c.ubicacion_notas || ''}
      />
    </>
  )
}
