import JSZip from 'jszip'

export function generateRepositoriesFromSchema(schema: any) {
  const files: Record<string, string> = {}

  Object.entries(schema).forEach(([key, columns]: any) => {
    const className = `${key}Repository`

    const methods: string[] = []

    Object.entries(columns).forEach(([colKey, info]: any) => {
      methods.push(`
  async update_${colKey}(id: string, value: string): Promise<void> {
    await this.updateColumn(id, '${colKey}', value)
  }`)

      if (info.subColumns) {
        Object.keys(info.subColumns).forEach(subKey => {
          methods.push(`
  async update_${colKey}_${subKey}(id: string, value: string): Promise<void> {
    await this.updateSubColumn(id, '${colKey}', '${subKey}', value)
  }`)
        })
      }
    })

    files[`${key}.repository.tsx`] =
      `import { BaseRepository } from '@/lib/baseRepository'

export class ${className} extends BaseRepository {
  protected sectionKey = '${key}'

${methods.join('\n')}
}
`
  })

  return files
}

export async function downloadRepositoriesZip(schema: any) {
  const zip = new JSZip()
  const repos = generateRepositoriesFromSchema(schema)

  Object.entries(repos).forEach(([name, content]) => {
    zip.file(name, content)
  })

  const blob = await zip.generateAsync({type: 'blob'})
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'repositories.zip'
  a.click()
}
