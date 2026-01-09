import {BaseRepository} from '@/lib/baseRepository'
import {deserializeAll, MemberColumn, MemberParsed, MemberRawRow, serializeAll,} from '@/lib/models/members'

/**
 * HOW TO USE
 * const repo = useMemo(() => new Member_nowRepository(), [])
 *
 * useEffect(() => {
 *   repo.getParsed(0).then(setMember)
 * }, [])
 *
 * const onChangeAge = async () => {
 *   await repo.updateParsed(0, m => ({
 *     ...m,
 *     age: m.age + 1,
 *   }))
 * }
 */
export class Member_nowRepository extends BaseRepository {
  protected sectionKey = 'Member_now'

  /* =======================
   * RAW ACCESS
   * ======================= */

  async getRawRow(index: number): Promise<MemberRawRow | null> {
    const rows = await this.getRows<MemberRawRow[]>()
    return rows?.[index] ?? null
  }

  async setRawCell(
    rowIndex: number,
    column: MemberColumn,
    value: string,
  ): Promise<void> {
    const rows = await this.getRows<MemberRawRow[]>()
    if (!rows) return
    rows[rowIndex][column] = value
    await this.setValue(rows)
  }

  /* =======================
   * PARSE
   * ======================= */
  async getParsed(rowIndex: number): Promise<MemberParsed | null> {
    const rows = await this.getRows<MemberRawRow[]>()
    if (!rows?.[rowIndex]) return null

    return deserializeAll(rows[rowIndex])
  }

  async getParsedAll(): Promise<MemberParsed[]> {
    const rows = await this.getRows<MemberRawRow[]>()
    if (!rows || !Array.isArray(rows)) return []
    return rows
      .map((row) => deserializeAll(row))
      .filter(Boolean)
  }


  /* =======================
   * UPDATE (COMPLETE)
   * ======================= */

  async updateParsed(
    rowIndex: number,
    updater: (m: MemberParsed) => MemberParsed,
  ): Promise<void> {
    const rows = await this.getRows<MemberRawRow[]>()
    if (!rows?.[rowIndex]) return

    const current = deserializeAll(rows[rowIndex])
    const next = updater(current)

    rows[rowIndex] = serializeAll(next, rows[rowIndex])

    await this.setValue(rows) // 🔥 1 lần writeAll
  }

  /**
   * Batch update (N rows – 1 writeAll)
   * @param updater
   *
   * How to use
   * await repo.batchUpdate(m => ({
   *   ...m,
   *   age: m.age + 1,
   * }))
   */
  async batchUpdate(
    updater: (m: MemberParsed, rowIndex: number) => MemberParsed | null,
  ): Promise<void> {
    const rows = await this.getRows<MemberRawRow[]>()
    if (!rows) return

    let changed = false

    rows.forEach((row, index) => {
      const parsed = deserializeAll(row)
      const next = updater(parsed, index)

      if (next) {
        rows[index] = serializeAll(next, row)
        changed = true
      }
    })

    if (changed) {
      await this.setValue(rows) // 🔥 chỉ 1 lần
    }
  }

  async batchUpdateByIndexes(
    indexes: number[],
    updater: (m: MemberParsed) => MemberParsed,
  ): Promise<void> {
    const rows = await this.getRows<MemberRawRow[]>()
    if (!rows) return

    indexes.forEach(i => {
      if (!rows[i]) return
      const parsed = deserializeAll(rows[i])
      rows[i] = serializeAll(updater(parsed), rows[i])
    })

    await this.setValue(rows)
  }
}
