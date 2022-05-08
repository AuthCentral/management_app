import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AlertService} from "../../services/alert.service";
import {AlertType} from "../../models/constants/alert-type";

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(
    private alertService:AlertService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event:HttpEvent<any>) => {
        if(event instanceof HttpResponse){
          let alert:string | null = null;
          for(const headerKey of event.headers.keys()){
            if(headerKey.toLowerCase().endsWith('app-alert')){
              alert = event.headers.get(headerKey);
            }
          }
          if(alert){
            this.alertService.addAlert({
              type: AlertType.SUCCESS,
              message: alert
            })
          }
        }
      })
    );
  }
}
