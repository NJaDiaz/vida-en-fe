'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  table: 'noticias' | 'predicas' | 'contactos'
  id: string
}

export default function DeleteButton({ table, id }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = confirm('¿Seguro que querés eliminar este elemento? Esta acción no se puede deshacer.')
    if (!confirmed) return

    setLoading(true)
    const supabase = createClient()
    await supabase.from(table).delete().eq('id', id)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      title="Eliminar"
      className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-stone-400 hover:text-red-500 transition-colors disabled:opacity-50"
    >
      {loading
        ? <Loader2 size={14} className="animate-spin" />
        : <Trash2 size={14} />
      }
    </button>
  )
}
