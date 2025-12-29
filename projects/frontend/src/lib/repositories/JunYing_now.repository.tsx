import { BaseRepository } from '@/lib/baseRepository'

export type JunYingRow = [
  string, // 0 coordinates "lat|lng"
  string, // 1 area
  string, // 2 soldier count
  string, // 3 combat power
  string, // 4 loyalty
  string, // 5 low equipment rate
  string, // 6 high equipment rate
  string, // 7 camp name
  string  // 8 salary
]

export interface JunYingNowData {
  value: JunYingRow[][]
}

export class JunYing_nowRepository extends BaseRepository {
  protected sectionKey = 'JunYing_now'

  async updateCellByRowIndex(
    groupIndex: number,
    rowIndex: number,
    colIndex: number,
    value: string
  ) {
    const groups = await this.getValue<JunYingRow[][]>()

    if (!Array.isArray(groups)) return
    if (!groups[groupIndex]) return
    if (!groups[groupIndex][rowIndex]) return

    groups[groupIndex][rowIndex][colIndex] = value

    await this.setValue(groups)
  }

  async getGroups(): Promise<any[][]> {
    return (await this.getValue()) ?? []
  }

  async getRowsByGroupIndex(groupIndex: number): Promise<any[]> {
    const groups = await this.getGroups()
    return groups[groupIndex] ?? []
  }

  async addRow(groupIndex: number, row: any[]) {
    const groups = await this.getGroups()

    if (!groups[groupIndex]) {
      groups[groupIndex] = []
    }

    groups[groupIndex].push(row)
    await this.setValue(groups)
  }

  async updateRow(groupIndex: number, rowIndex: number, row: any[]) {
    const groups = await this.getGroups()
    groups[groupIndex][rowIndex] = row
    await this.setValue(groups)
  }

  async deleteRow(groupIndex: number, rowIndex: number) {
    const groups = await this.getGroups()
    groups[groupIndex].splice(rowIndex, 1)
    await this.setValue(groups)
  }

  async deleteBulk(groupIndex: number, rowIndexes: number[]) {
    const groups = await this.getGroups()
    groups[groupIndex] = groups[groupIndex].filter(
      (_: any, idx: number) => !rowIndexes.includes(idx)
    )
    await this.setValue(groups)
  }

  //  coordinates latitude|longitude eg -3.2|1.6
  async update_COL_0(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_0', value)
  }
  // Camp site option 4,6,9,16
  async update_COL_1(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_1', value)
  }
  // Amount of troop
  async update_COL_2(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_2', value)
  }
 // combat power
  async update_COL_3(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_3', value)
  }
  // loyalty
  async update_COL_4(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_4', value)
  }
  // UNKNOWN COL_5
  async update_COL_5(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_5', value)
  }
  // UNKNOWN COL_6
  async update_COL_6(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_6', value)
  }
  // Camp name
  async update_COL_7(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_7', value)
  }
  // UNKNOWN COL_8
  async update_COL_8(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_8', value)
  }

}
