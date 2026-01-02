import { BaseRepository } from '@/lib/baseRepository'

export class Member_CiRepository extends BaseRepository {
  protected sectionKey = 'Member_Ci'


  async update_COL_0(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_0', value)
  }

  async update_COL_0_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_0', 'SUB_0', value)
  }

  async update_COL_0_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_0', 'SUB_1', value)
  }

  async update_COL_0_SUB_2(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_0', 'SUB_2', value)
  }

  async update_COL_0_SUB_3(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_0', 'SUB_3', value)
  }

  async update_COL_0_SUB_4(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_0', 'SUB_4', value)
  }

  async update_COL_1(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_1', value)
  }

  async update_COL_2(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_2', value)
  }
}
