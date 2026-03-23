'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, MailOpen, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function MarkReadButton({ id, leido }: { id: string; leido: boolean }) {
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(leido)
  const router = useRouter()

  const toggle = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.from('contactos').update({ leido: !current }).eq('id', id)
    setCurrent(!current)
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={current ? 'Marcar como no leído' : 'Marcar como leído'}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
        current
          ? 'text-stone-400 hover:bg-stone-100 hover:text-stone-600'
          : 'text-gold-500 hover:bg-gold-50 hover:text-gold-600'
      }`}
    >
      {loading
        ? <Loader2 size={14} className="animate-spin" />
        : current ? <MailOpen size={14} /> : <Mail size={14} />
      }
    </button>
  )
}
