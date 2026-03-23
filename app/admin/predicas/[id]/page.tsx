import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PredicaForm from '@/components/admin/PredicaForm'

export const metadata = { title: 'Editar prédica' }

export default async function EditPredicaPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data } = await supabase.from('predicas').select('*').eq('id', params.id).single()
  if (!data) notFound()
  return <PredicaForm initial={data} isEdit />
}
