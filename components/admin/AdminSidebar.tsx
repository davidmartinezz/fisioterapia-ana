'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileText, Briefcase, Image, GraduationCap,
  MessageSquareQuote, Calendar, CalendarClock, Phone, LogOut, X, Menu
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/admin', label: 'Panel principal', icon: LayoutDashboard, exact: true },
  { href: '/admin/citas', label: 'Citas', icon: CalendarClock },
  { href: '/admin/disponibilidad', label: 'Horarios', icon: Calendar },
  { href: '/admin/contenido', label: 'Textos de la web', icon: FileText },
  { href: '/admin/servicios', label: 'Servicios y precios', icon: Briefcase },
  { href: '/admin/fotos', label: 'Fotos', icon: Image },
  { href: '/admin/formacion', label: 'Formación', icon: GraduationCap },
  { href: '/admin/testimonios', label: 'Opiniones', icon: MessageSquareQuote },
  { href: '/admin/contacto', label: 'Datos de contacto', icon: Phone },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-teal-700">
        <p className="text-white font-bold text-sm">Panel de Ana</p>
        <p className="text-teal-300 text-xs">Administración</p>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {LINKS.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-white text-teal-700 font-medium'
                  : 'text-teal-100 hover:bg-teal-700 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-teal-700">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-teal-200 hover:bg-teal-700 hover:text-white transition-colors mb-1"
        >
          <X className="w-4 h-4" />
          Ver web pública
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-teal-200 hover:bg-teal-700 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 shrink-0 bg-teal-800 flex-col h-screen sticky top-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile: hamburger + drawer */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-teal-700 text-white rounded-lg shadow-lg"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-64 bg-teal-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-teal-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
