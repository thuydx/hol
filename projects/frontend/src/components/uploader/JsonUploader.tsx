import React, { useState, useRef, FormEvent } from 'react'
import {
  CButton,
  CCloseButton,
  CForm,
  CFormInput,
  CInputGroup,
  CToast,
  CToastBody,
  CToastHeader
} from '@coreui/react-pro'

type Props = {
  storageKey?: string
  onUpload?: (data: any) => void
}

export default function JsonUploader({ storageKey = 'uploadedJson', onUpload }: Props) {
  const [message, setMessage] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage(null)
    setShowToast(false)

    const file = fileRef.current?.files?.[0]
    if (!file) {
      setMessage('No file selected.')
      return
    }

    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      if (typeof parsed !== 'object' || parsed === null) {
        setMessage('Parsed JSON is not an object or array.')
        return
      }
      window.localStorage.setItem(storageKey, JSON.stringify(parsed))
      setMessage('JSON saved to localStorage.')
      setShowToast(true)

      // notify parent so it can update UI immediately
      if (onUpload) onUpload(parsed)

      // clear input so same file can be re-uploaded if needed
      if (fileRef.current) (fileRef.current as HTMLInputElement).value = ''
    } catch (err) {
      setMessage('Failed to parse JSON: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  return (
    <>
      <CForm id="uploadSaveFileForm" onSubmit={handleSubmit}>
        <CInputGroup>
          <CFormInput
            ref={fileRef}
            type="file"
            id="uploadSaveFile"
            aria-describedby="uploadSaveFileBtn"
            aria-label="Upload"
            accept="application/json,.es3"
          />
          <CButton type="submit" color="" variant="outline" id="uploadSaveFileBtn">
            Upload
          </CButton>
        </CInputGroup>
      </CForm>
      {showToast && (
        <div style={{ position: 'fixed', right: 16, top: 16, zIndex: 9999 }}>
          <CToast animation={true} autohide={true} visible={true} color={ 'success'}>
            <CToastHeader closeButton>
              <svg
                className="rounded me-2"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                role="img"
              >
                <rect width="100%" height="100%" fill="#007aff"></rect>
              </svg>
              <div className="fw-bold me-auto">Upload Status</div>

            </CToastHeader>
            <CToastBody>{message}</CToastBody>

          </CToast>
        </div>
      )}
    </>
  )
}
