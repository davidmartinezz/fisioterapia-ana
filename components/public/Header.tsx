'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#tecnicas', label: 'Tratamientos' },
  { href: '#patologias', label: 'Patologías' },
  { href: '#tarifas', label: 'Tarifas' },
  { href: '#resenas', label: 'Opiniones' },
]

interface HeaderProps {
  nombre: string
  mapsUrl: string
}

export default function Header({ nombre, mapsUrl }: HeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-teal-700 text-lg leading-tight">
          {nombre || 'Ana María González'}
          <span className="block text-xs font-normal text-slate-500">Fisioterapeuta</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#contacto"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-white bg-teal-700 hover:bg-teal-800 font-medium transition-colors"
          >
            <CalendarDays className="w-4 h-4" />
            Consultar
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Menú"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn('md:hidden border-t border-slate-100', open ? 'block' : 'hidden')}>
        <nav className="flex flex-col py-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mx-4 my-2 px-4 py-3 rounded-lg text-center text-white bg-teal-700 font-medium text-sm"
          >
            Consultar mi caso
          </a>
        </nav>
      </div>
    </header>
  )
}
