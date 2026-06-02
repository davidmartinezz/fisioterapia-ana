'use client'
import { CalendarDays, Mail } from 'lucide-react'
import { SITE } from '@/lib/static-data'

export default function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white border-t border-slate-200 shadow-lg">
      <div className="grid grid-cols-2 divide-x divide-slate-200">
        <a
          href="#contacto"
          className="flex items-center justify-center gap-2 py-4 text-white bg-teal-700 hover:bg-teal-800 font-semibold text-sm transition-colors"
        >
          <CalendarDays className="w-5 h-5" />
          Consultar
        </a>
        <a
          href={`mailto:${SITE.email}`}
          className="flex items-center justify-center gap-2 py-4 text-teal-700 bg-teal-50 hover:bg-teal-100 font-semibold text-sm transition-colors"
        >
          <Mail className="w-5 h-5" />
          Email
        </a>
      </div>
    </div>
  )
}
