import {NextRequest, NextResponse} from 'next/server'
import {defaultLang, isValidLang, langs} from '@/lib/i18n'
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

  // Ignore Next.js internals & static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Root → default language
  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${defaultLang}`, req.url)
    )
  }

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  // If URL already starts with a language, do NOTHING
  if (firstSegment && isValidLang(firstSegment)) {
    return NextResponse.next()
  }

  // Rewrite "/" or "/something" → "/vi" or "/vi/something"
  const rewrittenPath =
    pathname === '/'
      ? `/${defaultLang}`
      : `/${defaultLang}${pathname}`

  return NextResponse.rewrite(
    new URL(rewrittenPath, req.url)
  )

  // If path already has a valid lang, allow
  // const hasLang = langs.some(
  //   (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  // )
  //
  // if (hasLang) return

  // Otherwise prefix with default language
  // return NextResponse.redirect(
  //   new URL(`/${defaultLang}${pathname}`, req.url)
  // )
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
