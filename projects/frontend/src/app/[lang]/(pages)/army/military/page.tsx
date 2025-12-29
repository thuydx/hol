'use client'
// JunYing_now - 军营 - Doanh trại
// INDEX: columnName(en) - columnName(cn) - columnName(vn) - description
// 0: coordinates latitude|longitude - 坐标 - tọa độ - eg -3.2|1.6
// 1: Area - 面积 - Khu vực - option 4,6,9,16
// 2: Soldier Count - 私兵数量 - Số lượng lính - phụ thuộc vào camp site. eg: camp site = 16. max số lượng lính là 3200
// 3: combat power - 待定 - Sức mạnh chiến đấu - MinValue: 0, ko có max
// 4: loyalty - 忠诚 - Lòng trung thành - MinValue: 0, MaxValue: 100
// 5: Low-level Equipment Rate - 低级武器装备率 - Tỉ lệ trang bị vũ khí cấp thấp - minValue: 0, maxValue: 100
// 6: High-level Equipment Rate - 高级武器装备率 - Tỉ lệ trang bị vũ khí cấp cao - minValue: 0, maxValue: 100
// 7: Camp name - 名字 - Tên doanh trại
// 8: salary - 军饷 - Lương bổng - minValue: 0, maxValue = 500

import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CRow,
  CCol,
  CFormCheck, CFormLabel
} from '@coreui/react-pro'

import {useEffect, useMemo, useState} from 'react'
import { JunYing_nowRepository } from '@/lib/repositories/JunYing_now.repository'
import { useI18nClient } from '@/lib/i18nClient'

type JunYingRow = string[]


export default function MilitaryPage() {
  const {t} = useI18nClient<{
    military: {
      title: string,
      add: string,
      delete: string,
      deleteSelected: string,
      actions: string,
      coordinates: string,
      area: string,
      soldiers: string,
      combat: string,
      loyalty: string,
      lowEquip: string,
      highEquip: string,
      campName: string,
      salary: string
    }
  }>()
  const repo = useMemo(() => new JunYing_nowRepository(), [])

  const GROUP_INDEX = 3
  const AREA_OPTIONS = ['4', '6', '9', '16']

  const EMPTY_ROW: JunYingRow  = [
    '',
    '4',
    '0',
    '0',
    '0',
    '0',
    '0',
    '',
    '0'
  ]
  const [rows, setRows] = useState<JunYingRow[]>([])
  const [checked, setChecked] = useState<number[]>([])
  const [form, setForm] = useState<JunYingRow>(() => [])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const data = await repo.getRowsByGroupIndex(GROUP_INDEX)
      if (!cancelled) setRows(data)
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [repo])

  const toggleCheck = (idx: number) => {
    setChecked(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const toggleAll = () => {
    if (!rows.length) {
      setChecked([])
      return
    }

    setChecked(
      checked.length === rows.length
        ? []
        : rows.map((_, i) => i)
    )
  }

  const toggleOne = (idx: number) => {
    setChecked((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const deleteRow = async (idx: number) => {
    await repo.deleteWhere((_, i) => i === idx)
    setRows(await repo.allLevel2())
  }

  const deleteBulk = async () => {
    await repo.deleteWhere((_, i) => checked.includes(i))
    setChecked([])
    setRows(await repo.allLevel2())
  }

  const addRow = async () => {
    await repo.createRow(form)
    setForm(EMPTY_ROW)
    setRows(await repo.allLevel2())
  }
  const updateCell = async (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    // optimistic UI
    setRows(prev =>
      prev.map((row, i) =>
        i === rowIndex
          ? Object.assign([...row], { [colIndex]: value })
          : row
      )
    )

    try {
      await repo.updateCellByRowIndex(
        GROUP_INDEX,
        rowIndex,
        colIndex,
        value
      )
    } catch (err) {
      console.error('updateCell failed', err)
    }
  }

  /*=======
   * RENDERING FUNCTIONS
   */
  const renderInlineInput = (
    row: string[],
    rowIndex: number,
    colIndex: number,
    type: 'text' | 'number' = 'text'
  ) => (
    <CFormInput
      size="sm"
      type={type}
      value={row[colIndex] ?? ''}
      onChange={e =>
        updateCell(rowIndex, colIndex, e.target.value)
      }
    />
  )

  const renderFormRow = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    type: 'text' | 'number' = 'text'
  ) => (
    <CRow className="align-items-center mb-2">
      <CCol xs={7}>
        <CFormLabel className="mb-0">
          {label}
        </CFormLabel>
      </CCol>
      <CCol xs={5}>
        <CFormInput
          size="sm"
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </CCol>
    </CRow>
  )

  return (
    <CRow>
      {/* LEFT TABLE */}
      <CCol md={9}>
        <CCard>
          <CCardHeader>{t.military.title}</CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>
                    <CFormCheck
                      checked={checked.length === rows.length}
                      onChange={toggleAll}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell>{t.military.campName}</CTableHeaderCell>
                  <CTableHeaderCell>{t.military.area}</CTableHeaderCell>
                  <CTableHeaderCell>{t.military.soldiers}</CTableHeaderCell>
                  <CTableHeaderCell>{t.military.combat}</CTableHeaderCell>
                  <CTableHeaderCell>{t.military.loyalty}</CTableHeaderCell>
                  <CTableHeaderCell>{t.military.lowEquip}</CTableHeaderCell>
                  <CTableHeaderCell>{t.military.highEquip}</CTableHeaderCell>
                  <CTableHeaderCell>{t.military.salary}</CTableHeaderCell>
                  <CTableHeaderCell>{t.military.actions}</CTableHeaderCell>

                </CTableRow>
              </CTableHead>

              <CTableBody>
                {rows.map((row, idx) => (
                  <CTableRow key={idx}>
                    <CTableDataCell>
                      <CFormCheck
                        checked={checked.includes(idx)}
                        onChange={() => toggleOne(idx)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>{renderInlineInput(row, idx, 7)}</CTableDataCell>
                    <CTableDataCell width={80}>{renderInlineInput(row, idx, 1, 'text')}</CTableDataCell>
                    <CTableDataCell width={100}>{renderInlineInput(row, idx, 2, 'text')}</CTableDataCell>
                    <CTableDataCell width={80}>{renderInlineInput(row, idx, 3, 'text')}</CTableDataCell>
                    <CTableDataCell width={80}>{renderInlineInput(row, idx, 4, 'text')}</CTableDataCell>
                    <CTableDataCell width={80}>{renderInlineInput(row, idx, 5, 'text')}</CTableDataCell>
                    <CTableDataCell width={80}>{renderInlineInput(row, idx, 6, 'text')}</CTableDataCell>
                    <CTableDataCell width={50}>{renderInlineInput(row, idx, 8, 'text')}</CTableDataCell>
                    <CTableDataCell width={100}>
                      <CButton size="sm" color="danger" onClick={() => deleteRow(idx)}> {t.military.delete} </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <div className="mt-3 text-end">
              <CButton
                color="danger"
                disabled={!checked.length}
                onClick={deleteBulk}
              >
                {t.military.deleteSelected}
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* RIGHT FORM */}
      <CCol md={3}>
        <CCard>
          <CCardHeader>{t.military.add}</CCardHeader>
          <CCardBody className="d-grid gap-2">
            {renderFormRow(
              t.military.campName,
              form[7],
              v => setForm(f => {
                const next = [...f]
                next[7] = v
                return next
              })
            )}
            {renderFormRow(
              t.military.coordinates,
              form[0],
              v => setForm(f => {
                const next = [...f]
                next[0] = v
                return next
              })
            )}
            <CRow className="align-items-center mb-2">
              <CCol xs={7}>
                <CFormLabel className="mb-0">
                  {t.military.area}:
                </CFormLabel>
              </CCol>
              <CCol xs={5}>
                <CDropdown style={{width:'100%'}}>
                  <CDropdownToggle color="secondary">
                    {form[1]}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    {AREA_OPTIONS.map(v => (
                      <CDropdownItem
                        key={v}
                        onClick={() =>
                          setForm(f => ([f[0], v, ...f.slice(2)]))
                        }
                      >
                        {v}
                      </CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CRow>

            {renderFormRow(
              t.military.soldiers,
              form[2],
              v => setForm(f => {
                const next = [...f]
                next[2] = v
                return next
              }),
              'number'
            )}

            {renderFormRow(
              t.military.combat,
              form[3],
              v => setForm(f => {
                const next = [...f]
                next[3] = v
                return next
              }),
              'number'
            )}
            {renderFormRow(
              t.military.loyalty,
              form[4],
              v => setForm(f => {
                const next = [...f]
                next[4] = v
                return next
              }),
              'number'
            )}
            {renderFormRow(
              t.military.lowEquip,
              form[5],
              v => setForm(f => {
                const next = [...f]
                next[5] = v
                return next
              }),
              'number'
            )}
            {renderFormRow(
              t.military.highEquip,
              form[6],
              v => setForm(f => {
                const next = [...f]
                next[6] = v
                return next
              }),
              'number'
            )}
            {renderFormRow(
              t.military.salary,
              form[8],
              v => setForm(f => {
                const next = [...f]
                next[8] = v
                return next
              }),
              'number'
            )}
            <CButton color="primary" onClick={addRow}>
              {t.military.add}
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
