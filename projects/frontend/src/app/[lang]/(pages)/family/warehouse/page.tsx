'use client'

import {
  CButton, CFormInput,
  CCard, CCardBody, CCardHeader, CCardText, CCardTitle,
  CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle,
  CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
  CToast, CToastBody, CToastHeader
} from "@coreui/react-pro";
import React, {useMemo, useEffect, useState} from "react";
import {useI18nClient} from "@/lib/i18nClient";
import {Prop_haveRepository} from "@/lib/repositories/Prop_have.repository";

const ALL_KEY = '__ALL__'

type WarehouseRow = {
  id: string
  quantity: string
}

type I18nSchema = {
  warehouse: {
    title: string
    description: string
    instruction: string
    id: string
    name: string
    quantity: string
    actions: string
    add: string
    delete: string
  }
  uploader: {
    toastTitle: string
  }
  menu: {
    items: string
  }
  common: {
    all: string
  }
  items: Record<string, string>
  'group-item-options': Record<string, string>
  'group-items': Array<Record<string, Record<string, string>>>
}

const repo = new Prop_haveRepository()

const Warehouse = () => {
  const {t} = useI18nClient<I18nSchema>()
  const allItems = t.items
  const [selectedGroup, setSelectedGroup] = useState<string>(ALL_KEY)

  const groupItems: Record<string, Record<string, string>> = t['group-items']?.[0] ?? {}

  const groupOptions = t['group-item-options']

  const [warehouse, setWarehouse] = useState<WarehouseRow[]>([])
  const [selectedLeft, setSelectedLeft] = useState<Set<string>>(new Set())
  const [selectedRight, setSelectedRight] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<{ message: string, color: 'success' | 'danger' } | null>(null)

  const rightTableData = useMemo<Record<string, string>>(() => {
    if (selectedGroup === ALL_KEY) {
      return allItems
    }
    return groupItems[selectedGroup] ?? {}
  }, [selectedGroup, allItems, groupItems])

  const rightTitle =
    selectedGroup === ALL_KEY
      ? t.menu.items
      : groupOptions[selectedGroup] ?? selectedGroup

  /* =============================
   * LOAD
   * ============================= */
  const loadWarehouse = async () => {
    const rows = await repo.all()
    setWarehouse(
      rows.map(r => ({
        id: r[0],
        quantity: r[1] ?? '1'
      }))
    )
  }

  useEffect(() => {
    loadWarehouse()
  }, [])

  /* =============================
   * SELECT helpers
   * ============================= */
  const toggleLeft = (id: string) => {
    setSelectedLeft(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleRight = (id: string) => {
    setSelectedRight(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  /* =============================
   * ADD (Right → Left, COPY)
   * ============================= */
  const addToWarehouse = async () => {
    const exists = new Set(warehouse.map(w => w.id))
    const toAdd = Array.from(selectedRight).filter(id => !exists.has(id))

    for (const id of toAdd) {
      await repo.createRow([id, '1'])
    }

    if (toAdd.length) {
      setToast({message: `${toAdd.length} item(s) added`, color: 'success'})
      await loadWarehouse()
    }

    setSelectedRight(new Set())
  }

  /* =============================
   * DELETE (Left)
   * ============================= */
  const deleteFromWarehouse = async () => {
    const toDelete = new Set(selectedLeft)

    await repo.deleteWhere(row => toDelete.has(row[0]))

    setToast({message: `${toDelete.size} item(s) removed`, color: 'success'})
    setSelectedLeft(new Set())
    await loadWarehouse()
  }

  /* =============================
   * UPDATE quantity
   * ============================= */
  const updateQty = async (id: string, value: string) => {
    setWarehouse(w =>
      w.map(row => row.id === id ? {...row, quantity: value} : row)
    )
    await repo.update_COL_1(id, value)
  }

  /* =============================
  * SELECT ALL helpers
  * ============================= */

// LEFT (Warehouse)
  const allLeftIds = warehouse.map(w => w.id)
  const isAllLeftSelected =
    allLeftIds.length > 0 && allLeftIds.every(id => selectedLeft.has(id))

  const toggleSelectAllLeft = () => {
    if (isAllLeftSelected) {
      setSelectedLeft(new Set())
    } else {
      setSelectedLeft(new Set(allLeftIds))
    }
  }

// RIGHT (All items)
  const allRightIds = Object.keys(rightTableData)

  const isAllRightSelected =
    allRightIds.length > 0 && allRightIds.every(id => selectedRight.has(id))

  const toggleSelectAllRight = () => {
    if (isAllRightSelected) {
      setSelectedRight(new Set())
    } else {
      setSelectedRight(new Set(allRightIds))
    }
  }

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
                {t.uploader.toastTitle}
              </strong>
            </CToastHeader>
            <CToastBody>{toast.message}</CToastBody>
          </CToast>
        </div>
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
                        {allItems[row.id]}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          size="sm"
                          value={row.quantity}
                          onChange={e => updateQty(row.id, e.target.value)}
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

export default Warehouse
