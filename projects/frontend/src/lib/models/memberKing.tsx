/**
 * MemberKing chỉ khác MemberNow ở:
 * - sectionKey
 * - column layout (nếu có khác)
 *
 * Domain model dùng CHUNG MemberParsed
 */

export const enum MemberKingColumn {
  ID = 0,
  APPEARANCE = 1,
  PERSON_DATA = 2,
  AGE = 3,
  LITERARY = 4,
  MARTIAL = 5,
  BUSINESS = 6,
  ART = 7,
  MOOD = 8,
  OFFICIAL_TITLE = 9,
  TITLE_FENGDI = 10,
  UNKNOWN_11 = 11,
  UNKNOWN_12 = 12,
  CHILDREN_IDS = 13,
  FAVOR = 14,
  UNKNOWN_15 = 15,
  REPUTATION = 16,
  UNKNOWN_17 = 17,
  HEALTH = 18,
  UNKNOWN_19 = 19,
  STRATEGY = 20,
  MONTHLY_INCREMENT = 21,
  SPECIAL_TAG = 22,
}
