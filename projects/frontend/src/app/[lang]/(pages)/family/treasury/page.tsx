'use client'

import {
  CCard, CCardBody, CCardHeader, CCardTitle,
  CCol, CRow,
  CFormInput,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useI18nClient } from '@/lib/i18nClient'
import { CGNumRepository } from '@/lib/repositories/CGNum.repository'

/**
 * Treasury Row
 * "CGNum": {
 *   "__type": "",
 *   "value": [
 *     "784143081", // silver
 *     "99932933", // gold
 *     "3",
 *     "0"
 *   ]
 * },
 */
type TreasuryRow = {
  gold: string
  silver: string
  row_2: string,
  row_3: string
}

type I18nSchema = {
  treasury: {
    title: string
    description: string
    instruction: string
    gold: string
    silver: string
  }
  menu: {
    treasury: string
  }
  items: Record<string, string>
}

const repo = new CGNumRepository()

const Treasury = () => {
  const { t } = useI18nClient<I18nSchema>()

  const [silver, setSilver] = useState('')
  const [gold, setGold] = useState('')
  /* -------------------------------
  * Load from LocalStorage
  * ------------------------------- */
  useEffect(() => {
    repo.get().then(data => {
      setSilver(data.silver)
      setGold(data.gold)
    })
  }, [])

  /* -------------------------------
   * Handlers (auto save)
   * ------------------------------- */
  const onSilverChange = async (value: string) => {
    setSilver(value)
    await repo.updateSilver(value)
  }

  const onGoldChange = async (value: string) => {
    setGold(value)
    await repo.updateGold(value)
  }
  return (
    <CRow>
      <CCol xs={4}>
        <CCard>
          <CCardHeader>
            <CCardTitle>{t.treasury.title}</CCardTitle>
          </CCardHeader>

          <CCardBody>
            {/* SILVER */}
            <CRow className="align-items-center mb-2">
              <CCol xs={3}>
                <label className="form-label mb-0">
                  {t.treasury.silver}
                </label>
              </CCol>
              <CCol xs={9}>
                <CFormInput
                  size="sm"
                  type="number"
                  min={0}
                  value={silver}
                  onChange={e => onSilverChange(e.target.value)}
                />
              </CCol>
            </CRow>

            {/* GOLD */}
            <CRow className="align-items-center">
              <CCol xs={3}>
                <label className="form-label mb-0">
                  {t.treasury.gold}
                </label>
              </CCol>
              <CCol xs={9}>
                <CFormInput
                  size="sm"
                  type="number"
                  min={0}
                  value={gold}
                  onChange={e => onGoldChange(e.target.value)}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
export default Treasury

