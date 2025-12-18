import {cifCn, cifUs, cifVn} from '@coreui/icons'
import {CIconProps} from "@coreui/icons-react/src/CIcon";

export const langs = ['en', 'vi', 'cn'] as const
export const defaultLang = 'vi'

export type Lang = (typeof langs)[number]

export function isValidLang(lang: string): lang is Lang {
  return langs.includes(lang as Lang)
}

export async function getDict(lang: Lang) {
  return (await import(`../lang/${lang}.json`)).default
}

export function generateLangParams() {
  return langs.map((lang) => ({lang}))
}

export const langOptions: {
  code: Lang
  label: string
  flag: CIconProps
}[] = [
  {code: 'en', label: 'English', flag: cifUs},
  {code: 'vi', label: 'Tiếng Việt', flag: cifVn},
  {code: 'cn', label: '中文', flag: cifCn},
]
