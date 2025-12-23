'use client'

import {
  CButton,
  CCard, CCardBody, CCardHeader, CCardTitle,
  CCol, CRow,
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
  CFormInput,
  CToast, CToastHeader, CToastBody, CCardText
} from "@coreui/react-pro";
import React, { useEffect, useState } from "react";
import { useI18nClient } from "@/lib/i18nClient";
import { Prop_haveRepository } from "@/lib/repositories/Prop_have.repository";

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
  menu: {
    items: string
  }
  items: Record<string, string>
}

const repo = new Prop_haveRepository()

const Warehouse = () => {
  const { t } = useI18nClient<I18nSchema>()
  const allItems = t.items

  const [warehouse, setWarehouse] = useState<WarehouseRow[]>([])
  const [selectedLeft, setSelectedLeft] = useState<Set<string>>(new Set())
  const [selectedRight, setSelectedRight] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<{ message: string, color: 'success' | 'danger' } | null>(null)

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
      setToast({ message: `${toAdd.length} item(s) added`, color: 'success' })
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

    setToast({ message: `${toDelete.size} item(s) removed`, color: 'success' })
    setSelectedLeft(new Set())
    await loadWarehouse()
  }

  /* =============================
   * UPDATE quantity
   * ============================= */
  const updateQty = async (id: string, value: string) => {
    setWarehouse(w =>
      w.map(row => row.id === id ? { ...row, quantity: value } : row)
    )
    await repo.update_COL_1(id, value)
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
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
          <CToast visible autohide delay={3000} color={toast.color} onClose={() => setToast(null)}>
            <CToastHeader closeButton />
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
                    <CTableHeaderCell />
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
          <div style={{ position: 'sticky', top: 80 }}>
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
            <CCardHeader>
              <CCardTitle>{t.menu.items}</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell />
                    <CTableHeaderCell>{t.warehouse.id}</CTableHeaderCell>
                    <CTableHeaderCell>{t.warehouse.name}</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Object.entries(allItems).map(([id, name]) => (
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
