import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * Sets a KV pair in sessions storage, this will overwrite any existing key information
   * @param key - The key for the data
   * @param value - The data to store
   */
  public setValue<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Removes a KV pair in session storage
   * @param key - the key to remove
   */
  public removeSessionData(key: string): void {
    if (this.hasValue(key)) {
      sessionStorage.removeItem(key);
    }
  }

  public getValue<T>(key: string): T | null {
    const value: string | null = sessionStorage.getItem(key);

    if (value === null) return null;

    return JSON.parse(value) as T;
  }

  public hasValue(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }
}
