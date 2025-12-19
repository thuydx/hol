'use client'

import React, {useEffect, useState} from 'react'
import {useParams, usePathname} from 'next/navigation'

import {CBreadcrumb, CBreadcrumbItem} from '@coreui/react-pro'
import {Lang} from '@/lib/i18n'

//
// type breadcrumb = {
//   pathname?: string
//   name?: boolean | string
//   active?: boolean
// }
//
// type route = {
//   path: string
//   name: string
// }
//
// const routeNames = [
//   { path: '/', name: 'Dashboard' },
//   { path: '/components/base/navs', name: 'Navs & Tabs' },
// ]

// const humanize = (text: string) => {
//   const string = text
//     .split('-')
//     .reduce(
//       (accumulator, currentValue) =>
//         accumulator + ' ' + currentValue[0].toUpperCase() + currentValue.slice(1),
//     )
//   return string[0].toUpperCase() + string.slice(1)
// }

const humanize = (text: string) =>
  text
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

// const getRouteName = (pathname: string, routes: route[]) => {
//   const currentRoute = routes.find((route) => route.path === pathname)
//   return currentRoute ? currentRoute.name : false
// }


export default function AppBreadcrumb() {
  const pathname = usePathname()
  const {lang} = useParams<{ lang: Lang }>()
  const [dict, setDict] = useState<any>(null)

  // Load translation dictionary (client-safe)
  useEffect(() => {
    import(`@/lang/${lang}.json`).then((m) => {
      setDict(m.default)
    })
  }, [lang])

  if (!pathname || !dict) return null

  // Remove empty + lang segment
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .filter((segment) => segment !== lang)

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + [lang, ...segments.slice(0, index + 1)].join('/')
    const name =
      dict.menu?.[segment] ||
      humanize(segment)

    return {href, name, active: index === segments.length - 1}
  })

  return (
    <CBreadcrumb className="mb-4">
      <CBreadcrumbItem href={`/${lang}`}>
        {dict.menu?.home || 'Home'}
      </CBreadcrumbItem>

      {breadcrumbs.map((b, index) => (
        <CBreadcrumbItem
          key={index}
          {...(b.active ? {active: true} : {href: b.href})}
        >
          {b.name}
        </CBreadcrumbItem>
      ))}
    </CBreadcrumb>
  )
}
