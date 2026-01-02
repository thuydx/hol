'use client'

/**
 * Data example
 * "Member_qu": {
 *         "value": [
 *             [
 *                 "M102", // ID = 0,
 *                 "16|17|2|0", // APPEARANCE = 1  compound Back Hair|Body|Face Shape|Front Hair
 *                 "Nhan Khả Hàm|2|2|100|0|68|2|100|8|M199|4|M97",  // PERSON_DATA = 2 compound Character Name|Clan|Talent|Talent Potential|Gender|Life Span|Skill|Luck|Trait|Marry to #|Hobby|?
 *                 "M234|M372|M373",  // CHILDREN = 3
 *                 "1|LTB22816|null|5",  // HOUSING = 4
 *                 "43",  // AGE = 5,
 *                 "100",  // MARTIAL = 6
 *                 "100",  // LITERARY = 7
 *                 "100",  // BUSINESS = 8
 *                 "100",  // ART = 9
 *                 "100",  // MOOD = 10
 *                 "0",    // MERITS = 11
 *                 "100",  // REPUTATION = 12 Renown
 *                 "1",    // MARITAL_STATUS = 13
 *                 "null|null|null",  // EQUIPMENT = 14
 *                 "93",   // CHARM = 15 Charisma
 *                 "100",  // HEALTH = 16
 *                 "null",  // COL_17
 *                 "-1",    // Pregnancy Months (10 Being just Pregnant,must change the # on Row 25 also)
 *                 "100",  // STRATEGY = 19
 *                 "5",    // STAMINA = 20
 *                 "0|0|0|0.06|0.06|0.06|0.06",  // MONTHLY_INCREMENT = 21
 *                 "5|9|0|0|0|0",  // GROWTH_BONUS = 22
 *                 "100",  // SKILL_POINT = 23
 *                 "0",  // COL_24
 *                 "0",  // Pregnancy Status = 25 (1 = Pregnant; 0 = Not Pregnant)
 *                 "21@-1@null@null|21@82@Tộc Ta@Ðinh Đạt Kiến|19@85@Ðinh Khánh Nhượng@null|22@85@Ðinh Sơn Tín@null|22@86@Ðinh Phương Điệp@null|28@69@Tộc Ta@Xuân Nghiệp Ðinh",
 *                 "null",  // Traits = 27
 *                 "null",  // COL_28/
 *                 "1",     // COL_29
 *                 "0@0@0@-1@-1|0",  // COL_30/
 *                 "100|100",  // WORK_PLACE = 31 compound x|y
 *                 "7|5|0"  // TASK = 32 (JOB/WORK in Familu) 3|30000|0 TASKID | Money |
 *             ],
 */

import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CRow,
  CCol,
} from '@coreui/react-pro'

import {useCallback, useEffect, useMemo, useState} from 'react'
import { useI18nClient } from '@/lib/i18nClient'
import { useMemberQu } from '@/hooks/memberQu'
import { MemberQuParsed, MemberQuColumn } from '@/models/memberQu'
import {MemberQuRepository} from "@/repositories/MemberQu";

/* =========================================================
 * Column schema
 * ========================================================= */

type ColumnDef = {
  key: string
  labelKey: string
  width?: number | string
  input?: 'text' | 'number'
  get: (m: MemberQuParsed) => any
  colIndex: MemberQuColumn
}

function buildColumns(): ColumnDef[] {
  return [
    {
      key: 'age',
      labelKey: 'age',
      width: 50,
      input: 'number',
      colIndex: MemberQuColumn.AGE,
      get: m => m.age,
    },
    {
      key: 'literary',
      labelKey: 'literary',
      width: 60,
      input: 'number',
      colIndex: MemberQuColumn.LITERARY,
      get: m => m.literary,
    },
    {
      key: 'martial',
      labelKey: 'martial',
      width: 60,
      input: 'number',
      colIndex: MemberQuColumn.MARTIAL,
      get: m => m.martial,
    },
    {
      key: 'business',
      labelKey: 'business',
      width: 60,
      input: 'number',
      colIndex: MemberQuColumn.BUSINESS,
      get: m => m.business,
    },
    {
      key: 'art',
      labelKey: 'art',
      width: 60,
      input: 'number',
      colIndex: MemberQuColumn.ART,
      get: m => m.art,
    },
    {
      key: 'mood',
      labelKey: 'mood',
      width: 60,
      input: 'number',
      colIndex: MemberQuColumn.MOOD,
      get: m => m.mood,
    },
    {
      key: 'reputation',
      labelKey: 'reputation',
      width: 70,
      input: 'number',
      colIndex: MemberQuColumn.REPUTATION,
      get: m => m.reputation,
    },
    {
      key: 'charm',
      labelKey: 'charm',
      width: 60,
      input: 'number',
      colIndex: MemberQuColumn.CHARM,
      get: m => m.charm,
    },
    {
      key: 'health',
      labelKey: 'health',
      width: 60,
      input: 'number',
      colIndex: MemberQuColumn.HEALTH,
      get: m => m.health,
    },
    {
      key: 'strategy',
      labelKey: 'strategy',
      width: 60,
      input: 'number',
      colIndex: MemberQuColumn.STRATEGY,
      get: m => m.strategy,
    },
    {
      key: 'stamina',
      labelKey: 'stamina',
      width: 60,
      input: 'number',
      colIndex: MemberQuColumn.STAMINA,
      get: m => m.stamina,
    },
    {
      key: 'skillPoint',
      labelKey: 'skillPoint',
      width: 70,
      input: 'number',
      colIndex: MemberQuColumn.SKILL_POINT,
      get: m => m.skillPoint,
    },
    {
      key: 'pregnancyStatus',
      labelKey: 'pregnancy',
      width: 70,
      input: 'number',
      colIndex: MemberQuColumn.PREGNANCY_STATUS,
      get: m => m.pregnancyStatus,
    },
    {
      key: 'pregnancyMonth',
      labelKey: 'pregMonth',
      width: 70,
      input: 'number',
      colIndex: MemberQuColumn.PREGNANCY_MONTH,
      get: m => m.pregnancyMonth,
    },
  ]
}

/* =========================================================
 * Cell
 * ========================================================= */

function InputCell({
                     value,
                     type,
                     onChange,
                   }: {
  value: any
  type?: 'text' | 'number'
  onChange: (v: any) => void
}) {
  return (
    <input
      type={type ?? 'text'}
      value={value ?? ''}
      onChange={e =>
        onChange(
          type === 'number'
            ? Number(e.target.value)
            : e.target.value,
        )
      }
      style={{ width: '100%' }}
    />
  )
}

/* =========================================================
 * Row
 * ========================================================= */

function MemberQuRow({ index }: { index: number }) {
  const { member, loading, load, updateField } =
    useMemberQu(index)

  const columns = useMemo(() => buildColumns(), [])

  if (!member && !loading) load()

  if (loading || !member) {
    return (
      <CTableRow>
        <CTableDataCell colSpan={columns.length + 1}>
          Loading…
        </CTableDataCell>
      </CTableRow>
    )
  }

  return (
    <CTableRow>
      <CTableDataCell>{member.id}</CTableDataCell>

      {columns.map(col => (
        <CTableDataCell
          key={col.key}
          style={col.width ? { width: col.width } : undefined}
        >
          <InputCell
            value={col.get(member)}
            type={col.input}
            onChange={v =>
              updateField(col.colIndex, String(v))
            }
          />
        </CTableDataCell>
      ))}
    </CTableRow>
  )
}

/* =========================================================
 * Page
 * ========================================================= */

export default function MemberQuPage() {
  const { t } = useI18nClient<any>()
  const repo = useMemo(() => new MemberQuRepository(), [])
  const columns = useMemo(() => buildColumns(), [])

  const [indexes, setIndexes] = useState<number[]>([])
  const [version, setVersion] = useState(0)

  const forceReload = useCallback(() => {
    setVersion(v => v + 1)
  }, [])

  useEffect(() => {
    repo.all().then(rows => {
      setIndexes(rows.map((_, i) => i))
    })
  }, [repo, version])

  return (
    <CRow>
      <CCol md={12}>
        <CCard>
          <CCardHeader>
            <span className="fw-semibold">
              {t.memberQu?.title ?? 'External Members'}
            </span>
          </CCardHeader>

          <CCardBody style={{ overflowX: 'auto' }}>
            <CTable key={version} striped hover small>
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
                      {t.memberQu?.fields?.[col.labelKey] ??
                        col.key}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {indexes.map(i => (
                  <MemberQuRow key={i} index={i} />
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
