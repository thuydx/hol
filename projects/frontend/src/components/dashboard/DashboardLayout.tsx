import { AppAside, AppSidebar, AppFooter, AppHeader } from '@/components/dashboard'
import { CContainer } from '@coreui/react-pro'

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>{children}</CContainer>
        </div>
        <AppFooter />
      </div>
      <AppAside />
    </>
  )
}

export default DefaultLayout
