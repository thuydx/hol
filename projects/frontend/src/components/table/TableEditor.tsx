'use client'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

import {ColumnDef} from '@/lib/types/table'
import {ReactNode} from 'react'
import {useRowReloadRegistry} from '@/lib/hooks/useRowReloadRegistry'

type TableEditorProps<T> = {
  showIdColumn?: boolean
  title: string
  columns: ColumnDef<T>[]
  indexes: number[]
  renderRowAction: (
    index: number,
    helpers: {
      registerReload: (index: number, fn: () => void) => void
      unregisterReload: (index: number) => void
    }
  ) => ReactNode
  renderHeaderAction?: (helpers: {
    reloadAllRows: () => void
  }) => ReactNode
}

export function TableEditor<T>({
                                 showIdColumn = true,
                                 title,
                                 columns,
                                 indexes,
                                 renderRowAction,
                                 renderHeaderAction,
                               }: Readonly<TableEditorProps<T>>) {
  const registry = useRowReloadRegistry()
  return (
    <CRow>
      <CCol md={12}>
        <CCard>
          <CCardHeader className="d-flex align-items-center">
            <span className="fw-semibold">{title}</span>

            {renderHeaderAction && (
              <div className="ms-auto">
                {renderHeaderAction({
                  reloadAllRows: registry.reloadAll,
                })}
              </div>
            )}
          </CCardHeader>

          <CCardBody style={{overflowX: 'auto'}}>
            <CTable striped hover small>
              <CTableHead>
                <CTableRow>
                  {showIdColumn && (
                    <CTableHeaderCell style={{width: 60}}>
                      ID
                    </CTableHeaderCell>
                  )}

                  {columns.map(col => (
                    <CTableHeaderCell
                      key={col.key}
                      style={
                        col.width
                          ? {width: col.width}
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
                  renderRowAction(index, {
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
