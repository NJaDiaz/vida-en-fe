import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50 px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-8 animate-float">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M18 2L20.2 9.6H28L22 14.4L24.2 22L18 17.2L11.8 22L14 14.4L8 9.6H15.8L18 2Z" fill="#d4891a" fillOpacity="0.8"/>
          </svg>
        </div>

        <p className="text-gold-600 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Error 404</p>
        <h1 className="font-display text-5xl text-stone-800 font-bold mb-4">
          Página no<br />
          <span className="text-gold-500 italic">encontrada</span>
        </h1>
        <p className="text-stone-500 leading-relaxed mb-8">
          Parece que esta página no existe. Pero no te preocupés — en Vida en Fe siempre hay un lugar para vos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all hover:shadow-lg hover:shadow-gold-500/30"
          >
            Volver al inicio
          </Link>
          <Link
            href="/contacto"
            className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-700 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all"
          >
            Contactanos
          </Link>
        </div>
      </div>
    </div>
  )
}
