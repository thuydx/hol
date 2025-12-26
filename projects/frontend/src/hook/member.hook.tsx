'use client'

import { useCallback, useEffect, useState } from 'react'
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

  const repo = new Member_nowRepository()

  const load = useCallback(async () => {
    setLoading(true)
    const data = await repo.getParsed(rowIndex)
    setMember(data)
    setLoading(false)
  }, [rowIndex])

  const update = useCallback(
    async (updater: (m: MemberParsed) => MemberParsed) => {
      if (!member) return
      await repo.updateParsed(rowIndex, updater)
      await load()
    },
    [member, rowIndex, load],
  )

  useEffect(() => {
    load()
  }, [load])

  return {
    member,
    setMember, // optional: local optimistic update
    update,
    reload: load,
    loading,
  }
}
