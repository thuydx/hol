
export type ShiJiaKingRelation = {
  familyId: number
  value: number
}

export type ShiJiaKingParsed = {
  name: string
  level: number
  relationshipIndex: number
  unknown_col4?: number
  unknown_col5?: number
  relations: ShiJiaKingRelation[]
}
