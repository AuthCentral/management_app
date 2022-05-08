import {Injectable, OnInit} from '@angular/core';
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {WebAppKeys} from "../models/constants/web-app-keys";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(
    private localStorageService: LocalStorageService,
    private sessionStorage: SessionStorageService
  ) {
  }

  storeIntoBrowser(key: WebAppKeys, store: any) {
    this.localStorageService.store(key, store);
  }

  storeIntoSession(key: WebAppKeys, value: any) {
    this.sessionStorage.store(key, value);
  }

  getValue(key: WebAppKeys): string {
    return this.localStorageService.retrieve(key);
  }

  clearLocalStorage() {
    this.localStorageService.clear();
  }

}
