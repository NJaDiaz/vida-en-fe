import Link from 'next/link'
import { ArrowRight, Heart, Users, BookOpen, Globe } from 'lucide-react'

export const metadata = {
  title: 'Nosotros | Vida en Fe',
  description: 'Conocé la historia, los valores y el equipo detrás de la iglesia Vida en Fe en San Luis.',
}

const pastoresEquipo = [
  {
    nombre: 'Raul Ricardo Romos',
    rol: 'Pastor y fundador',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    descripcion: 'Con más de 20 años de trayectoria pastoral, lidera la visión de Vida en Fe con corazón de padre y servicio.',
  },
  {
    nombre: 'Marta',
    rol: 'Pastora co-fundadora',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    descripcion: 'Apasionada por la familia y los ministerios de mujer, es pilar fundamental en el crecimiento espiritual de la congregación.',
  },
]

const hitos = [
  { año: '2008', titulo: 'Los comienzos', desc: 'Un pequeño grupo en San Luis Capital con un sueño: alcanzar toda la provincia.' },
  { año: '2012', titulo: 'Primera expansión', desc: 'Se abren las sedes de Villa Mercedes y La Toma, comenzando la red provincial.' },
  { año: '2016', titulo: 'Red consolidada', desc: 'Ya somos 8 iglesias. Se crea la estructura de coordinación pastoral.' },
  { año: '2020', titulo: 'Tiempo de prueba', desc: 'La pandemia nos desafía. Respondemos con streaming y grupos virtuales.' },
  { año: '2023', titulo: 'Crecimiento histórico', desc: '15 sedes activas y más de 1500 familias alcanzadas en toda San Luis.' },
  { año: '2026', titulo: 'Hoy: 18 iglesias', desc: 'La visión sigue creciendo. Nuevas sedes, nuevos líderes, nuevas historias.' },
]

export default function NosotrosPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 to-stone-900" />
          <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 50% 0%, rgba(212,137,26,0.3) 0%, transparent 60%)'}} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-4">Quiénes somos</p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-6 leading-tight">
            Una historia de<br />
            <span className="text-gold-300 italic">fe y comunidad</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Desde 200, Vida en Fe crece de ciudad en ciudad, de familia en familia, unida por el amor de Dios y el propósito de alcanzar a toda la provincia de San Luis.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Nuestra historia</p>
            <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold">
              El camino <span className="text-gold-500 italic">recorrido</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-300 via-gold-400 to-transparent" />

            <div className="space-y-10">
              {hitos.map((h, i) => (
                <div key={i} className={`flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className={`flex-1 pl-14 sm:pl-0 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div className={`bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:border-gold-200 hover:shadow-md transition-all duration-200 inline-block w-full`}>
                      <span className="text-gold-500 font-bold text-sm">{h.año}</span>
                      <h3 className="font-display text-stone-800 font-semibold text-lg mt-0.5 mb-1">{h.titulo}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed">{h.desc}</p>
                    </div>
                  </div>

                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 w-5 h-5 rounded-full bg-gold-400 border-4 border-warm-50 shadow-sm" style={{top: `${i * 108 + 24}px`}} />

                  <div className="hidden sm:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Lo que nos mueve</p>
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold">
              Nuestros <span className="text-gold-400 italic">valores</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Heart size={28} className="text-gold-400" />,
                titulo: 'Amor incondicional',
                desc: 'Todo lo que hacemos nace del amor de Dios. Recibimos a cada persona como es, sin condiciones.',
              },
              {
                icon: <BookOpen size={28} className="text-gold-400" />,
                titulo: 'Fidelidad bíblica',
                desc: 'La Biblia es nuestra autoridad. Predicamos y vivimos la Palabra con convicción y claridad.',
              },
              {
                icon: <Users size={28} className="text-gold-400" />,
                titulo: 'Vida en comunidad',
                desc: 'Nadie camina solo. Los grupos de vida y los ministerios son el corazón de nuestra iglesia.',
              },
              {
                icon: <Globe size={28} className="text-gold-400" />,
                titulo: 'Alcance provincial',
                desc: 'Tenemos un llamado claro: alcanzar cada ciudad, pueblo y paraje de la provincia de San Luis.',
              },
            ].map((v, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold-400/30 hover:bg-white/8 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center mb-5">
                  {v.icon}
                </div>
                <h3 className="font-display text-white text-lg font-semibold mb-2">{v.titulo}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Liderazgo</p>
            <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold">
              El equipo <span className="text-gold-500 italic">pastoral</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastoresEquipo.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:border-gold-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative h-56 overflow-hidden bg-stone-100">
                  <img
                    src={p.foto}
                    alt={p.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-stone-800 font-semibold text-base">{p.nombre}</h3>
                  <p className="text-gold-600 text-xs font-semibold uppercase tracking-wide mb-2">{p.rol}</p>
                  <p className="text-stone-500 text-xs leading-relaxed">{p.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-stone-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold mb-4">
            ¿Querés ser parte de la historia?
          </h2>
          <p className="text-stone-500 mb-8 leading-relaxed">
            Sumate a nuestra comunidad. Hay una iglesia cerca tuyo esperándote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#iglesias"
              className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all hover:shadow-lg hover:shadow-gold-500/30 hover:-translate-y-px flex items-center justify-center gap-2"
            >
              Encontrá tu iglesia
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/contacto"
              className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-700 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
            >
              Escribinos
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
