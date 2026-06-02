export const dynamic = 'force-dynamic'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import ServiceCard from '@/components/public/ServiceCard'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Servicios y precios | Fisioterapeuta' }

export default async function ServiciosPage() {
  const sb = createServerSupabaseClient()
  const { data: servicios } = await sb
    .from('servicios')
    .select('*')
    .eq('activo', true)
    .order('orden')

  return (
    <>
      <section className="bg-gradient-to-br from-teal-700 to-teal-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Servicios y precios</h1>
          <p className="text-teal-100 mt-2">Tratamientos personalizados para cada necesidad</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {(servicios?.length ?? 0) === 0 ? (
            <p className="text-center text-slate-400 py-16">Próximamente...</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicios!.map((s) => <ServiceCard key={s.id} servicio={s} />)}
            </div>
          )}

          <div className="mt-16 bg-teal-50 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">¿No encuentras lo que buscas?</h2>
            <p className="text-slate-500 mb-6">
              Cuéntame tu caso y valoraremos juntos el tratamiento más adecuado para ti.
            </p>
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cta text-white font-semibold hover:bg-green-700 transition-colors"
            >
              <CalendarDays className="w-5 h-5" />
              Pedir cita
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
