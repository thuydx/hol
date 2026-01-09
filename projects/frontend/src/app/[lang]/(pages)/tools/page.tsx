'use client'

import {useState} from 'react'
import {useI18nClient} from '@/lib/i18nClient'
import {downloadColumnMapsZip, generateFullSchema} from '@/lib/dev/generateColumnMaps'
import {downloadRepositoriesZip, generateRepositoriesFromSchema} from '@/lib/dev/generateRepositoriesFromSchema'
import {CButton, CCard, CCardBody, CCardTitle, CCol, CRow} from "@coreui/react-pro";

const Tools = () => {
  const {t} = useI18nClient<{ menu: { tools: string } }>()
  const [data, setData] = useState<boolean>(false)
  const [result, setResult] = useState<Record<string, any> | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = () => {
    try {
      setError(null)
      const maps = generateFullSchema();
      setData(true);
      setResult(maps)
    } catch (e: any) {
      setResult(null)
      setData(false);
      setError(e.message ?? 'Failed to generate column maps')
    }
  }


  const handleDownloadColumnMapsZip = () => {
    try {
      setError(null)
      downloadColumnMapsZip()
    } catch (e: any) {
      setError(e.message ?? 'Failed to download column maps')
    }
  }

  const handleGenerateRepositoriesFromSchema = () => {
    try {
      setError(null)
      const schemaMapping = generateFullSchema()
      generateRepositoriesFromSchema(schemaMapping)
    } catch (e: any) {
      setError(e.message ?? 'Failed to generate repositories')
    }
  }

  const handleDownloadRepositoriesZip = () => {
    try {
      setError(null)
      const schemaMapping = generateFullSchema()
      downloadRepositoriesZip(schemaMapping)
    } catch (e: any) {
      setError(e.message ?? 'Failed to download repositories')
    }
  }


  return (
    <>
      <CRow>
        <CCol>
          <CCard className="p-2">

            <CCardTitle as="h3" className="text-body-secondary text-truncate">Dev tools</CCardTitle>
            <CCardBody className="d-flex flex-wrap p-0">
              <CButton onClick={handleGenerate} color="primary" className="me-2">Generate Column Maps</CButton>
              {result && (<CButton onClick={handleGenerateRepositoriesFromSchema} color="primary" className="me-2">Generate
                Repositories</CButton>)}
              {result && (
                <CButton onClick={handleDownloadRepositoriesZip} color="success" className="me-2">Download Repositories
                  (ZIP)</CButton>)}
              {result && (
                <CButton onClick={handleDownloadColumnMapsZip} color="success" className="me-2">Download ALL Column Maps
                  (ZIP)</CButton>)}
              {data && (<CButton onClick={() => localStorage.clear()} color="d" className="me-2 btn-danger">Clear Local
                Storage</CButton>)}
            </CCardBody>
          </CCard>

        </CCol>
      </CRow>

      <CRow>
        <CCol>

          {error && (
            <CCard className="p-2">
              <CCardTitle as="h3" className="text-body-secondary text-truncate">Errors</CCardTitle>
              <CCardBody className="d-flex flex-wrap p-0 text-danger">
                {error}
              </CCardBody>
            </CCard>
          )}
          {result && (
            <CCard className="">
              <CCardTitle as="h3" className="text-body-secondary text-truncate p-2">Results</CCardTitle>
              <CCardBody
                className="p-3"
                style={{
                  backgroundColor: '#111',
                  color: '#0f0',
                  maxHeight: 400,
                  overflow: 'auto',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {JSON.stringify(result, null, 2)}
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    </>
  )
}

export default Tools
