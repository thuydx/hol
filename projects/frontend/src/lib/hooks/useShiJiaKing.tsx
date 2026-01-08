'use client'

import { useEffect, useState } from 'react'
import { ShiJiaKingParsed } from '@/types/ShiJiaKing'
import { ShiJiaKingRepository } from '@/repositories/ShiJiaKing'

const repo = new ShiJiaKingRepository()

export function useShiJiaKing() {
  const [data, setData] = useState<ShiJiaKingParsed>({} as ShiJiaKingParsed)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    repo.getAll().then(res => {
      setData(res)
      setLoading(false)
    })
  }, [])
// console.log(data)
  const update = async (
    id: number,
    fn: (m: ShiJiaKingParsed) => ShiJiaKingParsed,
  ) => {
    //@todo update shijiaking
    // await repo.update(id, fn)
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

