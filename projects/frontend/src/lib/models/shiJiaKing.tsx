import { ShiJiaKingParsed, ShiJiaKingRelation } from '@/types/ShiJiaKing'
import { ShiJiaKingColumn } from '@/columns/ShiJiaKing'

export class ShiJiaKingModel {
  static deserialize(row: string[]): ShiJiaKingParsed {
    console.log('Deserializing row:', )
    const relations: ShiJiaKingRelation[] = row[ShiJiaKingColumn.OTHER_RELATIONS]
      .split('|')
      .map(item => {
        const [familyId, value] = item.split('@')
        return {
          familyId: Number(familyId),
          value: Number(value),
        }
      })
    return {
      name: row[ShiJiaKingColumn.NAME],
      level: Number(row[ShiJiaKingColumn.LEVEL]),
      relationshipIndex: Number(row[ShiJiaKingColumn.RELATIONSHIP_INDEX]),
      relations,
    }
  }

  static serialize(data: ShiJiaKingParsed): string[] {
    const row = new Array(13).fill('0')

    row[ShiJiaKingColumn.NAME] = data.name
    row[ShiJiaKingColumn.LEVEL] = String(data.level)
    row[ShiJiaKingColumn.RELATIONSHIP_INDEX] = String(data.relationshipIndex)
    row[ShiJiaKingColumn.OTHER_RELATIONS] = data.relations
      .map(r => `${r.familyId}@${r.value}`)
      .join('|')
    return row
  }
}
