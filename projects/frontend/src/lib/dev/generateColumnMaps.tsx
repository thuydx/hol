import JSZip from 'jszip'

type ColumnMap = Record<string, number>

export function generateColumnMaps() {
  if (typeof window === 'undefined') {
    throw new Error('Must run in browser')
  }

  const raw = localStorage.getItem('uploadedJson')
  if (!raw) {
    throw new Error('uploadedJson not found')
  }

  const data = JSON.parse(raw)
  const result: Record<string, ColumnMap> = {}

  Object.entries<any>(data).forEach(([key, section]) => {
    let maxLength = 0

    // Try to detect max column length, but NEVER skip
    if (Array.isArray(section?.value)) {
      for (const row of section.value) {
        if (Array.isArray(row)) {
          maxLength = Math.max(maxLength, row.length)
        }
      }
    }

    if (Array.isArray(section)) {
      for (const row of section) {
        if (Array.isArray(row)) {
          maxLength = Math.max(maxLength, row.length)
        }
      }
    }

    const map: ColumnMap = {}

    for (let i = 0; i < maxLength; i++) {
      map[`COL_${i}`] = i
    }

    // 🔒 ALWAYS assign, even if empty
    result[key] = map
  })

  return result
}

/* --------------------------------------------------
 * ALWAYS generate & download files
 * -------------------------------------------------- */

export function exportColumnMapsAsTSX() {
  const maps = generateColumnMaps()
  const files: Record<string, string> = {}

  Object.entries(maps).forEach(([key, map]) => {
    const constName = `${key}Columns` // DO NOT TOUCH `_`

    const entries = Object.entries(map)
      .map(([k, v]) => `  ${k}: ${v},`)
      .join('\n')

    const content =
      `export const ${constName} = {
${entries}
} as const
`

    // 🔒 ALWAYS create file
    files[`${key}.columns.tsx`] = content
  })

  return files
}

export function downloadColumnMaps() {
  const files = exportColumnMapsAsTSX()

  Object.entries(files).forEach(([name, content]) => {
    // 🔒 Even empty objects get a file
    const blob = new Blob(
      [content || 'export const Empty = {} as const\n'],
      { type: 'text/plain' }
    )

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
    URL.revokeObjectURL(url)
  })
}


//
// type ColumnMap = Record<string, number>
//
// export function generateColumnMaps() {
//   if (typeof window === 'undefined') {
//     throw new Error('Must run in browser')
//   }
//
//   const raw = localStorage.getItem('uploadedJson')
//   if (!raw) {
//     throw new Error('uploadedJson not found')
//   }
//
//   const data = JSON.parse(raw)
//   const result: Record<string, ColumnMap> = {}
//
//   Object.keys(data).forEach(key => {
//     // 🔒 DO NOT CHECK ANYTHING
//     // 🔒 ALWAYS GENERATE
//     const section = data[key]
//     let maxLength = 0
//
//     if (Array.isArray(section?.value)) {
//       for (const row of section.value) {
//         if (Array.isArray(row)) {
//           maxLength = Math.max(maxLength, row.length)
//         }
//       }
//     }
//
//     const map: ColumnMap = {}
//     for (let i = 0; i < maxLength; i++) {
//       map[`COL_${i}`] = i
//     }
//
//     result[key] = map
//   })
//
//   return result
// }

/* --------------------------------------------------
 * ZIP EXPORT (THE FIX)
 * -------------------------------------------------- */

export async function downloadColumnMapsZip() {
  const maps = generateColumnMaps()
  const zip = new JSZip()

  Object.entries(maps).forEach(([key, map]) => {
    const constName = `${key}_Columns`

    const body = Object.entries(map)
      .map(([k, v]) => `  ${k}: ${v},`)
      .join('\n')

    const content =
      `export const ${constName} = {
${body}
} as const
`

    zip.file(`${key}.columns.tsx`, content)
  })

  const blob = await zip.generateAsync({ type: 'blob' })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'column-maps.zip'
  a.click()
  URL.revokeObjectURL(url)
}
