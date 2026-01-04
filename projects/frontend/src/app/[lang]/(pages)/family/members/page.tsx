'use client'

import {useEffect, useMemo, useRef} from 'react'
import {useI18nClient} from '@/lib/i18nClient'

import {TableEditor} from '@/components/table/TableEditor'
import {InputCell} from '@/components/table/InputCell'
import {MaxAttributeButton} from '@/components/button/MaxAttributeButton'

import {buildMemberNowColumns} from '@/columns/memberNow'
import {useMember, useMembers} from '@/hooks/member'

import {MemberNowRepository} from '@/repositories/MemberNow'
import {MemberParsed} from '@/models/members'
import {ColumnSchema} from "@/columns/buildBaseColumns";
import {CTableDataCell, CTableRow} from "@coreui/react-pro";

/* =========================================================
 * Row
 * ========================================================= */

function MemberNowRow({index, registerReload,}: Readonly<{
  index: number
  registerReload: (index: number, fn: () => void) => void
  unregisterReload: (index: number) => void
}>) {
  const { t } = useI18nClient<any>()
  const { row: member, update, load, loading } = useMember(index)
  const columns = useMemo(() => buildMemberNowColumns(t), [t])

  useEffect(() => {
    registerReload(index, load)
  }, [index, load, registerReload])

  useEffect(() => {
    void load()
  }, [load])

  if (loading || !member) {
    return null
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

/* =========================================================
 * Page
 * ========================================================= */

export default function MemberNowPage() {
  const { t } = useI18nClient<any>()
  const repo = useMemo(() => new MemberNowRepository(), [])
  const columns = useMemo<ColumnSchema<MemberParsed>>(
    () => buildMemberNowColumns(t),
    [t],
  )
  const { indexes, load, forceReload } = useMembers()

  const rowReloaders = useRef(new Map<number, () => void>())

  useEffect(() => {
    void load()
  }, [load])

  return (
    <TableEditor<MemberParsed>
      title={t.member?.title ?? 'Members'}
      columns={columns}
      indexes={indexes}
      renderHeaderAction={() => (
        <MaxAttributeButton
          label={t.member?.batch?.maxAll ?? 'Max All'}
          onClick={async () => {
            await repo.batchUpdate(row => columns.maxAll(row))
            forceReload()
            rowReloaders.current.forEach(fn => {
              fn()
            })
          }}
        />
      )}
      renderRowAction={(index, helpers) => (
          <MemberNowRow
            key={index}
            index={index}
            registerReload={helpers.registerReload}
            unregisterReload={helpers.unregisterReload}
          />
      )}
    />
  )
}
