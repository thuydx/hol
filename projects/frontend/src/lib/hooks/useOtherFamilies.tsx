'use client'

import { useEffect, useState } from 'react'
import { OtherFamilyParsed } from '@/types/otherFamily'
import { OtherFamilyRepository } from '@/repositories/OtherFamily'

const repo = new OtherFamilyRepository()

export function useOtherFamilies() {
  const [data, setData] = useState<OtherFamilyParsed[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    repo.getAll().then(res => {
      setData(res)
      setLoading(false)
    })
  }, [])

  const update = async (
    id: number,
    fn: (m: OtherFamilyParsed) => OtherFamilyParsed,
  ) => {
    await repo.update(id, fn)
    setData(await repo.getAll())
  }

  const updateColumn = async (
    rowIndex: number,
    colIndex: number,
    value: string,
  ) => {
    await repo.updateColumnByIndex(rowIndex, colIndex, value)
    setData(await repo.getAll())
  }

  const updateSubColumn = async (
    rowId: string,
    colKey: number,      // 👈 number ở public API
    subKey: string,
    value: string,
  ) => {
    await repo.updateSubColumn(
      rowId,
      String(colKey),     // 👈 convert TẠI ĐÂY
      subKey,
      value,
    )
    setData(await repo.getAll())
  }

  return {
    data,
    loading,
    update,
    updateColumn,
    updateSubColumn,
  }

}

