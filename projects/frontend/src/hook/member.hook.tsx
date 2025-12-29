'use client'

import {useCallback, useEffect, useMemo, useState} from 'react'
import { MemberParsed } from '@/lib/members.model'
import { Member_nowRepository } from '@/lib/repositories/Member_now.repository'

/**
 * How to use on Page/Component
 * const { member, update, loading } = useMember(0)
 *
 * if (loading) return <Spinner />
 *
 * <input
 *   value={member.age}
 *   onChange={e =>
 *     update(m => ({
 *       ...m,
 *       age: Number(e.target.value),
 *     }))
 *   }
 * />
 * @param rowIndex
 */
export function useMember(rowIndex: number) {
  const [member, setMember] = useState<MemberParsed | null>(null)
  const [loading, setLoading] = useState(true)

  const repo = useMemo(() => new Member_nowRepository(), [])

  // Event-driven reload (button click, after update, etc.)
  const reload = useCallback(async () => {
    setLoading(true)
    const data = await repo.getParsed(rowIndex)
    setMember(data)
    setLoading(false)
  }, [repo, rowIndex])

  const update = useCallback(
    async (updater: (m: MemberParsed) => MemberParsed) => {
      if (!member) return
      await repo.updateParsed(rowIndex, updater)
      await reload()
    },
    [member, repo, rowIndex, reload],
  )

  // Initial (and rowIndex change) load without calling a state-updating helper from the effect body.
  useEffect(() => {
    let cancelled = false

    const run = async () => {
      setLoading(true)
      const data = await repo.getParsed(rowIndex)
      if (cancelled) return
      setMember(data)
      setLoading(false)
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [repo, rowIndex])

  return {
    member,
    setMember, // optional: local optimistic update
    update,
    reload,
    loading,
  }
}
