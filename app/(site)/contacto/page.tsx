'use client'
import { useState } from 'react'
import { MapPin, Phone, Mail, Instagram, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { iglesias } from '@/lib/iglesias'

const motivoOpciones = [
  'Quiero conocer la iglesia',
  'Necesito oración',
  'Tengo una consulta pastoral',
  'Quiero ser voluntario',
  'Información sobre actividades',
  'Otro',
]

export default function ContactoPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    iglesia_id: '',
    motivo: '',
  })

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      const mensajeCompleto = form.motivo
        ? `[${form.motivo}]\n\n${form.mensaje}`
        : form.mensaje

      const { error: dbError } = await supabase.from('contactos').insert({
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono || null,
        mensaje: mensajeCompleto,
        iglesia_id: form.iglesia_id || null,
      })

      if (dbError) throw dbError
      setSent(true)
    } catch (err: any) {
      setError('Hubo un problema al enviar. Intentá de nuevo o escribinos directamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,137,26,0.25) 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-4">Estamos aquí</p>
          <h1 className="font-display text-5xl md:text-6xl text-white font-bold mb-5 leading-tight">
            Hablemos
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            Tenés preguntas, necesitás oración, o simplemente querés conocer más. Estamos para acompañarte.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10">

            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8">

                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={36} className="text-green-500" />
                    </div>
                    <h3 className="font-display text-stone-800 text-2xl font-semibold mb-2">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-stone-500 max-w-sm mx-auto leading-relaxed mb-6">
                      Gracias por escribirnos, <strong>{form.nombre}</strong>. Nos pondremos en contacto con vos a la brevedad.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ nombre: '', email: '', telefono: '', mensaje: '', iglesia_id: '', motivo: '' }) }}
                      className="text-gold-600 text-sm font-semibold hover:text-gold-500 transition-colors"
                    >
                      Enviar otro mensaje →
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-stone-800 text-2xl font-semibold mb-2">Envianos un mensaje</h2>
                    <p className="text-stone-400 text-sm mb-7">Todos los campos marcados con * son obligatorios</p>

                    {error && (
                      <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-stone-600 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                            Nombre completo *
                          </label>
                          <input
                            type="text" required
                            value={form.nombre} onChange={e => set('nombre', e.target.value)}
                            placeholder="Tu nombre"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 focus:bg-white transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-stone-600 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                            Email *
                          </label>
                          <input
                            type="email" required
                            value={form.email} onChange={e => set('email', e.target.value)}
                            placeholder="tu@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-stone-600 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            value={form.telefono} onChange={e => set('telefono', e.target.value)}
                            placeholder="+54 266..."
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 focus:bg-white transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-stone-600 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                            Iglesia más cercana
                          </label>
                          <select
                            value={form.iglesia_id} onChange={e => set('iglesia_id', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 focus:bg-white transition-all"
                          >
                            <option value="">Seleccioná tu ciudad...</option>
                            {iglesias.map(ig => (
                              <option key={ig.id} value={ig.id}>{ig.ciudad}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-stone-600 text-xs font-semibold uppercase tracking-wide block mb-2.5">
                          Motivo del mensaje
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {motivoOpciones.map(m => (
                            <button
                              key={m} type="button"
                              onClick={() => set('motivo', form.motivo === m ? '' : m)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                                form.motivo === m
                                  ? 'bg-gold-500 border-gold-500 text-white shadow-sm'
                                  : 'bg-white border-stone-200 text-stone-600 hover:border-gold-300 hover:text-gold-700'
                              }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-stone-600 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                          Mensaje *
                        </label>
                        <textarea
                          required rows={5}
                          value={form.mensaje} onChange={e => set('mensaje', e.target.value)}
                          placeholder="Contanos en qué podemos acompañarte..."
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 focus:bg-white transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit" disabled={loading}
                        className="w-full flex items-center justify-center gap-2.5 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-sm tracking-wide transition-all hover:shadow-lg hover:shadow-gold-500/30 hover:-translate-y-px"
                      >
                        {loading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
                        {loading ? 'Enviando...' : 'Enviar mensaje'}
                      </button>

                      <p className="text-stone-400 text-xs text-center">
                        También podés escribirnos a{' '}
                        <a href="mailto:info@vidaenfe.org" className="text-gold-600 hover:underline font-medium">
                          info@vidaenfe.org
                        </a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                <h3 className="font-display text-stone-800 text-lg font-semibold mb-5">Contacto directo</h3>
                <div className="space-y-4">
                  {[
                    { icon: <MapPin size={15} className="text-gold-500 shrink-0" />, label: 'Dirección', value: 'Av. Lafinur 654, San Luis' },
                    { icon: <Phone size={15} className="text-gold-500 shrink-0" />, label: 'Teléfono', value: '+54 266 400-0000' },
                    { icon: <Mail size={15} className="text-gold-500 shrink-0" />, label: 'Email', value: 'info@vidaenfe.org' },
                    { icon: <Instagram size={15} className="text-gold-500 shrink-0" />, label: 'Instagram', value: '@vidaenfe' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="mt-0.5">{item.icon}</div>
                      <div>
                        <p className="text-stone-400 text-xs">{item.label}</p>
                        <p className="text-stone-700 text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://whatsapp.com/channel/0029Vb6goWqD38CULhFEIB1J"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#064e3b] hover:bg-[#065f46] text-white rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-xl group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </div>
                <div>
                  <p className="font-semibold text-sm">Sumate al canal de WhatsApp</p>
                  <p className="text-white/55 text-xs mt-0.5">Novedades semana a semana</p>
                </div>
              </a>

              <div className="bg-gradient-to-br from-gold-50 to-warm-100 rounded-2xl border border-gold-200 p-6">
                <div className="text-3xl mb-3">🙏</div>
                <h4 className="font-display text-stone-800 font-semibold mb-2">¿Necesitás oración?</h4>
                <p className="text-stone-600 text-sm leading-relaxed mb-3">
                  Nuestro equipo de intercesión ora por cada necesidad que nos compartís.
                </p>
                <a href="mailto:oracion@vidaenfe.org"
                  className="inline-flex items-center gap-1.5 text-gold-700 text-sm font-semibold hover:text-gold-600 transition-colors">
                  Enviar pedido de oración →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
