import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  pageKeys: string[] = ["home_", "settings_"]
  private storageReady = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    await this.storage.create();
    this.storageReady.next(true);
  }

  getData(pageKeyInd: number, key: string) {
    return this.storageReady.pipe(
      filter(ready => ready),
      switchMap(_ => {
        return from(this.storage.get(this.pageKeys[pageKeyInd] + key)) || of("");
      })
    );
  }
  async addData(pageKeyInd: number, key: string, item) {
    return this.storage.set(this.pageKeys[pageKeyInd] + key, item);
  }
  async removeItem(pageKeyInd: number, key: string,) {
    await this.storage.remove(this.pageKeys[pageKeyInd] + key);
  }

  async clearAll() {
    await this.storage.clear();
  }
}