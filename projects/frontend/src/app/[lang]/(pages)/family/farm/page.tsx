'use client'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader, CCardSubtitle,
  CCardTitle,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react-pro'
import {useEffect, useMemo, useState} from 'react'
import {NongZ_nowRepository} from '@/lib/repositories/NongZ_now.repository'
import {useI18nClient} from '@/lib/i18nClient'
import {FarmHeadSelectGroup, ZhuangTou_nowRepository} from "@/lib/repositories/ZhuangTou_now.repository";

/* =============================
 * COLUMN INDEX
 * ============================= */
const COL = {
  BELONG_TO_CLAN: 0,
  LAND_FERTILITY: 2,
  RENT: 3,
  COORDINATES: 4,
  AREA: 5,
  FARM_NAME: 6,
  MAX_FARMERS: 7,
  STATUS: 8,
  ENVIRONMENT: 10,
  SECURITY: 11,
  CONVENIENCE: 12,
  FARM_HEAD_ID: 16,
  FARMER_COUNT: 24,
  FARMER_RATIO: 26,
}

/* =============================
 * COLUMN TYPES
 * ============================= */
type BaseColumn = {
  key: string
  label: string
  col: number
  width?: number
}

type TextColumn = BaseColumn & {
  type: 'text' | 'number'
}

type SelectColumn = BaseColumn & {
  type: 'select'
  options: string[]
}

type CompoundColumn = BaseColumn & {
  type: 'compound'
  sub: number
}
type StatusColumn = BaseColumn & {
  type: 'status'
}
type FarmHeadColumn = BaseColumn & {
  type: 'farm-head'
}

type Column = TextColumn | SelectColumn | CompoundColumn | StatusColumn | FarmHeadColumn

/* =============================
 * COLUMNS CONFIG
 * ============================= */
const COLUMNS: Column[] = [
  {key: 'FARM_NAME', label: 'Farm Name', col: COL.FARM_NAME, type: 'text', width: 150,},
  {
    key: 'AREA',
    label: 'Area',
    col: COL.AREA,
    type: 'select',
    options: ['4', '9', '16', '25'],
    width: 80,
  },
  // { key: 'LAND_FERTILITY', label: 'Land Fertility', col: COL.LAND_FERTILITY, type: 'text' },
  // { key: 'RENT', label: 'Rent', col: COL.RENT, type: 'number' },
  {key: 'MAX_FARMERS', label: 'Max Farmers', col: COL.MAX_FARMERS, type: 'number'},
  // { key: 'STATUS', label: 'Status', col: COL.STATUS, type: 'number' },
  {key: 'ENVIRONMENT', label: 'Environment', col: COL.ENVIRONMENT, type: 'number'},
  {key: 'SECURITY', label: 'Security', col: COL.SECURITY, type: 'number'},
  {key: 'CONVENIENCE', label: 'Convenience', col: COL.CONVENIENCE, type: 'number'},
  // {key: 'FARM_HEAD_ID', label: 'Farm Head ID', col: COL.FARM_HEAD_ID, type: 'text'},
  { key: 'FARM_HEAD_ID', label: 'Farm Head ID', col: COL.FARM_HEAD_ID, type: 'farm-head' },
  {
    key: 'FARMER_COUNT',
    label: 'Farmer Count',
    col: COL.FARMER_COUNT,
    type: 'compound',
    sub: 3,
  },
  {
    key: 'FARMER_RATIO',
    label: 'Farmer Ratio',
    col: COL.FARMER_RATIO,
    type: 'compound',
    sub: 3,
  },
  {
    key: 'BELONG_TO_CLAN',
    label: 'Clan',
    col: COL.BELONG_TO_CLAN,
    type: 'status',
    width: 90,
  }
]

export default function FarmPage() {
  const [rows, setRows] = useState<string[][]>([])

  // Make repositories stable across renders
  const repo = useMemo(() => new NongZ_nowRepository(), [])
  const zhuangRepo = useMemo(() => new ZhuangTou_nowRepository(), [])

  const [headGroups, setHeadGroups] = useState<FarmHeadSelectGroup[]>([])

  const { t } = useI18nClient<{
    farm: {
      title: string
      instruction: string
      columns: Record<string, string>
      actions: {
        OWNER: string
        ABANDONED: string
        OCCUPIED: string
      }
    }
  }>()

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const data = await repo.getAllRows()
      if (!cancelled) setRows(data)

      const groups = await zhuangRepo.buildSelectOptions()
      if (!cancelled) setHeadGroups(groups)
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [repo, zhuangRepo])

  /* =============================
   * UPDATE HELPERS (STATE + STORAGE)
   * ============================= */
  const updateCell = async (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    // 1️⃣ update UI state
    setRows(rs =>
      rs.map((r, i) =>
        i === rowIndex
          ? r.map((c, ci) => (ci === colIndex ? value : c))
          : r
      )
    )

    // 2️⃣ persist BY INDEX
    await repo.updateCellByRowIndex(rowIndex, colIndex, value)
  }

  const updateCompound = async (
    rowIndex: number,
    colIndex: number,
    subIndex: number,
    value: string
  ) => {
    setRows(rs =>
      rs.map((r, i) => {
        if (i !== rowIndex) return r
        const next = [...r]
        const parts = String(next[colIndex] ?? '').split('|')
        parts[subIndex] = value
        next[colIndex] = parts.join('|')
        return next
      })
    )

    await repo.updateCompoundByRowIndex(
      rowIndex,
      colIndex,
      subIndex,
      value
    )
  }

  const toggleBelongToClan = async (rowIndex: number) => {
    const row = rows[rowIndex]
    const current = row[COL.BELONG_TO_CLAN]

    if (Number(current) > 0) return

    const nextValue = current === '-1' ? '0' : '-1'
    await updateCell(rowIndex, COL.BELONG_TO_CLAN, nextValue)
  }

  /* =============================
   * RENDER HELPERS
   * ============================= */
  const renderInput = (
    row: string[],
    rowIndex: number,
    colIndex: number,
    type: 'text' | 'number'
  ) => (
    <CFormInput
      id={`farm-${colIndex}`}
      name={`farm[${colIndex}]`}
      // size="sm"
      type={type}
      value={row[colIndex] ?? ''}
      onChange={e => updateCell(rowIndex, colIndex, e.target.value)}
    />
  )

  const renderCompound = (
    row: string[],
    rowIndex: number,
    colIndex: number,
    sub: number
  ) => {
    const parts = String(row[colIndex] ?? '').split('|')

    const isFarmerMetric =
      colIndex === COL.FARMER_COUNT ||
      colIndex === COL.FARMER_RATIO

    return (
      <div className="d-flex gap-1">
        {Array.from({length: sub}).map((_, i) => (
          <CFormInput
            id={`farm-${colIndex}-${i}`}
            name={`farm[${colIndex}][${i}]`}
            key={i}
            // size="sm"
            type='text' //{isFarmerMetric ? 'number' : 'text'}
            min={isFarmerMetric ? 0 : undefined}
            max={isFarmerMetric ? 100 : undefined}
            value={parts[i] ?? ''}
            style={
              isFarmerMetric
                ? {
                  width: '60px',
                  textAlign: 'center',
                }
                : undefined
            }
            onChange={e => {
              let value = e.target.value

              if (isFarmerMetric) {
                // sanitize number
                const num = Math.max(
                  0,
                  Math.min(100, Number(value || 0))
                )
                value = String(num)
              }

              updateCompound(rowIndex, colIndex, i, value)
            }}
          />
        ))}
      </div>
    )
  }

  const renderBelongToClan = (row: string[], rowIndex: number) => {
    const value = row[COL.BELONG_TO_CLAN]

    // unavailable
    if (Number(value) > 0) {
      return (
        <CButton
          // size="sm"
          style={{width: '110px'}}
          color="secondary" disabled>
          {t.farm.actions.OCCUPIED}
        </CButton>
      )
    }

    // disabled (-1)
    if (value === '-1') {
      return (
        <CButton
          // size="sm"
          style={{width: '110px'}}
          color="danger"
          onClick={() => toggleBelongToClan(rowIndex)}
        >
          {t.farm.actions.OWNER}
        </CButton>
      )
    }

    // enabled (0)
    return (
      <CButton
        // size="sm"
        style={{width: '110px'}}
        color="success"
        onClick={() => toggleBelongToClan(rowIndex)}
      >
        {t.farm.actions.ABANDONED}
      </CButton>
    )
  }


  const renderSelect = (
    row: string[],
    rowIndex: number,
    colIndex: number,
    options: string[]
  ) => {
    const current = options.includes(row[colIndex])
      ? row[colIndex]
      : ''

    return (
      <CDropdown>
        <CDropdownToggle color="secondary" variant="outline" style={{width: '60px'}}>
          {current || 'Select'}
        </CDropdownToggle>

        <CDropdownMenu>
          {options.map(opt => (
            <CDropdownItem
              key={opt}
              active={opt === current}
              onClick={() => updateCell(rowIndex, colIndex, opt)}
            >
              {opt}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
    )
  }

  const renderFarmHeadSelect = (
    row: string[],
    rowIndex: number
  ) => {
    const farmHeadId = row[COL.FARM_HEAD_ID]
    const options = headGroups[rowIndex] ?? []

    // nếu group rỗng → tạo empty option
    const dropdownOptions =
      options.length > 0
        ? options
        : [{ id: '', name: '—' }]

    const current = dropdownOptions.find(
      o => o.id === farmHeadId
    )

    return (
      <CDropdown>
        <CDropdownToggle color="secondary" variant="outline" style={{width: '150px'}}>
          {current?.name || 'Select'}
        </CDropdownToggle>

        <CDropdownMenu>
          {dropdownOptions.map(opt => (
            <CDropdownItem
              key={opt.id || 'empty'}
              active={opt.id === farmHeadId}
              onClick={() =>
                updateCell(
                  rowIndex,
                  COL.FARM_HEAD_ID,
                  opt.id
                )
              }
            >
              {opt.name || '—'}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
    )
  }

  /* =============================
   * RENDER
   * ============================= */
  return (
    <>
    <CRow>
      <CCol md={12}>
        <CCard>
          <CCardHeader>
            <CCardTitle>{t.farm.title}</CCardTitle>
            <CCardSubtitle>{t.farm.instruction}</CCardSubtitle>
          </CCardHeader>

          <CCardBody>
            <CTable striped hover small>
              <CTableHead>
                <CTableRow>
                  {COLUMNS.map(c => (
                    <CTableHeaderCell key={c.key} style={c.width
                      ? {width: `${c.width}px`}
                      : undefined}>
                      {t.farm.columns[c.key] ?? c.key}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {rows.map((row, idx) => (
                  <CTableRow key={idx}>
                    {COLUMNS.map(col => (
                      <CTableDataCell key={col.key}>
                        {col.type === 'status'
                          ? renderBelongToClan(row, idx)
                          : col.type === 'farm-head'
                            ? renderFarmHeadSelect(row, idx)
                            : col.type === 'compound'
                              ? renderCompound(row, idx, col.col, col.sub)
                              : col.type === 'select'
                                ? renderSelect(row, idx, col.col, col.options)
                                : renderInput(row, idx, col.col, col.type)
                        }

                      </CTableDataCell>
                    ))}
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
