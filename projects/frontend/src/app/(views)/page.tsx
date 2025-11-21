'use client'
import React, { useEffect, useState } from 'react'
import JsonUploader from '@/components/uploader/JsonUploader';
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardSubtitle,
  CCardTitle,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {cifUs, cilArrowBottom, cilArrowTop, cilOptions, cilPeople, cilUserPlus,} from '@coreui/icons'

import avatar1 from '@/public/images/avatars/1.jpg'
import { useTypedSelector } from '@/store'

const STORAGE_KEY = 'uploadedJson'
const TS_KEY = `${STORAGE_KEY}_ts`
const TEN_HOURS = 10 * 60 * 60 * 1000
const CHECK_INTERVAL = 5 * 60 * 1000 // 5 minutes

const Dashboard = () => {
  const [data, setData] = useState<any | null>(null)
  const resetData = useTypedSelector((state) => state.resetData)
  // const raw = localStorage.getItem('myAppData')
  // const data = raw ? JSON.parse(raw) : null
  // useEffect(() => {
  //   // run only on the client
  //   if (typeof window === 'undefined') return
  //   try {
  //     const raw = window.localStorage.getItem('myAppData')
  //     setData(raw ? JSON.parse(raw) : null)
  //   } catch (e) {
  //     // parsing failed or localStorage not available — keep data as null
  //     setData(null)
  //   }
  // }, []);
  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkExpiryAndLoad = () => {
      try {
        const tsRaw = window.localStorage.getItem(TS_KEY)
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (tsRaw && raw) {
          const ts = Number(tsRaw)
          if (Number.isFinite(ts) && Date.now() - ts > TEN_HOURS) {
            // expired
            window.localStorage.removeItem(STORAGE_KEY)
            window.localStorage.removeItem(TS_KEY)
            setData(null)
            return
          }
          setData(JSON.parse(raw))
        } else {
          setData(null)
        }
      } catch (e) {
        setData(null)
      }
    }

    checkExpiryAndLoad()

    // periodic check to auto-expire
    const interval = window.setInterval(() => {
      try {
        const tsRaw = window.localStorage.getItem(TS_KEY)
        if (tsRaw) {
          const ts = Number(tsRaw)
          if (Number.isFinite(ts) && Date.now() - ts > TEN_HOURS) {
            window.localStorage.removeItem(STORAGE_KEY)
            window.localStorage.removeItem(TS_KEY)
            setData(null)
          }
        }
      } catch (e) {
        // ignore
      }
    }, CHECK_INTERVAL)

    // remove data on browser/tab close
    const handleUnload = () => {
      try {
        window.localStorage.removeItem(STORAGE_KEY)
        window.localStorage.removeItem(TS_KEY)
      } catch (e) {
        // ignore
      }
    }
    // prefer 'pagehide' instead of deprecated 'unload'
    const handlePageHide = (e: PageTransitionEvent) => {
      handleUnload()
    }
    // fallback: when the document becomes hidden (tab switch / close), run cleanup
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleUnload()
      }
    }
    window.addEventListener('beforeunload', handleUnload)
    window.addEventListener('pagehide', handlePageHide)
    document.addEventListener('visibilitychange', handleVisibilityChange)


    return () => {
      clearInterval(interval)
      window.removeEventListener('beforeunload', handleUnload)
      window.removeEventListener('pagehide', handlePageHide)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, []);

  const handleReset = () => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(STORAGE_KEY)
      window.localStorage.removeItem(TS_KEY)
    } catch (e) {
      // ignore
    }
    setData(null)
  }

  const handleUpload = (parsed: any) => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
        window.localStorage.setItem(TS_KEY, Date.now().toString())
      } catch (e) {
        // ignore
      }
    }
    setData(parsed)
  }

  const tableExample = [
    {
      avatar: {src: avatar1.src, status: 'success'},
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: {name: 'USA', flag: cifUs},
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      activity: '10 sec ago',
    }
  ]

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody className="p-4">
              <CCardTitle className="fs-4 fw-semibold">Upload</CCardTitle>
              <CCardSubtitle className="fw-normal text-body-secondary border-bottom mb-3 pb-4">
              </CCardSubtitle>
              {/* pass setData so parent updates immediately after upload */}
              {/*<JsonUploader storageKey="myAppData" onUpload={(parsed) => setData(parsed)} />*/}
              <div className="d-flex align-items-center gap-3">
                <JsonUploader storageKey={STORAGE_KEY} onUpload={handleUpload} />
                <CButton color="danger" onClick={handleReset}>
                  Reset data
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {data ? (
        <>
          <CRow>
            <CCol xl={9}>
              <CCard className="mb-4">
                <CCardBody className="p-4">
                  <CRow>
                    <CCol>
                      <CCardTitle className="fs-4 fw-semibold">Users</CCardTitle>
                      <CCardSubtitle className="fw-normal text-body-secondary mb-4">
                        1.232.150 registered users
                      </CCardSubtitle>
                    </CCol>
                    <CCol xs="auto" className="ms-auto">
                      <CButton color="secondary">
                        <CIcon icon={cilUserPlus} className="me-2"/>
                        Add new user
                      </CButton>
                    </CCol>
                  </CRow>
                  <CTable align="middle" className="mb-0" hover responsive>
                    <CTableHead className="fw-semibold text-body-secondary">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilPeople}/>
                        </CTableHeaderCell>
                        <CTableHeaderCell>User</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                        <CTableHeaderCell>Usage</CTableHeaderCell>
                        <CTableHeaderCell>Activity</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {tableExample.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <CAvatar size="md" src={item.avatar.src} status={item.avatar.status}/>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.user.name}</div>
                            <div className="small text-body-secondary text-nowrap">
                              <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:
                              {item.user.registered}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CIcon size="xl" icon={item.country.flag} title={item.country.name}/>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="d-flex justify-content-between align-items-baseline mb-1">
                              <div className="fw-semibold">{item.usage.value}%</div>
                              <div className="small text-body-secondary text-nowrap ms-3">
                                {item.usage.period}
                              </div>
                            </div>
                            <CProgress
                              thin
                              color={`${item.usage.color}-gradient`}
                              value={item.usage.value}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="small text-body-secondary">Last login</div>
                            <div className="fw-semibold text-nowrap">{item.activity}</div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xl={3}>
              <CRow>
                <CCol md={4} xl={12}>
                  <CWidgetStatsA
                    className="mb-4"
                    color="primary-gradient"
                    value={
                      <>
                        26K{' '}
                        <span className="fs-6 fw-normal">
                      (-12.4% <CIcon icon={cilArrowBottom}/>)
                    </span>
                      </>
                    }
                    title="Users"
                    action={
                      <CDropdown alignment="end">
                        <CDropdownToggle color="transparent" caret={false} className="p-0">
                          <CIcon icon={cilOptions} className="text-high-emphasis-inverse"/>
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another action</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    }
                  />
                </CCol>
                <CCol md={4} xl={12}>
                  <CWidgetStatsA
                    className="mb-4"
                    color="warning-gradient"
                    value={
                      <>
                        2.49%{' '}
                        <span className="fs-6 fw-normal">
                      (84.7% <CIcon icon={cilArrowTop}/>)
                    </span>
                      </>
                    }
                    title="Conversion Rate"
                    action={
                      <CDropdown alignment="end">
                        <CDropdownToggle color="transparent" caret={false} className="p-0">
                          <CIcon icon={cilOptions} className="text-high-emphasis-inverse"/>
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another action</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    }

                  />
                </CCol>
                <CCol md={4} xl={12}>
                  <CWidgetStatsA
                    className="mb-4"
                    color="danger-gradient"
                    value={
                      <>
                        44K{' '}
                        <span className="fs-6 fw-normal">
                      (-23.6% <CIcon icon={cilArrowBottom}/>)
                    </span>
                      </>
                    }
                    title="Sessions"
                    action={
                      <CDropdown alignment="end">
                        <CDropdownToggle color="transparent" caret={false} className="p-0">
                          <CIcon icon={cilOptions} className="text-high-emphasis-inverse"/>
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another action</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    }

                  />
                </CCol>
              </CRow>
            </CCol>
          </CRow>

        </>
      ) : (
        <CRow>
          <CCol>
            <CCard className="mb-4">
              <CCardBody className="p-4">
                <CCardTitle className="fs-4 fw-semibold">No data</CCardTitle>
                <CCardSubtitle className="fw-normal text-body-secondary">
                  No uploaded JSON found in localStorage.
                </CCardSubtitle>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default Dashboard
