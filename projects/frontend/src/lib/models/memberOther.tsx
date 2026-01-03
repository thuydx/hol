
/**
 * Member_other: Các nhân vật thuộc gia tộc khác:
 * 1: Chân dung: Tóc sau | Thân | Mặt | Tóc trước (So sánh với thiết lập khuôn mặt ban đầu)
 * 2: Tên | ? | 1 | Loại Tài năng | Điểm Tài năng | Giới tính (0 Nữ, 1 Nam) | Tuổi thọ | Loại Kỹ năng | May mắn | Tính cách: 1. Kiêu hãnh 2. Chính trực 3. Sôi nổi 4. Tốt bụng 5. Chân thành 6. Dễ tính 7. Xa cách 8. Tự ti 9. Hèn nhát 10. Nhút nhát 11. Dữ dội 12. Tài giỏi 13. U sầu 14. Đa nghi | ?
 * 3: Độ tuổi
 * 4: Văn
 * 5: Võ
 * 6: Thương
 * 7: Nghệ
 * 8: Tâm trạng
 * 9:  Địa vị (xem bảng tương ứng để biết chi tiết)
 * 10:
 * 11:
 * 12:
 * 13:
 * 14:
 * 15: Được yêu thích (Mức độ thiện cảm)
 * 16:
 * 17: Danh tiếng
 * 18:
 * 19: Sức hút
 * 20: Sức khỏe
 * 21:
 * 22: Mưu
 * 24: Tăng thuộc tính hàng tháng
 * 25: Giá trị kỹ năng
 * 29: Thẻ đặc biệt
 */
/**
 * Data example
 * "value": [
 *             [   // group by family
 *                 [   // memberOther detail
 *                     "M1",
 *                     "16|28|2|15",
 *                     "Tô Hiền Thiện|2|3|17|1|79|0|6|1|null",
 *                     "73",
 *                     "28.46975",
 *                     "27.77662",
 *                     "68.9928",
 *                     "30.07368",
 *                     "-100",
 *                     "0@0@0@-1@-1|0",
 *                     "1",
 *                     "0|0",
 *                     "-1",
 *                     "33@0@null@0@1",
 *                     "M3|M15|M23|M24",
 *                     "0",
 *                     "0",
 *                     "41.70321",
 *                     "0",
 *                     "0",
 *                     "81",
 *                     "2",
 *                     "72",
 *                     "1",
 *                     "-5|0|-3|0.06|0.06|0.06|0.06",
 *                     "0",
 *                     "null",
 *                     "69@-1@null@null",
 *                     "0",
 *                     "null",
 *                     "0",
 *                     "78"
 *                 ],
 *             ],
 *         ],
 */
export const enum MemberOtherColumn {
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
export type MemberOtherRawRow = string[]

/**
 * APPEARANCE
 * "11|17|0|9"
 */
export interface MemberOtherAppearance {
  backHair: number
  body: number
  face: number
  frontHair: number
}

/**
 * PERSON_DATA
 * "name|generation|talent|talentPos|gender|lifespan|skills|luck|?|hobby"
 */
export interface MemberOtherPersonData {
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
export interface MemberOtherHousing {
  isMainHouse: boolean
  buildingId: string | null
  unknown: string | null
  totalResidents: number
}

/**
 * OFFICIAL_TITLE
 * "5@5@1@-1@-1|162446"
 */
export interface MemberOtherOfficialTitle {
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
export interface MemberOtherEquipment {
  weaponId: number | null
  jewelryId: number | null
  talismanId: number | null
}

/**
 * MONTHLY_INCREMENT
 * "0|0|0|0.99|0.99|0.99|0.99"
 */
export interface MemberOtherMonthlyIncrement {
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
export interface MemberOtherGrowthBonus {
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
export interface MemberOtherLifeEvent {
  age: number
  code: number
  description: string
  relatedPerson: string | null
}

/**
 * CLAN_RESPONSIBILITIES
 * "taskId|money|unknown"
 */
export interface MemberOtherClanResponsibility {
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
export interface MemberOtherParsed {
  /* =======================
   * 0
   * ======================= */
  id: string                                  // ID

  /* =======================
   * 1 → 4
   * ======================= */
  appearance: MemberOtherAppearance                // 1
  childrenIds: string[]                       // 2
  housing: MemberOtherHousing                      // 3
  person: MemberOtherPersonData                   // 4

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
  officialTitle: MemberOtherOfficialTitle | null   // 12
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
  equipment: MemberOtherEquipment                  // 29
  stamina: number                             // 30
  monthlyIncrement: MemberOtherMonthlyIncrement    // 31
  growthBonus: MemberOtherGrowthBonus              // 32
  skillPos: number                            // 33
  pregnancyProbability: number                // 34

  /* =======================
   * 35 → 39
   * ======================= */
  abroadPlacement: string                     // 35
  lifeEvents: MemberOtherLifeEvent[]               // 36
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
 * Order MUST follow MemberOtherColumn index
 */
export const MemberOtherColumnMap = {
  /* =======================
   * 0
   * ======================= */
  id: MemberOtherColumn.ID,

  /* =======================
   * 1 → 4
   * ======================= */
  appearance: MemberOtherColumn.APPEARANCE,
  childrenIds: MemberOtherColumn.CHILDREN,
  housing: MemberOtherColumn.HOUSING,
  person: MemberOtherColumn.PERSON_DATA,

  /* =======================
   * 5 → 11
   * ======================= */
  character: MemberOtherColumn.CHARACTER,
  age: MemberOtherColumn.AGE,
  literary: MemberOtherColumn.LITERARY,
  martial: MemberOtherColumn.MARTIAL,
  business: MemberOtherColumn.BUSINESS,
  art: MemberOtherColumn.ART,
  mood: MemberOtherColumn.MOOD,

  /* =======================
   * 12 → 18
   * ======================= */
  officialTitle: MemberOtherColumn.OFFICIAL_TITLE,
  merits: MemberOtherColumn.MERITS,
  titleFengdi: MemberOtherColumn.TITLE_FENGDI,
  status: MemberOtherColumn.STATUS,
  reputation: MemberOtherColumn.REPUTATION,
  statusDuration: MemberOtherColumn.STATUS_DURATION,
  availabilityDuration: MemberOtherColumn.AVAILABILITY_DURATION,

  /* =======================
   * 19 → 24
   * ======================= */
  studyContent: MemberOtherColumn.STUDY_CONTENT,
  charm: MemberOtherColumn.CHARM,
  health: MemberOtherColumn.HEALTH,
  isHeadOfFamily: MemberOtherColumn.HEAD_OF_FAMILY,
  specialTags: MemberOtherColumn.SPECIAL_TAG,
  recentEvents: MemberOtherColumn.RECENT_EVENTS,

  /* =======================
   * 25 → 28
   * ======================= */
  pregnancyMonths: MemberOtherColumn.PREGNANCY_MONTHS,
  maritalStatus: MemberOtherColumn.MARITAL_STATUS,
  strategy: MemberOtherColumn.STRATEGY,
  unknown28: MemberOtherColumn.UNKNOWN_28,

  /* =======================
   * 29 → 34
   * ======================= */
  equipment: MemberOtherColumn.EQUIPMENT,
  stamina: MemberOtherColumn.STAMINA,
  monthlyIncrement: MemberOtherColumn.MONTHLY_INCREMENT,
  growthBonus: MemberOtherColumn.GROWTH_BONUS,
  skillPos: MemberOtherColumn.SKILL_POS,
  pregnancyProbability: MemberOtherColumn.PREGNANCY_PROBABILITY,

  /* =======================
   * 35 → 39
   * ======================= */
  abroadPlacement: MemberOtherColumn.ABROAD_PLACEMENT,
  lifeEvents: MemberOtherColumn.LIFE_EVENTS,
  unknown37: MemberOtherColumn.UNKNOWN_37,
  sideDishes: MemberOtherColumn.SIDE_DISHES,
  marriedTime: MemberOtherColumn.MARRIED_TIME,

  /* =======================
   * 40 → 42
   * ======================= */
  school: MemberOtherColumn.SCHOOL,
  clanResponsibilities: MemberOtherColumn.CLAN_RESPONSIBILITIES,
  travel: MemberOtherColumn.TRAVEL,
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

export function parseAppearance(raw: string): MemberOtherAppearance {
  const [backHair, body, face, frontHair] = raw.split('|').map(Number)

  return { backHair, body, face, frontHair }
}

export function serializeAppearance(a: MemberOtherAppearance): string {
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
export function parsePersonData(raw: string): MemberOtherPersonData {
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

export function serializePersonData(p: MemberOtherPersonData): string {
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
export function parseHousing(raw: string): MemberOtherHousing {
  const [main, buildingId, unknown, residents] = raw.split('|')

  return {
    isMainHouse: main === '1',
    buildingId: toNull(buildingId),
    unknown: toNull(unknown),
    totalResidents: toInt(residents),
  }
}

export function serializeHousing(h: MemberOtherHousing): string {
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
export function parseOfficialTitle(raw: string): MemberOtherOfficialTitle | null {
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

export function serializeOfficialTitle(t: MemberOtherOfficialTitle | null): string {
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
export function parseEquipment(raw: string): MemberOtherEquipment {
  const [weapon, jewelry, talisman] = raw.split('|')

  return {
    weaponId: toNull(weapon) ? Number(weapon) : null,
    jewelryId: toNull(jewelry) ? Number(jewelry) : null,
    talismanId: toNull(talisman) ? Number(talisman) : null,
  }
}

export function serializeEquipment(e: MemberOtherEquipment): string {
  return [
    e.weaponId ?? 'null',
    e.jewelryId ?? 'null',
    e.talismanId ?? 'null',
  ].join('|')
}

/**
 * LIFE_EVENTS
 */
export function parseLifeEvents(raw: string): MemberOtherLifeEvent[] {
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

export function serializeLifeEvents(events: MemberOtherLifeEvent[]): string {
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
): MemberOtherMonthlyIncrement {
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
  m: MemberOtherMonthlyIncrement,
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
): MemberOtherGrowthBonus {
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
  g: MemberOtherGrowthBonus,
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
 * deserializeAll(row) → MemberOtherParsed
 */
export function deserializeAll(row: MemberOtherRawRow): MemberOtherParsed {
  return {
    /* 0 */
    id: row[MemberOtherColumnMap.id],

    /* 1 → 4 */
    appearance: parseAppearance(row[MemberOtherColumnMap.appearance]),
    childrenIds: row[MemberOtherColumnMap.childrenIds].split('|'),
    housing: parseHousing(row[MemberOtherColumnMap.housing]),
    person: parsePersonData(row[MemberOtherColumnMap.person]),

    /* 5 → 11 */
    character: Number(row[MemberOtherColumnMap.character]),
    age: Number(row[MemberOtherColumnMap.age]),
    literary: Number(row[MemberOtherColumnMap.literary]),
    martial: Number(row[MemberOtherColumnMap.martial]),
    business: Number(row[MemberOtherColumnMap.business]),
    art: Number(row[MemberOtherColumnMap.art]),
    mood: row[MemberOtherColumnMap.mood],

    /* 12 → 18 */
    officialTitle: parseOfficialTitle(
      row[MemberOtherColumnMap.officialTitle],
    ),
    merits: Number(row[MemberOtherColumnMap.merits]),
    titleFengdi: (() => {
      const [level, prefectureId] =
        row[MemberOtherColumnMap.titleFengdi].split('|')
      return {
        level: Number(level),
        prefectureId: Number(prefectureId),
      }
    })(),
    status: Number(row[MemberOtherColumnMap.status]),
    reputation: Number(row[MemberOtherColumnMap.reputation]),
    statusDuration: Number(row[MemberOtherColumnMap.statusDuration]),
    availabilityDuration: Number(
      row[MemberOtherColumnMap.availabilityDuration],
    ),

    /* 19 → 24 */
    studyContent:
      row[MemberOtherColumnMap.studyContent] === 'null'
        ? null
        : (() => {
          const [bookId, progress] =
            row[MemberOtherColumnMap.studyContent].split('@')
          return {
            bookId: Number(bookId),
            progress: Number(progress),
          }
        })(),
    charm: Number(row[MemberOtherColumnMap.charm]),
    health: Number(row[MemberOtherColumnMap.health]),
    isHeadOfFamily: row[MemberOtherColumnMap.isHeadOfFamily] === '1',
    specialTags:
      row[MemberOtherColumnMap.specialTags] === 'null'
        ? []
        : row[MemberOtherColumnMap.specialTags].split('|'),
    recentEvents:
      row[MemberOtherColumnMap.recentEvents] === 'null'
        ? null
        : row[MemberOtherColumnMap.recentEvents],

    /* 25 → 28 */
    pregnancyMonths: Number(
      row[MemberOtherColumnMap.pregnancyMonths],
    ),
    maritalStatus: Number(row[MemberOtherColumnMap.maritalStatus]),
    strategy: Number(row[MemberOtherColumnMap.strategy]),
    unknown28: row[MemberOtherColumnMap.unknown28],

    /* 29 → 34 */
    equipment: parseEquipment(
      row[MemberOtherColumnMap.equipment],
    ),
    stamina: Number(row[MemberOtherColumnMap.stamina]),
    monthlyIncrement: parseMonthlyIncrement(
      row[MemberOtherColumnMap.monthlyIncrement],
    ),
    growthBonus: parseGrowthBonus(
      row[MemberOtherColumnMap.growthBonus],
    ),
    skillPos: Number(row[MemberOtherColumnMap.skillPos]),
    pregnancyProbability: Number(
      row[MemberOtherColumnMap.pregnancyProbability],
    ),

    /* 35 → 39 */
    abroadPlacement: row[MemberOtherColumnMap.abroadPlacement],
    lifeEvents: parseLifeEvents(
      row[MemberOtherColumnMap.lifeEvents],
    ),
    unknown37: row[MemberOtherColumnMap.unknown37],
    sideDishes: row[MemberOtherColumnMap.sideDishes],
    marriedTime: Number(row[MemberOtherColumnMap.marriedTime]),

    /* 40 → 42 */
    school: Number(row[MemberOtherColumnMap.school]),
    clanResponsibilities:
      row[MemberOtherColumnMap.clanResponsibilities] === 'null'
        ? null
        : (() => {
          const [taskId, money, unknown] =
            row[MemberOtherColumnMap.clanResponsibilities].split('|')
          return {
            taskId: Number(taskId),
            money: Number(money),
            unknown: Number(unknown),
          }
        })(),
    travel: row[MemberOtherColumnMap.travel],
  }
}

/**
 * serializeAll(parsed) → MemberOtherRawRow
 */
export function serializeAll(
  parsed: MemberOtherParsed,
  baseRow?: MemberOtherRawRow,
): MemberOtherRawRow {
  // clone để giữ unknown field nếu có
  const row: MemberOtherRawRow = baseRow
    ? [...baseRow]
    : new Array(43).fill('0')

  /* 0 */
  row[MemberOtherColumnMap.id] = parsed.id

  /* 1 → 4 */
  row[MemberOtherColumnMap.appearance] =
    serializeAppearance(parsed.appearance)

  row[MemberOtherColumnMap.childrenIds] =
    parsed.childrenIds.join('|')

  row[MemberOtherColumnMap.housing] =
    serializeHousing(parsed.housing)

  row[MemberOtherColumnMap.person] =
    serializePersonData(parsed.person)

  /* 5 → 11 */
  row[MemberOtherColumnMap.character] = String(parsed.character)
  row[MemberOtherColumnMap.age] = String(parsed.age)
  row[MemberOtherColumnMap.literary] = String(parsed.literary)
  row[MemberOtherColumnMap.martial] = String(parsed.martial)
  row[MemberOtherColumnMap.business] = String(parsed.business)
  row[MemberOtherColumnMap.art] = String(parsed.art)
  row[MemberOtherColumnMap.mood] = String(parsed.mood)

  /* 12 → 18 */
  row[MemberOtherColumnMap.officialTitle] =
    serializeOfficialTitle(parsed.officialTitle)

  row[MemberOtherColumnMap.merits] = String(parsed.merits)

  row[MemberOtherColumnMap.titleFengdi] =
    `${parsed.titleFengdi.level}|${parsed.titleFengdi.prefectureId}`

  row[MemberOtherColumnMap.status] = String(parsed.status)
  row[MemberOtherColumnMap.reputation] = String(parsed.reputation)
  row[MemberOtherColumnMap.statusDuration] =
    String(parsed.statusDuration)
  row[MemberOtherColumnMap.availabilityDuration] =
    String(parsed.availabilityDuration)

  /* 19 → 24 */
  row[MemberOtherColumnMap.studyContent] =
    parsed.studyContent
      ? `${parsed.studyContent.bookId}@${parsed.studyContent.progress}`
      : 'null'

  row[MemberOtherColumnMap.charm] = String(parsed.charm)
  row[MemberOtherColumnMap.health] = String(parsed.health)
  row[MemberOtherColumnMap.isHeadOfFamily] =
    parsed.isHeadOfFamily ? '1' : '0'

  row[MemberOtherColumnMap.specialTags] =
    parsed.specialTags.length
      ? parsed.specialTags.join('|')
      : 'null'

  row[MemberOtherColumnMap.recentEvents] =
    parsed.recentEvents ?? 'null'

  /* 25 → 28 */
  row[MemberOtherColumnMap.pregnancyMonths] =
    String(parsed.pregnancyMonths)
  row[MemberOtherColumnMap.maritalStatus] =
    String(parsed.maritalStatus)
  row[MemberOtherColumnMap.strategy] =
    String(parsed.strategy)
  row[MemberOtherColumnMap.unknown28] =
    parsed.unknown28

  /* 29 → 34 */
  row[MemberOtherColumnMap.equipment] =
    serializeEquipment(parsed.equipment)

  row[MemberOtherColumnMap.stamina] =
    String(parsed.stamina)

  row[MemberOtherColumnMap.monthlyIncrement] =
    serializeMonthlyIncrement(parsed.monthlyIncrement)

  row[MemberOtherColumnMap.growthBonus] =
    serializeGrowthBonus(parsed.growthBonus)

  row[MemberOtherColumnMap.skillPos] =
    String(parsed.skillPos)

  row[MemberOtherColumnMap.pregnancyProbability] =
    String(parsed.pregnancyProbability)

  /* 35 → 39 */
  row[MemberOtherColumnMap.abroadPlacement] =
    parsed.abroadPlacement

  row[MemberOtherColumnMap.lifeEvents] =
    serializeLifeEvents(parsed.lifeEvents)

  row[MemberOtherColumnMap.unknown37] =
    parsed.unknown37

  row[MemberOtherColumnMap.sideDishes] =
    parsed.sideDishes

  row[MemberOtherColumnMap.marriedTime] =
    String(parsed.marriedTime)

  /* 40 → 42 */
  row[MemberOtherColumnMap.school] =
    String(parsed.school)

  row[MemberOtherColumnMap.clanResponsibilities] =
    parsed.clanResponsibilities
      ? `${parsed.clanResponsibilities.taskId}|${parsed.clanResponsibilities.money}|${parsed.clanResponsibilities.unknown}`
      : 'null'

  row[MemberOtherColumnMap.travel] =
    parsed.travel

  return row
}
