import { BaseRepository } from '@/lib/baseRepository'

export type ZhuangTouRecord = {
  id: string
  name: string
}

export type FarmHeadOption = {
  id: string
  name: string
}

export type FarmHeadSelectGroup = FarmHeadOption[]

export class ZhuangTou_nowRepository extends BaseRepository {
  protected sectionKey = 'ZhuangTou_now'

  async getAllRecords(): Promise<ZhuangTouRecord[]> {
    const rows = await this.allLevel2()

    /**
     * rows structure:
     * [
     *   [ option, option, ... ],  // group 1
     *   [ option ],               // group 2
     *   [],
     *   ...
     * ]
     *
     * option = string[] (length = 6)
     */

    const records: ZhuangTouRecord[] = []

    for (const group of rows) {
      if (!Array.isArray(group)) continue

      for (const option of group) {
        if (!Array.isArray(option)) continue

        const id = option[0]
        const nameCompound = option[2] ?? ''
        const name = nameCompound.split('|')[0]

        if (id) {
          records.push({ id, name })
        }
      }
    }

    return records
  }

  /**
   * Return grouped select options
   * [
   *   [ {id, name} ],              // group 0
   *   [ {id, name} ],              // group 1
   *   [ {id, name}, ... ],         // group 2
   *   ...
   * ]
   */
  async buildSelectOptions(): Promise<FarmHeadSelectGroup[]> {
    const rows = await this.allLevel2()
    const result: FarmHeadSelectGroup[] = []

    for (const group of rows) {
      if (!Array.isArray(group)) {
        result.push([])
        continue
      }

      const options: FarmHeadOption[] = []

      for (const option of group) {
        if (!Array.isArray(option)) continue

        const id = option[0]
        const compound = option[2] ?? ''
        const name = compound.split('|')[0]

        if (id && name) {
          options.push({ id, name })
        }
      }

      result.push(options)
    }

    return result
  }


  async update_COL_0(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_0', value)
  }

  async update_COL_1(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_1', value)
  }

  async update_COL_2(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_2', value)
  }

  async update_COL_3(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_3', value)
  }

  async update_COL_4(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_4', value)
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

  async update_COL_13(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_13', value)
  }

  async update_COL_14(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_14', value)
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

  async update_COL_30(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_30', value)
  }

  async update_COL_31(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_31', value)
  }

  async update_COL_32(id: string, value: string): Promise<void> {
    await this.updateColumn(id, 'COL_32', value)
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
}
