'use client'

import { useEffect, useState } from 'react'
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
import { OtherFamilyRelationMatrix } from '@/components/table/OtherFamilyRelationMatrix'

import { useOtherFamilies } from '@/hooks/useOtherFamilies'
import { useI18nClient } from '@/lib/i18nClient'
import { OtherFamilyColumn } from '@/columns/otherFamily'
import { INHERITANCE_OPTIONS } from '@/constants/options'
import type { OtherFamilyParsed } from '@/types/otherFamily'

/* ========================
 * helpers
 * ======================== */

function buildFamilyTitle(
  coordinates: string | undefined,
  name: string,
  t: any,
) {
  if (!coordinates) return name
  const place = t.place_name?.[coordinates] ?? ''
  const clan = t.clan_name.replace('{name}', name)
  return place ? `${place} ${clan}` : clan
}

/* ========================
 * Row component (CoreUI)
 * ======================== */

function OtherFamilyRow({
                          index,
                          family,
                          t,
                          updateColumn,
                          updateSubColumn,
                        }: {
  index: number
  family: OtherFamilyParsed
  t: any
  updateColumn: (
    rowIndex: number,
    colIndex: number,
    value: string,
  ) => Promise<void>
  updateSubColumn: (
    rowId: string,
    colKey: number,
    subKey: string,
    value: string,
  ) => Promise<void>
}) {
  const [row, setRow] = useState(family)

  // chỉ sync khi đổi record (không rollback khi edit)
  useEffect(() => {
    setRow(family)
  }, [family.id])

  return (
    <CTableRow>
      {/* ID */}
      <CTableDataCell>{row.id}</CTableDataCell>

      {/* TITLE */}
      <CTableDataCell>
        {buildFamilyTitle(row.coordinates, row.name, t)}
      </CTableDataCell>

      {/* LEVEL */}
      <CTableDataCell>
        <InputCell
          type="number"
          value={row.level}
          disabled={false}
          onChange={v => setRow({ ...row, level: v })}
          onBlur={() =>
            updateColumn(
              row.id,
              OtherFamilyColumn.LEVEL,
              String(row.level),
            )
          }
        />
      </CTableDataCell>

      {/* RELATIONSHIP INDEX */}
      <CTableDataCell>
        <InputCell
          type="number"
          value={row.relationshipIndex}
          disabled={false}
          onChange={v =>
            setRow({ ...row, relationshipIndex: v })
          }
          onBlur={() =>
            updateColumn(
              row.id,
              OtherFamilyColumn.RELATIONSHIP_INDEX,
              String(row.relationshipIndex),
            )
          }
        />
      </CTableDataCell>

      {/* COORDINATES (read-only) */}
      <CTableDataCell>{row.coordinates}</CTableDataCell>

      {/* INHERITANCE */}
      <CTableDataCell>
        <DropdownCell
          value={row.inheritance}
          options={INHERITANCE_OPTIONS}
          labels={t.inheritance_option}
          onChange={v => {
            setRow({ ...row, inheritance: v })
            updateColumn(
              row.id,
              OtherFamilyColumn.INHERITANCE,
              String(v),
            )
          }}
        />
      </CTableDataCell>

      {/* ROYAL INFLUENCE */}
      <CTableDataCell>
        <InputCell
          type="number"
          value={row.royalInfluence}
          disabled={false}
          onChange={v =>
            setRow({ ...row, royalInfluence: v })
          }
          onBlur={() =>
            updateColumn(
              row.id,
              OtherFamilyColumn.ROYAL_INFLUENCE,
              String(row.royalInfluence),
            )
          }
        />
      </CTableDataCell>

      {/* PRIVATE ARMY */}
      <CTableDataCell>
        <InputCell
          type="number"
          value={row.army.privateArmy}
          disabled={false}
          onChange={v =>
            setRow({
              ...row,
              army: { ...row.army, privateArmy: v },
            })
          }
          onBlur={() =>
            updateSubColumn(
              String(row.id),
              OtherFamilyColumn.ARMY_STRENGTH,
              '0',
              String(row.army.privateArmy),
            )
          }
        />
      </CTableDataCell>

      {/* MILITARY POWER */}
      <CTableDataCell>
        <InputCell
          type="number"
          value={row.army.militaryPower}
          disabled={false}
          onChange={v =>
            setRow({
              ...row,
              army: {
                ...row.army,
                militaryPower: v,
              },
            })
          }
          onBlur={() =>
            updateSubColumn(
              String(row.id),
              OtherFamilyColumn.ARMY_STRENGTH,
              '1',
              String(row.army.militaryPower),
            )
          }
        />
      </CTableDataCell>
    </CTableRow>
  )
}

/* ========================
 * Page
 * ======================== */

export default function OtherFamilyPage() {
  const {
    data,
    loading,
    updateColumn,
    updateSubColumn,
  } = useOtherFamilies()

  const { t } = useI18nClient<any>()

  if (loading) return <div>Loading…</div>

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>{t.menu.otherFamily}</strong>
        </CCardHeader>
        <CCardBody style={{ overflowX: 'auto' }}>
          <CTable striped small hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell style={{ width: 60 }}>
                  ID
                </CTableHeaderCell>
                <CTableHeaderCell>
                  {t.otherFamily.title}
                </CTableHeaderCell>
                <CTableHeaderCell style={{ width: 80 }}>
                  {t.otherFamily.level}
                </CTableHeaderCell>
                <CTableHeaderCell style={{ width: 140 }}>
                  {t.otherFamily.relationshipIndex}
                </CTableHeaderCell>
                <CTableHeaderCell style={{ width: 90 }}>
                  {t.otherFamily.coordinates}
                </CTableHeaderCell>
                <CTableHeaderCell style={{ width: 180 }}>
                  {t.otherFamily.inheritance}
                </CTableHeaderCell>
                <CTableHeaderCell style={{ width: 160 }}>
                  {t.otherFamily.royalInfluence}
                </CTableHeaderCell>
                <CTableHeaderCell style={{ width: 110 }}>
                  {t.otherFamily.army.privateArmy}
                </CTableHeaderCell>
                <CTableHeaderCell style={{ width: 110 }}>
                  {t.otherFamily.army.militaryPower}
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {data.map((family, index) => (
                <OtherFamilyRow
                  key={family.id}
                  index={index}
                  family={family}
                  t={t}
                  updateColumn={updateColumn}
                  updateSubColumn={updateSubColumn}
                />
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* RELATIONSHIP MATRIX */}
      <OtherFamilyRelationMatrix families={data} />
    </>
  )
}
