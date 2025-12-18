import {ReactNode} from 'react'
import {notFound} from 'next/navigation'
import {isValidLang} from '@/lib/i18n'
import Layout from '@/views/layout'

export default async function PagesLayout({children, params}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const {lang} = await params

  if (!isValidLang(lang)) {
    notFound()
  }

  return <Layout>{children}</Layout>
}
