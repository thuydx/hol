import { BaseRepository } from '@/lib/baseRepository'
import { OtherFamilyParsed } from '@/types/otherFamily'
import { OtherFamilyModel } from '@/models/otherFamily'

export class OtherFamilyRepository extends BaseRepository {
  protected sectionKey = 'ShiJia_Now'

  async getAll(): Promise<OtherFamilyParsed[]> {
    const rows = await this.getValue<string[][]>()

    if (!Array.isArray(rows)) return []

    return rows.map(
      (row: string[], index: number): OtherFamilyParsed =>
        OtherFamilyModel.deserialize(row, index),
    )
  }

  async update(
    id: number,
    updater: (m: OtherFamilyParsed) => OtherFamilyParsed,
  ): Promise<void> {
    const rows = await this.getValue<string[][]>()
    if (!rows?.[id]) return

    const current = OtherFamilyModel.deserialize(rows[id], id)
    const updated = updater(current)

    rows[id] = OtherFamilyModel.serialize(updated)
    await this.setValue(rows)
  }

  async create(data: OtherFamilyParsed): Promise<void> {
    const row = OtherFamilyModel.serialize(data)
    await this.createRow(row)
  }

  async delete(id: number): Promise<void> {
    await this.deleteWhere((_, index) => index === id)
  }

}
