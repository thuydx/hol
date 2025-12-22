'use client'
import {ReactNode} from 'react'
import {AppAside, AppBreadcrumb, AppFooter, AppHeader} from '@/components'
import {CContainer} from '@coreui/react-pro'

export default function Layout({children}: { children: ReactNode }) {
  return (
    <>
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader/>
        <div className="body flex-grow-1">
          <CContainer lg className="px-4">
            <AppBreadcrumb/>
            {children}
          </CContainer>
        </div>
        <AppFooter/>
      </div>
      <AppAside/>
    </>
  )
}
