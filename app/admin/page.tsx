import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Newspaper, PlayCircle, ArrowRight, MessageSquare, Plus } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: totalNoticias },
    { count: noticiasPublicadas },
    { count: totalPredicas },
    { count: predicasPublicadas },
    { count: contactosNuevos },
  ] = await Promise.all([
    supabase.from('noticias').select('*', { count: 'exact', head: true }),
    supabase.from('noticias').select('*', { count: 'exact', head: true }).eq('publicada', true),
    supabase.from('predicas').select('*', { count: 'exact', head: true }),
    supabase.from('predicas').select('*', { count: 'exact', head: true }).eq('publicada', true),
    supabase.from('contactos').select('*', { count: 'exact', head: true }).eq('leido', false).eq('archivado', false),
  ])

  const { data: ultimasNoticias } = await supabase
    .from('noticias')
    .select('id, titulo, publicada, fecha, created_at')
    .order('created_at', { ascending: false })
    .limit(4)

  const { data: ultimasPredicas } = await supabase
    .from('predicas')
    .select('id, titulo, publicada, fecha, pastor')
    .order('created_at', { ascending: false })
    .limit(4)

  const stats = [
    {
      label: 'Noticias publicadas',
      value: noticiasPublicadas ?? 0,
      total: totalNoticias ?? 0,
      icon: <Newspaper size={20} className="text-gold-500" />,
      href: '/admin/noticias',
      color: 'bg-gold-50 border-gold-200',
    },
    {
      label: 'Prédicas publicadas',
      value: predicasPublicadas ?? 0,
      total: totalPredicas ?? 0,
      icon: <PlayCircle size={20} className="text-gold-500" />,
      href: '/admin/predicas',
      color: 'bg-gold-50 border-gold-200',
    },
    {
      label: 'Mensajes sin leer',
      value: contactosNuevos ?? 0,
      total: null,
      icon: <MessageSquare size={20} className="text-gold-500" />,
      href: '/admin/contactos',
      color: (contactosNuevos ?? 0) > 0 ? 'bg-amber-50 border-amber-300' : 'bg-stone-50 border-stone-200',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-stone-800 text-3xl font-bold">Panel de control</h1>
        <p className="text-stone-500 text-sm mt-1">Gestioná noticias y prédicas de Vida en Fe</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {stats.map((s, i) => (
          <Link
            key={i}
            href={s.href}
            className={`bg-white border ${s.color} rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                {s.icon}
              </div>
              <ArrowRight size={16} className="text-stone-300 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="font-display text-4xl font-bold text-stone-800 mb-1">
              {s.value}
              {s.total !== null && (
                <span className="text-stone-300 text-xl font-normal"> / {s.total}</span>
              )}
            </p>
            <p className="text-stone-500 text-sm">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link
          href="/admin/noticias/nueva"
          className="flex items-center gap-3 bg-stone-800 hover:bg-stone-700 text-white rounded-2xl p-4 transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-gold-500/20 flex items-center justify-center shrink-0">
            <Plus size={18} className="text-gold-400" />
          </div>
          <div>
            <p className="font-semibold text-sm">Nueva noticia</p>
            <p className="text-white/50 text-xs">Publicar en el sitio</p>
          </div>
          <ArrowRight size={15} className="text-white/30 ml-auto group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <Link
          href="/admin/predicas/nueva"
          className="flex items-center gap-3 bg-stone-800 hover:bg-stone-700 text-white rounded-2xl p-4 transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-gold-500/20 flex items-center justify-center shrink-0">
            <Plus size={18} className="text-gold-400" />
          </div>
          <div>
            <p className="font-semibold text-sm">Nueva prédica</p>
            <p className="text-white/50 text-xs">Subir YouTube o Spotify</p>
          </div>
          <ArrowRight size={15} className="text-white/30 ml-auto group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
            <h3 className="font-semibold text-stone-700 text-sm flex items-center gap-2">
              <Newspaper size={15} className="text-gold-500" />
              Últimas noticias
            </h3>
            <Link href="/admin/noticias" className="text-gold-600 text-xs font-semibold hover:text-gold-500">
              Ver todas →
            </Link>
          </div>
          <div className="divide-y divide-stone-100">
            {ultimasNoticias?.length === 0 && (
              <p className="text-stone-400 text-sm text-center py-8">Sin noticias todavía</p>
            )}
            {ultimasNoticias?.map((n) => (
              <Link
                key={n.id}
                href={`/admin/noticias/${n.id}`}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-stone-50 transition-colors group"
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${n.publicada ? 'bg-green-400' : 'bg-stone-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-stone-700 text-sm font-medium truncate group-hover:text-gold-600 transition-colors">
                    {n.titulo}
                  </p>
                  <p className="text-stone-400 text-xs">{n.fecha}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${
                  n.publicada ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-500'
                }`}>
                  {n.publicada ? 'Publicada' : 'Borrador'}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
            <h3 className="font-semibold text-stone-700 text-sm flex items-center gap-2">
              <PlayCircle size={15} className="text-gold-500" />
              Últimas prédicas
            </h3>
            <Link href="/admin/predicas" className="text-gold-600 text-xs font-semibold hover:text-gold-500">
              Ver todas →
            </Link>
          </div>
          <div className="divide-y divide-stone-100">
            {ultimasPredicas?.length === 0 && (
              <p className="text-stone-400 text-sm text-center py-8">Sin prédicas todavía</p>
            )}
            {ultimasPredicas?.map((p) => (
              <Link
                key={p.id}
                href={`/admin/predicas/${p.id}`}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-stone-50 transition-colors group"
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${p.publicada ? 'bg-green-400' : 'bg-stone-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-stone-700 text-sm font-medium truncate group-hover:text-gold-600 transition-colors">
                    {p.titulo}
                  </p>
                  <p className="text-stone-400 text-xs">{p.pastor} · {p.fecha}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${
                  p.publicada ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-500'
                }`}>
                  {p.publicada ? 'Publicada' : 'Borrador'}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
