'use client'

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
  CButton, CRow, CCol, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem,
} from '@coreui/react-pro'

import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {useMember, useMembers} from '@/hooks/member'
import {useI18nClient} from '@/lib/i18nClient'
import {
  MemberParsed,
  MemberMonthlyIncrement,
  MemberGrowthBonus,
} from '@/lib/models/members'
import {MemberNowRepository} from '@/lib/repositories/MemberNow'

/* =========================================================
 * Column schema
 * ========================================================= */

type ColumnDef = {
  key: string
  labelKey: string
  input?: 'text' | 'number'
  /** 🔹 width của cột (px, %, ch, …) */
  width?: number | string
  get: (m: MemberParsed) => any
  set: (m: MemberParsed, v: any) => MemberParsed
  render?: (
    member: MemberParsed,
    update: (fn: (m: MemberParsed) => MemberParsed) => void,
    t: any
  ) => React.ReactNode
}


type ColumnGroup = {
  groupKey: string
  label: string
  columns: ColumnDef[]
}

function buildColumns(t: any): ColumnDef[] {

  const SKILL_OPTIONS = {
    0: '0',
    1: 'sorcery',
    2: 'medicine',
    3: 'daoism',
    4: 'divination',
    5: 'charisma',
    6: 'technology',
  } as const

  const TALENT_OPTIONS = {
    0: '0',
    1: 'writing',
    2: 'might',
    3: 'business',
    4: 'art',
  } as const

  const HOBBY_OPTIONS = {
    0: 'rogue',
    1: 'ink',
    2: 'art',
    3: 'antique',
    4: 'tea_set',
    5: 'incense',
    6: 'vase',
    7: 'wine',
    8: 'music',
    9: 'pelt',
  } as const

  return [
// ===== CORE (flat fields) =====
    // {
    //   key: 'character',
    //   label: 'character',
    //   input: 'text',
    //   get: m => m.character,
    //   set: (m, v) => ({...m, character: Number(v)}),
    // },
    {
      key: 'name',
      labelKey: 'name',
      input: 'text',
      get: m => m.person.name,
      set: (m, v) => ({
        ...m,
        person: {...m.person, name: v},
      }),
    },
    {
      key: 'age',
      labelKey: 'age',
      input: 'text',
      width: '50px',
      get: m => m.age,
      set: (m, v) => ({...m, age: Number(v)}),
    },
    {
      key: 'literary',
      labelKey: 'literary',
      input: 'text',
      width: '50px',
      get: m => m.literary,
      set: (m, v) => ({...m, literary: Number(v)}),
    },
    {
      key: 'martial',
      labelKey: 'martial',
      input: 'text',
      width: '50px',
      get: m => m.martial,
      set: (m, v) => ({...m, martial: Number(v)}),
    },
    {
      key: 'business',
      labelKey: 'business',
      input: 'text',
      width: '50px',
      get: m => m.business,
      set: (m, v) => ({...m, business: Number(v)}),
    },
    {
      key: 'art',
      labelKey: 'art',
      input: 'text',
      width: '50px',
      get: m => m.art,
      set: (m, v) => ({...m, art: Number(v)}),
    },
    /* ================= SKILLS ================= */
    {
      key: 'skills',
      labelKey: 'skills',
      width: '80px',
      get: m => m.person.skills,
      set: (m, v) => ({
        ...m,
        person: {...m.person, skills: Number(v)},
      }),
      render: (member, update) => (
        <DropdownCell
          value={member.person.skills}
          options={SKILL_OPTIONS}
          labels={t.member.options.skill}
          onChange={v =>
            update(m => ({
              ...m,
              person: {...m.person, skills: v},
            }))
          }
        />
      ),
    },
    {
      key: 'skillPos',
      labelKey: 'skillPos',
      input: 'text',
      width: '50px',
      get: m => m.skillPos,
      set: (m, v) => ({...m, skillPos: Number(v)}),
    },
    // ===== PERSON (compound, but flat in UI) =====

    // {
    //   key: 'generation',
    //   labelKey: 'Gen',
    //   input: 'text',
    //   get: m => m.person.generation,
    //   set: (m, v) => ({
    //     ...m,
    //     person: {...m.person, generation: Number(v)},
    //   }),
    // },
    /* ================= TALENT ================= */
    {
      key: 'talent',
      labelKey: 'talent',
      width: '80px',
      get: m => m.person.talent,
      set: (m, v) => ({
        ...m,
        person: {...m.person, talent: Number(v)},
      }),
      render: (member, update) => (
        <DropdownCell
          value={member.person.talent}
          options={TALENT_OPTIONS}
          labels={t.member.options.talent}
          onChange={v =>
            update(m => ({
              ...m,
              person: {...m.person, talent: v},
            }))
          }
        />
      ),
    },
    {
      key: 'talentPos',
      labelKey: 'talentPos',
      input: 'text',
      width: '50px',
      get: m => m.person.talentPos,
      set: (m, v) => ({
        ...m,
        person: {...m.person, talentPos: Number(v)},
      }),
    },
    // {
    //   key: 'gender',
    //   labelKey: 'gender',
    //   input: 'text',
    //   get: m => m.person.gender,
    //   set: (m, v) => ({
    //     ...m,
    //     person: {...m.person, gender: Number(v)},
    //   }),
    // },
    // {
    //   key: 'lifespan',
    //   labelKey: 'lifespan',
    //   input: 'text',
    //   get: m => m.person.lifespan,
    //   set: (m, v) => ({
    //     ...m,
    //     person: {...m.person, lifespan: Number(v)},
    //   }),
    // },

    {
      key: 'luck',
      labelKey: 'luck',
      input: 'text',
      width: '50px',
      get: m => m.person.luck,
      set: (m, v) => ({
        ...m,
        person: {...m.person, luck: Number(v)},
      }),
    },
    /* ================= HOBBY ================= */
    {
      key: 'hobby',
      labelKey: 'hobby',
      width: '80px',
      get: m => m.person.hobby,
      set: (m, v) => ({
        ...m,
        person: {...m.person, hobby: Number(v)},
      }),
      render: (member, update) => (
        <DropdownCell
          value={member.person.hobby}
          options={HOBBY_OPTIONS}
          labels={t.member.options.hobby}
          onChange={v =>
            update(m => ({
              ...m,
              person: {...m.person, hobby: v},
            }))
          }
        />
      ),
    },

    {
      key: 'mood',
      labelKey: 'mood',
      input: 'text',
      width: '50px',
      get: m => m.mood,
      set: (m, v) => ({...m, mood: String(v)}),
    },
    // {
    //   key: 'merits',
    //   labelKey: 'merits',
    //   input: 'text',
    //   get: m => m.merits,
    //   set: (m, v) => ({...m, merits: Number(v)}),
    // },
    // {
    //   key: 'status',
    //   labelKey: 'Status',
    //   input: 'text',
    //   get: m => m.status,
    //   set: (m, v) => ({...m, status: Number(v)}),
    // },
    {
      key: 'reputation',
      labelKey: 'reputation',
      input: 'text',
      width: '50px',
      get: m => m.reputation,
      set: (m, v) => ({...m, reputation: Number(v)}),
    },
    {
      key: 'charm',
      labelKey: 'charm',
      input: 'text',
      width: '50px',
      get: m => m.charm,
      set: (m, v) => ({...m, charm: Number(v)}),
    },
    {
      key: 'health',
      labelKey: 'health',
      input: 'text',
      width: '50px',
      get: m => m.health,
      set: (m, v) => ({...m, health: Number(v)}),
    },
    {
      key: 'strategy',
      labelKey: 'strategy',
      input: 'text',
      width: '50px',
      get: m => m.strategy,
      set: (m, v) => ({...m, strategy: Number(v)}),
    },
    // {
    //   key: 'maritalStatus',
    //   labelKey: 'marital',
    //   input: 'text',
    //   get: m => m.maritalStatus,
    //   set: (m, v) => ({...m, maritalStatus: Number(v)}),
    // },
    {
      key: 'stamina',
      labelKey: 'stamina',
      input: 'text',
      width: '50px',
      get: m => m.stamina,
      set: (m, v) => ({...m, stamina: Number(v)}),
    },

    // ===== EQUIPMENT =====
    // {
    //   key: 'weaponId',
    //   labelKey: 'weapon',
    //   input: 'text',
    //   get: m => m.equipment.weaponId,
    //   set: (m, v) => ({
    //     ...m,
    //     equipment: {...m.equipment, weaponId: Number(v)},
    //   }),
    // },
    // {
    //   key: 'jewelryId',
    //   labelKey: 'jewelry',
    //   input: 'text',
    //   get: m => m.equipment.jewelryId,
    //   set: (m, v) => ({
    //     ...m,
    //     equipment: {...m.equipment, jewelryId: Number(v)},
    //   }),
    // },
    // {
    //   key: 'talismanId',
    //   labelKey: 'talisman',
    //   input: 'text',
    //   get: m => m.equipment.talismanId,
    //   set: (m, v) => ({
    //     ...m,
    //     equipment: {...m.equipment, talismanId: Number(v)},
    //   }),
    // },
  ];
}

//
// const COLUMN_GROUPS: ColumnGroup[] = [
//   CORE_GROUP,
//   PERSON_GROUP,
//   // EQUIPMENT_GROUP,
// ]

/* =========================================================
 * Editable Cell
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
      onChange={e => onChange(
        type === 'number' ? Number(e.target.value) : e.target.value
      )}
      style={{width: '100%'}}
    />
  )
}

const MAXABLE_FIELDS = [
  'literary',
  'martial',
  'business',
  'art',
  'skillPos',
  'talentPos',
  'luck',
  'charm',
  'mood',
  'health',
  'stamina',
  'reputation',
  'strategy',
] as const

const MAX_VALUE = 100

function maxAllAttributes(
  member: MemberParsed,
  columns: ColumnDef[],
): MemberParsed {
  let next = member

  for (const col of columns) {
    if (MAXABLE_FIELDS.includes(col.key as any)) {
      next = col.set(next, MAX_VALUE)
    }
  }

  return next
}

function BatchPanel({
                      columns,
                      onReload,
                    }: {
  columns: ColumnDef[]
  onReload: () => void
}) {
  const {t} = useI18nClient<any>()
  const repo = useMemo(() => new MemberNowRepository(), [])

  return (
    // <CCard>
    //   <CCardHeader>
    //     {t.member?.batch?.title ?? 'Batch'}
    //   </CCardHeader>
    //
    //   <CCardBody>
    <CButton
      color="danger"
      className="w-100"
      onClick={async () => {
        await repo.batchUpdate((member) =>
          maxAllAttributes(member, columns),
        )

        // 🔥 force UI refresh
        onReload()
      }}
    >
      {t.member?.batch?.maxAll ??
        'Max All Attributes'}
    </CButton>
    //   </CCardBody>
    // </CCard>
  )
}


/* =========================================================
 * Row
 * ========================================================= */
function MemberTableRow({index}: { index: number }) {
  const {member, update, loading} = useMember(index)
  const {t} = useI18nClient<any>()
  const columns = useMemo(() => buildColumns(t), [t])
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
        <CTableDataCell key={col.key} style={col.width ? { width: col.width } : undefined}>
          {col.render ? (
            col.render(member, update, t)
          ) : (
            <InputCell
              value={col.get(member)}
              type={col.input}
              onChange={v => update(m => col.set(m, v))}
            />
          )}
        </CTableDataCell>
      ))}
    </CTableRow>
  )
}

function DropdownCell({
                        value,
                        options,
                        labels,
                        onChange,
                      }: {
  value: number
  options: Record<number, string>
  labels: Record<string, string>
  onChange: (v: number) => void
}) {
  const currentLabel =
    options[value] && labels[options[value]]
      ? labels[options[value]]
      : value
  const maxLabelLength = Math.max(
    ...Object.values(options).map(
      key => (labels[key]?.length ?? 0)
    ),
  )

// 1ch ≈ 8px (ước lượng)
  const widthPx = Math.max(80, maxLabelLength * 8 + 24)

  return (
    <CDropdown style={{ width: widthPx }}>
      <CDropdownToggle color="light" size="sm">
        {currentLabel}
      </CDropdownToggle>
      <CDropdownMenu>
        {Object.entries(options).map(([num, key]) => (
          <CDropdownItem
            key={num}
            onClick={() => onChange(Number(num))}
          >
            {labels[key]}
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  )
}

/* =========================================================
 * Page
 * ========================================================= */

export default function MemberPage() {
  const {indexes} = useMembers()
  const {t} = useI18nClient<any>()
  const [version, setVersion] = useState(0)

  const forceReload = useCallback(() => {
    setVersion(v => v + 1)
  }, [])
  const repo = useMemo(() => new MemberNowRepository(), [])
  const columns = useMemo(() => buildColumns(t), [t])

  /* ================= Batch edit ================= */
  // const batchEdit = async (
  //   col: ColumnDef,
  //   group: ColumnGroup,
  //   value: any,
  // ) => {
  //   await repo.batchUpdate((m) =>
  //     col.set ? col.set(m, value) : null,
  //   )
  // }

  return (
    <CRow>
      <CCol md={12}>
        {/*<CCard>*/}
        {/*  <BatchPanel*/}
        {/*    columns={columns}*/}
        {/*    onReload={forceReload}*/}
        {/*  />*/}
        {/*</CCard>*/}
        {/* TABLE EDITOR */}
        <CCard>
          <CCardHeader className="d-flex align-items-center">
            <><span className="fw-semibold">
              {t.member?.title ?? 'Members'}
            </span></>
            {/* đẩy các action sang phải */}
            <div className="ms-auto">
              <BatchPanel
                columns={columns}
                onReload={forceReload}
              />
            </div>
          </CCardHeader>
          <CCardBody style={{overflowX: 'auto'}}>
            <CTable key={version} striped hover small>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell style={{width: '60px'}}>ID</CTableHeaderCell>
                  {columns.map(col => (
                    <CTableHeaderCell key={col.key} style={col.width ? { width: col.width } : undefined}>
                      {t.member?.fields?.[col.labelKey] ?? col.key}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {indexes.map(i => (
                  <MemberTableRow key={i} index={i}/>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>


    </CRow>

  )
}
