import { BaseRepository } from '@/lib/baseRepository'

export class NongZ_nowRepository extends BaseRepository {
  protected sectionKey = 'NongZ_now'

  /**
   * value: [ [ row, row, ... ] ]
   */
  async getAllRows(): Promise<string[][]> {
    const raw = await super.all()
    return Array.isArray(raw) && Array.isArray(raw[0])
      ? (raw[0] as string[][])
      : []
  }

  /**
   * 🔴 OVERRIDE: update single cell for 3-level array
   */
  async updateCellByColIndex(
    rowId: string,
    colIndex: number,
    value: string
  ) {
    const data = await this.readAllInternal()

    const section = data?.[this.sectionKey]
    if (!section?.value || !Array.isArray(section.value[0])) return

    const rows: string[][] = section.value[0]

    section.value[0] = rows.map(row => {
      // ⚠️ rowId is BELONG_TO_CLAN (not ideal but consistent with current code)
      if (row[0] !== rowId) return row
      const next = [...row]
      next[colIndex] = value
      return next
    })

    await this.writeAllInternal(data)
  }

  /**
   * 🔴 OVERRIDE: update compound cell (| separated)
   */
  async updateCompoundByIndex(
    rowId: string,
    colIndex: number,
    subIndex: number,
    value: string
  ) {
    const data = await this.readAllInternal()

    const section = data?.[this.sectionKey]
    if (!section?.value || !Array.isArray(section.value[0])) return

    const rows: string[][] = section.value[0]

    section.value[0] = rows.map(row => {
      if (row[0] !== rowId) return row

      const next = [...row]
      const raw = String(next[colIndex] ?? '')
      const parts = raw.split('|')
      parts[subIndex] = value
      next[colIndex] = parts.join('|')
      return next
    })

    await this.writeAllInternal(data)
  }

  /* --------------------------------
   * INTERNAL helpers
   * -------------------------------- */
  private async readAllInternal(): Promise<any> {
    const raw = localStorage.getItem('uploadedJson')
    return raw ? JSON.parse(raw) : {}
  }

  private async writeAllInternal(data: any): Promise<void> {
    localStorage.setItem('uploadedJson', JSON.stringify(data))
  }

  async updateCellByRowIndex(
    rowIndex: number,
    colIndex: number,
    value: string
  ) {
    const data = await this.readAllInternal()
    const section = data?.[this.sectionKey]
    if (!Array.isArray(section?.value?.[0])) return

    section.value[0][rowIndex][colIndex] = value

    await this.writeAllInternal(data)
  }

  async updateCompoundByRowIndex(
    rowIndex: number,
    colIndex: number,
    subIndex: number,
    value: string
  ) {
    const data = await this.readAllInternal()
    const section = data?.[this.sectionKey]
    if (!Array.isArray(section?.value?.[0])) return

    const row = section.value[0][rowIndex]
    const parts = String(row[colIndex] ?? '').split('|')
    parts[subIndex] = value
    row[colIndex] = parts.join('|')

    await this.writeAllInternal(data)
  }

}
