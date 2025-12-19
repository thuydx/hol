'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { defaultLang, Lang, getDict } from '@/lib/i18n'
import viDict from '@/lang/vi.json'

export function useI18nClient<T = any>() {
  const params = useParams<{ lang?: Lang }>()
  const lang = params?.lang ?? defaultLang

  const [t, setT] = useState<T>(viDict as T)

  useEffect(() => {
    if (lang === defaultLang) {
      setT(viDict as T)
    } else {
      getDict(lang).then((d) => setT(d as T))
    }
  }, [lang])

  return { t, lang }
}

/**
 * Example for the Client Component usage
 */
// 'use client'
//
// import { useI18nClient } from '@/lib/i18nClient'
//
// const Things = () => {
//   const { t } = useI18nClient<{ things: { title: string } }>()
//
//   return <h1>{t.things.title}</h1>
// }
//
// export default Things
