import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import NoticiaForm from '@/components/admin/NoticiaForm'

export const metadata = { title: 'Editar noticia' }

export default async function EditNoticiaPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data } = await supabase.from('noticias').select('*').eq('id', params.id).single()
  if (!data) notFound()
  return <NoticiaForm initial={data} isEdit />
}
