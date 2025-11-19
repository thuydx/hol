'use client'

import { AppAside, AppSidebar, AppFooter, AppHeader, AppBreadcrumb } from '@/components/dashboard/'
import { CContainer } from '@coreui/react-pro'
// import { useAuth } from '@/hooks/auth'
import { redirect } from 'next/navigation'
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // @ts-ignore
  // const { user } = useAuth({ middleware: 'auth' })
  // if (!user) {
  //   redirect('/login')
  // }
  return (
    <>
      {/*<AppSidebar />*/}
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CContainer className="container-fluid px-4">
            <AppBreadcrumb />
            {children}
          </CContainer>
        </div>
        <AppFooter />
      </div>
      {/*<AppAside />*/}
    </>
  )
}
export default DashboardLayout
