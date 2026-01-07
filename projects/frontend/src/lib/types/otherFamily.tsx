export type Coordinates = `${number}|${number}`

export type ArmyStrength = {
  privateArmy: number
  militaryPower: number
}

export type OtherFamilyRelation = {
  familyId: number
  value: number
}

export type OtherFamilyParsed = {
  id: number
  name: string
  level: number
  relationshipIndex: number
  coordinates: Coordinates
  inheritance: number
  royalInfluence: number
  relations: OtherFamilyRelation[]
  army: ArmyStrength
}
