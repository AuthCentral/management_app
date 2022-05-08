import {Injectable, isDevMode} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {StorageServiceService} from "../services/storage-service.service";
import {WebAppKeys} from "../models/constants/web-app-keys";
import {LoginService} from "../services/login.service";

@Injectable({
  providedIn: 'root'
})
export class UserRoutingGuard implements CanActivate {
  constructor(
    private accountService: AuthenticationService,
    private router: Router,
    private storageService: StorageServiceService,
    private loginService: LoginService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.accountService.identity().pipe(
      map(account => {
        if (account) {
          const authorities = route.data['authorities'];
          if (!authorities || authorities.length === 0 || this.accountService.hasAnyAuthority(authorities)) {
            return true;
          }
          if (isDevMode()) {
            console.error("User does not have the required authorities", authorities)
          }
          this.router.navigate(['accessDenied'])
          return false;
        }
        this.storageService.storeIntoBrowser(WebAppKeys.STATE_URL, state.url);
        this.loginService.login();
        return false;
      })
    );
    return true;
  }

}
