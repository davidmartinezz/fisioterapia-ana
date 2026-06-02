import Image from 'next/image'
import Link from 'next/link'
import { Clock, Euro } from 'lucide-react'
import { Servicio } from '@/types'
import { formatPrecio } from '@/lib/utils'

interface ServiceCardProps {
  servicio: Servicio
}

export default function ServiceCard({ servicio }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {servicio.foto_url && (
        <div className="relative h-48 bg-slate-100">
          <Image
            src={servicio.foto_url}
            alt={servicio.nombre}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-800 text-lg mb-2">{servicio.nombre}</h3>
        {servicio.descripcion && (
          <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{servicio.descripcion}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            {servicio.duracion_min && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {servicio.duracion_min} min
              </span>
            )}
          </div>
          {servicio.precio != null && (
            <span className="flex items-center gap-0.5 font-bold text-teal-700 text-lg">
              {formatPrecio(servicio.precio)}
            </span>
          )}
        </div>
        <Link
          href="/reservar"
          className="mt-3 block text-center px-4 py-2 rounded-lg bg-cta text-white text-sm font-medium hover:bg-green-700 transition-colors"
        >
          Reservar cita
        </Link>
      </div>
    </div>
  )
}
