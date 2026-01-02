'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { JunYingNowRepository } from '@/repositories/JunYingNow'
import {
  EMPTY_JUNYING_ROW,
  JunYingRow
} from '@/models/junYingNow'

export function useJunYingNow(groupIndex: number) {
  const repo = useMemo(() => new JunYingNowRepository(), [])

  const [rows, setRows] = useState<JunYingRow[]>([])
  const [checked, setChecked] = useState<number[]>([])
  const [form, setForm] = useState<JunYingRow>(EMPTY_JUNYING_ROW)

  // initial load
  useEffect(() => {
    let alive = true

    ;(async () => {
      const data = await repo.getRowsByGroupIndex(groupIndex)
      if (alive) setRows(data)
    })()

    return () => {
      alive = false
    }
  }, [repo, groupIndex])

  const reload = useCallback(async () => {
    setRows(await repo.getRowsByGroupIndex(groupIndex))
  }, [repo, groupIndex])

  const updateCell = async (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    setRows(prev =>
      prev.map((row, i) => {
        if (i !== rowIndex) return row
        const next = [...row] as JunYingRow
        next[colIndex] = value
        return next
      })
    )

    await repo.updateCellByRowIndex(
      groupIndex,
      rowIndex,
      colIndex,
      value
    )
  }

  const addRow = async () => {
    await repo.createRowInGroup(groupIndex, form)
    setForm(EMPTY_JUNYING_ROW)
    await reload()
  }

  const deleteRow = async (rowIndex: number) => {
    await repo.deleteRow(groupIndex, rowIndex)
    await reload()
  }

  const deleteBulk = async () => {
    await repo.deleteBulk(groupIndex, checked)
    setChecked([])
    await reload()
  }

  return {
    rows,
    checked,
    setChecked,
    form,
    setForm,
    updateCell,
    addRow,
    deleteRow,
    deleteBulk
  }
}
