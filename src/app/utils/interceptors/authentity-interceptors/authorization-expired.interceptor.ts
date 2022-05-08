import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {LoginService} from "../../services/login.service";
import {StorageServiceService} from "../../services/storage-service.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {WebAppKeys} from "../../models/constants/web-app-keys";

@Injectable()
export class AuthorizationExpiredInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
    private storageService: StorageServiceService,
    private router: Router,
    private accountService: AuthenticationService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401 && err.url && err.url.includes('api/account') && this.accountService.isAuthenticated()) {
            this.storageService.storeIntoBrowser(WebAppKeys.STATE_URL, this.router.routerState.snapshot.url);
            this.loginService.login();
          }
        }
      })
    );
  }
}
