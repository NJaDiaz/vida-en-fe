import Link from 'next/link'
import { ArrowLeft, Play, Music, ExternalLink, Youtube, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Prédicas | Vida en Fe',
  description: 'Escuchá y mirá todas las prédicas de Vida en Fe en Spotify y YouTube.',
}

export const revalidate = 3600

export default async function PredicasPage() {
  const supabase = await createClient()
  const { data: predicas } = await supabase
    .from('predicas')
    .select('*')
    .eq('publicada', true)
    .order('created_at', { ascending: false })
    .limit(12)

  const latest = predicas?.[0]
  const rest = predicas?.slice(1) ?? []

  return (
    <>
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,137,26,0.2) 0%, transparent 70%)'}} />
          {['♪','♫','♩','♬'].map((n, i) => (
            <span key={i} className="absolute text-gold-500/10 text-7xl select-none animate-float"
              style={{ left:`${15+i*22}%`, top:`${20+(i%2)*30}%`, animationDelay:`${i*1.5}s`, animationDuration:`${6+i}s` }}>
              {n}
            </span>
          ))}
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm mb-8 transition-colors">
            <ArrowLeft size={15} />Volver al inicio
          </Link>
          <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-4">Mensajes y enseñanzas</p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-5 leading-tight">
            Todas las<br /><span className="text-gold-300 italic">prédicas</span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">
            Escuchá, mirá y crecé. Subimos un nuevo mensaje cada domingo.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/8 border border-white/15 px-4 py-2 rounded-full text-sm text-white/70">
              <div className="w-4 h-4 rounded-full bg-[#1DB954] flex items-center justify-center"><Music size={9} className="text-black" /></div>
              Spotify Podcast
            </div>
            <div className="flex items-center gap-2 bg-white/8 border border-white/15 px-4 py-2 rounded-full text-sm text-white/70">
              <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center"><Play size={8} className="text-white ml-0.5" fill="white" /></div>
              YouTube
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#1DB954] flex items-center justify-center">
                <Music size={20} className="text-black" />
              </div>
              <div>
                <h2 className="font-display text-white text-2xl font-semibold">En Spotify</h2>
                <p className="text-white/40 text-sm">Podcast semanal · escuchá cuando quieras</p>
              </div>
            </div>
            <a href="https://open.spotify.com/show/REEMPLAZAR-ID" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[#1DB954] hover:text-green-400 text-sm font-semibold transition-colors">
              Abrir en Spotify <ExternalLink size={13} />
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/8">
            <iframe src="https://open.spotify.com/embed/show/1Dm4T50A223lsmaRJw8fpr?utm_source=generator&theme=0"
              width="100%" height="380" frameBorder="0" allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy" title="Vida en Fe Podcast en Spotify" />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center">
                <Youtube size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-display text-stone-800 text-2xl font-semibold">YouTube</h2>
                <p className="text-stone-500 text-sm">{predicas?.length ?? 0} mensajes disponibles</p>
              </div>
            </div>
            <a href="https://youtube.com/@vidaenfe" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
              <Youtube size={14} />Suscribite al canal
            </a>
          </div>

          {!predicas?.length ? (
            <div className="text-center py-20">
              <Play size={40} className="text-stone-300 mx-auto mb-3" />
              <p className="text-stone-500">Pronto habrá prédicas disponibles aquí</p>
              <p className="text-stone-400 text-sm mt-1">El administrador aún no publicó ninguna</p>
            </div>
          ) : (
            <>
              {latest && (
                <div className="grid lg:grid-cols-5 gap-6 mb-8">
                  <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-lg bg-black border border-stone-200">
                    <div className="aspect-video">
                      {latest.youtube_id ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${latest.youtube_id}?rel=0`}
                          width="100%" height="100%" frameBorder="0" allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          title={latest.titulo}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-900">
                          <Play size={48} className="text-stone-600" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">Última prédica</span>
                        <span className="text-stone-400 text-xs">{latest.fecha}</span>
                      </div>
                      <h3 className="font-display text-stone-800 text-xl font-semibold mb-1">{latest.titulo}</h3>
                      <p className="text-stone-500 text-sm">{latest.pastor}{latest.duracion ? ` · ${latest.duracion}` : ''}</p>
                      {latest.descripcion && <p className="text-stone-500 text-sm mt-2 leading-relaxed line-clamp-2">{latest.descripcion}</p>}
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-3">
                    <h4 className="font-display text-stone-700 font-semibold text-sm uppercase tracking-wide mb-4">Anteriores</h4>
                    {rest.slice(0, 4).map((p) => (
                      <a key={p.id}
                        href={p.youtube_id ? `https://www.youtube.com/watch?v=${p.youtube_id}` : '#'}
                        target={p.youtube_id ? '_blank' : '_self'} rel="noopener noreferrer"
                        className="flex gap-3 p-3 bg-white rounded-xl border border-stone-100 hover:border-gold-200 hover:shadow-md transition-all group"
                      >
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                          <img
                            src={p.imagen_url || (p.youtube_id ? `https://img.youtube.com/vi/${p.youtube_id}/mqdefault.jpg` : 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=300&q=60')}
                            alt={p.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
                              <Play size={10} className="text-stone-800 ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                          {p.duracion && <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 py-0.5 rounded">{p.duracion}</div>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-stone-400 text-[10px]">{p.fecha}</p>
                          <h4 className="font-display text-stone-700 text-sm font-semibold leading-snug mt-0.5 group-hover:text-gold-600 transition-colors line-clamp-2">{p.titulo}</h4>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {rest.length > 4 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {rest.slice(4).map((p) => (
                    <a key={p.id}
                      href={p.youtube_id ? `https://www.youtube.com/watch?v=${p.youtube_id}` : '#'}
                      target={p.youtube_id ? '_blank' : '_self'} rel="noopener noreferrer"
                      className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:border-gold-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className="relative aspect-video overflow-hidden bg-stone-100">
                        <img
                          src={p.imagen_url || (p.youtube_id ? `https://img.youtube.com/vi/${p.youtube_id}/mqdefault.jpg` : '')}
                          alt={p.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                            <Play size={16} className="text-stone-800 ml-1" fill="currentColor" />
                          </div>
                        </div>
                        {p.duracion && <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{p.duracion}</div>}
                      </div>
                      <div className="p-4">
                        <p className="text-stone-400 text-[10px] mb-1">{p.fecha}</p>
                        <h3 className="font-display text-stone-800 font-semibold text-sm leading-snug group-hover:text-gold-600 transition-colors line-clamp-2">{p.titulo}</h3>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-stone-100">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">
          <a href="https://whatsapp.com/channel/0029Vb6goWqD38CULhFEIB1J" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#064e3b] hover:bg-[#065f46] text-white rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </div>
            <div>
              <p className="font-semibold text-sm">Canal de WhatsApp</p>
              <p className="text-white/50 text-xs mt-0.5">Novedades y avisos cada semana</p>
            </div>
            <ArrowRight size={16} className="text-white/40 ml-auto group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex flex-col items-center justify-center bg-warm-50 rounded-2xl p-5 border border-gold-100 text-center">
            <p className="font-display text-stone-600 text-base italic mb-1">"La fe viene por el oír"</p>
            <p className="text-stone-400 text-xs mb-3">Romanos 10:17</p>
            <Link href="/#iglesias" className="text-gold-600 text-sm font-semibold hover:text-gold-500 transition-colors inline-flex items-center gap-1">
              Encontrá tu iglesia <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
