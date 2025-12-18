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

// const getBreadcrumbs = (location: string) => {
//   const breadcrumbs: breadcrumb[] = []
//   location.split('/').reduce((prev, curr, index, array) => {
//     const currentPathname = `${prev}/${curr}`
//     const routeName = getRouteName(currentPathname, routeNames) || humanize(curr)
//     breadcrumbs.push({
//       pathname: currentPathname,
//       name: routeName,
//       active: index + 1 === array.length ? true : false,
//     })
//     return currentPathname
//   })
//   return breadcrumbs
// }
//
// const AppBreadcrumb = () => {
//   const currentLocation = usePathname()
//
//   const breadcrumbs = currentLocation && getBreadcrumbs(currentLocation)
//   const lastBreadcrumb = breadcrumbs && breadcrumbs.pop()
//   return (
//     <>
//       {/*<div className="fs-2 fw-semibold">{lastBreadcrumb && lastBreadcrumb.name}</div>*/}
//       <CBreadcrumb className="mb-4">
//         <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
//         {breadcrumbs &&
//           breadcrumbs.map((breadcrumb, index) => {
//             return (
//               <CBreadcrumbItem
//                 {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
//                 key={index}
//               >
//                 {breadcrumb.name}
//               </CBreadcrumbItem>
//             )
//           })}
//         {(lastBreadcrumb && lastBreadcrumb.name !== 'Dashboard') ? <CBreadcrumbItem active>{lastBreadcrumb && lastBreadcrumb.name}</CBreadcrumbItem> : ''}
//       </CBreadcrumb>
//     </>
//   )
// }
//
// export default React.memo(AppBreadcrumb)

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
      dict.breadcrumb?.[segment] ||
      humanize(segment)

    return {href, name, active: index === segments.length - 1}
  })

  return (
    <CBreadcrumb className="mb-4">
      <CBreadcrumbItem href={`/${lang}`}>
        {dict.breadcrumb?.home || 'Home'}
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
