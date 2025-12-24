'use client'

import {CCard, CCardBody, CCardHeader, CCardTitle, CCol, CFormInput, CRow,} from '@coreui/react-pro'
import React, {useEffect, useState} from 'react'
import {useI18nClient} from '@/lib/i18nClient'
import {FamilyDataRepository} from '@/lib/repositories/FamilyData.repository'

/**
 * Family Data
 * "FamilyData": {
 *   "__type": "System.Collections.Generic.List`1[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]],mscorlib",
 *     "value": [
 *     "5|4",  // coordinates latitude|longitude
 *     "Ðinh", // Family Name
 *     "44",   // Family Level
 *     "829",  // Renown
 *     "14.1", // Influence to kingdom
 *     "35960749", // Family warehouse capacity
 *     "241",
 *     "0",
 *     "null",
 *     "0"
 *   ]
 * },
 *
 */

type FamilyData = {
  coordinates: string
  name: string
  level: string
  renown: string
  influence: string
  capacity: string
  horsesRemaining: string
  col_7: string
  col_8: string
  col_9: string
}
type I18nSchema = {
  family: {
    title: string
    description: string
    instruction: string
    coordinates: string
    name: string
    level: string
    renown: string
    influence: string
    capacity: string
    horsesRemaining: string
  }
  uploader: {
    toastTitle: string
  }
}
const repo = new FamilyDataRepository()

const Family = () => {
  const {t} = useI18nClient<I18nSchema>()
  const [familyData, setFamilyData] = useState<FamilyData | null>(null)
  useEffect(() => {
    let mounted = true

    const load = async () => {
      const data = await repo.getData()
      if (mounted) {
        setFamilyData({
          ...data,
          col_7: '',
          col_8: '',
          col_9: '',
        })
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])
  const updateName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setFamilyData(p => (p ? { ...p, name: v } : p))
    await repo.updateName(v)
  }

  const updateLevel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setFamilyData(p => (p ? { ...p, level: v } : p))
    await repo.updateLevel(v)
  }

  const updateRenown = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setFamilyData(p => (p ? { ...p, renown: v } : p))
    await repo.updateRenown(v)
  }

  const updateInfluence = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setFamilyData(p => (p ? { ...p, influence: v } : p))
    await repo.updateInfluence(v)
  }

  const updateCapacity = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setFamilyData(p => (p ? { ...p, capacity: v } : p))
    await repo.updateCapacity(v)
  }

  const updateHorsesRemaining = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setFamilyData(p => (p ? { ...p, horsesRemaining: v } : p))
    await repo.updateHorsesRemaining(v)
  }

  return (
    <>
      {/*<h1>{t.family.title}</h1>*/}
      <CRow>
        <CCol xs={5}>
          <CCard>
            <CCardHeader>
              <CCardTitle>{t.family.title}</CCardTitle>
            </CCardHeader>

            <CCardBody>
              {/* COORDINATES */}
              <CRow className="align-items-center mb-2">
                <CCol xs={5}>
                  <label className="form-label mb-0">
                    {t.family.coordinates}
                  </label>
                </CCol>
                <CCol xs={7}>
                  {familyData?.coordinates ?? '0|0'}
                </CCol>
              </CRow>

              {/* NAME */}
              <CRow className="align-items-center">
                <CCol xs={5}>
                  <label className="form-label mb-0">
                    {t.family.name}
                  </label>
                </CCol>
                <CCol xs={7}>
                  <CFormInput
                    size="sm"
                    type="text"
                    value={familyData?.name ?? ''}
                    onChange={updateName}
                  />
                </CCol>
              </CRow>
              <CRow className="align-items-center">
                <CCol xs={5}>
                  <label className="form-label mb-0">
                    {t.family.level}
                  </label>
                </CCol>
                <CCol xs={7}>
                  <CFormInput
                    size="sm"
                    type="number"
                    min={0}
                    max={99}
                    value={familyData?.level ?? ''}
                    onChange={updateLevel}
                  />
                </CCol>
              </CRow>
              <CRow className="align-items-center">
                <CCol xs={5}>
                  <label className="form-label mb-0">
                    {t.family.renown}
                  </label>
                </CCol>
                <CCol xs={7}>
                  <CFormInput
                    size="sm"
                    type="number"
                    min={0}
                    value={familyData?.renown ?? ''}
                    onChange={updateRenown}
                  />
                </CCol>
              </CRow>
              <CRow className="align-items-center">
                <CCol xs={5}>
                  <label className="form-label mb-0">
                    {t.family.influence}
                  </label>
                </CCol>
                <CCol xs={7}>
                  <CFormInput
                    size="sm"
                    type="number"
                    min={0}
                    max={100}
                    value={familyData?.influence ?? ''}
                    onChange={updateInfluence}
                  />
                </CCol>
              </CRow>
              <CRow className="align-items-center">
                <CCol xs={5}>
                  <label className="form-label mb-0">
                    {t.family.capacity}
                  </label>
                </CCol>
                <CCol xs={7}>
                  <CFormInput
                    size="sm"
                    type="number"
                    min={0}
                    value={familyData?.capacity ?? ''}
                    onChange={updateCapacity}
                  />
                </CCol>
              </CRow>
              <CRow className="align-items-center">
                <CCol xs={5}>
                  <label className="form-label mb-0">
                    {t.family.horsesRemaining}
                  </label>
                </CCol>
                <CCol xs={7}>
                  <CFormInput
                    size="sm"
                    type="number"
                    min={0}
                    value={familyData?.horsesRemaining ?? ''}
                    onChange={updateHorsesRemaining}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
export default Family
