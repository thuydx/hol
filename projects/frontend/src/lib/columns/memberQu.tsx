import {ColumnDef} from "@/types/table";
import {MemberQuParsed} from "@/models/memberQu";
import {buildBaseColumns, ColumnSchema} from "@/columns/buildBaseColumns";
import {DropdownCell} from "@/components/table/DropdownCell";
import {HOBBY_OPTIONS, SKILL_OPTIONS, TALENT_OPTIONS} from "@/constants/options";

export function buildMemberQuColumns(t: any): ColumnSchema<MemberQuParsed> {
  return buildBaseColumns<MemberQuParsed>([
    {
      key: 'name',
      labelKey: 'name',
      input: 'text',
      get: m => m.personData.name,
      set: (m, v) => ({
        ...m,
        personData: {...m.personData, name: v},
      }),
    },
    {
      key: 'age',
      labelKey: 'age',
      width: 50,
      input: 'text',
      get: m => m.age,
      set: (m, v) => ({...m, age: Number(v)})
    },
    {
      key: 'literary',
      labelKey: 'literary',
      width: 60,
      input: 'text',
      get: m => m.literary,
      set: (m, v) => ({...m, literary: Number(v)}),
      maxValue: 100
    },
    {
      key: 'martial',
      labelKey: 'martial',
      width: 60,
      input: 'text',
      get: m => m.martial,
      set: (m, v) => ({...m, martial: Number(v)}),
      maxValue: 100
    },
    {
      key: 'business',
      labelKey: 'business',
      width: 60,
      input: 'text',
      get: m => m.business,
      set: (m, v) => ({...m, business: Number(v)}),
      maxValue: 100
    },
    {
      key: 'art',
      labelKey: 'art',
      width: 60,
      input: 'text',
      get: m => m.art,
      set: (m, v) => ({...m, art: Number(v)}),
      maxValue: 100
    },
    {
      key: 'luck',
      labelKey: 'luck',
      input: 'text',
      width: '50px',
      get: m => m.personData.luck,
      set: (m, v) => ({
        ...m,
        personData: {...m.personData, luck: Number(v)},
      }),
      maxValue: 100
    },
    /* ================= HOBBY ================= */
    {
      key: 'hobby',
      labelKey: 'hobby',
      width: '80px',
      get: m => m.personData.hobby,
      set: (m, v) => ({
        ...m,
        personData: {...m.personData, hobby: Number(v)},
      }),
      render: (member, update) => (
        <DropdownCell
          value={member.personData.hobby}
          options={HOBBY_OPTIONS}
          labels={t.member.options.hobby}
          onChange={v =>
            update(m => ({
              ...m,
              personData: {...m.personData, hobby: v},
            }))
          }
        />
      ),
    },

    {
      key: 'mood',
      labelKey: 'mood',
      width: 60,
      input: 'text',
      get: m => m.mood,
      set: (m, v) => ({ ...m, mood: Number(v) }),
      maxValue: 100
    },
    {
      key: 'reputation',
      labelKey: 'reputation',
      width: 70,
      input: 'text',
      get: m => m.reputation,
      set: (m, v) => ({...m, reputation: Number(v)}),
      maxValue: 100
    },
    {
      key: 'charm',
      labelKey: 'charm',
      width: 60,
      input: 'text',
      get: m => m.charm,
      set: (m, v) => ({...m, charm: Number(v)}),
      maxValue: 100
    },
    {
      key: 'health',
      labelKey: 'health',
      width: 60,
      input: 'text',
      get: m => m.health,
      set: (m, v) => ({...m, health: Number(v)}),
      maxValue: 100
    },
    {
      key: 'strategy',
      labelKey: 'strategy',
      width: 60,
      input: 'text',
      get: m => m.strategy,
      set: (m, v) => ({...m, strategy: Number(v)}),
      maxValue: 100
    },
    {
      key: 'stamina',
      labelKey: 'stamina',
      width: 60,
      input: 'text',
      get: m => m.stamina,
      set: (m, v) => ({...m, stamina: Number(v)}),
      maxValue: 50
    },
    /* ================= SKILLS ================= */
    {
      key: 'skills',
      labelKey: 'skills',
      width: '80px',
      get: m => m.personData.skills,
      set: (m, v) => ({
        ...m,
        personData: { ...m.personData, skills: Number(v) },
      }),
      render: (member, update, t) => (
        <DropdownCell
          value={member.personData.skills}
          options={SKILL_OPTIONS}
          labels={t.member.options.skill}
          onChange={v =>
            update(m => ({
              ...m,
              personData: { ...m.personData, skills: v },
            }))
          }
        />
      ),
    },
    {
      key: 'skillPoint',
      labelKey: 'skillPoint',
      width: 70,
      input: 'text',
      get: m => m.skillPoint,
      set: (m, v) => ({...m, skillPoint: Number(v)}),
      maxValue: 100
    },
    /* ================= TALENT ================= */
    {
      key: 'talent',
      labelKey: 'talent',
      width: '80px',
      get: m => m.personData.talent,
      set: (m, v) => ({
        ...m,
        personData: {...m.personData, talent: Number(v)},
      }),
      render: (member, update) => (
        <DropdownCell
          value={member.personData.talent}
          options={TALENT_OPTIONS}
          labels={t.member.options.talent}
          onChange={v =>
            update(m => ({
              ...m,
              personData: {...m.personData, talent: v},
            }))
          }
        />
      ),
    },
    {
      key: 'talentPoint',
      labelKey: 'talentPoint',
      input: 'text',
      width: '50px',
      get: m => m.personData.talentPoint,
      set: (m, v) => ({
        ...m,
        personData: {...m.personData, talentPoint: Number(v)},
      }),
      maxValue: 100
    },
    {
      key: 'pregnancyStatus',
      labelKey: 'pregnancy',
      width: 70,
      input: 'number',
      get: m => m.pregnancyStatus,
      set:(m, v) => ({...m, pregnancyStatus: Number(v)}),
    },
    {
      key: 'pregnancyMonth',
      labelKey: 'pregMonth',
      width: 70,
      input: 'number',
      get: m => m.pregnancyMonth,
      set:(m, v) => ({...m, pregnancyMonth: Number(v)}),
    },
  ])
}
