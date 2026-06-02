export const dynamic = 'force-dynamic'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { GraduationCap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sobre mí | Fisioterapeuta' }

export default async function SobreMiPage() {
  const sb = createServerSupabaseClient()

  const [{ data: contenidoData }, { data: formacion }, { data: fotos }] = await Promise.all([
    sb.from('contenido_sitio').select('clave, valor')
      .in('clave', ['hero_titulo', 'sobre_mi_bio', 'sobre_mi_foto_url']),
    sb.from('formacion').select('*').order('orden'),
    sb.from('galeria_fotos').select('*').eq('seccion', 'sobre_mi').order('orden'),
  ])

  const c: Record<string, string> = {}
  for (const row of contenidoData ?? []) c[row.clave] = row.valor

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 to-teal-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Sobre mí</h1>
          <p className="text-teal-100 mt-2">Conoce a la profesional que cuidará de ti</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Photo */}
            {c.sobre_mi_foto_url && (
              <div className="shrink-0">
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4]">
                  <Image
                    src={c.sobre_mi_foto_url}
                    alt={c.hero_titulo || 'Ana María González, fisioterapeuta'}
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Bio */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                {c.hero_titulo || 'Ana María González'}
              </h2>
              {c.sobre_mi_bio ? (
                <div
                  className="prose-content text-slate-600 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: c.sobre_mi_bio }}
                />
              ) : (
                <p className="text-slate-400 italic">Añade tu biografía desde el panel de administración.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Formación */}
      {(formacion?.length ?? 0) > 0 && (
        <section className="py-16 bg-teal-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Formación y titulaciones</h2>
            </div>
            <div className="space-y-4">
              {formacion!.map((f) => (
                <div key={f.id} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-teal-100">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-teal-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">{f.titulo}</p>
                    <p className="text-sm text-slate-500">
                      {f.institucion}{f.institucion && f.anio ? ' · ' : ''}{f.anio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Galería */}
      {(fotos?.length ?? 0) > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Mi espacio</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {fotos!.map((f) => (
                <div key={f.id} className="rounded-xl overflow-hidden aspect-square bg-slate-100">
                  <Image
                    src={f.url}
                    alt={f.alt_texto || 'Consulta de fisioterapia'}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
