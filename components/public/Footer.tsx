import Link from 'next/link'
import { MapPin, Mail } from 'lucide-react'
import { SITE, DISPONIBILIDAD } from '@/lib/static-data'

interface FooterProps {
  nombre: string
  contacto: Record<string, string>
}

export default function Footer({ nombre }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-800 text-slate-300 pt-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <p className="text-white font-bold text-lg mb-1">{nombre || 'Ana María González Gómez'}</p>
          <p className="text-teal-400 text-sm mb-4">Fisioterapeuta Colegiada · Nº {SITE.numeroColegiada}</p>
          <p className="text-slate-400 text-sm">Leganés, Madrid</p>
          <p className="text-slate-400 text-sm">Atención personalizada y a domicilio</p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-semibold mb-4">Contacto</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-teal-400 shrink-0" />
              Leganés, Madrid · Dirección facilitada al concertar cita
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors break-all">
                {SITE.email}
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <p className="text-white font-semibold text-sm mb-2">Horario</p>
            <ul className="space-y-1 text-sm text-slate-400">
              {DISPONIBILIDAD.map((d) => (
                <li key={d.dia}><span className="text-slate-300">{d.dia}</span> · {d.hora}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div>
          <p className="text-white font-semibold mb-4">Acceso rápido</p>
          <ul className="space-y-2 text-sm mb-6">
            <li><a href="#sobre-mi" className="hover:text-white transition-colors">Sobre mí</a></li>
            <li><a href="#tecnicas" className="hover:text-white transition-colors">Tratamientos</a></li>
            <li><a href="#tarifas" className="hover:text-white transition-colors">Tarifas</a></li>
            <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
          </ul>
          <p className="text-white font-semibold mb-2 text-sm">Legal</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/aviso-legal" className="hover:text-white transition-colors">Aviso legal</Link></li>
            <li><Link href="/privacidad" className="hover:text-white transition-colors">Política de privacidad</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10 pt-6 border-t border-slate-700 text-center text-xs text-slate-500">
        © {year} {nombre || 'Ana María González Gómez'} · Fisioterapeuta. Todos los derechos reservados.
      </div>
    </footer>
  )
}
