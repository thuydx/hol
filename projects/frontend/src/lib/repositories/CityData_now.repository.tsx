import { BaseRepository } from '@/lib/baseRepository'

export class CityData_nowRepository extends BaseRepository {
  protected sectionKey = 'CityData_now'


  async update_COL_0(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_0', value)
  }

  async update_COL_1(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_1', value)
  }

  async update_COL_2(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_2', value)
  }

  async update_COL_3(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_3', value)
  }

  async update_COL_4(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_4', value)
  }

  async update_COL_5(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_5', value)
  }

  async update_COL_6(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_6', value)
  }

  async update_COL_7(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_7', value)
  }

  async update_COL_8(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_8', value)
  }
}
