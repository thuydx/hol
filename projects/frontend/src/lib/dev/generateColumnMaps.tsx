import JSZip from 'jszip'

type ColumnMap = Record<string, number>
type SubColumnMap = Record<string, number>

export type ColumnInfo = {
  index: number
  compound: boolean
}

export type SectionSchema = Record<string, ColumnInfo>

function detectSubColumns(section: any, columnIndex: number): SubColumnMap {
  let maxParts = 0

  if (!Array.isArray(section?.value)) return {}

  for (const row of section.value) {
    if (!Array.isArray(row)) continue

    const cell = row[columnIndex]
    if (typeof cell !== 'string') continue
    if (!cell.includes('|')) continue

    const parts = cell.split('|')
    maxParts = Math.max(maxParts, parts.length)
  }

  const subMap: SubColumnMap = {}
  for (let i = 0; i < maxParts; i++) {
    subMap[`SUB_${i}`] = i
  }

  return subMap
}

export function detectCompoundColumns() {
  if (typeof window === 'undefined') {
    throw new Error('Must run in browser')
  }

  const raw = localStorage.getItem('uploadedJson')
  if (!raw) {
    throw new Error('uploadedJson not found')
  }

  const data = JSON.parse(raw)
  const result: Record<string, SectionSchema> = {}

  Object.entries<any>(data).forEach(([key, section]) => {
    const columnCount: Record<number, boolean> = {}

    if (Array.isArray(section?.value)) {
      for (const row of section.value) {
        if (!Array.isArray(row)) continue

        row.forEach((cell, index) => {
          if (
            typeof cell === 'string' &&
            cell.includes('|')
          ) {
            columnCount[index] = true
          }
        })
      }
    }

    const schema: SectionSchema = {}
    Object.keys(columnCount).forEach(index => {
      schema[`COL_${index}`] = {
        index: Number(index),
        compound: true
      }
    })

    result[key] = schema
  })

  return result
}

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

export function generateRepositories(schema: Record<string, any>) {
  const files: Record<string, string> = {}

  Object.entries(schema).forEach(([key, columns]) => {
    const className = `${key}_Repository`
    const compoundCols = Object.entries(columns)
      .filter(([, v]: any) => v.compound)
      .map(([k]) => k)

    const methods = compoundCols.map(col => `
  update_${col}(id: string, newValue: string) {
    this.updateColumn(id, ${columns[col].index}, value => {
      if (typeof value !== 'string') return value
      const parts = value.split('|')
      parts[0] = newValue
      return parts.join('|')
    })
  }
`).join('\n')

    files[`${className}.ts`] =
      `import { BaseRepository } from './baseRepository'

export class ${className} extends BaseRepository<any[]> {
  protected sectionKey = '${key}'

${methods}
}
`
  })

  return files
}

export function generateFullSchema() {
  if (typeof window === 'undefined') {
    throw new Error('Must run in browser')
  }

  const raw = localStorage.getItem('uploadedJson')
  if (!raw) {
    throw new Error('uploadedJson not found')
  }

  const data = JSON.parse(raw)
  const columns = generateColumnMaps()
  const compounds = detectCompoundColumns()

  const schema: Record<string, any> = {}

  Object.keys(columns).forEach(key => {
    const colMap = columns[key]
    const compoundMap = compounds[key] ?? {}
    const section = data[key]

    const merged: any = {}

    Object.entries(colMap).forEach(([col, index]) => {
      const isCompound = Boolean(compoundMap[col]?.compound)

      merged[col] = {
        index,
        compound: isCompound
      }

      // 🔥 NEW: sub-column mapping
      if (isCompound) {
        const subColumns = detectSubColumns(section, index)
        if (Object.keys(subColumns).length > 0) {
          merged[col].subColumns = subColumns
        }
      }
    })

    schema[key] = merged
  })

  return schema
}

/* --------------------------------------------------
 * ALWAYS generate & download files
 * -------------------------------------------------- */

export function exportColumnMapsAsTSX() {
  const schema = generateFullSchema()
  const files: Record<string, string> = {}

  Object.entries(schema).forEach(([key, columns]) => {
    const constName = `${key}Columns` // 🔒 keep key intact

    const body = Object.entries(columns)
      .map(([colName, info]: any) => {
        const lines: string[] = []

        lines.push(`    index: ${info.index},`)
        lines.push(`    compound: ${info.compound},`)

        if (info.subColumns) {
          const subs = Object.entries(info.subColumns)
            .map(([k, v]) => `      ${k}: ${v},`)
            .join('\n')

          lines.push(`    subColumns: {\n${subs}\n    },`)
        }

        return `  ${colName}: {\n${lines.join('\n')}\n  },`
      })
      .join('\n\n')

    const content =
      `export const ${constName} = {
${body}
} as const
`

    // 🔒 ALWAYS generate file
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

/* --------------------------------------------------
 * ZIP EXPORT (THE FIX)
 * -------------------------------------------------- */

export async function downloadColumnMapsZip() {
  const files = exportColumnMapsAsTSX()
  const zip = new JSZip()

  Object.entries(files).forEach(([filename, content]) => {
    zip.file(filename, content)
  })

  const blob = await zip.generateAsync({ type: 'blob' })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'column-maps.zip'
  a.click()

  URL.revokeObjectURL(url)
}
