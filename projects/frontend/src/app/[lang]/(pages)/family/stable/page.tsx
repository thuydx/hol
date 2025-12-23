'use client'

/**
 * Horse_Have
 * COL_0 : color - belong to colors table
 * COL_1 : yearAge
 * COL_2 : lifespan
 * COL_3 : power
 * COL_4 : speed
 * COL_5 : smart
 * COL_6 : owner - belong to character
 */

import React, {useEffect, useState} from 'react'
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
import {Horse_HaveRepository} from '@/lib/repositories/Horse_Have.repository'

/* =======================
 * Types
 * ======================= */

type HorseRow = [
  string,          // color
  string,          // yearAge
  string,          // lifespan
  string,          // power
  string,          // speed
  string,          // smart
    string | null    // owner
]


type I18nSchema = {
  stable: {
    title: string
    description: string
    instruction: string
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
}

/* =======================
 * Init
 * ======================= */

const repo = new Horse_HaveRepository()


const StablePage = () => {
  const {t} = useI18nClient<I18nSchema>()

  const [rows, setRows] = useState<HorseRow[]>([])
  const [members, setMembers] = useState<any[][]>([])
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [toast, setToast] = useState<{
    message: string
    color: 'success' | 'danger'
  } | null>(null)
  // init default data in form
  const [form, setForm] = useState<HorseRow>([
    '0',
    '1',
    '100',
    '100',
    '100',
    '100',
    null,
  ])

  type NumericField = {
    index: number
    label: string
    min?: number
  }

  const numericFields: NumericField[] = [
    {index: 1, label: t.stable.attribute.yearAge, min: 1},
    {index: 2, label: t.stable.attribute.lifespan},
    {index: 3, label: t.stable.attribute.power},
    {index: 4, label: t.stable.attribute.speed},
    {index: 5, label: t.stable.attribute.smart},
  ]

  /* =======================
   * Load
   * ======================= */
  const loadRows = async () => {
    const data = await getRows('Horse_Have')
    setRows(data as HorseRow[])
  }
  const loadMembers = async () => {
    const data = await getRows('Member_now')
    setMembers(data)
  }

  useEffect(() => {
    (async () => {
      await loadRows()
      await loadMembers()
    })()
  }, [])


  const usedOwnerIds = new Set(
    rows
      .map(r => r[6])
      .filter((v): v is string => Boolean(v))
  )
  const availableOwners = members
    .map(row => {
      const id = row[0]                      // COL_0
      const name = typeof row[4] === 'string'
        ? row[4].split('|')[0]               // COL_4 - SUB_0
        : ''

      return {id, name}
    })
    .filter(o => o.id && o.name)
    .filter(o => !usedOwnerIds.has(o.id))    // ❗ loại owner đã dùng

  /* =======================
   * Actions
   * ======================= */

  const addHorse = async () => {
    await repo.createRow(form)
    await loadRows()
    // setForm(['0', '1', '100', '0', '0', '0', null]) // Reset form after add
    setToast({message: t.stable.add, color: 'success'})
  }

  const deleteSelected = async () => {
    await repo.deleteWhere((_, index) => selected.has(index))
    await loadRows()
    setSelected(new Set())
    setToast({message: t.stable.delete, color: 'success'})
  }

  const updateCellInline = async (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    await repo.updateColumnByIndex(rowIndex, colIndex, value)

    setRows(prev => {
      const next = [...prev]
      next[rowIndex] = [...next[rowIndex]]
      next[rowIndex][colIndex] = value
      return next
    })
  }

  const allOwners = React.useMemo(() => {
    return members
      .map(row => {
        const id = row[0] // Member_now COL_0
        const name =
          typeof row[4] === 'string'
            ? row[4].split('|')[0] // COL_4 - SUB_0
            : ''
        return {id, name}
      })
      .filter(o => o.id && o.name)
  }, [members])

  const getAvailableOwnersForRow = (rowIndex: number) => {
    const currentOwner = rows[rowIndex]?.[6]

    // owner đã được dùng ở các row KHÁC
    const usedByOtherRows = new Set(
      rows
        .map((r, i) => (i !== rowIndex ? r[6] : null))
        .filter((v): v is string => Boolean(v))
    )

    return allOwners.filter(o =>
      o.id === currentOwner || !usedByOtherRows.has(o.id)
    )
  }

  const toggleRow = (index: number) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(index) ? next.delete(index) : next.add(index)
      return next
    })
  }

  /* =======================
   * Render
   * ======================= */
  return (
    <>
      {toast && (
        <div style={{position: 'fixed', top: 16, right: 16, zIndex: 9999}}>
          <CToast
            visible
            autohide
            delay={3000}
            color={toast.color}
            onClose={() => setToast(null)}
          >
            <CToastHeader closeButton>
              <strong className="me-auto">
                {/*{t.uploader.toastTitle}*/}
              </strong>
            </CToastHeader>
            <CToastBody>{toast.message}</CToastBody>
          </CToast>
        </div>
      )}

      <CRow>
        {/* LEFT – TABLE */}
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

                      {/* COLOR */}
                      <CTableDataCell>
                        <CFormSelect
                          size="sm"
                          value={row[0]}
                          onChange={e =>
                            updateCellInline(rowIndex, 0, e.target.value)
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
                          value={row[1]}
                          onChange={e =>
                            updateCellInline(rowIndex, 1, e.target.value)
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
                          value={row[2]}
                          onChange={e =>
                            updateCellInline(rowIndex, 2, e.target.value)
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
                          value={row[3]}
                          onChange={e =>
                            updateCellInline(rowIndex, 3, e.target.value)
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
                          value={row[4]}
                          onChange={e =>
                            updateCellInline(rowIndex, 4, e.target.value)
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
                          value={row[5]}
                          onChange={e =>
                            updateCellInline(rowIndex, 5, e.target.value)
                          }
                        />
                      </CTableDataCell>

                      {/* OWNER */}
                      <CTableDataCell>
                        <CFormSelect
                          size="sm"
                          value={row[6] ?? ''}
                          onChange={e =>
                            updateCellInline(rowIndex, 6, e.target.value)
                          }
                        >
                          <option value="">—</option>

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

              <CButton color="danger" className="mt-2" onClick={deleteSelected}>
                {t.stable.delete}
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>

        {/* RIGHT – FORM */}
        <CCol md={4}>
          <CCard>
            <CCardHeader>
              <CCardTitle>{t.stable.add}</CCardTitle>
            </CCardHeader>

            <CCardBody>

              {/* Color */}
              <CRow className="align-items-center mb-2">
                <CCol xs={4}>
                  <label className="form-label mb-0">
                    {t.stable.attribute.color}
                  </label>
                </CCol>
                <CCol xs={8}>
                  <CFormSelect
                    size="sm"
                    value={form[0]}
                    onChange={e =>
                      setForm([e.target.value, ...form.slice(1)] as HorseRow)
                    }
                  >
                    {Object.entries(t.stable.colors).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Numeric fields */}
              {numericFields.map(({index, label, min}) => (
                <CRow
                  key={index}
                  className="align-items-center mb-2"
                >
                  <CCol xs={4}>
                    <label className="form-label mb-0">
                      {label}
                    </label>
                  </CCol>

                  <CCol xs={8}>
                    <CFormInput
                      size="sm"
                      type="number"
                      min={min ?? 0}
                      max={100}
                      value={form[index] ?? ''}
                      onChange={e => {
                        const next = [...form] as HorseRow
                        next[index] = e.target.value
                        setForm(next)
                      }}
                    />
                  </CCol>
                </CRow>
              ))}

              {/* Owner */}

              <CRow className="align-items-center mb-3">
                <CCol xs={4}>
                  <label className="form-label mb-0">
                    {t.stable.attribute.owner}
                  </label>
                </CCol>

                <CCol xs={8}>
                  <CFormSelect
                    size="sm"
                    value={form[6] ?? ''}
                    onChange={e => {
                      const next = [...form] as HorseRow
                      next[6] = e.target.value || null
                      setForm(next)
                    }}
                  >
                    <option value="">—</option>

                    {availableOwners.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              <div className="text-end">
                <CButton size="sm" color="primary" onClick={addHorse}>
                  {t.stable.add}
                </CButton>
              </div>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default StablePage
