'use client'

import {useEffect, useMemo, useRef} from 'react'
import {useI18nClient} from '@/lib/i18nClient'

import {TableEditor} from '@/components/table/TableEditor'
import {InputCell} from '@/components/table/InputCell'
import {MaxAttributeButton} from '@/components/button/MaxAttributeButton'

import {buildMemberNowColumns} from '@/columns/memberNow'
import {useMember, useMembers} from '@/hooks/member'
import {useBatchEditor} from '@/hooks/useBatchEditor'

import {MemberNowRepository} from '@/repositories/MemberNow'
import {MemberParsed} from '@/models/members'

/* =========================================================
 * Row
 * ========================================================= */

function MemberNowRow({
                        index,
                        registerReload,
                      }: {
  index: number
  registerReload: (index: number, fn: () => void) => void
}) {
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
    <>
      <td>{member.id}</td>
      {columns.map(col => (
        <td key={col.key} style={col.width ? { width: col.width } : undefined}>
          {col.render ? (
            col.render(member, update, t)
          ) : (
            <InputCell
              value={col.get(member)}
              type={col.input}
              onChange={v => update(m => col.set(m, v))}
            />
          )}
        </td>
      ))}
    </>
  )
}

/* =========================================================
 * Page
 * ========================================================= */

export default function MemberNowPage() {
  const { t } = useI18nClient<any>()
  const repo = useMemo(() => new MemberNowRepository(), [])
  const columns = useMemo(() => buildMemberNowColumns(t), [t])
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
      renderHeaderActions={() => (
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
      renderRow={index => (
        <tr key={index}>
          <MemberNowRow
            index={index}
            registerReload={(i, fn) => {
              rowReloaders.current.set(i, fn)
            }}
          />
        </tr>
      )}
    />
  )
}
