'use client'
import { useI18nClient } from '@/lib/i18nClient'

const Things = () => {
  const { t } = useI18nClient<{menu: {things: string}}>()
  return (
    <>
      <h1>{t.menu.things}</h1>
    </>
  );
}
export default Things
