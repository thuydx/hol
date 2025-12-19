'use client'

import { useState } from 'react'
import { useI18nClient } from '@/lib/i18nClient'
import {
  generateColumnMaps,
  downloadColumnMaps, downloadColumnMapsZip
} from '@/lib/dev/generateColumnMaps'

const Tools = () => {
  const { t } = useI18nClient<{ menu: { tools: string } }>()

  const [result, setResult] = useState<Record<string, any> | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = () => {
    try {
      setError(null)
      const maps = generateColumnMaps()
      setResult(maps)
    } catch (e: any) {
      setResult(null)
      setError(e.message ?? 'Failed to generate column maps')
    }
  }

  const handleDownload = () => {
    try {
      setError(null)
      downloadColumnMaps()
    } catch (e: any) {
      setError(e.message ?? 'Failed to download column maps')
    }
  }

  return (
    <>
      <h1>{t.menu.tools}</h1>

      <div style={{ marginTop: 16 }}>
        <button onClick={handleGenerate}>
          Generate Column Maps
        </button>

        <button
          style={{ marginLeft: 12 }}
          onClick={handleDownload}
        >
          Download Column Maps
        </button>
        <button onClick={downloadColumnMapsZip}>
          Download ALL Column Maps (ZIP)
        </button>

      </div>

      {error && (
        <p style={{ color: 'red', marginTop: 16 }}>
          {error}
        </p>
      )}

      {result && (
        <pre
          style={{
            marginTop: 16,
            padding: 12,
            background: '#111',
            color: '#0f0',
            maxHeight: 400,
            overflow: 'auto'
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </>
  )
}

export default Tools
