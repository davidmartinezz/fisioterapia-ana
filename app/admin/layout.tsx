import { Inter } from 'next/font/google'
import '../globals.css'
import AdminSidebar from '@/components/admin/AdminSidebar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 min-w-0 md:pl-0 pl-0">
            <div className="p-4 md:p-8 md:pt-8 pt-16">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
