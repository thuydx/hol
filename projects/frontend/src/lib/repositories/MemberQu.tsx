import { BaseRepository } from '@/lib/baseRepository'
import {
  MemberQuColumn,
  MemberQuParsed,
} from '@/lib/models/memberQu'

/**
 * Repository quản lý Member_qu (dâu / rể)
 * Tuân thủ CHÍNH XÁC BaseRepository hiện tại
 */
export class MemberQuRepository extends BaseRepository {
  protected sectionKey = 'Member_qu'

  /**
   * Parse toàn bộ Member_qu → object dùng cho UI
   */
  async deserializeAll(): Promise<MemberQuParsed[]> {
    const rows = await this.getRows()

    return rows.map((row: string[]): MemberQuParsed => ({
      id: row[MemberQuColumn.ID],
      appearance: row[MemberQuColumn.APPEARANCE],
      personData: row[MemberQuColumn.PERSON_DATA],
      children: row[MemberQuColumn.CHILDREN],
      housing: row[MemberQuColumn.HOUSING],

      age: Number(row[MemberQuColumn.AGE]),
      martial: Number(row[MemberQuColumn.MARTIAL]),
      literary: Number(row[MemberQuColumn.LITERARY]),
      business: Number(row[MemberQuColumn.BUSINESS]),
      art: Number(row[MemberQuColumn.ART]),
      mood: Number(row[MemberQuColumn.MOOD]),
      merits: Number(row[MemberQuColumn.MERITS]),
      reputation: Number(row[MemberQuColumn.REPUTATION]),
      maritalStatus: Number(row[MemberQuColumn.MARITAL_STATUS]),

      equipment: row[MemberQuColumn.EQUIPMENT],
      charm: Number(row[MemberQuColumn.CHARM]),
      health: Number(row[MemberQuColumn.HEALTH]),

      pregnancyMonth: Number(row[MemberQuColumn.PREGNANCY_MONTH]),
      pregnancyStatus: Number(row[MemberQuColumn.PREGNANCY_STATUS]),

      strategy: Number(row[MemberQuColumn.STRATEGY]),
      stamina: Number(row[MemberQuColumn.STAMINA]),

      monthlyIncrement: row[MemberQuColumn.MONTHLY_INCREMENT],
      growthBonus: row[MemberQuColumn.GROWTH_BONUS],

      skillPoint: Number(row[MemberQuColumn.SKILL_POINT]),
      workPlace: row[MemberQuColumn.WORK_PLACE],
      task: row[MemberQuColumn.TASK],
    }))
  }

  /* =======================
   * UPDATE
   * ======================= */

  /**
   * Update 1 cell theo rowIndex + columnIndex
   * (API CHUẨN của BaseRepository)
   */
  async updateCell(
    rowIndex: number,
    columnIndex: number,
    value: string
  ): Promise<void> {
    await this.updateColumnByIndex(rowIndex, columnIndex, value)
  }

  /* =======================
   * WRITE (BATCH)
   * ======================= */

  /**
   * Ghi lại toàn bộ Member_qu
   */
  async writeAll(members: MemberQuParsed[]): Promise<void> {
    const rows = this.serializeAll(members)
    await this.setValue(rows)
  }

  /* =======================
   * SERIALIZE
   * ======================= */

  /**
   * Convert object → raw rows (string[][])
   */
  serializeAll(members: MemberQuParsed[]): string[][] {
    return members.map((m): string[] => {
      const row: string[] = []

      row[MemberQuColumn.ID] = m.id
      row[MemberQuColumn.APPEARANCE] = m.appearance
      row[MemberQuColumn.PERSON_DATA] = m.personData
      row[MemberQuColumn.CHILDREN] = m.children
      row[MemberQuColumn.HOUSING] = m.housing
      row[MemberQuColumn.AGE] = String(m.age)
      row[MemberQuColumn.MARTIAL] = String(m.martial)
      row[MemberQuColumn.LITERARY] = String(m.literary)
      row[MemberQuColumn.BUSINESS] = String(m.business)
      row[MemberQuColumn.ART] = String(m.art)
      row[MemberQuColumn.MOOD] = String(m.mood)
      row[MemberQuColumn.MERITS] = String(m.merits)
      row[MemberQuColumn.REPUTATION] = String(m.reputation)
      row[MemberQuColumn.MARITAL_STATUS] = String(m.maritalStatus)
      row[MemberQuColumn.EQUIPMENT] = m.equipment
      row[MemberQuColumn.CHARM] = String(m.charm)
      row[MemberQuColumn.HEALTH] = String(m.health)
      row[MemberQuColumn.PREGNANCY_MONTH] = String(m.pregnancyMonth)
      row[MemberQuColumn.PREGNANCY_STATUS] = String(m.pregnancyStatus)
      row[MemberQuColumn.STRATEGY] = String(m.strategy)
      row[MemberQuColumn.STAMINA] = String(m.stamina)
      row[MemberQuColumn.MONTHLY_INCREMENT] = m.monthlyIncrement
      row[MemberQuColumn.GROWTH_BONUS] = m.growthBonus
      row[MemberQuColumn.SKILL_POINT] = String(m.skillPoint)
      row[MemberQuColumn.WORK_PLACE] = m.workPlace
      row[MemberQuColumn.TASK] = m.task

      return row
    })
  }
}
