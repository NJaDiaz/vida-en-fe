import Link from 'next/link'
import { MapPin, Clock, Users, Heart, ArrowRight, Music } from 'lucide-react'
import IglesiaCarousel from '@/components/IglesiaCarousel'
import MinistriesSection from '@/components/ActividadesSection'
import { iglesiasMadre, iglesiasSede } from '@/lib/iglesias'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 3600

const socialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://whatsapp.com/channel/0029Vb6goWqD38CULhFEIB1J',
    hoverBg: 'hover:bg-[#25D366]/20 hover:border-[#25D366]/60',
    hoverText: 'group-hover:text-[#25D366]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/vidaenfesl',
    hoverBg: 'hover:bg-[#1877F2]/20 hover:border-[#1877F2]/60',
    hoverText: 'group-hover:text-[#1877F2]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/vida.en.fe',
    hoverBg: 'hover:bg-pink-500/20 hover:border-pink-500/60',
    hoverText: 'group-hover:text-pink-400',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@vidaenfe',
    hoverBg: 'hover:bg-red-600/20 hover:border-red-500/60',
    hoverText: 'group-hover:text-red-400',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
]

export default async function Home() {
  const madre = iglesiasMadre

  const supabase = await createClient()
  const { data: noticiasDB } = await supabase
    .from('noticias')
    .select('*')
    .eq('publicada', true)
    .is('iglesia_id', null)
    .order('created_at', { ascending: false })
    .limit(3)

  const noticiasToShow = (noticiasDB && noticiasDB.length > 0) ? noticiasDB : madre.noticias

  return (
    <>
      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
        <div className="absolute inset-0 z-0">
          <img
            src={madre.fotoHero}
            alt="Vida en Fe San Luis"
            className="w-full h-full object-cover scale-105"
            style={{ animation: 'slowZoom 20s ease-in-out infinite alternate' }}
          />
          <style>{`@keyframes slowZoom { from { transform: scale(1.05); } to { transform: scale(1.12); } }`}</style>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-900/30" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(212,137,26,0.22) 0%, transparent 70%)' }} />
        </div>

        <div
          className="absolute left-6 xl:left-10 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3 animate-fade-in delay-700"
          style={{animationFillMode:'forwards'}}
        >
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-white/25" />

          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className={`group relative w-10 h-10 rounded-xl border border-white/20 bg-white/8 backdrop-blur-sm flex items-center justify-center text-white/60 transition-all duration-250 hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg ${s.hoverBg} ${s.hoverText}`}
            >
              {s.icon}
              <span className="absolute left-full ml-3 px-2.5 py-1 bg-stone-900/90 backdrop-blur-sm text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-1 group-hover:translate-x-0 border border-white/10">
                {s.label}
              </span>
            </a>
          ))}

          <div className="w-px h-14 bg-gradient-to-b from-white/25 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div
            className="animate-fade-in delay-100 inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-xs uppercase tracking-[0.22em] px-5 py-2 rounded-full mb-8"
            style={{animationFillMode:'forwards'}}
          >
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
            </span>
            Provincia de San Luis · Argentina
          </div>

          <h1
            className="animate-fade-up delay-200 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[84px] text-white font-bold leading-[1.05] mb-6 tracking-tight"
            style={{animationFillMode:'forwards'}}
          >
            Bienvenido<br />
            <span className="italic">Vida en Fe</span>
          </h1>

          <p
            className="animate-fade-up delay-300 text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-3 font-body"
            style={{animationFillMode:'forwards'}}
          >
            Somos una familia de iglesias distribuidas en toda la provincia de San Luis. Cada persona es bienvenida, cada historia importa.
          </p>
          <p
            className="animate-fade-up delay-400 font-display text-gold-300 italic text-lg mb-10"
            style={{animationFillMode:'forwards'}}
          >
            “Soy lo que la Biblia dice que yo soy, en mí se corta toda maldición, de mí saldrán generaciones bendecidas”          
          </p>
          <div
            className="animate-fade-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            style={{animationFillMode:'forwards'}}
          >
            <Link
              href="#iglesias"
              className="group w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-2xl hover:shadow-gold-500/40 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <MapPin size={16} />
              Encontrá tu iglesia
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://whatsapp.com/channel/0029Vb6goWqD38CULhFEIB1J"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/12 hover:bg-white/20 backdrop-blur-sm text-white border border-white/25 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-px"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Conectate con nosotros
            </a>
          </div>

          <div
            className="animate-fade-up delay-600 flex items-center justify-center gap-3 lg:hidden"
            style={{animationFillMode:'forwards'}}
          >
            <div className="w-8 h-px bg-white/20" />
            <span className="text-white/35 text-[10px] uppercase tracking-widest">Seguinos</span>
            <div className="w-8 h-px bg-white/20" />
          </div>
          <div
            className="animate-fade-up delay-700 flex items-center justify-center gap-3 mt-3 lg:hidden"
            style={{animationFillMode:'forwards'}}
          >
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`group w-11 h-11 rounded-xl border border-white/20 bg-white/8 backdrop-blur-sm flex items-center justify-center text-white/60 transition-all duration-200 hover:scale-110 ${s.hoverBg} ${s.hoverText}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 animate-fade-in delay-800"
          style={{animationFillMode:'forwards'}}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Deslizá</span>
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-center justify-center">
            <div className="w-1 h-1.5 bg-white/60 rounded-full" style={{animation:'scrollDot 1.5s ease-in-out infinite'}} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          IGLESIAS CAROUSEL
      ══════════════════════════════════ */}
      <section id="iglesias" className="py-24 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Iglesias</p>
            <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold mb-4">
              Una familia en toda<br />
              <span className="text-gold-500 italic">la provincia</span>
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto leading-relaxed">
              "No quedara tierra sin conocer su nombre" <br /> Sedes distribuidas en ciudades, pueblos y parajes de San Luis. Encontrá la más cercana a vos.
            </p>
          </div>
          <div className="px-6">
            <IglesiaCarousel iglesias={iglesiasSede} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          VISIÓN Y MISIÓN
      ══════════════════════════════════ */}
      <section id="vision" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold-500/6 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gold-500/4 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Quiénes somos</p>
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold">
              Nuestra <span className="text-gold-400 italic">identidad</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white/7 to-white/3 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-gold-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center mb-6 group-hover:bg-gold-500/25 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4891a" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <h3 className="font-display text-2xl text-gold-300 font-semibold mb-4">Nuestra Visión</h3>
              <p className="text-white/65 leading-relaxed">
                Ser una iglesia que transforma vidas, familias y comunidades a través del poder del Evangelio de Jesucristo, alcanzando cada rincón de la provincia de San Luis con amor, esperanza y la verdad de Dios.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/7 to-white/3 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-gold-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center mb-6 group-hover:bg-gold-500/25 transition-colors">
                <Heart size={22} className="text-gold-500" />
              </div>
              <h3 className="font-display text-2xl text-gold-300 font-semibold mb-4">Nuestra Misión</h3>
              <p className="text-white/65 leading-relaxed">
                Hacer discípulos de Jesús que amen a Dios con todo su ser y amen al prójimo como a sí mismos, equipando a cada creyente para vivir su propósito y servir a su comunidad con excelencia y carácter.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { emoji: '✝️', label: 'Fe genuina', desc: 'Arraigada en la Palabra' },
              { emoji: '🤝', label: 'Comunidad', desc: 'Un cuerpo, un corazón' },
              { emoji: '📖', label: 'La Biblia', desc: 'Nuestra guía de vida' },
              { emoji: '🌟', label: 'Excelencia', desc: 'Todo para la gloria de Dios' },
            ].map((v) => (
              <div key={v.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-gold-400/30 hover:bg-white/8 transition-all duration-300">
                <span className="text-2xl block mb-2">{v.emoji}</span>
                <p className="text-white/90 text-sm font-semibold mb-1">{v.label}</p>
                <p className="text-white/40 text-xs leading-snug">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          HORARIOS
      ══════════════════════════════════ */}
      <section id="actividades" className="py-24 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Iglesia Central · San Luis</p>
            <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold">
              Reuniones &<span className="text-gold-500 italic"> Horarios</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {madre.horarios.map((h, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-stone-100 shadow-sm hover:border-gold-200 hover:shadow-md transition-all duration-200">
                <div className="text-center w-24 shrink-0">
                  <span className="text-gold-600 font-bold text-sm block">{h.dia}</span>
                  <span className="text-stone-400 text-xs">{h.hora} hs</span>
                </div>
                <div className="w-px h-10 bg-stone-100" />
                <span className="text-stone-600 text-sm leading-snug">{h.actividad}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ACTIVIDADES
      ══════════════════════════════════ */}
      <MinistriesSection />

      {/* ══════════════════════════════════
          CONECTÁ VIDA
      ══════════════════════════════════ */}
      <section id="conecta" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Noticias & Recursos</p>
            <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold">
              Conectá <span className="text-gold-500 italic">Vida</span>
            </h2>
            <p className="text-stone-500 mt-4 max-w-lg mx-auto leading-relaxed">
              Noticias de la comunidad, prédicas de cada domingo y conexión directa con la iglesia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {noticiasToShow.map((n: any, i: number) => (
              <article key={i} className="bg-warm-50 rounded-2xl overflow-hidden border border-stone-100 hover:border-gold-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={n.imagen_url || n.imagen || 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80'}
                    alt={n.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-gold-500 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      {n.fecha}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-stone-800 font-semibold text-lg leading-snug mb-2 group-hover:text-gold-600 transition-colors">
                    {n.titulo}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">{n.resumen}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Link
              href="/predicas"
              className="group relative flex items-center gap-5 bg-stone-950 rounded-2xl p-6 md:p-8 overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-600/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-16 h-16 rounded-2xl bg-gold-500/15 flex items-center justify-center shrink-0 z-10 group-hover:bg-gold-500/25 transition-colors">
                <Music size={30} className="text-gold-400" />
              </div>
              <div className="z-10 flex-1">
                <h3 className="font-display text-white text-xl md:text-2xl font-semibold mb-1">Todas las prédicas</h3>
                <p className="text-white/50 text-sm">Spotify · YouTube · cada domingo</p>
              </div>
              <div className="z-10 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-gold-400/50 group-hover:bg-gold-500/10 transition-all">
                <ArrowRight size={18} className="text-white/50 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>

            <a
              href="https://whatsapp.com/channel/0029Vb6goWqD38CULhFEIB1J"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-5 bg-[#064e3b] rounded-2xl p-6 md:p-8 overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-16 h-16 rounded-2xl bg-[#25D366]/15 flex items-center justify-center shrink-0 z-10 group-hover:bg-[#25D366]/25 transition-colors">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </div>
              <div className="z-10 flex-1">
                <h3 className="font-display text-white text-xl md:text-2xl font-semibold mb-1">Conectate con nosotros</h3>
                <p className="text-white/50 text-sm">Canal de WhatsApp · novedades cada semana</p>
              </div>
              <div className="z-10 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#25D366]/50 group-hover:bg-[#25D366]/10 transition-all">
                <ArrowRight size={18} className="text-white/50 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CÓMO LLEGAR
      ══════════════════════════════════ */}
      <section id="como-llegar" className="py-24 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Iglesia Central</p>
            <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold">
              Cómo <span className="text-gold-500 italic">llegar</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              {[
                { icon: <MapPin className="text-gold-600" size={20} />, title: 'Dirección', content: madre.direccion },
                { icon: <Clock className="text-gold-600" size={20} />, title: 'Horarios de reunión', content: 'Domingos 09:30 · Jueves 20:30 hs' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm hover:border-gold-200 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-stone-800 text-sm mb-1">{item.title}</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}

              <a
                href={madre.mapsUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-white px-6 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/30 hover:-translate-y-px"
              >
                <MapPin size={16} />
                Abrir en Google Maps
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200 h-80 lg:h-full min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d761.2193650392767!2d-66.3453206293085!3d-33.30531758884464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d43959b2d3bfd7%3A0xf5d997eb931b9275!2sIEP%20San%20Luis%20Fundaci%C3%B3n%20Esperanza%20de%20vida...%20Jesucristo!5e0!3m2!1ses!2sar!4v1773874888375!5m2!1ses!2sar24!2i768!4f13.1!3m3!1m2!1s0x95d45dd9a07d11f5%3A0x97ff0cb765b83b17!2sSan%20Luis%2C%20Provincia%20de%20San%20Luis%2C%20Argentina!5e0!3m2!1ses!2sar!4v1710000000000"
                width="100%" height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Vida en Fe San Luis"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FINAL CTA BANNER
      ══════════════════════════════════ */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gold-600 via-gold-500 to-warm-500">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/8 blur-3xl" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-4 leading-tight">
            Tu historia con Dios<br />comienza <span className="italic">hoy</span>
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Sin importar dónde estés en tu camino, hay un lugar para vos en Vida en Fe.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#iglesias"
              className="w-full sm:w-auto bg-white hover:bg-warm-50 text-gold-600 font-bold px-8 py-4 rounded-full text-sm tracking-wide transition-all hover:shadow-xl hover:-translate-y-px"
            >
              Encontrá tu iglesia
            </Link>
            <Link
              href="/contacto"
              className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border border-white/40 font-bold px-8 py-4 rounded-full text-sm tracking-wide transition-all hover:-translate-y-px backdrop-blur-sm"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
