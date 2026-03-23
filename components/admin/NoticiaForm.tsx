'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Save, Upload, X, Eye, ArrowLeft, Loader2 } from 'lucide-react'
import type { Noticia } from '@/lib/types'
import { iglesias } from '@/lib/iglesias'

interface Props {
  initial?: Partial<Noticia>
  isEdit?: boolean
}

export default function NoticiaForm({ initial, isEdit }: Props) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    titulo: initial?.titulo ?? '',
    resumen: initial?.resumen ?? '',
    contenido: initial?.contenido ?? '',
    imagen_url: initial?.imagen_url ?? '',
    fecha: initial?.fecha ?? new Date().toLocaleDateString('es-AR', { month: 'long', year: 'numeric' }),
    publicada: initial?.publicada ?? false,
    iglesia_id: initial?.iglesia_id ?? '',
  })

  const set = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `noticias/${Date.now()}.${ext}`

    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, file, { upsert: true })

    if (!error && data) {
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(data.path)
      set('imagen_url', publicUrl)
    }
    setUploading(false)
  }

  const handleSave = async (publicar?: boolean) => {
    setSaving(true)
    const supabase = createClient()

    const payload = {
      ...form,
      publicada: publicar !== undefined ? publicar : form.publicada,
      iglesia_id: form.iglesia_id || null,
    }

    let error
    if (isEdit && initial?.id) {
      ;({ error } = await supabase.from('noticias').update(payload).eq('id', initial.id))
    } else {
      ;({ error } = await supabase.from('noticias').insert(payload))
    }

    setSaving(false)
    if (!error) {
      setSaved(true)
      // Trigger ISR revalidation so public site updates
      const pathToRevalidate = form.iglesia_id ? `/iglesia/${form.iglesia_id}` : '/'
      await fetch('/api/revalidate?secret=' + (process.env.NEXT_PUBLIC_REVALIDATE_SECRET || ''), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: pathToRevalidate }),
      }).catch(() => {})
      setTimeout(() => router.push('/admin/noticias'), 800)
    } else {
      alert('Error al guardar: ' + error.message)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-stone-400 hover:text-stone-600 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-display text-stone-800 text-3xl font-bold">
            {isEdit ? 'Editar noticia' : 'Nueva noticia'}
          </h1>
          <p className="text-stone-500 text-sm mt-0.5">
            {isEdit ? 'Modificá el contenido y guardá los cambios' : 'Completá los campos y publicá cuando esté lista'}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                Título *
              </label>
              <input
                type="text"
                value={form.titulo}
                onChange={e => set('titulo', e.target.value)}
                placeholder="Título de la noticia..."
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                Resumen *
              </label>
              <textarea
                rows={3}
                value={form.resumen}
                onChange={e => set('resumen', e.target.value)}
                placeholder="Breve descripción que se muestra en las cards..."
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                Contenido completo
              </label>
              <textarea
                rows={8}
                value={form.contenido}
                onChange={e => set('contenido', e.target.value)}
                placeholder="Texto completo de la noticia (opcional)..."
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all resize-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Imagen
            </label>

            {form.imagen_url ? (
              <div className="relative rounded-xl overflow-hidden h-48 bg-stone-100 mb-3">
                <img src={form.imagen_url} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => set('imagen_url', '')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-stone-200 rounded-xl h-36 flex flex-col items-center justify-center cursor-pointer hover:border-gold-400 hover:bg-gold-50/50 transition-all mb-3 group"
              >
                {uploading ? (
                  <Loader2 size={24} className="text-gold-400 animate-spin" />
                ) : (
                  <>
                    <Upload size={24} className="text-stone-300 group-hover:text-gold-400 transition-colors mb-2" />
                    <p className="text-stone-400 text-sm group-hover:text-gold-600 transition-colors">Clic para subir imagen</p>
                    <p className="text-stone-300 text-xs mt-1">JPG, PNG, WebP · Máx 5MB</p>
                  </>
                )}
              </div>
            )}

            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

            <div className="flex items-center gap-2">
              <span className="text-stone-400 text-xs">O pegar URL:</span>
              <input
                type="url"
                value={form.imagen_url}
                onChange={e => set('imagen_url', e.target.value)}
                placeholder="https://..."
                className="flex-1 border border-stone-200 rounded-lg px-3 py-1.5 text-stone-700 text-xs focus:outline-none focus:border-gold-400 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Publicar */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5">
            <h3 className="font-semibold text-stone-700 text-sm mb-4">Publicación</h3>

            <div className="flex items-center justify-between mb-4">
              <span className="text-stone-600 text-sm">Estado</span>
              <button
                onClick={() => set('publicada', !form.publicada)}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.publicada ? 'bg-green-500' : 'bg-stone-300'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${form.publicada ? 'translate-x-5' : ''}`} />
              </button>
            </div>

            <p className={`text-xs mb-5 ${form.publicada ? 'text-green-600' : 'text-stone-400'}`}>
              {form.publicada ? '✓ Visible en el sitio' : '○ No visible (borrador)'}
            </p>

            <button
              onClick={() => handleSave()}
              disabled={saving || !form.titulo || !form.resumen}
              className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-gold-500/25"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {saved ? '¡Guardado!' : 'Guardar'}
            </button>

            {!form.publicada && (
              <button
                onClick={() => handleSave(true)}
                disabled={saving || !form.titulo || !form.resumen}
                className="w-full flex items-center justify-center gap-2 mt-2 border border-green-500 text-green-600 hover:bg-green-50 font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50"
              >
                <Eye size={15} />
                Guardar y publicar
              </button>
            )}
          </div>

          {/* Meta */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4">
            <h3 className="font-semibold text-stone-700 text-sm">Metadatos</h3>

            <div>
              <label className="block text-xs text-stone-500 font-medium mb-1.5">Fecha a mostrar</label>
              <input
                type="text"
                value={form.fecha}
                onChange={e => set('fecha', e.target.value)}
                placeholder="Marzo 2025"
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-stone-700 text-sm focus:outline-none focus:border-gold-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-stone-500 font-medium mb-1.5">Iglesia</label>
              <select
                value={form.iglesia_id}
                onChange={e => set('iglesia_id', e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-stone-600 text-sm focus:outline-none focus:border-gold-400 transition-all bg-white"
              >
                <option value="">Sede central (todas)</option>
                {iglesias.filter(i => !i.esMadre).map(i => (
                  <option key={i.id} value={i.id}>{i.ciudad}</option>
                ))}
              </select>
              <p className="text-stone-400 text-xs mt-1">Dejá vacío para que aparezca en la página principal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
