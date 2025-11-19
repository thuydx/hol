import React from 'react'

import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://thuydx.pro" target="_blank" rel="noopener noreferrer">
          Dashboard
        </a>
        <span className="ms-1">&copy; 2024 ThuyDX.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a
          href="https://wds.vn"
          target="_blank"
          rel="noopener noreferrer"
        >
          WDS
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
