'use client'

import React, {JSX, useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

import {
  CContainer,
  CForm,
  CFormInput,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CInputGroup,
  CInputGroupText,
  useColorModes, CAvatar, CDropdownHeader, CBadge, CButton,
} from '@coreui/react-pro'
import {
  cilContrast,
  cilApplicationsSettings,
  cilMenu,
  cilMoon,
  cilSearch,
  cilSun, cilBell,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useTypedSelector } from '@/store'

import {
  AppHeaderDropdown,
  AppHeaderDropdownMssg,
  AppHeaderDropdownNotif,
  AppHeaderDropdownTasks,
} from './header/'
import avatar8 from "@/public/images/avatars/8.jpg";

const AppHeader = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement>(null)
  const { colorMode, setColorMode } = useColorModes('zgs-theme-modern')

  const dispatch = useDispatch()
  const sidebarShow = useTypedSelector((state) => state.sidebarShow)
  const asideShow = useTypedSelector((state) => state.asideShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0">
      <CContainer className="px-4" lg>
        <CHeaderNav className="me-2">
          <CDropdown>
            <CDropdownToggle href="#" color="primary">Dropdown</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Action</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
              <CDropdownItem href="#">Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
        <CHeaderNav className="me-2">
          <CDropdown>
            <CDropdownToggle href="#" color="primary">Dropdown</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Action</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
              <CDropdownItem href="#">Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
        <CHeaderNav className="me-2">
          <CDropdown>
            <CDropdownToggle href="#" color="primary">Dropdown</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Action</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
              <CDropdownItem href="#">Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
        {/*<CHeaderToggler*/}
        {/*  className={classNames('d-lg-none', {*/}
        {/*    'prevent-hide': !sidebarShow,*/}
        {/*  })}*/}
        {/*  onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}*/}
        {/*  style={{ marginInlineStart: '-14px' }}*/}
        {/*>*/}
        {/*  <CIcon icon={cilMenu} size="lg" />*/}
        {/*</CHeaderToggler>*/}
        <CHeaderNav className="d-none d-md-flex ms-auto">
          <CForm className="d-none d-sm-flex">
            <CInputGroup>
              <CInputGroupText id="search-addon" className="bg-body-secondary border-0 px-1">
                <CIcon icon={cilSearch} size="lg" className="my-1 mx-2 text-body-secondary" />
              </CInputGroupText>
              <CFormInput
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                className="bg-body-secondary border-0"
              />
            </CInputGroup>
          </CForm>
          {/*<AppHeaderDropdownNotif />*/}
          {/*<AppHeaderDropdownTasks />*/}
          {/*<AppHeaderDropdownMssg />*/}
        </CHeaderNav>
        <CHeaderNav className="ms-auto ms-md-0">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
