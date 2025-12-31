
export const enum MemberColumn {
  ID = 0,
  APPEARANCE = 1,
  CHILDREN = 2,
  HOUSING = 3,
  PERSON_DATA = 4,
  CHARACTER = 5,
  AGE = 6,
  LITERARY = 7,
  MARTIAL = 8,
  BUSINESS = 9,
  ART = 10,
  MOOD = 11,
  OFFICIAL_TITLE = 12,
  MERITS = 13,
  TITLE_FENGDI = 14,
  STATUS = 15,
  REPUTATION = 16,
  STATUS_DURATION = 17,
  AVAILABILITY_DURATION = 18,
  STUDY_CONTENT = 19,
  CHARM = 20,
  HEALTH = 21,
  HEAD_OF_FAMILY = 22,
  SPECIAL_TAG = 23,
  RECENT_EVENTS = 24,
  PREGNANCY_MONTHS = 25,
  MARITAL_STATUS = 26,
  STRATEGY = 27,
  UNKNOWN_28 = 28,
  EQUIPMENT = 29,
  STAMINA = 30,
  MONTHLY_INCREMENT = 31,
  GROWTH_BONUS = 32,
  SKILL_POS = 33,
  PREGNANCY_PROBABILITY = 34,
  ABROAD_PLACEMENT = 35,
  LIFE_EVENTS = 36,
  UNKNOWN_37 = 37,
  SIDE_DISHES = 38,
  MARRIED_TIME = 39,
  SCHOOL = 40,
  CLAN_RESPONSIBILITIES = 41,
  TRAVEL = 42,
}

/**
 * load/save LocalStorage
 * import/export JSON
 * undo/redo
 */
export type MemberRawRow = string[]

/**
 * APPEARANCE
 * "11|17|0|9"
 */
export interface MemberAppearance {
  backHair: number
  body: number
  face: number
  frontHair: number
}

/**
 * PERSON_DATA
 * "name|generation|talent|talentPos|gender|lifespan|skills|luck|?|hobby"
 */
export interface MemberPersonData {
  name: string
  generation: number
  talent: number
  talentPos: number
  gender: number
  lifespan: number
  skills: number
  luck: number
  unknown?: number
  hobby: number
}

/**
 * HOUSING
 * "1|LTB22656|null|5"
 */
export interface MemberHousing {
  isMainHouse: boolean
  buildingId: string | null
  unknown: string | null
  totalResidents: number
}

/**
 * OFFICIAL_TITLE
 * "5@5@1@-1@-1|162446"
 */
export interface MemberOfficialTitle {
  identity: number
  titleByIdentity: number
  prefectureId: number
  countyId: number
  politicalAchievement: number
}

/**
 * EQUIPMENT
 * "weapon|jewelry|talisman"
 */
export interface MemberEquipment {
  weaponId: number | null
  jewelryId: number | null
  talismanId: number | null
}

/**
 * MONTHLY_INCREMENT
 * "0|0|0|0.99|0.99|0.99|0.99"
 */
export interface MemberMonthlyIncrement {
  unknown1: number
  unknown2: number
  unknown3: number
  literary: number
  martial: number
  business: number
  art: number
}

/**
 * GROWTH_BONUS
 * "5|9|0|0|0|0"
 */
export interface MemberGrowthBonus {
  intelligence: number
  charisma: number
  strategy: number
  writing: number
  might: number
  business: number
}

/**
 * LIFE_EVENTS
 * "19@92@Place@null|20@89@Title@null"
 */
export interface MemberLifeEvent {
  age: number
  code: number
  description: string
  relatedPerson: string | null
}

/**
 * CLAN_RESPONSIBILITIES
 * "taskId|money|unknown"
 */
export interface MemberClanResponsibility {
  taskId: number
  money: number
  unknown: number
}

/**
 * Parsed View Model (UI)
 * - for display in the UI
 * - for editing in the UI
 * - for saving to LocalStorage
 */
export interface MemberParsed {
  /* =======================
   * 0
   * ======================= */
  id: string                                  // ID

  /* =======================
   * 1 → 4
   * ======================= */
  appearance: MemberAppearance                // 1
  childrenIds: string[]                       // 2
  housing: MemberHousing                      // 3
  person: MemberPersonData                   // 4

  /* =======================
   * 5 → 11
   * ======================= */
  character: number                           // 5
  age: number                                 // 6
  literary: number                            // 7
  martial: number                             // 8
  business: number                            // 9
  art: number                                 // 10
  mood: string                                // 11

  /* =======================
   * 12 → 18
   * ======================= */
  officialTitle: MemberOfficialTitle | null   // 12
  merits: number                              // 13
  titleFengdi: {
    level: number                             // 0–3
    prefectureId: number
  }                                           // 14
  status: number                              // 15
  reputation: number                          // 16
  statusDuration: number                      // 17
  availabilityDuration: number                // 18

  /* =======================
   * 19 → 24
   * ======================= */
  studyContent: {
    bookId: number
    progress: number
  } | null                                    // 19
  charm: number                               // 20
  health: number                              // 21
  isHeadOfFamily: boolean                     // 22
  specialTags: string[]                      // 23
  recentEvents: string | null                 // 24

  /* =======================
   * 25 → 28
   * ======================= */
  pregnancyMonths: number                     // 25
  maritalStatus: number                       // 26
  strategy: number                            // 27
  unknown28: string                           // 28

  /* =======================
   * 29 → 34
   * ======================= */
  equipment: MemberEquipment                  // 29
  stamina: number                             // 30
  monthlyIncrement: MemberMonthlyIncrement    // 31
  growthBonus: MemberGrowthBonus              // 32
  skillPos: number                            // 33
  pregnancyProbability: number                // 34

  /* =======================
   * 35 → 39
   * ======================= */
  abroadPlacement: string                     // 35
  lifeEvents: MemberLifeEvent[]               // 36
  unknown37: string                           // 37
  sideDishes: string                          // 38
  marriedTime: number                         // 39

  /* =======================
   * 40 → 42
   * ======================= */
  school: number                              // 40
  clanResponsibilities: {
    taskId: number
    money: number
    unknown: number
  } | null                                    // 41
  travel: string                              // 42
}

/**
 * Mapping table
 * for repository / serializer
 * Order MUST follow MemberColumn index
 */
export const MemberColumnMap = {
  /* =======================
   * 0
   * ======================= */
  id: MemberColumn.ID,

  /* =======================
   * 1 → 4
   * ======================= */
  appearance: MemberColumn.APPEARANCE,
  childrenIds: MemberColumn.CHILDREN,
  housing: MemberColumn.HOUSING,
  person: MemberColumn.PERSON_DATA,

  /* =======================
   * 5 → 11
   * ======================= */
  character: MemberColumn.CHARACTER,
  age: MemberColumn.AGE,
  literary: MemberColumn.LITERARY,
  martial: MemberColumn.MARTIAL,
  business: MemberColumn.BUSINESS,
  art: MemberColumn.ART,
  mood: MemberColumn.MOOD,

  /* =======================
   * 12 → 18
   * ======================= */
  officialTitle: MemberColumn.OFFICIAL_TITLE,
  merits: MemberColumn.MERITS,
  titleFengdi: MemberColumn.TITLE_FENGDI,
  status: MemberColumn.STATUS,
  reputation: MemberColumn.REPUTATION,
  statusDuration: MemberColumn.STATUS_DURATION,
  availabilityDuration: MemberColumn.AVAILABILITY_DURATION,

  /* =======================
   * 19 → 24
   * ======================= */
  studyContent: MemberColumn.STUDY_CONTENT,
  charm: MemberColumn.CHARM,
  health: MemberColumn.HEALTH,
  isHeadOfFamily: MemberColumn.HEAD_OF_FAMILY,
  specialTags: MemberColumn.SPECIAL_TAG,
  recentEvents: MemberColumn.RECENT_EVENTS,

  /* =======================
   * 25 → 28
   * ======================= */
  pregnancyMonths: MemberColumn.PREGNANCY_MONTHS,
  maritalStatus: MemberColumn.MARITAL_STATUS,
  strategy: MemberColumn.STRATEGY,
  unknown28: MemberColumn.UNKNOWN_28,

  /* =======================
   * 29 → 34
   * ======================= */
  equipment: MemberColumn.EQUIPMENT,
  stamina: MemberColumn.STAMINA,
  monthlyIncrement: MemberColumn.MONTHLY_INCREMENT,
  growthBonus: MemberColumn.GROWTH_BONUS,
  skillPos: MemberColumn.SKILL_POS,
  pregnancyProbability: MemberColumn.PREGNANCY_PROBABILITY,

  /* =======================
   * 35 → 39
   * ======================= */
  abroadPlacement: MemberColumn.ABROAD_PLACEMENT,
  lifeEvents: MemberColumn.LIFE_EVENTS,
  unknown37: MemberColumn.UNKNOWN_37,
  sideDishes: MemberColumn.SIDE_DISHES,
  marriedTime: MemberColumn.MARRIED_TIME,

  /* =======================
   * 40 → 42
   * ======================= */
  school: MemberColumn.SCHOOL,
  clanResponsibilities: MemberColumn.CLAN_RESPONSIBILITIES,
  travel: MemberColumn.TRAVEL,
} as const


/**
 * HELPER
 */
const toInt = (v: string | null, d = 0) =>
  v === null || v === 'null' ? d : Number(v)

const toFloat = (v: string | null, d = 0) =>
  v === null || v === 'null' ? d : Number(v)

const toNull = (v: string) => (v === 'null' ? null : v)

/**
 * APPEARANCE
 */

export function parseAppearance(raw: string): MemberAppearance {
  const [backHair, body, face, frontHair] = raw.split('|').map(Number)

  return { backHair, body, face, frontHair }
}

export function serializeAppearance(a: MemberAppearance): string {
  return [
    a.backHair,
    a.body,
    a.face,
    a.frontHair,
  ].join('|')
}

/**
 * PERSON_DATA
 */
export function parsePersonData(raw: string): MemberPersonData {
  const [
    name,
    generation,
    talent,
    talentPos,
    gender,
    lifespan,
    skills,
    luck,
    unknown,
    hobby,
  ] = raw.split('|')

  return {
    name,
    generation: toInt(generation),
    talent: toInt(talent),
    talentPos: toInt(talentPos),
    gender: toInt(gender),
    lifespan: toInt(lifespan),
    skills: toInt(skills),
    luck: toInt(luck),
    unknown: toInt(unknown),
    hobby: toInt(hobby),
  }
}

export function serializePersonData(p: MemberPersonData): string {
  return [
    p.name,
    p.generation,
    p.talent,
    p.talentPos,
    p.gender,
    p.lifespan,
    p.skills,
    p.luck,
    p.unknown ?? 0,
    p.hobby,
  ].join('|')
}

/**
 * HOUSING
 */
export function parseHousing(raw: string): MemberHousing {
  const [main, buildingId, unknown, residents] = raw.split('|')

  return {
    isMainHouse: main === '1',
    buildingId: toNull(buildingId),
    unknown: toNull(unknown),
    totalResidents: toInt(residents),
  }
}

export function serializeHousing(h: MemberHousing): string {
  return [
    h.isMainHouse ? 1 : 0,
    h.buildingId ?? 'null',
    h.unknown ?? 'null',
    h.totalResidents,
  ].join('|')
}

/**
 * OFFICIAL_TITLE
 */
export function parseOfficialTitle(raw: string): MemberOfficialTitle | null {
  if (raw === '0' || raw === 'null') return null

  const [info, merit] = raw.split('|')
  const [identity, titleByIdentity, prefectureId, countyId] =
    info.split('@').map(Number)

  return {
    identity,
    titleByIdentity,
    prefectureId,
    countyId,
    politicalAchievement: Number(merit),
  }
}

export function serializeOfficialTitle(t: MemberOfficialTitle | null): string {
  if (!t) return '0'

  return (
    [
      t.identity,
      t.titleByIdentity,
      t.prefectureId,
      t.countyId,
    ].join('@') +
    '|' +
    t.politicalAchievement
  )
}

/**
 * EQUIPMENT
 */
export function parseEquipment(raw: string): MemberEquipment {
  const [weapon, jewelry, talisman] = raw.split('|')

  return {
    weaponId: toNull(weapon) ? Number(weapon) : null,
    jewelryId: toNull(jewelry) ? Number(jewelry) : null,
    talismanId: toNull(talisman) ? Number(talisman) : null,
  }
}

export function serializeEquipment(e: MemberEquipment): string {
  return [
    e.weaponId ?? 'null',
    e.jewelryId ?? 'null',
    e.talismanId ?? 'null',
  ].join('|')
}

/**
 * LIFE_EVENTS
 */
export function parseLifeEvents(raw: string): MemberLifeEvent[] {
  if (!raw || raw === 'null') return []

  return raw.split('|').map(e => {
    const [age, code, desc, related] = e.split('@')

    return {
      age: Number(age),
      code: Number(code),
      description: desc,
      relatedPerson: toNull(related),
    }
  })
}

export function serializeLifeEvents(events: MemberLifeEvent[]): string {
  if (!events.length) return 'null'

  return events
    .map(e =>
      [
        e.age,
        e.code,
        e.description,
        e.relatedPerson ?? 'null',
      ].join('@'),
    )
    .join('|')
}

/**
 * MONTHLY_INCREMENT
 * PARSE
 */
export function parseMonthlyIncrement(
  raw: string,
): MemberMonthlyIncrement {
  const [
    u1,
    u2,
    u3,
    literary,
    martial,
    business,
    art,
  ] = raw.split('|')

  return {
    unknown1: Number(u1),
    unknown2: Number(u2),
    unknown3: Number(u3),
    literary: Number(literary),
    martial: Number(martial),
    business: Number(business),
    art: Number(art),
  }
}

/**
 * MONTHLY_INCREMENT
 * Serializer
 */
export function serializeMonthlyIncrement(
  m: MemberMonthlyIncrement,
): string {
  return [
    m.unknown1,
    m.unknown2,
    m.unknown3,
    m.literary,
    m.martial,
    m.business,
    m.art,
  ].join('|')
}

/**
 * GROWTH_BONUS
 * Parser
 */
export function parseGrowthBonus(
  raw: string,
): MemberGrowthBonus {
  const [
    intelligence,
    charisma,
    strategy,
    writing,
    might,
    business,
  ] = raw.split('|')

  return {
    intelligence: Number(intelligence),
    charisma: Number(charisma),
    strategy: Number(strategy),
    writing: Number(writing),
    might: Number(might),
    business: Number(business),
  }
}

/**
 * GROWTH_BONUS
 * Serializer
 */
export function serializeGrowthBonus(
  g: MemberGrowthBonus,
): string {
  return [
    g.intelligence,
    g.charisma,
    g.strategy,
    g.writing,
    g.might,
    g.business,
  ].join('|')
}

/**
 * deserializeAll(row) → MemberParsed
 */
export function deserializeAll(row: MemberRawRow): MemberParsed {
  return {
    /* 0 */
    id: row[MemberColumnMap.id],

    /* 1 → 4 */
    appearance: parseAppearance(row[MemberColumnMap.appearance]),
    childrenIds: row[MemberColumnMap.childrenIds].split('|'),
    housing: parseHousing(row[MemberColumnMap.housing]),
    person: parsePersonData(row[MemberColumnMap.person]),

    /* 5 → 11 */
    character: Number(row[MemberColumnMap.character]),
    age: Number(row[MemberColumnMap.age]),
    literary: Number(row[MemberColumnMap.literary]),
    martial: Number(row[MemberColumnMap.martial]),
    business: Number(row[MemberColumnMap.business]),
    art: Number(row[MemberColumnMap.art]),
    mood: row[MemberColumnMap.mood],

    /* 12 → 18 */
    officialTitle: parseOfficialTitle(
      row[MemberColumnMap.officialTitle],
    ),
    merits: Number(row[MemberColumnMap.merits]),
    titleFengdi: (() => {
      const [level, prefectureId] =
        row[MemberColumnMap.titleFengdi].split('|')
      return {
        level: Number(level),
        prefectureId: Number(prefectureId),
      }
    })(),
    status: Number(row[MemberColumnMap.status]),
    reputation: Number(row[MemberColumnMap.reputation]),
    statusDuration: Number(row[MemberColumnMap.statusDuration]),
    availabilityDuration: Number(
      row[MemberColumnMap.availabilityDuration],
    ),

    /* 19 → 24 */
    studyContent:
      row[MemberColumnMap.studyContent] === 'null'
        ? null
        : (() => {
          const [bookId, progress] =
            row[MemberColumnMap.studyContent].split('@')
          return {
            bookId: Number(bookId),
            progress: Number(progress),
          }
        })(),
    charm: Number(row[MemberColumnMap.charm]),
    health: Number(row[MemberColumnMap.health]),
    isHeadOfFamily: row[MemberColumnMap.isHeadOfFamily] === '1',
    specialTags:
      row[MemberColumnMap.specialTags] === 'null'
        ? []
        : row[MemberColumnMap.specialTags].split('|'),
    recentEvents:
      row[MemberColumnMap.recentEvents] === 'null'
        ? null
        : row[MemberColumnMap.recentEvents],

    /* 25 → 28 */
    pregnancyMonths: Number(
      row[MemberColumnMap.pregnancyMonths],
    ),
    maritalStatus: Number(row[MemberColumnMap.maritalStatus]),
    strategy: Number(row[MemberColumnMap.strategy]),
    unknown28: row[MemberColumnMap.unknown28],

    /* 29 → 34 */
    equipment: parseEquipment(
      row[MemberColumnMap.equipment],
    ),
    stamina: Number(row[MemberColumnMap.stamina]),
    monthlyIncrement: parseMonthlyIncrement(
      row[MemberColumnMap.monthlyIncrement],
    ),
    growthBonus: parseGrowthBonus(
      row[MemberColumnMap.growthBonus],
    ),
    skillPos: Number(row[MemberColumnMap.skillPos]),
    pregnancyProbability: Number(
      row[MemberColumnMap.pregnancyProbability],
    ),

    /* 35 → 39 */
    abroadPlacement: row[MemberColumnMap.abroadPlacement],
    lifeEvents: parseLifeEvents(
      row[MemberColumnMap.lifeEvents],
    ),
    unknown37: row[MemberColumnMap.unknown37],
    sideDishes: row[MemberColumnMap.sideDishes],
    marriedTime: Number(row[MemberColumnMap.marriedTime]),

    /* 40 → 42 */
    school: Number(row[MemberColumnMap.school]),
    clanResponsibilities:
      row[MemberColumnMap.clanResponsibilities] === 'null'
        ? null
        : (() => {
          const [taskId, money, unknown] =
            row[MemberColumnMap.clanResponsibilities].split('|')
          return {
            taskId: Number(taskId),
            money: Number(money),
            unknown: Number(unknown),
          }
        })(),
    travel: row[MemberColumnMap.travel],
  }
}

/**
 * serializeAll(parsed) → MemberRawRow
 */
export function serializeAll(
  parsed: MemberParsed,
  baseRow?: MemberRawRow,
): MemberRawRow {
  // clone để giữ unknown field nếu có
  const row: MemberRawRow = baseRow
    ? [...baseRow]
    : Array(43).fill('0')

  /* 0 */
  row[MemberColumnMap.id] = parsed.id

  /* 1 → 4 */
  row[MemberColumnMap.appearance] =
    serializeAppearance(parsed.appearance)

  row[MemberColumnMap.childrenIds] =
    parsed.childrenIds.join('|')

  row[MemberColumnMap.housing] =
    serializeHousing(parsed.housing)

  row[MemberColumnMap.person] =
    serializePersonData(parsed.person)

  /* 5 → 11 */
  row[MemberColumnMap.character] = String(parsed.character)
  row[MemberColumnMap.age] = String(parsed.age)
  row[MemberColumnMap.literary] = String(parsed.literary)
  row[MemberColumnMap.martial] = String(parsed.martial)
  row[MemberColumnMap.business] = String(parsed.business)
  row[MemberColumnMap.art] = String(parsed.art)
  row[MemberColumnMap.mood] = String(parsed.mood)

  /* 12 → 18 */
  row[MemberColumnMap.officialTitle] =
    serializeOfficialTitle(parsed.officialTitle)

  row[MemberColumnMap.merits] = String(parsed.merits)

  row[MemberColumnMap.titleFengdi] =
    `${parsed.titleFengdi.level}|${parsed.titleFengdi.prefectureId}`

  row[MemberColumnMap.status] = String(parsed.status)
  row[MemberColumnMap.reputation] = String(parsed.reputation)
  row[MemberColumnMap.statusDuration] =
    String(parsed.statusDuration)
  row[MemberColumnMap.availabilityDuration] =
    String(parsed.availabilityDuration)

  /* 19 → 24 */
  row[MemberColumnMap.studyContent] =
    parsed.studyContent
      ? `${parsed.studyContent.bookId}@${parsed.studyContent.progress}`
      : 'null'

  row[MemberColumnMap.charm] = String(parsed.charm)
  row[MemberColumnMap.health] = String(parsed.health)
  row[MemberColumnMap.isHeadOfFamily] =
    parsed.isHeadOfFamily ? '1' : '0'

  row[MemberColumnMap.specialTags] =
    parsed.specialTags.length
      ? parsed.specialTags.join('|')
      : 'null'

  row[MemberColumnMap.recentEvents] =
    parsed.recentEvents ?? 'null'

  /* 25 → 28 */
  row[MemberColumnMap.pregnancyMonths] =
    String(parsed.pregnancyMonths)
  row[MemberColumnMap.maritalStatus] =
    String(parsed.maritalStatus)
  row[MemberColumnMap.strategy] =
    String(parsed.strategy)
  row[MemberColumnMap.unknown28] =
    parsed.unknown28

  /* 29 → 34 */
  row[MemberColumnMap.equipment] =
    serializeEquipment(parsed.equipment)

  row[MemberColumnMap.stamina] =
    String(parsed.stamina)

  row[MemberColumnMap.monthlyIncrement] =
    serializeMonthlyIncrement(parsed.monthlyIncrement)

  row[MemberColumnMap.growthBonus] =
    serializeGrowthBonus(parsed.growthBonus)

  row[MemberColumnMap.skillPos] =
    String(parsed.skillPos)

  row[MemberColumnMap.pregnancyProbability] =
    String(parsed.pregnancyProbability)

  /* 35 → 39 */
  row[MemberColumnMap.abroadPlacement] =
    parsed.abroadPlacement

  row[MemberColumnMap.lifeEvents] =
    serializeLifeEvents(parsed.lifeEvents)

  row[MemberColumnMap.unknown37] =
    parsed.unknown37

  row[MemberColumnMap.sideDishes] =
    parsed.sideDishes

  row[MemberColumnMap.marriedTime] =
    String(parsed.marriedTime)

  /* 40 → 42 */
  row[MemberColumnMap.school] =
    String(parsed.school)

  row[MemberColumnMap.clanResponsibilities] =
    parsed.clanResponsibilities
      ? `${parsed.clanResponsibilities.taskId}|${parsed.clanResponsibilities.money}|${parsed.clanResponsibilities.unknown}`
      : 'null'

  row[MemberColumnMap.travel] =
    parsed.travel

  return row
}
