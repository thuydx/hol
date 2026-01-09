import {buildBaseColumns, ColumnSchema} from "@/columns/buildBaseColumns";
import {MemberParsed} from "@/models/members";
import {HOBBY_OPTIONS, SKILL_OPTIONS, TALENT_OPTIONS} from "@/constants/options";
import {DropdownCell} from "@/components/table/DropdownCell";

export function buildMemberNowColumns(t: any): ColumnSchema<MemberParsed> {
  return buildBaseColumns([
    // ===== CORE (flat fields) =====
    // {
    //   key: 'character',
    //   label: 'character',
    //   input: 'text',
    //   get: m => m.character,
    //   set: (m, v) => ({...m, character: Number(v)}),
    // },
    {
      key: 'name',
      labelKey: t.member.fields.name,
      input: 'text',
      get: m => m.person.name,
      set: (m, v) => ({
        ...m,
        person: {...m.person, name: v},
      }),
    },
    {
      key: 'age',
      labelKey: t.member.fields.age,
      input: 'text',
      width: '50px',
      get: m => m.age,
      set: (m, v) => ({...m, age: Number(v)}),
    },
    {
      key: 'literary',
      labelKey: t.member.fields.literary,
      input: 'text',
      width: '50px',
      get: m => m.literary,
      set: (m, v) => ({...m, literary: Number(v)}),
      maxValue: 100
    },
    {
      key: 'martial',
      labelKey: t.member.fields.martial,
      input: 'text',
      width: '50px',
      get: m => m.martial,
      set: (m, v) => ({...m, martial: Number(v)}),
      maxValue: 100
    },
    {
      key: 'business',
      labelKey: t.member.fields.business,
      input: 'text',
      width: '50px',
      get: m => m.business,
      set: (m, v) => ({...m, business: Number(v)}),
      maxValue: 100
    },
    {
      key: 'art',
      labelKey: t.member.fields.art,
      input: 'text',
      width: '50px',
      get: m => m.art,
      set: (m, v) => ({...m, art: Number(v)}),
      maxValue: 100
    },
    /* ================= SKILLS ================= */
    {
      key: 'skills',
      labelKey: t.member.fields.skills,
      width: '80px',
      get: m => m.person.skills,
      set: (m, v) => ({
        ...m,
        person: {...m.person, skills: Number(v)},
      }),
      render: (member, update) => (
        <DropdownCell
          value={member.person.skills}
          options={SKILL_OPTIONS}
          labels={t.member.options.skill}
          onChange={v =>
            update(m => ({
              ...m,
              person: {...m.person, skills: v},
            }))
          }
        />
      ),
    },
    {
      key: 'skillPos',
      labelKey: t.member.fields.skillPos,
      input: 'text',
      width: '50px',
      get: m => m.skillPos,
      set: (m, v) => ({...m, skillPos: Number(v)}),
      maxValue: 100
    },
    // ===== PERSON (compound, but flat in UI) =====

    // {
    //   key: 'generation',
    //   labelKey: t.member.fields.Gen,
    //   input: 'text',
    //   get: m => m.person.generation,
    //   set: (m, v) => ({
    //     ...m,
    //     person: {...m.person, generation: Number(v)},
    //   }),
    // },
    /* ================= TALENT ================= */
    {
      key: 'talent',
      labelKey: t.member.fields.talent,
      width: '80px',
      get: m => m.person.talent,
      set: (m, v) => ({
        ...m,
        person: {...m.person, talent: Number(v)},
      }),
      render: (member, update) => (
        <DropdownCell
          value={member.person.talent}
          options={TALENT_OPTIONS}
          labels={t.member.options.talent}
          onChange={v =>
            update(m => ({
              ...m,
              person: {...m.person, talent: v},
            }))
          }
        />
      ),
    },
    {
      key: 'talentPos',
      labelKey: t.member.fields.talentPos,
      input: 'text',
      width: '50px',
      get: m => m.person.talentPos,
      set: (m, v) => ({
        ...m,
        person: {...m.person, talentPos: Number(v)},
      }),
      maxValue: 100
    },
    // {
    //   key: 'gender',
    //   labelKey: t.member.fields.gender,
    //   input: 'text',
    //   get: m => m.person.gender,
    //   set: (m, v) => ({
    //     ...m,
    //     person: {...m.person, gender: Number(v)},
    //   }),
    // },
    // {
    //   key: 'lifespan',
    //   labelKey: t.member.fields.lifespan,
    //   input: 'text',
    //   get: m => m.person.lifespan,
    //   set: (m, v) => ({
    //     ...m,
    //     person: {...m.person, lifespan: Number(v)},
    //   }),
    // },

    {
      key: 'luck',
      labelKey: t.member.fields.luck,
      input: 'text',
      width: '50px',
      get: m => m.person.luck,
      set: (m, v) => ({
        ...m,
        person: {...m.person, luck: Number(v)},
      }),
      maxValue: 100
    },
    /* ================= HOBBY ================= */
    {
      key: 'hobby',
      labelKey: t.member.fields.hobby,
      width: '80px',
      get: m => m.person.hobby,
      set: (m, v) => ({
        ...m,
        person: {...m.person, hobby: Number(v)},
      }),
      render: (member, update) => (
        <DropdownCell
          value={member.person.hobby}
          options={HOBBY_OPTIONS}
          labels={t.member.options.hobby}
          onChange={v =>
            update(m => ({
              ...m,
              person: {...m.person, hobby: v},
            }))
          }
        />
      ),
    },

    {
      key: 'mood',
      labelKey: t.member.fields.mood,
      input: 'text',
      width: '50px',
      get: m => m.mood,
      set: (m, v) => ({...m, mood: String(v)}),
      maxValue: 100
    },
    // {
    //   key: 'merits',
    //   labelKey: t.member.fields.merits,
    //   input: 'text',
    //   get: m => m.merits,
    //   set: (m, v) => ({...m, merits: Number(v)}),
    // },
    // {
    //   key: 'status',
    //   labelKey: t.member.fields.status,
    //   input: 'text',
    //   get: m => m.status,
    //   set: (m, v) => ({...m, status: Number(v)}),
    // },
    {
      key: 'reputation',
      labelKey: t.member.fields.reputation,
      input: 'text',
      width: '50px',
      get: m => m.reputation,
      set: (m, v) => ({...m, reputation: Number(v)}),
      maxValue: 100
    },
    {
      key: 'charm',
      labelKey: t.member.fields.charm,
      input: 'text',
      width: '50px',
      get: m => m.charm,
      set: (m, v) => ({...m, charm: Number(v)}),
      maxValue: 100
    },
    {
      key: 'health',
      labelKey: t.member.fields.health,
      input: 'text',
      width: '50px',
      get: m => m.health,
      set: (m, v) => ({...m, health: Number(v)}),
      maxValue: 100
    },
    {
      key: 'strategy',
      labelKey: t.member.fields.strategy,
      input: 'text',
      width: '50px',
      get: m => m.strategy,
      set: (m, v) => ({...m, strategy: Number(v)}),
      maxValue: 100
    },
    // {
    //   key: 'maritalStatus',
    //   labelKey: 'marital',
    //   input: 'text',
    //   get: m => m.maritalStatus,
    //   set: (m, v) => ({...m, maritalStatus: Number(v)}),
    // },
    {
      key: 'stamina',
      labelKey: t.member.fields.stamina,
      input: 'text',
      width: '50px',
      get: m => m.stamina,
      set: (m, v) => ({...m, stamina: Number(v)}),
      maxValue: 100
    },

    // ===== EQUIPMENT =====
    // {
    //   key: 'weaponId',
    //   labelKey: 'weapon',
    //   input: 'text',
    //   get: m => m.equipment.weaponId,
    //   set: (m, v) => ({
    //     ...m,
    //     equipment: {...m.equipment, weaponId: Number(v)},
    //   }),
    // },
    // {
    //   key: 'jewelryId',
    //   labelKey: 'jewelry',
    //   input: 'text',
    //   get: m => m.equipment.jewelryId,
    //   set: (m, v) => ({
    //     ...m,
    //     equipment: {...m.equipment, jewelryId: Number(v)},
    //   }),
    // },
    // {
    //   key: 'talismanId',
    //   labelKey: 'talisman',
    //   input: 'text',
    //   get: m => m.equipment.talismanId,
    //   set: (m, v) => ({
    //     ...m,
    //     equipment: {...m.equipment, talismanId: Number(v)},
    //   }),
    // },
  ])
}
