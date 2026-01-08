'use client'

import {useEffect, useState} from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'

import { InputCell } from '@/components/table/InputCell'
import { DropdownCell } from '@/components/table/DropdownCell'
// import { ShiJiaNowRelationMatrix } from '@/components/table/ShiJiaNowRelationMatrix'

// import { useOtherFamilies } from '@/hooks/useOtherFamilies'
import { useI18nClient } from '@/lib/i18nClient'
import { ShiJiaKingColumn } from '@/columns/ShiJiaKing'
import type { ShiJiaKingParsed } from '@/types/ShiJiaKing'
import {countTotalClanMembers} from "@/lib/services/shiJiaKingMemberCount";
import {useShiJiaKing} from "@/hooks/useShiJiaKing";


/* ========================
 * Page
 * ======================== */

export default function ShiJiaKingPage() {
  const {
    data,
    loading,
    updateColumn,
    updateSubColumn,
  } = useShiJiaKing()

  const { t } = useI18nClient<any>()
  const [memberCount, setMemberCount] = useState<number>()

  useEffect(() => {
    const load = async () => {
      const result = await countTotalClanMembers()
      setMemberCount(result)
    }

    void load()
  }, [data])

  if (loading) return <div>Loading…</div>

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>{t.menu.shiJiaNow}</strong>
        </CCardHeader>
        <CCardBody style={{ overflowX: 'auto' }}>
          <CTable striped small hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell style={{ width: 60 }}>
                  ID
                </CTableHeaderCell>
                <CTableHeaderCell>
                  {t.shiJiaNow.title}
                </CTableHeaderCell>
                {/*<CTableHeaderCell>*/}
                {/*  {t.shiJiaNow.members}*/}
                {/*</CTableHeaderCell>*/}
                <CTableHeaderCell style={{ width: 80 }}>
                  {t.shiJiaNow.level}
                </CTableHeaderCell>
                <CTableHeaderCell style={{ width: 140 }}>
                  {t.shiJiaNow.relationshipIndex}
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              <CTableRow>
                {/* TITLE */}
                <CTableDataCell>
                  {data.name}
                </CTableDataCell>
                {/* MEMBERS (Tộc nhân) */}
                <CTableDataCell>{memberCount}</CTableDataCell>
                {/* LEVEL */}
                <CTableDataCell>
                  <InputCell
                    type="number"
                    value={data.level}
                    disabled={false}
                    onChange={v => data.level}
                    // onBlur={() =>
                    //   updateColumn(
                    //
                    //     ShiJiaKingColumn.LEVEL,
                    //     String(row.level),
                    //   )
                    // }
                  />
                </CTableDataCell>

                {/* RELATIONSHIP INDEX */}
                <CTableDataCell>
                  <InputCell
                    type="number"
                    value={data.relationshipIndex}
                    disabled={false}
                    onChange={v => data.relationshipIndex}
                    // onBlur={() =>
                    //   updateColumn(
                    //     ShiJiaKingColumn.RELATIONSHIP_INDEX,
                    //     String(row.relationshipIndex),
                    //   )
                    // }
                  />
                </CTableDataCell>
              </CTableRow>
                {/*<ShiJiaKingRow*/}
                {/*  // key={index}*/}
                {/*  family={data}*/}
                {/*  memberCount={memberCount?? 0}*/}
                {/*  t={t}*/}
                {/*  updateColumn={updateColumn}*/}
                {/*  updateSubColumn={updateSubColumn}*/}
                {/*/>*/}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}
