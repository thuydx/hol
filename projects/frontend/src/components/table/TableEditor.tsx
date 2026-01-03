'use client'

import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CRow,
  CCol,
} from '@coreui/react-pro'

import { ColumnDef } from '@/lib/types/table'
import { ReactNode } from 'react'
import { useRowReloadRegistry } from '@/lib/hooks/useRowReloadRegistry'

type TableEditorProps<T> = {
  title: string
  columns: ColumnDef<T>[]
  indexes: number[]
  renderRow: (
    index: number,
    helpers: {
      registerReload: (index: number, fn: () => void) => void
      unregisterReload: (index: number) => void
    }
  ) => ReactNode
  renderHeaderActions?: (helpers: {
    reloadAllRows: () => void
  }) => ReactNode
}

export function TableEditor<T>({
                                 title,
                                 columns,
                                 indexes,
                                 renderRow,
                                 renderHeaderActions,
                               }: TableEditorProps<T>) {
  const registry = useRowReloadRegistry()
  return (
    <CRow>
      <CCol md={12}>
        <CCard>
          <CCardHeader className="d-flex align-items-center">
            <span className="fw-semibold">{title}</span>

            {renderHeaderActions && (
              <div className="ms-auto">
                {renderHeaderActions({
                  reloadAllRows: registry.reloadAll,
                })}
              </div>
            )}
          </CCardHeader>

          <CCardBody style={{ overflowX: 'auto' }}>
            <CTable striped hover small>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell style={{ width: 60 }}>
                    ID
                  </CTableHeaderCell>

                  {columns.map(col => (
                    <CTableHeaderCell
                      key={col.key}
                      style={
                        col.width
                          ? { width: col.width }
                          : undefined
                      }
                    >
                      {col.labelKey}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {indexes.map(index =>
                  renderRow(index, {
                    registerReload: registry.register,
                    unregisterReload: registry.unregister,
                  })
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
