'use client'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react-pro'

import {InputCell} from '@/components/table/InputCell'
import {useShiJiaKing} from '@/hooks/useShiJiaKing'
import {useI18nClient} from '@/lib/i18nClient'
import {ShiJiaKingRelationTable} from '@/components/table/ShiJiaKingRelationTable'
import {useShiJiaNow} from '@/hooks/useShiJiaNow'
import {useKingCityData} from '@/hooks/useKingCityData'
import {buildFamilyTitle} from '@/services/buildTitle'
import {resolveMemberByRef} from '@/services/memberResolver'

export default function ShiJiaKingPage() {
  const {data: kingData} = useKingCityData()
  const {data, loading, update} = useShiJiaKing()
  const {t} = useI18nClient<any>()
  const {data: otherFamilies} = useShiJiaNow()

  if (loading || !data) return <div>Loading…</div>

  return (
    <>
      <CRow className="mb-3">
        <CCol md={7}>
          <CCard>
            <CCardHeader>
              <strong>{t.shiJiaKing.title}</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped small hover>
                <CTableBody>
                  {/* NAME */}
                  <CTableRow>
                    <CTableDataCell style={{width: 220}}>
                      {t.shiJiaKing.name}
                    </CTableDataCell>
                    <CTableDataCell>
                      {data.name}
                    </CTableDataCell>
                  </CTableRow>
                  {/* LEVEL */}
                  <CTableRow>
                    <CTableDataCell>
                      {t.shiJiaKing.level}
                    </CTableDataCell>
                    <CTableDataCell>
                      <InputCell
                        type="number"
                        value={data.level}
                        onChange={v =>
                          update(m => ({
                            ...m,
                            level: Number(v),
                          }))
                        }
                      />
                    </CTableDataCell>
                  </CTableRow>
                  {/* RELATIONSHIP INDEX */}
                  <CTableRow>
                    <CTableDataCell>
                      {t.shiJiaKing.relationshipIndex}
                    </CTableDataCell>
                    <CTableDataCell>
                      <InputCell
                        type="number"
                        value={data.relationshipIndex}
                        onChange={v =>
                          update(m => ({
                            ...m,
                            relationshipIndex: Number(v),
                          }))
                        }
                      />
                    </CTableDataCell>
                  </CTableRow>
                  {/* TROOP */}
                  <CTableRow>
                    <CTableDataCell style={{width: 220}}>
                      {t.shiJiaKing.troop}
                    </CTableDataCell>
                    <CTableDataCell>
                      {kingData?.capital.troop}
                    </CTableDataCell>
                  </CTableRow>

                  {/* LOYALTY */}
                  <CTableRow>
                    <CTableDataCell>
                      {t.shiJiaKing.loyalty}
                    </CTableDataCell>
                    <CTableDataCell>
                      {kingData?.capital.loyalty}
                    </CTableDataCell>
                  </CTableRow>

                  {/* TREASURY */}
                  <CTableRow>
                    <CTableDataCell>
                      {t.shiJiaKing.treasury}
                    </CTableDataCell>
                    <CTableDataCell>
                      {kingData?.treasury}
                    </CTableDataCell>
                  </CTableRow>
                  {/* RELATIONS */}
                  <CTableRow>
                    <CTableDataCell>
                      {t.shiJiaKing.relations}
                    </CTableDataCell>
                    <CTableDataCell>
                      <ShiJiaKingRelationTable
                        relations={data.relations}
                        otherFamilies={otherFamilies}
                        t={t}
                      />
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={5}>
          <CCard>
            <CCardHeader>
              <strong>{t.shiJiaKing.fengdi}</strong>
            </CCardHeader>

            <CCardBody>
              <CTable striped small hover>
                <CTableBody>
                  {kingData?.fengdi.map(f => {
                    const stateLabel =
                      f.state === -2
                        ? t.shiJiaKing.fengdi_state.empty
                        : f.state === -1
                          ? t.shiJiaKing.fengdi_state.external
                          : t.shiJiaKing.fengdi_state.internal
                    // const shiJia = shiJiaNow[f.index]
                    // const fengdiTitle = buildFamilyTitle(
                    //   shiJia?.coordinates,
                    //   f.name,
                    //   t,
                    // )
                    const member = f.memberRef
                      ? resolveMemberByRef(f.memberRef)
                      : null
                    // console.log(member)
                    return (
                      <CTableRow key={f.index}>
                        {/* STATE */}
                        { stateLabel != '' && (
                        <CTableDataCell style={{width: 140}}>
                          {stateLabel}
                        </CTableDataCell>
                        )}

                        {/* FENGDI TITLE + LEVEL */}

                        <CTableDataCell>
                          {/*{fengdiTitle}*/}
                          {/*            {member?.level != null && (*/}
                          {/*              <span className="ms-2 text-muted">*/}
                          {/*  (Lv.{member?.level})*/}
                          {/*</span>*/}
                          {/*            )}*/}
                        </CTableDataCell>

                        {/* MEMBER NAME */}
                        {/*<CTableDataCell style={{width: 220}}>*/}
                          {/*{member?.name ?? '—'}*/}
                        {/*</CTableDataCell>*/}
                      </CTableRow>
                    )
                  })}

                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


    </>
  )
}
