import { BaseRepository } from '@/lib/baseRepository'

export class Horse_HaveRepository extends BaseRepository {
  protected sectionKey = 'Horse_Have'

  async createRow(row: any[]): Promise<void> {
    return super.createRow(row)
  }

  async deleteWhere(
    predicate: (row: any[], index: number) => boolean
  ): Promise<void> {
    return super.deleteWhere(predicate)
  }

  /**
   * COL_0 = Color
   * @param id
   * @param value references Color.key
   */
  async update_COL_0(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_0', value)
  }

  /**
   * COL_1 = Year Age
   * @param id
   * @param value references Color.key
   */
  async update_COL_1(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_1', value)
  }

  /**
   * COL_2 = Lifespan
   * @param id
   * @param value references Color.key
   */
  async update_COL_2(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_2', value)
  }

  /**
   * COL_3 = Power
   * @param id
   * @param value references Color.key
   */
  async update_COL_3(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_3', value)
  }

  /**
   * COL_4 = Speed
   * @param id
   * @param value references Color.key
   */
  async update_COL_4(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_4', value)
  }

  /**
   * COL_5 = Smart
   * @param id
   * @param value references Color.key
   */
  async update_COL_5(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_5', value)
  }

  /**
   * COL_6 = Owner
   * @param id
   * @param value references Color.key
   */
  async update_COL_6(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_6', value)
  }
}
