import { BaseRepository } from '@/lib/baseRepository'

export class XiQuHave_NowRepository extends BaseRepository {
  protected sectionKey = 'XiQuHave_Now'


  async update_COL_0(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_0', value)
  }

  async update_COL_1(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_1', value)
  }

  async update_COL_2(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_2', value)
  }
}
