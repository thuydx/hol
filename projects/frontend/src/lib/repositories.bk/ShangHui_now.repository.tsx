import { BaseRepository } from '@/lib/baseRepository'

export class ShangHui_nowRepository extends BaseRepository {
  protected sectionKey = 'ShangHui_now'


  async update_COL_0(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_0', value)
  }

  async update_COL_1(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_1', value)
  }

  async update_COL_2(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_2', value)
  }

  async update_COL_2_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_2', 'SUB_0', value)
  }

  async update_COL_2_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_2', 'SUB_1', value)
  }

  async update_COL_3(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_3', value)
  }

  async update_COL_4(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_4', value)
  }
}
