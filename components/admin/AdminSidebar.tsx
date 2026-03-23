'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Newspaper, PlayCircle, Church, LogOut, Menu, X, ExternalLink, MessageSquare } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/admin', label: 'Panel', icon: LayoutDashboard, exact: true },
  { href: '/admin/noticias', label: 'Noticias', icon: Newspaper },
  { href: '/admin/predicas', label: 'Prédicas', icon: PlayCircle },
  { href: '/admin/contactos', label: 'Contactos', icon: MessageSquare },
  { href: '/admin/iglesias', label: 'Iglesias', icon: Church },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-stone-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-sm">
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
              <path d="M9 1.5L10.854 6.9H16.5L11.823 10.2L13.677 15.6L9 12.3L4.323 15.6L6.177 10.2L1.5 6.9H7.146L9 1.5Z" fill="white"/>
            </svg>
          </div>
          <div>
            <p className="font-display text-stone-800 font-bold text-sm leading-none">Vida en Fe</p>
            <p className="text-stone-400 text-[10px] uppercase tracking-wider mt-0.5">Panel de administración</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              isActive(href, exact)
                ? 'bg-gold-500 text-white shadow-sm shadow-gold-500/30'
                : 'text-stone-600 hover:bg-stone-200 hover:text-stone-800'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-stone-200 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-500 hover:bg-stone-200 hover:text-stone-700 transition-all w-full"
        >
          <ExternalLink size={16} />
          Ver sitio público
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all w-full"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-stone-600"
      >
        <Menu size={20} />
      </button>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative z-50 w-64 bg-white shadow-2xl">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
              <X size={20} />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      <aside className="hidden lg:flex w-60 xl:w-64 bg-white border-r border-stone-200 shrink-0 flex-col">
        <SidebarContent />
      </aside>
    </>
  )
}
