export const enum MemberQuColumn {
  ID = 0,
  APPEARANCE = 1,
  PERSON_DATA = 2,
  CHILDREN = 3,
  HOUSING = 4,
  AGE = 5,
  MARTIAL = 6,
  LITERARY = 7,
  BUSINESS = 8,
  ART = 9,
  MOOD = 10,
  MERITS = 11,
  REPUTATION = 12,
  MARITAL_STATUS = 13,
  EQUIPMENT = 14,
  CHARM = 15,
  HEALTH = 16,
  COL_17 = 17,
  PREGNANCY_MONTH = 18,
  STRATEGY = 19,
  STAMINA = 20,
  MONTHLY_INCREMENT = 21,
  GROWTH_BONUS = 22,
  SKILL_POINT = 23,
  COL_24 = 24,
  PREGNANCY_STATUS = 25,
  RELATION_TREE = 26,
  TRAITS = 27,
  COL_28 = 28,
  COL_29 = 29,
  COL_30 = 30,
  WORK_PLACE = 31,
  TASK = 32,
}

export type MemberQuParsed = {
  id: string
  appearance: string
  personData: string
  children: string
  housing: string
  age: number
  martial: number
  literary: number
  business: number
  art: number
  mood: number
  merits: number
  reputation: number
  maritalStatus: number
  equipment: string
  charm: number
  health: number
  pregnancyMonth: number
  pregnancyStatus: number
  strategy: number
  stamina: number
  monthlyIncrement: string
  growthBonus: string
  skillPoint: number
  workPlace: string
  task: string
}

export const MemberQuColumnMap = {
  id: MemberQuColumn.ID,
  appearance: MemberQuColumn.APPEARANCE,
  personData: MemberQuColumn.PERSON_DATA,
  children: MemberQuColumn.CHILDREN,
  housing: MemberQuColumn.HOUSING,
  age: MemberQuColumn.AGE,
  martial: MemberQuColumn.MARTIAL,
  literary: MemberQuColumn.LITERARY,
  business: MemberQuColumn.BUSINESS,
  art: MemberQuColumn.ART,
  mood: MemberQuColumn.MOOD,
  merits: MemberQuColumn.MERITS,
  reputation: MemberQuColumn.REPUTATION,
  maritalStatus: MemberQuColumn.MARITAL_STATUS,
  equipment: MemberQuColumn.EQUIPMENT,
  charm: MemberQuColumn.CHARM,
  health: MemberQuColumn.HEALTH,
  pregnancyMonth: MemberQuColumn.PREGNANCY_MONTH,
  pregnancyStatus: MemberQuColumn.PREGNANCY_STATUS,
  strategy: MemberQuColumn.STRATEGY,
  stamina: MemberQuColumn.STAMINA,
  monthlyIncrement: MemberQuColumn.MONTHLY_INCREMENT,
  growthBonus: MemberQuColumn.GROWTH_BONUS,
  skillPoint: MemberQuColumn.SKILL_POINT,
  workPlace: MemberQuColumn.WORK_PLACE,
  task: MemberQuColumn.TASK,
} as const
