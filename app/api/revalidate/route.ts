import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { path } = await req.json().catch(() => ({ path: '/' }))

  try {
    if (path) {
      revalidatePath(path)
    } else {
      revalidatePath('/')
      revalidatePath('/predicas')
    }
    return NextResponse.json({ revalidated: true, path })
  } catch (e) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 })
  }
}
