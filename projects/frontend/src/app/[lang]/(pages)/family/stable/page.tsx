'use client'

import React, {useEffect, useMemo, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CFormInput,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CToast,
  CToastBody,
  CToastHeader,
} from '@coreui/react-pro'

import {useI18nClient} from '@/lib/i18nClient'
import {getRows} from '@/lib/gameData.model'
import {useHorseHave} from '@/hooks/horseHave'
import {DEFAULT_HORSE_HAVE_ROW, HorseHaveRow,} from '@/models/horseHave'

type I18nSchema = {
  stable: {
    title: string
    attribute: {
      color: string
      yearAge: string
      lifespan: string
      power: string
      speed: string
      smart: string
      owner: string
    }
    colors: Record<string, string>
    add: string
    delete: string
  }
  uploader: {
    toastTitle: string
  }
}

const StablePage = () => {
  const {t} = useI18nClient<I18nSchema>()
  const {rows, selected, add, removeSelected, updateCell, toggleRow} =
    useHorseHave()

  const [members, setMembers] = useState<any[][]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [form, setForm] = useState<HorseHaveRow>(
    DEFAULT_HORSE_HAVE_ROW
  )

  /* ---------- Load members ---------- */
  // if (members.length === 0) {
  //   void getRows('Member_now').then(setMembers)
  // }
  useEffect(() => {
    let mounted = true

    ;(async () => {
      const data = await getRows('Member_now')
      if (mounted) {
        setMembers(data)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])
  /* ---------- Owner helpers ---------- */

  const allOwners = useMemo(() => {
    return members
      .map(row => ({
        id: row[0],
        name: typeof row[4] === 'string' ? row[4].split('|')[0] : '',
      }))
      .filter(o => o.id && o.name)
  }, [members])

  const getAvailableOwnersForRow = (rowIndex: number) => {
    const currentOwner = rows[rowIndex]?.[6]
    const usedByOtherRows = new Set(
      rows
        .map((r, i) => (i !== rowIndex ? r[6] : null))
        .filter(v => v && v !== 'null')
    )

    return allOwners.filter(
      o => o.id === currentOwner || !usedByOtherRows.has(o.id)
    )
  }

  /* ---------- Render ---------- */

  return (
    <>
      {toast && (
        <div style={{position: 'fixed', top: 16, right: 16}}>
          <CToast visible autohide delay={3000} onClose={() => setToast(null)}>
            <CToastHeader closeButton>
              <strong>{t.uploader.toastTitle}</strong>
            </CToastHeader>
            <CToastBody>{toast}</CToastBody>
          </CToast>
        </div>
      )}

      <CRow>
        {/* LEFT TABLE */}
        <CCol md={8}>
          <CCard>
            <CCardHeader>
              <CCardTitle>{t.stable.title}</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell/>
                    {Object.values(t.stable.attribute).map(label => (
                      <CTableHeaderCell key={label}>{label}</CTableHeaderCell>
                    ))}
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {rows.map((row, rowIndex) => (
                    <CTableRow
                      key={rowIndex}
                      active={selected.has(rowIndex)}
                    >
                      {/* CHECKBOX */}
                      <CTableDataCell>
                        <input
                          type="checkbox"
                          checked={selected.has(rowIndex)}
                          onChange={() => toggleRow(rowIndex)}
                        />
                      </CTableDataCell>

                      {/* COLOR (SELECT – ĐÚNG) */}
                      <CTableDataCell>
                        <CFormSelect
                          size="sm"
                          value={row[0]}
                          onChange={e =>
                            updateCell(rowIndex, 0, e.target.value)
                          }
                        >
                          {Object.entries(t.stable.colors).map(([k, v]) => (
                            <option key={k} value={k}>
                              {v}
                            </option>
                          ))}
                        </CFormSelect>
                      </CTableDataCell>

                      {/* YEAR AGE */}
                      <CTableDataCell>
                        <CFormInput
                          size="sm"
                          type="number"
                          min={1}
                          max={100}
                          value={row[1] ?? ''}
                          onChange={e =>
                            updateCell(rowIndex, 1, e.target.value)
                          }
                        />
                      </CTableDataCell>

                      {/* LIFESPAN */}
                      <CTableDataCell>
                        <CFormInput
                          size="sm"
                          type="number"
                          min={0}
                          max={100}
                          value={row[2] ?? ''}
                          onChange={e =>
                            updateCell(rowIndex, 2, e.target.value)
                          }
                        />
                      </CTableDataCell>

                      {/* POWER */}
                      <CTableDataCell>
                        <CFormInput
                          size="sm"
                          type="number"
                          min={0}
                          max={100}
                          value={row[3] ?? ''}
                          onChange={e =>
                            updateCell(rowIndex, 3, e.target.value)
                          }
                        />
                      </CTableDataCell>

                      {/* SPEED */}
                      <CTableDataCell>
                        <CFormInput
                          size="sm"
                          type="number"
                          min={0}
                          max={100}
                          value={row[4] ?? ''}
                          onChange={e =>
                            updateCell(rowIndex, 4, e.target.value)
                          }
                        />
                      </CTableDataCell>

                      {/* SMART */}
                      <CTableDataCell>
                        <CFormInput
                          size="sm"
                          type="number"
                          min={0}
                          max={100}
                          value={row[5] ?? ''}
                          onChange={e =>
                            updateCell(rowIndex, 5, e.target.value)
                          }
                        />
                      </CTableDataCell>

                      {/* OWNER */}
                      <CTableDataCell>
                        <CFormSelect
                          size="sm"
                          value={row[6]}
                          onChange={e =>
                            updateCell(rowIndex, 6, e.target.value)
                          }
                        >
                          <option value="null">—</option>
                          {getAvailableOwnersForRow(rowIndex).map(o => (
                            <option key={o.id} value={o.id}>
                              {o.name}
                            </option>
                          ))}
                        </CFormSelect>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              <CButton color="danger" onClick={removeSelected}>
                {t.stable.delete}
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>

        {/* RIGHT FORM */}
        <CCol md={4}>
          <CCard>
            <CCardHeader>
              <CCardTitle>{t.stable.add}</CCardTitle>
            </CCardHeader>
            <CCardBody>
              {form.map((v, i) =>
                i < 6 ? (
                  <CFormInput
                    key={i}
                    size="sm"
                    type="number"
                    min={i === 1 ? 1 : 0}
                    max={100}
                    value={v ?? ''}
                    onChange={e => {
                      const next = [...form] as HorseHaveRow
                      next[i] = e.target.value
                      setForm(next)
                    }}
                  />
                ) : null
              )}

              <CFormSelect
                size="sm"
                value={form[6]}
                onChange={e => {
                  const next = [...form] as HorseHaveRow
                  next[6] = e.target.value
                  setForm(next)
                }}
              >
                <option value="null">—</option>
                {allOwners.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </CFormSelect>

              <CButton
                className="mt-2"
                size="sm"
                onClick={() => {
                  void add(form)
                  setToast(t.stable.add)
                }}
              >
                {t.stable.add}
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default StablePage
