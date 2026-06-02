export const dynamic = 'force-dynamic'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Aviso Legal | Fisioterapeuta' }

export default async function AvisoLegalPage() {
  const sb = createServerSupabaseClient()
  const { data } = await sb
    .from('contenido_sitio')
    .select('valor')
    .eq('clave', 'aviso_legal_texto')
    .single()

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div
          className="prose-content text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data?.valor || '<p>Aviso legal en construcción.</p>' }}
        />
      </div>
    </section>
  )
}
