'use client'

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
  CFormCheck,
  CFormLabel
} from '@coreui/react-pro'

import { useI18nClient } from '@/lib/i18nClient'
import { useJunYingNow } from '@/hooks/JunYing'
import { AREA_OPTIONS } from '@/models/junYingNow'

export default function MilitaryPage() {
  const { t } = useI18nClient<any>()
  const {
    rows,
    checked,
    setChecked,
    form,
    setForm,
    updateCell,
    addRow,
    deleteRow,
    deleteBulk
  } = useJunYingNow(3)

  const toggleAll = () => {
    setChecked(
      checked.length === rows.length
        ? []
        : rows.map((_, i) => i)
    )
  }

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
                  {[
                    'campName',
                    'area',
                    'soldiers',
                    'combat',
                    'loyalty',
                    'lowEquip',
                    'highEquip',
                    'salary',
                    'actions'
                  ].map(k => (
                    <CTableHeaderCell key={k}>
                      {t.military[k]}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {rows.map((row, idx) => (
                  <CTableRow key={idx}>
                    <CTableDataCell>
                      <CFormCheck
                        checked={checked.includes(idx)}
                        onChange={() =>
                          setChecked(p =>
                            p.includes(idx)
                              ? p.filter(i => i !== idx)
                              : [...p, idx]
                          )
                        }
                      />
                    </CTableDataCell>

                    {[7, 1, 2, 3, 4, 5, 6, 8].map(col => (
                      <CTableDataCell key={col}>
                        <CFormInput
                          size="sm"
                          value={row[col]}
                          onChange={e =>
                            updateCell(idx, col, e.target.value)
                          }
                        />
                      </CTableDataCell>
                    ))}

                    <CTableDataCell>
                      <CButton
                        size="sm"
                        color="danger"
                        onClick={() => deleteRow(idx)}
                      >
                        {t.military.delete}
                      </CButton>
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
            {[
              ['campName', 7],
              ['coordinates', 0],
              ['soldiers', 2],
              ['combat', 3],
              ['loyalty', 4],
              ['lowEquip', 5],
              ['highEquip', 6],
              ['salary', 8]
            ].map(([k, i]) => (
              <CRow key={k as string} className="mb-2">
                <CCol xs={7}>
                  <CFormLabel>{t.military[k]}</CFormLabel>
                </CCol>
                <CCol xs={5}>
                  <CFormInput
                    size="sm"
                    value={form[i as number]}
                    onChange={e => {
                      const next = [...form] as any
                      next[i as number] = e.target.value
                      setForm(next)
                    }}
                  />
                </CCol>
              </CRow>
            ))}

            <CRow className="mb-2">
              <CCol xs={7}>
                <CFormLabel>{t.military.area}</CFormLabel>
              </CCol>
              <CCol xs={5}>
                <CDropdown>
                  <CDropdownToggle color="secondary">
                    {form[1]}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    {AREA_OPTIONS.map(v => (
                      <CDropdownItem
                        key={v}
                        onClick={() => {
                          const next = [...form] as any
                          next[1] = v
                          setForm(next)
                        }}
                      >
                        {v}
                      </CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CRow>

            <CButton color="primary" onClick={addRow}>
              {t.military.add}
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
