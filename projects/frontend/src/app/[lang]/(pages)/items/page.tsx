'use client'

import { useMemo, useState } from 'react'
import { useI18nClient } from '@/lib/i18nClient'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react-pro'

type I18nSchema = {
  menu: {
    items: string
  }
  items: Record<string, string>
  'group-item-options': Record<string, string>
  'group-items': Array<Record<string, Record<string, string>>>
}


const Items = () => {
  const { t } = useI18nClient<I18nSchema>()
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const allItems = t.items

  const groupItems = t['group-items']?.[0] ?? {}
  const groupOptions = t['group-item-options']


  // ✅ dropdown options
  const groupKeys = useMemo(
    () => Object.keys(groupItems),
    [groupItems]
  )

  // ✅ filtered items
  const filteredItems = useMemo(() => {
    if (!selectedGroup) return {}
    return groupItems[selectedGroup] ?? {}
  }, [selectedGroup, groupItems])


    return (
    <>
      <h1>{t.menu.items}</h1>

      <CRow>
        {/* LEFT CARD — ALL ITEMS */}
        <CCol md={6}>
          <CCard>
            <CCardHeader>
              <CCardTitle>{t.menu.items}</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell style={{ width: '30%' }}>
                      ID
                    </CTableHeaderCell>
                    <CTableHeaderCell>
                      Name
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {Object.entries(allItems).map(([id, name]) => (
                    <CTableRow key={id}>
                      <CTableDataCell className="text-start">
                        {id}
                      </CTableDataCell>
                      <CTableDataCell className="text-start">
                        {name}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* RIGHT CARD — GROUP FILTER */}
        <CCol md={6}>
          <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <CCardTitle>
                {selectedGroup
                  ? groupOptions[selectedGroup] ?? selectedGroup
                  : t.menu.items}
              </CCardTitle>


              <CDropdown>
                <CDropdownToggle color="primary">
                  {selectedGroup
                    ? groupOptions[selectedGroup] ?? selectedGroup
                    : 'Select group'}
                </CDropdownToggle>

                <CDropdownMenu>
                  {Object.keys(groupItems).map(groupKey => (
                    <CDropdownItem
                      key={groupKey}
                      onClick={() => setSelectedGroup(groupKey)}
                    >
                      {groupOptions[groupKey] ?? groupKey}
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
            </CCardHeader>

            <CCardBody>
              {selectedGroup ? (
                <CTable striped hover small>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell style={{ width: '30%' }}>
                        ID
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        Name
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>

                  <CTableBody>
                    {Object.entries(filteredItems).map(([id, name]) => (
                      <CTableRow key={id}>
                        <CTableDataCell className="text-start">
                          {id}
                        </CTableDataCell>
                        <CTableDataCell className="text-start">
                          {name}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <div className="text-muted">
                  Select a group to view items
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Items
