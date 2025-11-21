'use client'

import React, {JSX, useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'

import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CInputGroup,
  CInputGroupText,
  useColorModes,
} from '@coreui/react-pro'
import {cilApplicationsSettings, cilSearch,} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import {useTypedSelector} from '@/store'

import {AppHeaderDropdown,} from './header/'

const AppHeader = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement>(null)
  const {colorMode, setColorMode} = useColorModes('zgs-theme-modern')

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
          <CForm id="searchForm" className="d-none d-sm-flex">
            <CInputGroup>
              <CInputGroupText id="search-addon" className="bg-body-secondary border-0 px-1">
                <CIcon icon={cilSearch} size="lg" className="my-1 mx-2 text-body-secondary"/>
              </CInputGroupText>
              <CFormInput
                id="searchInput"
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
          <AppHeaderDropdown/>
        </CHeaderNav>
        <CHeaderToggler
          onClick={() => dispatch({type: 'set', asideShow: !asideShow})}
          style={{marginInlineEnd: '-12px'}}
        >
          <CIcon icon={cilApplicationsSettings} size="lg"/>
        </CHeaderToggler>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
