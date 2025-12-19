import { BaseRepository } from './baseRepository'

export class MenKeNowRepository extends BaseRepository<string[]> {
  protected sectionKey = 'MenKe_Now'

  /**
   * Find by first column (ID)
   */
  findById(id: string) {
    return this.all().find(row => row[0] === id)
  }

  /**
   * Delete by ID
   */
  deleteById(id: string) {
    this.delete(row => row[0] === id)
  }

  /**
   * Update name field (column 2)
   */
  updateName(id: string, newName: string) {
    this.update(
      row => row[0] === id,
      row => {
        const copy = [...row]
        copy[2] = newName
        return copy
      }
    )
  }
}
