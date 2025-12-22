import {
  getRows,
  updateCell,
  updateSubCell
} from '@/lib/gameData.model'

export abstract class BaseRepository {
  protected abstract sectionKey: string

  async all(): Promise<any[][]> {
    return getRows(this.sectionKey)
  }

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
}
