import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  set(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data))
  }

  get(key: string): unknown {
    try {
      const localStorageItem = localStorage.getItem(key)
      return localStorageItem ? JSON.parse(localStorageItem) : null
    } catch (error) {
      console.error('Error getting data from localStorage', error)
      return null
    }
  }
}
