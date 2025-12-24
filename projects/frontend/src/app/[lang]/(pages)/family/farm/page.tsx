/**
 * Farm Data Index Mapping Fields - Top-Level key NongZ_now
 *
 * 0: BELONG_TO_CLAN = 0; // Quan hệ gia đình   value = -1 (thuộc clan chính - owner) | 0 (không thuộc clan nào) | số dương (thuộc clan phụ)
 * 1: COL_1 = 1; // Không rõ
 * 2: LAND_FERTILITY = 2; // Độ phì nhiêu của đất (min = 0, max = 100)
 * 3: RENT = 3; // Tiền thuê đất (min = 0)
 * 4: COORDINATES = 4; // Tọa độ (Đối với bản đồ lớn: Chỉ số quận | Chỉ số quận; Đối với thái ấp: Tọa độ x | Tọa độ y)
 * 5: AREA = 5; // Diện tích (options = 4, 9, 16, 25)
 * 6: FARM_NAME = 6; // Tên trang trại - Nếu trùng tên trang trại thì KHÔNG ĐƯỢC thuộc gia tộc (clan) nào
 * 7: MAX_FARMERS = 7; // Số hộ gia đình nông trại đủ điều kiện cư trú
 * 8: STATUS = 8; // Tình trạng
 * 9: COL_9 = 9; // Không rõ
 * 10: ENVIRONMENT = 10; // Môi trường
 * 11: SECURITY = 11; // An toàn
 * 12: CONVENIENCE = 12; // Tiện nghi
 * 13: COL_13 = 13; // Không rõ
 * 14: FARM_HEAD_ID = 14; // Mã số trưởng thôn
 * 15: COL_15 = 15; // Không rõ
 * 16: COL_16 = 16; // Không rõ
 * 17: COL_17 = 17; // Không rõ
 * 18: COL_18 = 18; // Không rõ
 * 19: COL_19 = 19; // Không rõ
 * 20: COL_20 = 20; // Không rõ
 * 21: COL_21 = 21; // Không rõ
 * 22: COL_22 = 22; // Không rõ
 * 23: COL_23 = 23; // Không rõ
 * 24: FARMER_COUNT = 24; // Số lượng nông dân (trồng trọt | chăn nuôi | thủ công mỹ nghệ)
 * 25: COL_25 = 25; // Không rõ
 * 26: FARMER_RATIO = 26; // Tỷ lệ nông dân (trồng trọt | chăn nuôi | thủ công mỹ nghệ)
 */
'use client'

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
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react-pro'
import {useEffect, useState} from 'react'
import {NongZ_nowRepository} from '@/lib/repositories/NongZ_now.repository'

const repo = new NongZ_nowRepository()

/* =============================
 * COL + COLUMNS (as defined above)
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
  FARMER_RATIO: 26
}

// const COLUMNS = [
//   { key: 'FARM_NAME', label: 'Farm Name', col: COL.FARM_NAME, type: 'text' },
//   { key: 'AREA', label: 'Area', col: COL.AREA, type: 'select', options: ['4','9','16','25'] },
//   { key: 'RENT', label: 'Rent', col: COL.RENT, type: 'number' },
//   { key: 'COORDINATES', label: 'Coordinates', col: COL.COORDINATES, type: 'compound', sub: 2 },
//   { key: 'MAX_FARMERS', label: 'Max Farmers', col: COL.MAX_FARMERS, type: 'number' },
//   { key: 'STATUS', label: 'Status', col: COL.STATUS, type: 'number' },
//   { key: 'ENVIRONMENT', label: 'Environment', col: COL.ENVIRONMENT, type: 'number' },
//   { key: 'SECURITY', label: 'Security', col: COL.SECURITY, type: 'number' },
//   { key: 'CONVENIENCE', label: 'Convenience', col: COL.CONVENIENCE, type: 'number' },
//   { key: 'FARM_HEAD_ID', label: 'Farm Head ID', col: COL.FARM_HEAD_ID, type: 'text' },
//   { key: 'FARMER_COUNT', label: 'Farmer Count', col: COL.FARMER_COUNT, type: 'compound', sub: 3 },
//   { key: 'FARMER_RATIO', label: 'Farmer Ratio', col: COL.FARMER_RATIO, type: 'compound', sub: 3 }
// ]
type BaseColumn = {
  key: string
  label: string
  col: number
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

const COLUMNS: Column[] = [
  {key: 'FARM_NAME', label: 'Farm Name', col: 6, type: 'text'},

  {
    key: 'AREA',
    label: 'Area',
    col: 5,
    type: 'select',
    options: ['4', '9', '16', '25'],
  },

  {key: 'RENT', label: 'Rent', col: 3, type: 'number'},

  {
    key: 'COORDINATES',
    label: 'Coordinates',
    col: 4,
    type: 'text',
  },

  {key: 'MAX_FARMERS', label: 'Max Farmers', col: 7, type: 'number'},

  {key: 'STATUS', label: 'Status', col: 8, type: 'number'},

  {key: 'ENVIRONMENT', label: 'Environment', col: 10, type: 'number'},

  {key: 'SECURITY', label: 'Security', col: 11, type: 'number'},

  {key: 'CONVENIENCE', label: 'Convenience', col: 12, type: 'number'},

  {key: 'FARM_HEAD_ID', label: 'Farm Head ID', col: 16, type: 'text'},

  {
    key: 'FARMER_COUNT',
    label: 'Farmer Count',
    col: 24,
    type: 'compound',
    sub: 3,
  },

  {
    key: 'FARMER_RATIO',
    label: 'Farmer Ratio',
    col: 26,
    type: 'compound',
    sub: 3,
  },
]

type Column = TextColumn | SelectColumn | CompoundColumn

export default function FarmPage() {
  const [rows, setRows] = useState<string[][]>([])
  const repo = new NongZ_nowRepository()

  /* =============================
   * LOAD
   * ============================= */
  const load = async () => {
    const rows = await repo.getAllRows()
    setRows(rows)
  }

  // const load = async () => {
  //   const all = await repo.getAll()
  //   setRows(all.filter(r => r[COL.BELONG_TO_CLAN] !== '0'))
  // }

  useEffect(() => {
    load()
  }, [])

  /* =============================
   * UPDATE HELPERS
   * ============================= */
  const updateCell = async (row: string[], col: number, value: string) => {
    const rowId = row[COL.BELONG_TO_CLAN]
    setRows(rs => rs.map(r => r === row ? r.map((c, i) => i === col ? value : c) : r))
    await repo.updateCellByColIndex(rowId, col, value)
  }

  const updateCompound = async (
    row: string[],
    col: number,
    sub: number,
    value: string
  ) => {
    const rowId = row[COL.BELONG_TO_CLAN]
    await repo.updateCompoundByIndex(rowId, col, sub, value)
  }
  const renderInput = (
    row: string[],
    colIndex: number,
    type: 'text' | 'number',
    onChange: (value: string) => void
  ) => (
    <CFormInput
      size="sm"
      type={type}
      value={row[colIndex] ?? ''}
      onChange={e => onChange(e.target.value)}
    />
  )

  const renderCompound = (
    row: string[],
    colIndex: number,
    sub: number,
    onChange: (subIndex: number, value: string) => void
  ) => {
    const parts = String(row[colIndex] ?? '').split('|')

    return (
      <div className="d-flex gap-1">
        {Array.from({ length: sub }).map((_, i) => (
          <CFormInput
            key={i}
            size="sm"
            value={parts[i] ?? ''}
            onChange={e => onChange(i, e.target.value)}
          />
        ))}
      </div>
    )
  }


  const renderSelect = (
    row: string[],
    colIndex: number,
    options: string[],
    onChange: (value: string) => void
  ) => {
    const current = options.includes(row[colIndex])
      ? row[colIndex]
      : ''

    return (
      <CDropdown >
        <CDropdownToggle color="secondary" variant="outline">
          {current || 'Select'}
        </CDropdownToggle>

        <CDropdownMenu>
          {options.map(opt => (
            <CDropdownItem
              key={opt}
              active={opt === current}
              onClick={() => onChange(opt)}
            >
              {opt}
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
    <CRow>
      <CCol md={12}>
        <CCard>
          <CCardHeader>
            <CCardTitle>Farm Management</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover small>
              <CTableHead>
                <CTableRow>
                  {COLUMNS.map(c => (
                    <CTableHeaderCell key={c.key}>{c.label}</CTableHeaderCell>
                  ))}
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {rows.map((row, idx) => (
                  <CTableRow key={idx}>
                    {COLUMNS.map(col => (
                      <CTableDataCell key={col.key}>
                        {col.type === 'compound'
                          ? renderCompound(
                            row,
                            col.col,
                            col.sub,              // ✅ number
                            (subIndex, value) =>
                              repo.updateCompoundByIndex(
                                row[0],
                                col.col,
                                subIndex,
                                value
                              )
                          )
                          : col.type === 'select'
                            ? renderSelect(
                              row,
                              col.col,
                              col.options,        // ✅ string[]
                              value =>
                                repo.updateCellByColIndex(
                                  row[0],
                                  col.col,
                                  value
                                )
                            )
                            : renderInput(
                              row,
                              col.col,
                              col.type,            // ✅ 'text' | 'number'
                              value =>
                                repo.updateCellByColIndex(
                                  row[0],
                                  col.col,
                                  value
                                )
                            )
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
  )
}



