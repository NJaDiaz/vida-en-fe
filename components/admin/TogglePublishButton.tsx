'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  table: 'noticias' | 'predicas'
  id: string
  publicada: boolean
}

export default function TogglePublishButton({ table, id, publicada }: Props) {
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(publicada)
  const router = useRouter()

  const toggle = async () => {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase
      .from(table)
      .update({ publicada: !current })
      .eq('id', id)

    if (!error) {
      setCurrent(!current)
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={current ? 'Despublicar' : 'Publicar'}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 ${
        current
          ? 'hover:bg-yellow-50 text-green-500 hover:text-yellow-500'
          : 'hover:bg-green-50 text-stone-400 hover:text-green-500'
      }`}
    >
      {loading
        ? <Loader2 size={14} className="animate-spin" />
        : current ? <Eye size={14} /> : <EyeOff size={14} />
      }
    </button>
  )
}
