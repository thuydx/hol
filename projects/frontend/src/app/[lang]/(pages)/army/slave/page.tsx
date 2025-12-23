'use client'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
  CFormInput,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useI18nClient } from '@/lib/i18nClient'
import { NuLiNumRepository } from '@/lib/repositories/NuLiNum.repository'

type I18nSchema = {
  slave: {
    title: string
    description: string
    count: string
  }
}

const repo = new NuLiNumRepository()

export default function Slave() {
  const { t } = useI18nClient<I18nSchema>()
  const [value, setValue] = useState<number>(0)

  /* -----------------------------
   * Load from LocalStorage
   * ----------------------------- */
  useEffect(() => {
    repo.get().then(setValue)
  }, [])

  /* -----------------------------
   * Auto save
   * ----------------------------- */
  const onChange = async (v: string) => {
    const num = Number(v)
    if (Number.isNaN(num)) return

    setValue(num)
    await repo.update(num)
  }

  return (
    <CRow>
      <CCol xs={4}>
        <CCard>
          <CCardHeader>
            <CCardTitle>{t.slave.title}</CCardTitle>
          </CCardHeader>

          <CCardBody>
            <p className="text-muted mb-3">
              {t.slave.description}
            </p>

            <CRow className="align-items-center">
              <CCol xs={4}>
                <label className="form-label mb-0">
                  {t.slave.count}
                </label>
              </CCol>

              <CCol xs={8}>
                <CFormInput
                  type="number"
                  min={0}
                  value={value}
                  onChange={e => onChange(e.target.value)}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
