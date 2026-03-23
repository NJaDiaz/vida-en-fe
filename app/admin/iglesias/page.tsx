import Link from 'next/link'
import { MapPin, ExternalLink } from 'lucide-react'
import { iglesias } from '@/lib/iglesias'

export const metadata = { title: 'Iglesias' }

export default function IglesiasAdminPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-stone-800 text-3xl font-bold">Iglesias</h1>
        <p className="text-stone-500 text-sm mt-1">
          {iglesias.length} iglesias en la red · Datos estáticos en{' '}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs">lib/iglesias.ts</code>
        </p>
      </div>

      <div className="bg-gold-50 border border-gold-200 rounded-2xl p-5 mb-6 flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <p className="text-stone-700 text-sm font-semibold mb-1">¿Cómo editar los datos de una iglesia?</p>
          <p className="text-stone-600 text-sm leading-relaxed">
            Los datos de cada sede (nombre, dirección, pastores, horarios) están en el archivo{' '}
            <code className="bg-white border border-gold-200 px-1.5 py-0.5 rounded text-xs">lib/iglesias.ts</code>.
            Las <strong>noticias</strong> de cada sede se gestionan en la sección Noticias usando el campo "Iglesia".
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 px-5 py-3 bg-stone-50 text-stone-400 text-xs uppercase tracking-wide font-semibold border-b border-stone-100">
          <span className="col-span-1">#</span>
          <span className="col-span-4">Nombre</span>
          <span className="col-span-3">Ciudad</span>
          <span className="col-span-2">Pastores</span>
          <span className="col-span-2 text-right">Ver sitio</span>
        </div>
        <div className="divide-y divide-stone-100">
          {iglesias.map((ig, i) => (
            <div key={ig.id} className="grid grid-cols-12 items-center px-5 py-3.5 hover:bg-stone-50 transition-colors">
              <div className="col-span-1 text-stone-400 text-xs font-mono">{i + 1}</div>
              <div className="col-span-4">
                <p className="text-stone-700 text-sm font-medium">
                  {ig.nombre}
                  {ig.esMadre && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wide bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded-full">
                      Madre
                    </span>
                  )}
                </p>
              </div>
              <div className="col-span-3">
                <span className="flex items-center gap-1 text-stone-500 text-xs">
                  <MapPin size={11} className="text-gold-400 shrink-0" />
                  {ig.ciudad}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-stone-400 text-xs">
                  {ig.pastores.length} pastor{ig.pastores.length !== 1 ? 'es' : ''}
                </span>
              </div>
              <div className="col-span-2 flex justify-end">
                <Link
                  href={ig.esMadre ? '/' : `/iglesia/${ig.id}`}
                  target="_blank"
                  className="flex items-center gap-1 text-gold-600 hover:text-gold-500 text-xs font-semibold transition-colors"
                >
                  Ver <ExternalLink size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
