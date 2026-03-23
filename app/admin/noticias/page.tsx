import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil, Eye, EyeOff, Newspaper } from 'lucide-react'
import DeleteButton from '@/components/admin/DeleteButton'
import TogglePublishButton from '@/components/admin/TogglePublishButton'

export const metadata = { title: 'Noticias' }

export default async function NoticiasAdminPage() {
  const supabase = await createClient()
  const { data: noticias } = await supabase
    .from('noticias')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-stone-800 text-3xl font-bold">Noticias</h1>
          <p className="text-stone-500 text-sm mt-1">{noticias?.length ?? 0} noticias en total</p>
        </div>
        <Link
          href="/admin/noticias/nueva"
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-gold-500/25"
        >
          <Plus size={16} />
          Nueva noticia
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        {!noticias?.length ? (
          <div className="text-center py-20">
            <Newspaper size={40} className="text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500 font-medium">No hay noticias todavía</p>
            <Link href="/admin/noticias/nueva" className="text-gold-600 text-sm font-semibold mt-2 inline-block hover:text-gold-500">
              Crear la primera →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            <div className="grid grid-cols-12 px-5 py-3 bg-stone-50 text-stone-400 text-xs uppercase tracking-wide font-semibold">
              <span className="col-span-1">Estado</span>
              <span className="col-span-5">Título</span>
              <span className="col-span-2">Fecha</span>
              <span className="col-span-2">Iglesia</span>
              <span className="col-span-2 text-right">Acciones</span>
            </div>

            {noticias.map((n) => (
              <div key={n.id} className="grid grid-cols-12 items-center px-5 py-4 hover:bg-stone-50 transition-colors">
                {/* Estado */}
                <div className="col-span-1">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    n.publicada ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${n.publicada ? 'bg-green-500' : 'bg-stone-400'}`} />
                    {n.publicada ? 'Live' : 'Draft'}
                  </span>
                </div>

                <div className="col-span-5 min-w-0 pr-4">
                  <Link href={`/admin/noticias/${n.id}`} className="text-stone-800 text-sm font-medium hover:text-gold-600 transition-colors line-clamp-1">
                    {n.titulo}
                  </Link>
                  <p className="text-stone-400 text-xs mt-0.5 line-clamp-1">{n.resumen}</p>
                </div>

                <div className="col-span-2">
                  <span className="text-stone-500 text-xs">{n.fecha}</span>
                </div>

                <div className="col-span-2">
                  <span className="text-stone-400 text-xs">
                    {n.iglesia_id ? n.iglesia_id : 'Sede central'}
                  </span>
                </div>

                <div className="col-span-2 flex items-center justify-end gap-1">
                  <TogglePublishButton
                    table="noticias"
                    id={n.id}
                    publicada={n.publicada}
                  />
                  <Link
                    href={`/admin/noticias/${n.id}`}
                    className="w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-600 transition-colors"
                    title="Editar"
                  >
                    <Pencil size={14} />
                  </Link>
                  <DeleteButton table="noticias" id={n.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
