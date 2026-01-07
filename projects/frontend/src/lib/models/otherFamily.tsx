import { OtherFamilyParsed, OtherFamilyRelation } from '@/types/otherFamily'
import { OtherFamilyColumn } from '@/columns/otherFamily'

export class OtherFamilyModel {
  static deserialize(row: string[], id: number): OtherFamilyParsed {
    const relations: OtherFamilyRelation[] = row[
      OtherFamilyColumn.OTHER_RELATIONS
      ]
      .split('|')
      .filter(Boolean)
      .map(item => {
        const [familyId, value] = item.split('@')
        return {
          familyId: Number(familyId),
          value: Number(value),
        }
      })

    const [privateArmy, militaryPower] =
      row[OtherFamilyColumn.ARMY_STRENGTH].split('|')

    return {
      id,
      name: row[OtherFamilyColumn.NAME],
      level: Number(row[OtherFamilyColumn.LEVEL]),
      relationshipIndex: Number(row[OtherFamilyColumn.RELATIONSHIP_INDEX]),
      coordinates: row[OtherFamilyColumn.COORDINATES] as any,
      inheritance: Number(row[OtherFamilyColumn.INHERITANCE]),
      royalInfluence: Number(row[OtherFamilyColumn.ROYAL_INFLUENCE]),
      relations,
      army: {
        privateArmy: Number(privateArmy),
        militaryPower: Number(militaryPower),
      },
    }
  }

  static serialize(data: OtherFamilyParsed): string[] {
    const row = new Array(13).fill('0')

    row[OtherFamilyColumn.NAME] = data.name
    row[OtherFamilyColumn.LEVEL] = String(data.level)
    row[OtherFamilyColumn.RELATIONSHIP_INDEX] = String(data.relationshipIndex)
    row[OtherFamilyColumn.COORDINATES] = data.coordinates
    row[OtherFamilyColumn.INHERITANCE] = String(data.inheritance)
    row[OtherFamilyColumn.ROYAL_INFLUENCE] = String(data.royalInfluence)
    row[OtherFamilyColumn.OTHER_RELATIONS] = data.relations
      .map(r => `${r.familyId}@${r.value}`)
      .join('|')
    row[OtherFamilyColumn.ARMY_STRENGTH] = `${data.army.privateArmy}|${data.army.militaryPower}`

    return row
  }
}
