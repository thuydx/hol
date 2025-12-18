import {NextRequest, NextResponse} from 'next/server'
import {defaultLang, langs} from '@/lib/i18n'
//
// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl
//
//   if (pathname === '/') {
//     return NextResponse.redirect(new URL(`/${defaultLang}`, req.url))
//   }
//
//   const hasLang = langs.some(
//     (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
//   )
//
//   if (!hasLang) {
//     return NextResponse.redirect(
//       new URL(`/${defaultLang}${pathname}`, req.url)
//     )
//   }
// }


export function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl

  // Root → default language
  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${defaultLang}`, req.url)
    )
  }

  // If path already has a valid lang, allow
  const hasLang = langs.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  )

  if (hasLang) return

  // Otherwise prefix with default language
  return NextResponse.redirect(
    new URL(`/${defaultLang}${pathname}`, req.url)
  )
}
