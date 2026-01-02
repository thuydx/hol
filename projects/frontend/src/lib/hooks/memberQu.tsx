import { useCallback, useEffect, useMemo, useState } from 'react'
import {MemberQuRepository} from "@/repositories/MemberQu";
import {MemberQuColumn, MemberQuParsed} from "@/models/memberQu";

export function useMemberQu(rowIndex: number) {
  const repo = useMemo(() => new MemberQuRepository(), [])
  const [member, setMember] = useState<MemberQuParsed | null>(null)
  const [loading, setLoading] = useState(false)

  /* =======================
   * LOAD (MANUAL – NO useEffect)
   * ======================= */
  const load = useCallback(async () => {
    setLoading(true)
    const rows = await repo.deserializeAll()
    setMember(rows[rowIndex] ?? null)
    setLoading(false)
  }, [repo, rowIndex])

  /* =======================
   * UPDATE (CELL LEVEL)
   * ======================= */
  const updateField = useCallback(
    async (colIndex: MemberQuColumn, value: string) => {
      if (!member) return

      // update UI trước
      setMember(prev => {
        if (!prev) return prev
        const next = { ...prev }
        ;(next as any)[colIndex] = value
        return next
      })

      // persist
      await repo.updateColumnByIndex(rowIndex, colIndex, value)
    },
    [repo, rowIndex, member]
  )

  return {
    member,
    loading,
    load,        // 👈 component gọi
    updateField,
  }
}
