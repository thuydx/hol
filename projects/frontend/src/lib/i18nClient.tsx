'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { defaultLang, Lang, getDict } from '@/lib/i18n'
import viDict from '@/lang/vi.json'

export function useI18nClient<T = any>() {
  const params = useParams<{ lang?: Lang }>()
  const lang: Lang = params?.lang ?? defaultLang

  // Only store async dictionaries in state.
  const [asyncT, setAsyncT] = useState<T>(() => ({} as T))

  useEffect(() => {
    if (lang === defaultLang) return

    let cancelled = false

    void getDict(lang).then((d) => {
      if (!cancelled) setAsyncT(d as unknown as T)
    })

    return () => {
      cancelled = true
    }
  }, [lang])

  // Render-time selection: default is synchronous, others come from async state.
  const t = useMemo<T>(() => {
    return (lang === defaultLang ? (viDict as unknown as T) : asyncT) as T
  }, [lang, asyncT])

  return { t, lang }
}

/**
 * Example for the Client Component usage
 */
// `projects/frontend/src/app/[lang]/(pages)/example/page.tsx`
// 'use client'
//
// import React from 'react'
// import { useI18nClient } from '@/lib/i18nClient'
//
// type I18nSchema = {
//   common: { ok: string }
//   example: { title: string; description: string }
// }
//
// export default function ExamplePage() {
//   const { t, lang } = useI18nClient<I18nSchema>()
//
//   return (
//     <main style={{ padding: 16 }}>
//       <div>lang\={lang}</div>
//       <h1>{t.example?.title ?? '...'}</h1>
//       <p>{t.example?.description ?? ''}</p>
//       <button type="button">{t.common?.ok ?? 'OK'}</button>
//     </main>
//   )
// }
