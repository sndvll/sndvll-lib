import {Injectable} from '@angular/core';
import {PersistenceModule} from './persistence.module';

@Injectable({
  providedIn: PersistenceModule
})
export class LocalStorageService {

  public set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getObject(key: string): any {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  public getString(key: string): string | null {
    return localStorage.getItem(key);
  }

}
