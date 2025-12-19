
import {
  getSectionValues,
  addRecords,
  updateRecords,
  deleteRecords
} from '@/lib/gameData'

export abstract class BaseRepository<T = any> {
  protected abstract sectionKey: string

  all(): T[] {
    return getSectionValues(this.sectionKey)
  }

  add(record: T | T[]) {
    addRecords(this.sectionKey, record)
  }

  update(
    predicate: (item: T) => boolean,
    updater: (item: T) => T
  ) {
    updateRecords(this.sectionKey, predicate, updater)
  }

  delete(predicate: (item: T) => boolean) {
    deleteRecords(this.sectionKey, predicate)
  }
}
