export const dynamic = 'force-dynamic'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Política de Privacidad | Fisioterapeuta' }

export default async function PrivacidadPage() {
  const sb = createServerSupabaseClient()
  const { data } = await sb
    .from('contenido_sitio')
    .select('valor')
    .eq('clave', 'privacidad_texto')
    .single()

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div
          className="prose-content text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data?.valor || '<p>Política de privacidad en construcción.</p>' }}
        />
      </div>
    </section>
  )
}
