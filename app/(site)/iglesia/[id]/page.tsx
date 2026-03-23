import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Clock, Users, ArrowLeft, Phone, Mail, Instagram, ChevronRight, ArrowRight, Heart } from 'lucide-react'
import { iglesias } from '@/lib/iglesias'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 3600

interface Props { params: { id: string } }

export async function generateStaticParams() {
  return iglesias.filter(i => !i.esMadre).map(i => ({ id: i.id }))
}

export async function generateMetadata({ params }: Props) {
  const ig = iglesias.find(i => i.id === params.id)
  if (!ig) return {}
  return {
    title: `${ig.nombre} | Vida en Fe`,
    description: `Iglesia ${ig.nombre} — ${ig.direccion}. Horarios, pastores y actividades.`,
  }
}

export default async function IglesiaPage({ params }: Props) {
  const ig = iglesias.find(i => i.id === params.id && !i.esMadre)
  if (!ig) notFound()

  const supabase = await createClient()
  const { data: noticiasDB } = await supabase
    .from('noticias')
    .select('*')
    .eq('publicada', true)
    .eq('iglesia_id', params.id)
    .order('created_at', { ascending: false })
    .limit(3)

  const noticiasIglesia = (noticiasDB && noticiasDB.length > 0) ? noticiasDB : ig.noticias

  return (
    <>
      <section className="relative h-[65vh] min-h-[460px] flex items-end pb-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={ig.fotoHero}
            alt={ig.nombre}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-stone-900/20" />
          <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 30% 70%, rgba(212,137,26,0.18) 0%, transparent 55%)'}} />
        </div>

        <Link
          href="/#iglesias"
          className="absolute top-24 left-4 sm:left-8 z-20 flex items-center gap-2 text-white/60 hover:text-white bg-black/30 backdrop-blur-md hover:bg-black/50 px-4 py-2 rounded-full text-sm transition-all"
        >
          <ArrowLeft size={15} />
          Ver todas las iglesias
        </Link>

        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gold-400/20 backdrop-blur-sm border border-gold-400/35 text-gold-200 text-xs uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full mb-4">
              <MapPin size={11} />
              {ig.ciudad} · San Luis
            </div>

            <div className="mb-6">
              <p className="font-display text-white/60 text-xl md:text-2xl font-normal italic mb-1">Vida en Fe</p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight">
                <span className="text-gold-300">{ig.ciudad}</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-stone-950 border-b border-white/10 sticky top-[64px] md:top-[80px] z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-4">
          <p className="text-white/50 text-sm hidden sm:block truncate">{ig.direccion}</p>
          <div className="flex items-center gap-3 ml-auto">
            <a
              href={ig.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(ig.direccion)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-white text-xs font-bold px-4 py-2 rounded-full transition-all"
            >
              <MapPin size={13} />
              Cómo llegar
            </a>
            {ig.wssp && (
            <a
              href={`https://wa.me/${encodeURIComponent(ig.wssp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5c] text-white text-xs font-bold px-4 py-2 rounded-full transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
            )}
          </div>
        </div>
      </div>

      <div className="bg-warm-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
          <div className="grid lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2 space-y-14">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-gold-500 text-xs uppercase tracking-widest font-bold">Pastores a cargo</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-gold-300/60 to-transparent" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {ig.pastores.map((p, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:border-gold-200 hover:shadow-md transition-all duration-200">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gold-100 shrink-0 shadow-sm">
                        {p.foto
                          ? <img src={p.foto} alt={p.nombre} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center"><Users size={26} className="text-gold-400" /></div>
                        }
                      </div>
                      <div>
                        <p className="font-display text-stone-800 font-semibold leading-snug">{p.nombre}</p>
                        <p className="text-gold-600 text-xs font-semibold uppercase tracking-wide mt-0.5">{p.rol}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-gold-500 text-xs uppercase tracking-widest font-bold">Horarios de reunión</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-gold-300/60 to-transparent" />
                </div>
                <div className="space-y-3">
                  {ig.horarios.map((h, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-stone-100 shadow-sm hover:border-gold-200 hover:shadow-md transition-all duration-200 group">
                      <div className="w-10 h-10 rounded-xl bg-gold-50 group-hover:bg-gold-100 flex items-center justify-center shrink-0 transition-colors">
                        <Clock size={17} className="text-gold-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-stone-700 font-medium text-sm">{h.actividad}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-gold-600 font-bold text-sm">{h.dia}</p>
                        <p className="text-stone-400 text-xs">{h.hora} hs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-gold-500 text-xs uppercase tracking-widest font-bold">Actividades</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-gold-300/60 to-transparent" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ig.actividades.map((act, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-stone-100 hover:border-gold-200 hover:shadow-sm transition-all duration-200 group">
                      <Heart size={13} className="text-gold-400 shrink-0 group-hover:text-gold-500 transition-colors" />
                      <span className="text-stone-600 text-sm">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {noticiasIglesia.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-gold-500 text-xs uppercase tracking-widest font-bold">Noticias recientes</span>
                    <span className="flex-1 h-px bg-gradient-to-r from-gold-300/60 to-transparent" />
                  </div>
                  <div className="space-y-4">
                    {noticiasIglesia.map((n: any, i: number) => (
                      <article key={i} className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:border-gold-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group flex gap-0">
                        {n.imagen && (
                          <div className="w-28 sm:w-36 shrink-0 overflow-hidden">
                            <img
                              src={n.imagen_url || n.imagen}
                              alt={n.titulo}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-5">
                          <span className="inline-block bg-gold-100 text-gold-700 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-2">
                            {n.fecha}
                          </span>
                          <h3 className="font-display text-stone-800 font-semibold text-base leading-snug mb-1 group-hover:text-gold-600 transition-colors">
                            {n.titulo}
                          </h3>
                          <p className="text-stone-500 text-xs leading-relaxed line-clamp-2">{n.resumen}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-5">

              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sticky top-[132px]">
                <h3 className="font-display text-stone-800 font-semibold text-lg mb-5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold-400" />
                  Información
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin size={14} className="text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-stone-400 text-[10px] uppercase tracking-wide mb-0.5">Dirección</p>
                      <p className="text-stone-700 text-sm">{ig.direccion}</p>
                    </div>
                  </div>
                  {ig.telefono && (
                    <a href={`tel:${ig.telefono}`} className="flex items-start gap-3 group">
                      <Phone size={14} className="text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-stone-400 text-[10px] uppercase tracking-wide mb-0.5">Teléfono</p>
                        <p className="text-stone-700 text-sm group-hover:text-gold-600 transition-colors">{ig.telefono}</p>
                      </div>
                    </a>
                  )}
                  {ig.email && (
                    <a href={`mailto:${ig.email}`} className="flex items-start gap-3 group">
                      <Mail size={14} className="text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-stone-400 text-[10px] uppercase tracking-wide mb-0.5">Email</p>
                        <p className="text-stone-700 text-sm group-hover:text-gold-600 transition-colors">{ig.email}</p>
                      </div>
                    </a>
                  )}
                  {ig.instagram && (
                    <div className="flex items-start gap-3">
                      <Instagram size={14} className="text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-stone-400 text-[10px] uppercase tracking-wide mb-0.5">Instagram</p>
                        <p className="text-stone-700 text-sm">{ig.instagram}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5">
                  <a
                    href={ig.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(ig.direccion)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-white py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-gold-500/25 hover:-translate-y-px"
                  >
                    <MapPin size={15} />
                    Ver en Google Maps
                  </a>
                 {ig.wssp && (
                  <a
                    href={`https://wa.me/${encodeURIComponent(ig.wssp)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-px"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    Escribir por WhatsApp
                  </a>
                  )}
                </div>
              </div>

              <div className="bg-stone-900 rounded-2xl p-5 text-center">
                <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center mx-auto mb-3">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1.5L10.854 6.9H16.5L11.823 10.2L13.677 15.6L9 12.3L4.323 15.6L6.177 10.2L1.5 6.9H7.146L9 1.5Z" fill="#d4891a"/>
                  </svg>
                </div>
                <p className="font-display text-gold-300 text-sm italic mb-1">"Una familia en fe"</p>
                <p className="text-white/40 text-xs mb-4 leading-snug">Somos parte de Vida en Fe · Plantando iglesias en San Luis</p>
                <Link
                  href="/#iglesias"
                  className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 text-sm font-semibold transition-colors"
                >
                  Ver todas las iglesias
                  <ChevronRight size={14} />
                </Link>
              </div>

              <Link
                href="/predicas"
                className="flex items-center gap-3 bg-stone-950 rounded-2xl p-5 border border-white/5 hover:border-gold-400/20 transition-all hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4891a" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">Ver prédicas</p>
                  <p className="text-white/40 text-xs">Spotify · YouTube</p>
                </div>
                <ArrowRight size={15} className="text-white/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
