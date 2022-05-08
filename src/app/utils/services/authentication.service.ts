import {Injectable} from '@angular/core';
import {Account} from "../models/account";
import {HttpClient} from "@angular/common/http";
import {StorageServiceService} from "./storage-service.service";
import {Router} from "@angular/router";
import {catchError, Observable, of, ReplaySubject, shareReplay, tap} from "rxjs";
import {ApplicationConfigService} from "./application-config.service";
import {WebAppKeys} from "../models/constants/web-app-keys";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userIdentity: Account | null = null;
  private authenticatedState = new ReplaySubject<Account | null>(1);
  private accountCache?: Observable<Account> | null;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageServiceService,
    private router: Router,
    private applicationConfigService: ApplicationConfigService
  ) {
  }

  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticatedState.next(this.userIdentity);
    if (!identity) {
      this.accountCache = null;
    }
  }

  hasAnyAuthority(authorities: string[]): boolean {
    if (!this.userIdentity) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticatedState.asObservable();
  }

  private fetch(): Observable<Account> {
    return this.httpClient.get<Account>(this.applicationConfigService.getEndpointFor('api/account'));
  }

  private navigateToStoredURL(): void {
    const previousUrl = this.storageService.getValue(WebAppKeys.STATE_URL);
    if (previousUrl) {
      this.storageService.clearLocalStorage();
      this.storageService.storeIntoBrowser(WebAppKeys.STATE_URL, previousUrl);
    }
  }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache || force) {
      this.accountCache = this.fetch().pipe(
        tap((account: Account) => {
          this.authenticate(account);
          this.navigateToStoredURL();

        }), shareReplay()
      );
    }
    return this.accountCache.pipe(catchError(() => of(null)))
  }
}
