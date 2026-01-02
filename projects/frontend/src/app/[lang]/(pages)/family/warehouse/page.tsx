'use client'

import {
  CButton,
  CCard, CCardBody, CCardHeader, CCardText, CCardTitle,
  CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle,
  CFormInput,
  CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
  CToast, CToastBody, CToastHeader
} from '@coreui/react-pro'
import { useMemo, useState } from 'react'
import { useI18nClient } from '@/lib/i18nClient'
import { useWarehouse } from '@/lib/hooks/warehouse'
import { ALL_KEY } from '@/lib/models/warehouse'

const WarehousePage = () => {
  const { t } = useI18nClient<any>()
  const [toast, setToast] = useState<string | null>(null)

  const items = t.items ?? {}
  const groupItems = t['group-items']?.[0] ?? {}
  const groupOptions = t['group-item-options'] ?? {}

  const {
    warehouse,
    rightTableData,
    selectedGroup,
    setSelectedGroup,

    selectedLeft,
    selectedRight,

    toggleLeft,
    toggleRight,
    toggleSelectAllLeft,
    toggleSelectAllRight,

    isAllLeftSelected,
    isAllRightSelected,

    addToWarehouse,
    deleteFromWarehouse,
    updateQuantity,
  } = useWarehouse(items, groupItems)

  const rightTitle =
    selectedGroup === ALL_KEY ? t.menu.items : groupOptions[selectedGroup] ?? selectedGroup
  return (
    <>
      {/* INFO */}
      <CRow>
        <CCol md={12}>
          <CCard>
            <CCardHeader>
              <CCardTitle>{t.warehouse.title}</CCardTitle>
              <CCardText>{t.warehouse.description}</CCardText>
            </CCardHeader>
            <CCardBody>{t.warehouse.instruction}</CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* TOAST */}
      {toast && (
        <CToast visible autohide delay={3000} color="success" onClose={() => setToast(null)}>
            <CToastHeader closeButton>
              <strong className="me-auto">
                {t.uploader.toastTitle}
              </strong>
            </CToastHeader>
          <CToastBody>{toast}</CToastBody>
        </CToast>
      )}
      <CRow className="mt-3">

        {/* LEFT — WAREHOUSE */}
        <CCol md={6}>
          <CCard>
            <CCardHeader>
              <CCardTitle>{t.warehouse.title}</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>
                      <input
                        type="checkbox"
                        checked={isAllLeftSelected}
                        onChange={toggleSelectAllLeft}
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell>{t.warehouse.id}</CTableHeaderCell>
                    <CTableHeaderCell>{t.warehouse.name}</CTableHeaderCell>
                    <CTableHeaderCell>{t.warehouse.quantity}</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {warehouse.map(row => (
                    <CTableRow key={row.id} active={selectedLeft.has(row.id)}>
                      <CTableDataCell>
                        <input
                          type="checkbox"
                          checked={selectedLeft.has(row.id)}
                          onChange={() => toggleLeft(row.id)}
                        />
                      </CTableDataCell>
                      <CTableDataCell role="button" onClick={() => toggleLeft(row.id)}>
                        {row.id}
                      </CTableDataCell>
                      <CTableDataCell role="button" onClick={() => toggleLeft(row.id)}>
                        {items[row.id]}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          size="sm"
                          value={row.quantity}
                          onChange={e => updateQuantity(row.id, e.target.value)}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* ACTIONS */}
        <CCol md={2}>
          <div style={{position: 'sticky', top: 80}}>
            <CCard>
              <CCardHeader>
                <CCardTitle>{t.warehouse.actions}</CCardTitle>
              </CCardHeader>
              <CCardBody className="d-grid gap-2">
                <CButton color="primary" onClick={addToWarehouse}>
                  {t.warehouse.add}
                </CButton>
                <CButton color="danger" onClick={deleteFromWarehouse}>
                  {t.warehouse.delete}
                </CButton>
              </CCardBody>
            </CCard>
          </div>
        </CCol>
        {/* RIGHT — ALL ITEMS */}
        <CCol md={4}>
          <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <CCardTitle>{rightTitle}</CCardTitle>

              <CDropdown alignment="end">
                <CDropdownToggle color="primary">
                  {rightTitle}
                </CDropdownToggle>

                <CDropdownMenu
                  style={{
                    maxHeight: 'calc(20 * 31px)',
                    overflowY: 'auto'
                  }}
                >
                  {/* ALL OPTION */}
                  <CDropdownItem
                    active={selectedGroup === ALL_KEY}
                    onClick={() => setSelectedGroup(ALL_KEY)}
                  >
                    {t.common.all}
                  </CDropdownItem>

                  {Object.keys(groupItems).map(groupKey => (
                    <CDropdownItem
                      key={groupKey}
                      active={selectedGroup === groupKey}
                      onClick={() => setSelectedGroup(groupKey)}
                    >
                      {groupOptions[groupKey] ?? groupKey}
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
            </CCardHeader>

            <CCardBody>
              <CTable striped hover small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>
                      <input
                        type="checkbox"
                        checked={isAllRightSelected}
                        onChange={toggleSelectAllRight}
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell>{t.warehouse.id}</CTableHeaderCell>
                    <CTableHeaderCell>{t.warehouse.name}</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {Object.entries(rightTableData).map(([id, name]) => (
                    <CTableRow key={id} active={selectedRight.has(id)}>
                      <CTableDataCell>
                        <input
                          type="checkbox"
                          checked={selectedRight.has(id)}
                          onChange={() => toggleRight(id)}
                        />
                      </CTableDataCell>
                      <CTableDataCell role="button" onClick={() => toggleRight(id)}>
                        {id}
                      </CTableDataCell>
                      <CTableDataCell role="button" onClick={() => toggleRight(id)}>
                        {name}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default WarehousePage
