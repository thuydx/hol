import {BaseRepository} from '@/lib/baseRepository'

export class SelectNumPer_ShopRepository extends BaseRepository {
  protected sectionKey = 'SelectNumPer_Shop'


  async update_COL_0(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_0', value)
  }

  async update_COL_1(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_1', value)
  }
}
