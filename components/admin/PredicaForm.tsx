'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Save, Upload, X, Eye, ArrowLeft, Loader2, Youtube, Music } from 'lucide-react'
import type { Predica } from '@/lib/types'

interface Props {
  initial?: Partial<Predica>
  isEdit?: boolean
}

export default function PredicaForm({ initial, isEdit }: Props) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    titulo: initial?.titulo ?? '',
    pastor: initial?.pastor ?? 'Pastor Principal',
    fecha: initial?.fecha ?? new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }),
    youtube_id: initial?.youtube_id ?? '',
    spotify_url: initial?.spotify_url ?? '',
    imagen_url: initial?.imagen_url ?? '',
    duracion: initial?.duracion ?? '',
    descripcion: initial?.descripcion ?? '',
    publicada: initial?.publicada ?? false,
  })

  const set = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }))

  // Extract YouTube ID from full URL if user pastes a URL
 const handleYoutubeInput = (val: string) => {
  set('youtube_id', val) // guardás SIEMPRE la URL
}

function getYoutubeId(url?: string) {
  if (!url) return null

  try {
    const u = new URL(url)

    if (u.searchParams.get('v')) {
      return u.searchParams.get('v')
    }

    if (u.hostname.includes('youtu.be')) {
      return u.pathname.replace('/', '')
    }

    if (u.pathname.includes('/embed/')) {
      return u.pathname.split('/embed/')[1]
    }

    return null
  } catch {
    return null
  }
}
const videoId = getYoutubeId(form.youtube_id)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `predicas/${Date.now()}.${ext}`
    const { data, error } = await supabase.storage.from('media').upload(fileName, file, { upsert: true })
    if (!error && data) {
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(data.path)
      set('imagen_url', publicUrl)
    }
    setUploading(false)
  }

  const handleSave = async (publicar?: boolean) => {
    setSaving(true)
    const supabase = createClient()
    const payload = { ...form, publicada: publicar !== undefined ? publicar : form.publicada }

    let error
    if (isEdit && initial?.id) {
      ;({ error } = await supabase.from('predicas').update(payload).eq('id', initial.id))
    } else {
      ;({ error } = await supabase.from('predicas').insert(payload))
    }

    setSaving(false)
    if (!error) {
      setSaved(true)
      await fetch('/api/revalidate?secret=' + (process.env.NEXT_PUBLIC_REVALIDATE_SECRET || ''), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/predicas' }),
      }).catch(() => {})
      setTimeout(() => router.push('/admin/predicas'), 800)
    } else alert('Error: ' + error.message)
  }

  const youtubeThumb = form.youtube_id
    ? `https://img.youtube.com/vi/${form.youtube_id}/maxresdefault.jpg`
    : ''

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-stone-400 hover:text-stone-600 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-display text-stone-800 text-3xl font-bold">
            {isEdit ? 'Editar prédica' : 'Nueva prédica'}
          </h1>
          <p className="text-stone-500 text-sm mt-0.5">Cargá los datos de la prédica del domingo</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">

          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Título *</label>
              <input
                type="text"
                value={form.titulo}
                onChange={e => set('titulo', e.target.value)}
                placeholder="El poder de la fe que actúa"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Pastor</label>
                <input
                  type="text"
                  value={form.pastor}
                  onChange={e => set('pastor', e.target.value)}
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Duración</label>
                <input
                  type="text"
                  value={form.duracion}
                  onChange={e => set('duracion', e.target.value)}
                  placeholder="47:23"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">Descripción</label>
              <textarea
                rows={4}
                value={form.descripcion}
                onChange={e => set('descripcion', e.target.value)}
                placeholder="Breve descripción del mensaje..."
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all resize-none"
              />
            </div>
          </div>

          {/* YouTube */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                <Youtube size={15} className="text-red-600" />
              </div>
              <h3 className="font-semibold text-stone-700 text-sm">YouTube</h3>
            </div>

            <div>
              <label className="block text-xs text-stone-500 font-medium mb-1.5">
                ID o URL del video
              </label>
              <input
                type="text"
                value={form.youtube_id}
                onChange={e => handleYoutubeInput(e.target.value)}
                placeholder="dQw4w9WgXcQ  o  https://youtube.com/watch?v=..."
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all font-mono"
              />
              <p className="text-stone-400 text-xs mt-1">Podés pegar la URL completa, se extrae el ID automáticamente</p>
            </div>

            {form.youtube_id && (
              <div className="mt-4 rounded-xl overflow-hidden bg-stone-100 aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${form.youtube_id}`}
                  className="w-full h-full"
                  allowFullScreen
                  title="Preview"
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#1DB954]/15 flex items-center justify-center">
                <Music size={15} className="text-[#1DB954]" />
              </div>
              <h3 className="font-semibold text-stone-700 text-sm">Spotify</h3>
            </div>
            <div>
              <label className="block text-xs text-stone-500 font-medium mb-1.5">URL del episodio</label>
              <input
                type="url"
                value={form.spotify_url}
                onChange={e => set('spotify_url', e.target.value)}
                placeholder="https://open.spotify.com/episode/..."
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:border-[#1DB954]/50 focus:ring-2 focus:ring-[#1DB954]/10 transition-all"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Miniatura / Imagen
            </label>

            {!form.imagen_url && youtubeThumb && (
              <div className="mb-3 p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3">
                <img src={youtubeThumb} alt="" className="w-20 h-12 object-cover rounded-lg" />
                <div>
                  <p className="text-stone-600 text-xs font-medium">Miniatura automática de YouTube</p>
                  <button onClick={() => set('imagen_url', youtubeThumb)} className="text-gold-600 text-xs hover:underline">
                    Usar esta imagen →
                  </button>
                </div>
              </div>
            )}

            {form.imagen_url ? (
              <div className="relative rounded-xl overflow-hidden h-44 bg-stone-100 mb-3">
                <img src={form.imagen_url} alt="" className="w-full h-full object-cover" />
                <button onClick={() => set('imagen_url', '')} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-stone-200 rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:border-gold-400 hover:bg-gold-50/50 transition-all mb-3 group"
              >
                {uploading
                  ? <Loader2 size={22} className="text-gold-400 animate-spin" />
                  : <><Upload size={22} className="text-stone-300 group-hover:text-gold-400 mb-1.5 transition-colors" /><p className="text-stone-400 text-sm">Subir imagen</p></>
                }
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <div className="flex items-center gap-2">
              <span className="text-stone-400 text-xs shrink-0">O URL:</span>
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
              {form.publicada ? '✓ Visible en el sitio' : '○ Borrador (no visible)'}
            </p>

            <button
              onClick={() => handleSave()}
              disabled={saving || !form.titulo}
              className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-gold-500/25"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {saved ? '¡Guardado!' : 'Guardar'}
            </button>

            {!form.publicada && (
              <button
                onClick={() => handleSave(true)}
                disabled={saving || !form.titulo}
                className="w-full flex items-center justify-center gap-2 mt-2 border border-green-500 text-green-600 hover:bg-green-50 font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50"
              >
                <Eye size={15} />
                Guardar y publicar
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5">
            <h3 className="font-semibold text-stone-700 text-sm mb-4">Fecha</h3>
            <input
              type="text"
              value={form.fecha}
              onChange={e => set('fecha', e.target.value)}
              placeholder="15 jun 2025"
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-stone-700 text-sm focus:outline-none focus:border-gold-400 transition-all"
            />
            <p className="text-stone-400 text-xs mt-2">Texto libre que se muestra debajo del título</p>
          </div>
        </div>
      </div>
    </div>
  )
}
