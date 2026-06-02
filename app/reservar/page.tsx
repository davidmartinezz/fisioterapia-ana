export const dynamic = 'force-dynamic'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import BookingCalendar from '@/components/public/BookingCalendar'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Reservar cita | Fisioterapeuta' }

export default async function ReservarPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold">Reserva tu cita</h1>
          <p className="text-teal-100 mt-2">Elige el día y hora que mejor te venga</p>
        </div>
      </section>

      <section className="py-12 pb-32 md:pb-12">
        <div className="max-w-2xl mx-auto px-4">
          <BookingCalendar servicios={servicios ?? []} />
        </div>
      </section>
    </>
  )
}
