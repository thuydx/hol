import { BaseRepository } from './baseRepository'

export class MemberNowRepository extends BaseRepository<string[]> {
  protected sectionKey = 'Member_now'

  findById(id: string) {
    return this.all().find(row => row[0] === id)
  }

  deleteById(id: string) {
    this.delete(row => row[0] === id)
  }

  updateDisplayName(id: string, name: string) {
    this.update(
      row => row[0] === id,
      row => {
        const copy = [...row]
        copy[4] = name
        return copy
      }
    )
  }
}
