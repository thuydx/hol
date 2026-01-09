import {BaseRepository, MemberRepository} from '@/lib/baseRepository'
import {deserializeAll, MemberParsed, MemberRawRow, serializeAll,} from '@/models/members'

export class MemberKingRepository
  extends BaseRepository
  implements MemberRepository<MemberParsed> {
  protected sectionKey = 'Member_king'

  async findMemberById(memberId: string): Promise<MemberParsed | null> {
    const members = await this.getParsedAll()
    return members.find(m => m.id === memberId) ?? null
  }

  async getParsedAll(): Promise<MemberParsed[]> {
    const rows = await this.getRows<MemberRawRow[]>()
    if (!Array.isArray(rows)) return []
    return rows.map(row => deserializeAll(row))
  }

  async updateParsed(
    rowIndex: number,
    updater: (m: MemberParsed) => MemberParsed,
  ): Promise<void> {
    const rows = await this.getRows<MemberRawRow[]>()
    if (!rows?.[rowIndex]) return

    const current = deserializeAll(rows[rowIndex])
    const next = updater(current)

    rows[rowIndex] = serializeAll(next, rows[rowIndex])
    await this.setValue(rows)
  }

  /**
   * Đếm tổng số thành viên nội tộc theo family index
   */
  async countByFamilyIndex(): Promise<number> {
    const data = await this.getValue<any[]>()

    if (!Array.isArray(data)) return 0

    return data.length
  }
}
