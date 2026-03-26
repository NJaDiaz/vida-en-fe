import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ministerios = [
  {
    id: 'ninos',
    titulo: 'Vida Kids',
    desc: 'Un espacio seguro y lleno de color donde los más pequeños descubren el amor de Dios a través del juego, la música y la Palabra.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <circle cx="20" cy="13" r="6" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M10 34c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M14 10l2 2M26 10l-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: 'from-orange-400 to-rose-400',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    accent: 'text-orange-500',
    tag: 'Sábado · 10:30 hs',
  },
  {
    id: 'preadol',
    titulo: 'Power Teens',
    desc: 'Una generación conectada con Dios y entre sí. Encuentros de adoración, estudio y comunidad que marcan vidas para siempre.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M20 6l3.09 9.51H33l-8.18 5.95 3.09 9.51L20 25.6l-7.91 5.37 3.09-9.51L6.91 15.51H17L20 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'from-violet-500 to-indigo-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    accent: 'text-violet-500',
    tag: 'Sábado · 16:30 hs',
  },
  {
    id: 'adol',
    titulo: 'Vida Teens',
    desc: 'Una generación conectada con Dios y entre sí. Encuentros de adoración, estudio y comunidad que marcan vidas para siempre.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M20 6l3.09 9.51H33l-8.18 5.95 3.09 9.51L20 25.6l-7.91 5.37 3.09-9.51L6.91 15.51H17L20 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'from-violet-500 to-indigo-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    accent: 'text-violet-500',
    tag: 'Sábado · 18:30 hs',
  },
  {
    id: 'jovenes',
    titulo: 'Jóvenes Vida',
    desc: 'Una generación conectada con Dios y entre sí. Encuentros de adoración, estudio y comunidad que marcan vidas para siempre.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M20 6l3.09 9.51H33l-8.18 5.95 3.09 9.51L20 25.6l-7.91 5.37 3.09-9.51L6.91 15.51H17L20 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'from-violet-500 to-indigo-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    accent: 'text-violet-500',
    tag: 'Sábado · 21:30 hs',
  },
  {
    id: 'mujeres',
    titulo: 'Mujeres Vida',
    desc: 'Mujeres que se fortalecen en fe, se apoyan mutuamente y descubren su identidad y propósito en Dios.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <circle cx="20" cy="16" r="7" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M20 23v10M16 29h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    color: 'from-pink-400 to-rose-500',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    accent: 'text-pink-500',
    tag: 'Viernes · encuentros mensuales',
  },
  {
    id: 'matrimonio',
    titulo: 'Matrimonios Vida',
    desc: 'Hombres que crecen en carácter, lideran sus familias con amor y se apoyan en comunidad para vivir conforme a Dios.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <circle cx="17" cy="15" r="7" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M28 8l5 5M33 8h-5v5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 34c0-4.97 4.03-9 9-9s9 4.03 9 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    accent: 'text-blue-500',
    tag: 'Viernes · encuentros semanales',
  },
]

export default function ActividadesSeccion() {
  return (
    <section id="ministerios" className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-gold-600 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Iglesia Central · San Luis</p>
          <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold mb-4">
            Actividades <span className="text-gold-500 italic">Vida</span>
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto leading-relaxed">
            Cada actividad es una puerta de entrada. Hay un lugar diseñado para vos, para que puedas crecer, servir y pertenecer.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ministerios.map((m, i) => (
            <div
              key={m.id}
              className={`group relative rounded-2xl border ${m.border} ${m.bg} p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-default`}
            >
              <div
                className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${m.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
              />

              <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {m.icon}
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-stone-800 font-semibold text-lg leading-snug mb-2 group-hover:text-stone-900 transition-colors">
                  {m.titulo}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {m.desc}
                </p>

                {/* Tag */}
                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${m.accent} bg-white/70 px-2.5 py-1 rounded-full border border-current/10`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {m.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-stone-500 text-sm mb-4">¿No encontrás lo que buscás? Hablemos.</p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white font-bold px-7 py-3.5 rounded-full text-sm tracking-wide transition-all hover:shadow-lg hover:-translate-y-px"
          >
            Contactar a la iglesia
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
