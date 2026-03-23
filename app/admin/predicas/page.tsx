import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil, PlayCircle } from 'lucide-react'
import DeleteButton from '@/components/admin/DeleteButton'
import TogglePublishButton from '@/components/admin/TogglePublishButton'

export const metadata = { title: 'Prédicas' }

export default async function PredicasAdminPage() {
  const supabase = await createClient()
  const { data: predicas } = await supabase
    .from('predicas')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-stone-800 text-3xl font-bold">Prédicas</h1>
          <p className="text-stone-500 text-sm mt-1">{predicas?.length ?? 0} prédicas en total</p>
        </div>
        <Link
          href="/admin/predicas/nueva"
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-gold-500/25"
        >
          <Plus size={16} />
          Nueva prédica
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        {!predicas?.length ? (
          <div className="text-center py-20">
            <PlayCircle size={40} className="text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500 font-medium">No hay prédicas todavía</p>
            <Link href="/admin/predicas/nueva" className="text-gold-600 text-sm font-semibold mt-2 inline-block">
              Agregar la primera →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            <div className="grid grid-cols-12 px-5 py-3 bg-stone-50 text-stone-400 text-xs uppercase tracking-wide font-semibold">
              <span className="col-span-1">Estado</span>
              <span className="col-span-4">Título</span>
              <span className="col-span-2">Pastor</span>
              <span className="col-span-2">Fecha</span>
              <span className="col-span-1">YT</span>
              <span className="col-span-2 text-right">Acciones</span>
            </div>

            {predicas.map((p) => (
              <div key={p.id} className="grid grid-cols-12 items-center px-5 py-4 hover:bg-stone-50 transition-colors">
                <div className="col-span-1">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    p.publicada ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${p.publicada ? 'bg-green-500' : 'bg-stone-400'}`} />
                    {p.publicada ? 'Live' : 'Draft'}
                  </span>
                </div>
                <div className="col-span-4 min-w-0 pr-3">
                  <Link href={`/admin/predicas/${p.id}`} className="text-stone-800 text-sm font-medium hover:text-gold-600 transition-colors line-clamp-1">
                    {p.titulo}
                  </Link>
                  {p.duracion && <span className="text-stone-400 text-xs">{p.duracion}</span>}
                </div>
                <div className="col-span-2">
                  <span className="text-stone-500 text-xs">{p.pastor}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-400 text-xs">{p.fecha}</span>
                </div>
                <div className="col-span-1">
                  {p.youtube_id
                    ? <a href={`https://youtube.com/watch?v=${p.youtube_id}`} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors" title="Ver en YouTube">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                      </a>
                    : <span className="text-stone-300 text-xs">—</span>
                  }
                </div>
                <div className="col-span-2 flex items-center justify-end gap-1">
                  <TogglePublishButton table="predicas" id={p.id} publicada={p.publicada} />
                  <Link href={`/admin/predicas/${p.id}`} className="w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-600 transition-colors" title="Editar">
                    <Pencil size={14} />
                  </Link>
                  <DeleteButton table="predicas" id={p.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
