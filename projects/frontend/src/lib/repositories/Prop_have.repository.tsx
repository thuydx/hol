import { BaseRepository } from '@/lib/baseRepository'

export class Prop_haveRepository extends BaseRepository {
  protected sectionKey = 'Prop_have'


  async update_COL_0(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_0', value)
  }

  async update_COL_1(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_1', value)
  }
}
