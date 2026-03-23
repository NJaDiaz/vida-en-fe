import { createClient } from '@/lib/supabase/server'
import { Mail, MailOpen, Trash2, Clock, MapPin, Phone } from 'lucide-react'
import MarkReadButton from '@/components/admin/MarkReadButton'
import DeleteButton from '@/components/admin/DeleteButton'
import { iglesias } from '@/lib/iglesias'

export const metadata = { title: 'Mensajes de contacto' }

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 60) return `hace ${mins} min`
  if (hours < 24) return `hace ${hours} h`
  if (days < 7) return `hace ${days} días`
  return new Date(dateStr).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })
}

export default async function ContactosAdminPage() {
  const supabase = await createClient()
  const { data: contactos } = await supabase
    .from('contactos')
    .select('*')
    .eq('archivado', false)
    .order('created_at', { ascending: false })

  const noLeidos = contactos?.filter(c => !c.leido).length ?? 0

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-stone-800 text-3xl font-bold">Contactos</h1>
            {noLeidos > 0 && (
              <span className="bg-gold-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {noLeidos} nuevo{noLeidos !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <p className="text-stone-500 text-sm mt-1">
            {contactos?.length ?? 0} mensajes en total
          </p>
        </div>
      </div>

      {!contactos?.length ? (
        <div className="bg-white rounded-2xl border border-stone-200 text-center py-20">
          <Mail size={40} className="text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500 font-medium">Sin mensajes todavía</p>
          <p className="text-stone-400 text-sm mt-1">Los mensajes del formulario de contacto aparecerán aquí</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contactos.map((c) => {
            const iglesiaLabel = c.iglesia_id
              ? iglesias.find(i => i.id === c.iglesia_id)?.ciudad ?? c.iglesia_id
              : null

            return (
              <div
                key={c.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  !c.leido
                    ? 'border-gold-200 shadow-md shadow-gold-500/10'
                    : 'border-stone-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-100">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${!c.leido ? 'bg-gold-500' : 'bg-stone-200'}`} />

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-semibold ${!c.leido ? 'text-stone-900' : 'text-stone-600'}`}>
                          {c.nombre}
                        </span>
                        {!c.leido && (
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded-full">
                            Nuevo
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-wrap mt-0.5">
                        <a href={`mailto:${c.email}`} className="text-gold-600 text-xs hover:underline">
                          {c.email}
                        </a>
                        {c.telefono && (
                          <span className="text-stone-400 text-xs flex items-center gap-1">
                            <Phone size={10} />{c.telefono}
                          </span>
                        )}
                        {iglesiaLabel && (
                          <span className="text-stone-400 text-xs flex items-center gap-1">
                            <MapPin size={10} />{iglesiaLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <span className="text-stone-400 text-xs flex items-center gap-1 hidden sm:flex">
                      <Clock size={11} />{timeAgo(c.created_at)}
                    </span>
                    <MarkReadButton id={c.id} leido={c.leido} />
                    <DeleteButton table="contactos" id={c.id} />
                  </div>
                </div>

                <div className="px-5 py-4">
                  <p className={`text-sm leading-relaxed whitespace-pre-wrap ${!c.leido ? 'text-stone-700' : 'text-stone-500'}`}>
                    {c.mensaje}
                  </p>
                </div>

                <div className="px-5 py-3 bg-stone-50 flex items-center gap-3 border-t border-stone-100">
                  <a
                    href={`mailto:${c.email}?subject=Re: Mensaje de Vida en Fe`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gold-600 hover:text-gold-500 transition-colors"
                  >
                    <Mail size={13} />
                    Responder por email
                  </a>
                  {c.telefono && (
                    <>
                      <span className="text-stone-300">·</span>
                      <a
                        href={`https://wa.me/${c.telefono.replace(/\D/g, '')}?text=Hola ${c.nombre}, te escribimos desde Vida en Fe`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:text-green-500 transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        Responder por WhatsApp
                      </a>
                    </>
                  )}
                  <span className="text-stone-300 text-xs ml-auto hidden sm:block">
                    {new Date(c.created_at).toLocaleString('es-AR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
