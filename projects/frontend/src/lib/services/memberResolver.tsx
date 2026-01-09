import {MemberNowRepository} from '@/repositories/MemberNow'
import {MemberOtherRepository} from '@/repositories/MemberOther'
import {MemberKingRepository} from '@/repositories/MemberKing'

export type ResolvedMemberFengdi = {
  name: string
  fengdi: string
  fengdiTitle: string
}

function buildResult(member: any, t: any) {
  const name = member.personalData?.[0] ?? ''
  console.log(member)
  const titleFengdi = member.titleFengdi
  if (!titleFengdi) {
    return {name, fengdi: '', fengdiTitle: ''}
  }

  const [levelRaw, prefectureRaw] = titleFengdi.split('|')
  const level = Number(levelRaw)
  const prefectureId = Number(prefectureRaw)

  const fengdi = t.fief_name?.[prefectureId] ?? ''
  const levelName = t.fief_level?.[level] ?? ''

  return {
    name,
    fengdi,
    fengdiTitle: `${fengdi} ${levelName}`.trim(),
  }
}

export async function resolveMemberByRef(
  memberId: string,
  t: any,
): Promise<ResolvedMemberFengdi | null> {
  if (!memberId) return null

  // 1️⃣ Member Now
  const memberNowRepo = new MemberNowRepository()
  const memberNow = await memberNowRepo.findMemberById(memberId)
  if (memberNow) {
    return buildResult(memberNow, t)
  }

  // 2️⃣ Member Other
  const memberOtherRepo = new MemberOtherRepository()
  const memberOther = await memberOtherRepo.findMemberById(memberId)
  if (memberOther) {
    return buildResult(memberOther, t)
  }

  // 3️⃣ Member King
  const memberKingRepo = new MemberKingRepository()
  const memberKing = await memberKingRepo.findMemberById(memberId)
  if (memberKing) {
    return buildResult(memberKing, t)
  }

  return null
}
