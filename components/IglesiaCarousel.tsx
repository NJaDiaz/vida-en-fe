'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import type { Iglesia } from '@/lib/iglesias'

interface Props { iglesias: Iglesia[] }

export default function IglesiaCarousel({ iglesias }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)
  const CARD_W = 308 

  const updateState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    const idx = Math.round(el.scrollLeft / CARD_W)
    setActiveIndex(Math.min(idx, iglesias.length - 1))
  }, [iglesias.length])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateState, { passive: true })
    updateState()
    return () => el.removeEventListener('scroll', updateState)
  }, [updateState])

  const scrollBy = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = CARD_W * 3 * (dir === 'right' ? 1 : -1)
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const scrollTo = (idx: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: idx * CARD_W, behavior: 'smooth' })
  }

  const totalDots = Math.ceil(iglesias.length / 3)
  const activeDot = Math.floor(activeIndex / 3)

  return (
    <div className="relative">
      <button
        onClick={() => scrollBy('left')}
        aria-label="Anterior"
        className={`absolute left-0 top-[calc(50%-24px)] z-20 -translate-x-5 w-12 h-12 rounded-full bg-white border border-stone-200 shadow-lg flex items-center justify-center text-stone-600 hover:text-gold-600 hover:border-gold-300 hover:shadow-gold-200/60 transition-all duration-200 ${
          canLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      <button
        onClick={() => scrollBy('right')}
        aria-label="Siguiente"
        className={`absolute right-0 top-[calc(50%-24px)] z-20 translate-x-5 w-12 h-12 rounded-full bg-white border border-stone-200 shadow-lg flex items-center justify-center text-stone-600 hover:text-gold-600 hover:border-gold-300 hover:shadow-gold-200/60 transition-all duration-200 ${
          canRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>

      <div
        ref={scrollRef}
        className="carousel-scroll flex gap-4 overflow-x-auto pb-4 px-1"
      >
        {iglesias.map((ig, i) => (
          <Link
            key={ig.id}
            href={`/iglesia/${ig.id}`}
            style={{ scrollSnapAlign: 'start' }}
            className="church-card snap-start shrink-0 w-[280px] sm:w-[292px] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl border border-stone-100 hover:border-gold-200 transition-all duration-300 group/card flex flex-col"
          >
            <div className="relative h-44 overflow-hidden bg-stone-100">
              <img
                src={ig.foto}
                alt={ig.nombre}
                className="church-card-img w-full h-full object-cover transition-transform duration-500"
                loading={i < 4 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/65 via-stone-900/10 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-full border border-white/20 font-medium">
                  <MapPin size={10} />
                  {ig.ciudad}
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-display text-stone-800 text-[17px] font-semibold leading-snug group-hover/card:text-gold-600 transition-colors duration-200">
                {ig.nombre}
              </h3>
              <p className="text-stone-400 text-xs mt-1 leading-relaxed line-clamp-1">{ig.direccion}</p>

              <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1.5">
                    {ig.pastores.slice(0, 2).map((p, pi) => (
                      <div key={pi} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gold-100">
                        {p.foto
                          ? <img src={p.foto} alt={p.nombre} className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-gold-200" />}
                      </div>
                    ))}
                  </div>
                  <span className="text-stone-400 text-[11px]">
                    {ig.pastores.length === 1 ? ig.pastores[0].nombre.split(' ')[0] + ' ' + ig.pastores[0].nombre.split(' ').slice(-1) : `${ig.pastores.length} pastores`}
                  </span>
                </div>
                <span className="text-gold-500 text-[11px] font-bold tracking-wide uppercase group-hover/card:gap-2 transition-all flex items-center gap-1">
                  Ver más
                  <ChevronRight size={12} strokeWidth={3} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalDots > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i * 3)}
              aria-label={`Ir al grupo ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeDot
                  ? 'w-7 h-2 bg-gold-500'
                  : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
