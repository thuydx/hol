/* eslint-disable @typescript-eslint/no-explicit-any */

const STORAGE_KEY = 'uploadedJson'

export type GameData = Record<
  string,
  {
    value?: any[]
    [key: string]: any
  }
>

/* --------------------------------------------------
 * Internal helpers
 * -------------------------------------------------- */

function ensureClient() {
  if (typeof window === 'undefined') {
    throw new Error('GameData can only be used in the browser')
  }
}

function read(): GameData {
  ensureClient()
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : {}
}

function write(data: GameData) {
  ensureClient()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/* --------------------------------------------------
 * Public API
 * -------------------------------------------------- */

export function getGameData(): GameData {
  return read()
}

/**
 * 🔒 SAFE section-level updater
 * - preserves all other sections
 * - preserves __type and metadata
 */
function updateSection(
  section: string,
  updater: (sectionData: any) => any
) {
  const data = read()

  if (!data[section]) return

  data[section] = updater(structuredClone(data[section]))
  write(data)
}

/**
 * Get records of a section
 */
export function getSectionValues(section: string): any[] {
  return read()?.[section]?.value ?? []
}

/**
 * Update a row by ID and column index (SAFE)
 */
export function updateRowById(
  section: string,
  id: string,
  columnIndex: number,
  columnUpdater: (value: string) => string
) {
  updateSection(section, sectionData => {
    if (!Array.isArray(sectionData.value)) return sectionData

    sectionData.value = sectionData.value.map((row: any[]) => {
      if (row[0] !== id) return row

      const newRow = [...row]
      newRow[columnIndex] = columnUpdater(newRow[columnIndex])
      return newRow
    })

    return sectionData
  })
}

/**
 * Update NAME inside compound field safely
 * Example field: "Ðinh Xuân Thủy|1|2|100|1|67|5|100|81|3"
 */
export function updateCompoundNameById(
  section: string,
  id: string,
  columnIndex: number,
  newName: string
) {
  updateRowById(section, id, columnIndex, value => {
    if (typeof value !== 'string') return value

    const parts = value.split('|')
    parts[0] = newName
    return parts.join('|')
  })
}

/**
 * Export (unchanged, safe)
 */
export function exportGameData(filename = 'GameData.es3') {
  ensureClient()

  const data = read()
  const minified = JSON.stringify(data)

  const blob = new Blob([minified], {
    type: 'application/json'
  })

  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()

  URL.revokeObjectURL(url)
}
