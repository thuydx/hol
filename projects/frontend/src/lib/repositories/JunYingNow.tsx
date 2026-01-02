import { BaseRepository } from '@/lib/baseRepository'
import type { JunYingRow } from '@/models/junYingNow'

export class JunYingNowRepository extends BaseRepository {
  protected sectionKey = 'JunYing_now'

  async getRowsByGroupIndex(groupIndex: number): Promise<JunYingRow[]> {
    const groups = await this.getValue<JunYingRow[][]>()
    return groups?.[groupIndex] ?? []
  }

  async updateCellByRowIndex(
    groupIndex: number,
    rowIndex: number,
    colIndex: number,
    value: string
  ) {
    const groups = await this.getValue<JunYingRow[][]>()
    if (!groups?.[groupIndex]?.[rowIndex]) return

    groups[groupIndex][rowIndex][colIndex] = value
    await this.setValue(groups)
  }

  async createRowInGroup(
    groupIndex: number,
    row: JunYingRow
  ): Promise<void> {
    const groups = await this.getValue<JunYingRow[][]>()

    if (!groups[groupIndex]) {
      groups[groupIndex] = []
    }

    groups[groupIndex].push(row)
    await this.setValue(groups)
  }

  async deleteRow(groupIndex: number, rowIndex: number) {
    const groups = await this.getValue<JunYingRow[][]>()
    groups[groupIndex]?.splice(rowIndex, 1)
    await this.setValue(groups)
  }

  async deleteBulk(groupIndex: number, rowIndexes: number[]) {
    const groups = await this.getValue<JunYingRow[][]>()
    groups[groupIndex] = groups[groupIndex].filter(
      (_, i) => !rowIndexes.includes(i)
    )
    await this.setValue(groups)
  }
}
