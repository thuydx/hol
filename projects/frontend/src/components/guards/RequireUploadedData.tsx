'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CButton,
} from '@coreui/react-pro'
import { useMemo, useState } from 'react'
import {useI18nClient} from "@/lib/i18nClient";

type Props = {
  children: React.ReactNode
}
type I18nSchema = {
  requiredUpload: {
    title: string,
    description: string,
    upload: string
  },
}
export default function RequireUploadedData({ children }: Props) {
  const {t} = useI18nClient<I18nSchema>()
  const router = useRouter()
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const lang = segments[0] || 'vi'

  /** ✅ Home page: /vi, /en */
  const isHomePage = segments.length === 1

  /** ✅ check data once */
  const hasData = useMemo(() => {
    try {
      return !!localStorage.getItem('uploadedJson')
    } catch {
      return false
    }
  }, [])

  /** ✅ modal state */
  const [visible, setVisible] = useState(!hasData && !isHomePage)

  const goHome = () => {
    setVisible(false)          // 👈 close modal first
    router.replace(`/${lang}`) // 👈 then redirect
  }

  /** ✅ allow home page always */
  if (isHomePage) {
    return <>{children}</>
  }

  /** ⛔ block protected pages */
  if (!hasData) {
    return (
      <CModal
        visible={visible}
        backdrop="static"
        keyboard={false}
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>{t.requiredUpload.title}</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {t.requiredUpload.description}
        </CModalBody>

        <CModalFooter>
          <CButton color="primary" onClick={goHome}>
            {t.requiredUpload.upload}
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }

  /** ✅ has data → render page */
  return <>{children}</>
}
