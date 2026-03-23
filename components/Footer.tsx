import Link from 'next/link'
import { Instagram, Phone, Mail, MapPin, Youtube } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-stone-950 text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-gold-500/30">
                <img src="/logo.png" alt="Logo Vida en Fe" />
              </div>
              <div>
                <span className="block font-display text-white text-base font-bold">Vida en Fe</span>
                <span className="block text-white/40 text-[10px] tracking-widest uppercase">San Luis</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Una familia unida por la fe, el amor y el propósito de alcanzar cada rincón de San Luis.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://instagram.com/vida.en.fe" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 hover:border-gold-400/60 hover:bg-white/5 flex items-center justify-center transition-all">
                <Instagram size={16} className="text-white/60 group-hover:text-gold-400" />
              </a>
              <a href="https://youtube.com/@vidaenfe" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 hover:border-red-400/60 hover:bg-white/5 flex items-center justify-center transition-all">
                <Youtube size={16} className="text-white/60" />
              </a>
              <a href="https://whatsapp.com/channel/0029Vb6goWqD38CULhFEIB1J" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 hover:border-green-400/60 hover:bg-white/5 flex items-center justify-center transition-all">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold mb-5">Navegación</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/#vision', label: 'Visión y Misión' },
                { href: '/#actividades', label: 'Actividades' },
                { href: '/#conecta', label: 'Conectá Vida' },
                { href: '/#como-llegar', label: 'Cómo llegar' },
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/predicas', label: 'Prédicas' },
                { href: '/contacto', label: 'Contacto' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-gold-300 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold mb-5">Algunas sedes</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/iglesia/la-toma', label: 'La Toma' },
                { href: '/iglesia/villa-mercedes', label: 'Villa Mercedes' },
                { href: '/iglesia/fraga', label: 'Fraga' },
                { href: '/iglesia/la-punta', label: 'La Punta' },
                { href: '/iglesia/lujan', label: 'Lujan' },
                { href: '/iglesia/san-francisco', label: 'San Francisco' },
                { href: '/iglesia/Saladillo', label: 'Saladillo' },
                { href: '/iglesia/villa-de-la-quebrada', label: 'Villa de la quebrada' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-gold-300 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold mb-5">Contacto</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5 text-white/50 text-sm">
                <MapPin size={14} className="mt-0.5 text-gold-500 shrink-0" />
                Av. Lafinur 654, San Luis Capital
              </li>
              <li className="flex items-center gap-2.5 text-white/50 text-sm">
                <Phone size={14} className="text-gold-500 shrink-0" />
                +54 266 400-0000
              </li>
              <li className="flex items-center gap-2.5 text-white/50 text-sm">
                <Mail size={14} className="text-gold-500 shrink-0" />
                info@vidaenfe.org
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="font-display text-gold-300 text-sm italic mb-1">"La fe mueve montañas"</p>
              <p className="text-white/40 text-xs">Mateo 17:20</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {year} Iglesia Vida en Fe — San Luis, Argentina
          </p>
          <p className="text-white/30 text-xs">
           · Sedes en toda la provincia
          </p>
        </div>
      </div>
    </footer>
  )
}
