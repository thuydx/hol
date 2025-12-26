import { BaseRepository } from '@/lib/baseRepository'
import {
  serializeAll, deserializeAll,
  MemberColumn,
  MemberParsed,
  MemberRawRow,
} from '@/lib/members.model'

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


  async update_COL_0(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_0', value)
  }

  async update_COL_1(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_1', value)
  }

  async update_COL_1_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_1', 'SUB_0', value)
  }

  async update_COL_1_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_1', 'SUB_1', value)
  }

  async update_COL_1_SUB_2(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_1', 'SUB_2', value)
  }

  async update_COL_1_SUB_3(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_1', 'SUB_3', value)
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

  async update_COL_2_SUB_2(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_2', 'SUB_2', value)
  }

  async update_COL_2_SUB_3(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_2', 'SUB_3', value)
  }

  async update_COL_2_SUB_4(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_2', 'SUB_4', value)
  }

  async update_COL_3(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_3', value)
  }

  async update_COL_3_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_3', 'SUB_0', value)
  }

  async update_COL_3_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_3', 'SUB_1', value)
  }

  async update_COL_3_SUB_2(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_3', 'SUB_2', value)
  }

  async update_COL_3_SUB_3(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_3', 'SUB_3', value)
  }

  async update_COL_4(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_4', value)
  }

  async update_COL_4_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_4', 'SUB_0', value)
  }

  async update_COL_4_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_4', 'SUB_1', value)
  }

  async update_COL_4_SUB_2(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_4', 'SUB_2', value)
  }

  async update_COL_4_SUB_3(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_4', 'SUB_3', value)
  }

  async update_COL_4_SUB_4(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_4', 'SUB_4', value)
  }

  async update_COL_4_SUB_5(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_4', 'SUB_5', value)
  }

  async update_COL_4_SUB_6(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_4', 'SUB_6', value)
  }

  async update_COL_4_SUB_7(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_4', 'SUB_7', value)
  }

  async update_COL_4_SUB_8(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_4', 'SUB_8', value)
  }

  async update_COL_4_SUB_9(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_4', 'SUB_9', value)
  }

  async update_COL_5(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_5', value)
  }

  async update_COL_6(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_6', value)
  }

  async update_COL_7(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_7', value)
  }

  async update_COL_8(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_8', value)
  }

  async update_COL_9(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_9', value)
  }

  async update_COL_10(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_10', value)
  }

  async update_COL_11(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_11', value)
  }

  async update_COL_12(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_12', value)
  }

  async update_COL_12_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_12', 'SUB_0', value)
  }

  async update_COL_12_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_12', 'SUB_1', value)
  }

  async update_COL_13(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_13', value)
  }

  async update_COL_14(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_14', value)
  }

  async update_COL_14_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_14', 'SUB_0', value)
  }

  async update_COL_14_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_14', 'SUB_1', value)
  }

  async update_COL_15(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_15', value)
  }

  async update_COL_16(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_16', value)
  }

  async update_COL_17(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_17', value)
  }

  async update_COL_18(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_18', value)
  }

  async update_COL_19(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_19', value)
  }

  async update_COL_19_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_0', value)
  }

  async update_COL_19_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_1', value)
  }

  async update_COL_19_SUB_2(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_2', value)
  }

  async update_COL_19_SUB_3(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_3', value)
  }

  async update_COL_19_SUB_4(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_4', value)
  }

  async update_COL_19_SUB_5(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_5', value)
  }

  async update_COL_19_SUB_6(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_6', value)
  }

  async update_COL_19_SUB_7(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_7', value)
  }

  async update_COL_19_SUB_8(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_8', value)
  }

  async update_COL_19_SUB_9(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_9', value)
  }

  async update_COL_19_SUB_10(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_10', value)
  }

  async update_COL_19_SUB_11(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_11', value)
  }

  async update_COL_19_SUB_12(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_12', value)
  }

  async update_COL_19_SUB_13(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_19', 'SUB_13', value)
  }

  async update_COL_20(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_20', value)
  }

  async update_COL_21(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_21', value)
  }

  async update_COL_22(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_22', value)
  }

  async update_COL_23(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_23', value)
  }

  async update_COL_23_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_23', 'SUB_0', value)
  }

  async update_COL_23_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_23', 'SUB_1', value)
  }

  async update_COL_24(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_24', value)
  }

  async update_COL_25(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_25', value)
  }

  async update_COL_26(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_26', value)
  }

  async update_COL_27(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_27', value)
  }

  async update_COL_28(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_28', value)
  }

  async update_COL_29(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_29', value)
  }

  async update_COL_29_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_29', 'SUB_0', value)
  }

  async update_COL_29_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_29', 'SUB_1', value)
  }

  async update_COL_29_SUB_2(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_29', 'SUB_2', value)
  }

  async update_COL_30(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_30', value)
  }

  async update_COL_31(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_31', value)
  }

  async update_COL_31_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_31', 'SUB_0', value)
  }

  async update_COL_31_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_31', 'SUB_1', value)
  }

  async update_COL_31_SUB_2(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_31', 'SUB_2', value)
  }

  async update_COL_31_SUB_3(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_31', 'SUB_3', value)
  }

  async update_COL_31_SUB_4(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_31', 'SUB_4', value)
  }

  async update_COL_31_SUB_5(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_31', 'SUB_5', value)
  }

  async update_COL_31_SUB_6(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_31', 'SUB_6', value)
  }

  async update_COL_32(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_32', value)
  }

  async update_COL_32_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_32', 'SUB_0', value)
  }

  async update_COL_32_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_32', 'SUB_1', value)
  }

  async update_COL_32_SUB_2(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_32', 'SUB_2', value)
  }

  async update_COL_32_SUB_3(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_32', 'SUB_3', value)
  }

  async update_COL_32_SUB_4(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_32', 'SUB_4', value)
  }

  async update_COL_32_SUB_5(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_32', 'SUB_5', value)
  }

  async update_COL_33(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_33', value)
  }

  async update_COL_34(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_34', value)
  }

  async update_COL_35(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_35', value)
  }

  async update_COL_36(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_36', value)
  }

  async update_COL_36_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_0', value)
  }

  async update_COL_36_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_1', value)
  }

  async update_COL_36_SUB_2(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_2', value)
  }

  async update_COL_36_SUB_3(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_3', value)
  }

  async update_COL_36_SUB_4(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_4', value)
  }

  async update_COL_36_SUB_5(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_5', value)
  }

  async update_COL_36_SUB_6(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_6', value)
  }

  async update_COL_36_SUB_7(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_7', value)
  }

  async update_COL_36_SUB_8(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_8', value)
  }

  async update_COL_36_SUB_9(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_9', value)
  }

  async update_COL_36_SUB_10(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_10', value)
  }

  async update_COL_36_SUB_11(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_11', value)
  }

  async update_COL_36_SUB_12(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_12', value)
  }

  async update_COL_36_SUB_13(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_13', value)
  }

  async update_COL_36_SUB_14(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_14', value)
  }

  async update_COL_36_SUB_15(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_15', value)
  }

  async update_COL_36_SUB_16(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_16', value)
  }

  async update_COL_36_SUB_17(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_17', value)
  }

  async update_COL_36_SUB_18(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_18', value)
  }

  async update_COL_36_SUB_19(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_19', value)
  }

  async update_COL_36_SUB_20(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_36', 'SUB_20', value)
  }

  async update_COL_37(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_37', value)
  }

  async update_COL_37_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_37', 'SUB_0', value)
  }

  async update_COL_37_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_37', 'SUB_1', value)
  }

  async update_COL_38(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_38', value)
  }

  async update_COL_39(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_39', value)
  }

  async update_COL_40(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_40', value)
  }

  async update_COL_41(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_41', value)
  }

  async update_COL_41_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_41', 'SUB_0', value)
  }

  async update_COL_41_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_41', 'SUB_1', value)
  }

  async update_COL_41_SUB_2(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_41', 'SUB_2', value)
  }

  async update_COL_42(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_42', value)
  }

  async update_COL_42_SUB_0(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_42', 'SUB_0', value)
  }

  async update_COL_42_SUB_1(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, 'COL_42', 'SUB_1', value)
  }
}
