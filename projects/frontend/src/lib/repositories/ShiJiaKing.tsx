import { BaseRepository } from '@/lib/baseRepository'
import {ShiJiaKingParsed} from "@/types/ShiJiaKing";
import {ShiJiaKingModel} from "@/models/shiJiaKing";

export class ShiJiaKingRepository extends BaseRepository {
  protected sectionKey = 'ShiJia_king'

  async getAll(): Promise<ShiJiaKingParsed> {
    const rows = await this.getValue<string[]>()
    if (!Array.isArray(rows)) return {} as ShiJiaKingParsed
    return ShiJiaKingModel.deserialize(rows)
  }

  // async update(
  //   id: number,
  //   updater: (m: ShiJiaKingParsed) => ShiJiaKingParsed,
  // ): Promise<void> {
  //   const rows = await this.getValue<string[][]>()
  //   if (!rows?.[id]) return
  //
  //   const current = ShiJiaKingModel.deserialize(rows[id], id)
  //   const updated = updater(current)
  //
  //   rows[id] = ShiJiaKingModel.serialize(updated)
  //   await this.setValue(rows)
  // }
  //
  // async create(data: ShiJiaKingParsed): Promise<void> {
  //   const row = ShiJiaKingModel.serialize(data)
  //   await this.createRow(row)
  // }
  //
  // async delete(id: number): Promise<void> {
  //   await this.deleteWhere((_, index) => index === id)
  // }
}
