import {
  getRows,
  updateCell, updateCellByIndex,
  updateSubCell
} from '@/lib/gameData.model'

const STORAGE_KEY = 'uploadedJson'

async function readAll(): Promise<any> {
  if (typeof window === 'undefined') {
    throw new Error('Client only')
  }

  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : {}
}

async function writeAll(data: any): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('Client only')
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export abstract class BaseRepository {
  protected abstract sectionKey: string

  /* =======================
   * READ
   * ======================= */
  async all(): Promise<any[][]> {
    return getRows(this.sectionKey)
  }

  /* =======================
   * UPDATE (CELL LEVEL)
   * ======================= */
  async updateColumn(
    rowId: string,
    colKey: string,
    value: string
  ) {
    await updateCell(this.sectionKey, rowId, colKey, value)
  }

  async updateSubColumn(
    rowId: string,
    colKey: string,
    subKey: string,
    value: string
  ) {
    await updateSubCell(
      this.sectionKey,
      rowId,
      colKey,
      subKey,
      value
    )
  }

  async updateColumnByIndex(
    rowIndex: number,
    colIndex: number,
    value: string
  ) {
    await updateCellByIndex(
      this.sectionKey,
      rowIndex,
      colIndex,
      value
    )
  }


  /* =======================
   * CREATE (ROW LEVEL)
   * ======================= */
  async createRow(row: any[]): Promise<void> {
    const data = await readAll()

    if (!data[this.sectionKey]) {
      data[this.sectionKey] = { value: [] }
    }

    if (!Array.isArray(data[this.sectionKey].value)) {
      data[this.sectionKey].value = []
    }

    data[this.sectionKey].value.push(row)
    await writeAll(data)
  }

  /* =======================
   * DELETE (ROW LEVEL)
   * ======================= */
  async deleteWhere(
    predicate: (row: any[], index: number) => boolean
  ): Promise<void> {
    const data = await readAll()
    const rows = data?.[this.sectionKey]?.value

    if (!Array.isArray(rows)) return

    data[this.sectionKey].value = rows.filter(
      (row: any[], index: number) => !predicate(row, index)
    )

    await writeAll(data)
  }
}
