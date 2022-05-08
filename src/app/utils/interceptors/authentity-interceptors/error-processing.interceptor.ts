import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {EventService, EventWithContent} from "../../services/event.service";

@Injectable()
export class ErrorProcessingInterceptor implements HttpInterceptor {

  constructor(
    private eventManager: EventService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (!(err.status === 401 && (err.message === '' || err.url?.includes('api/account')))) {
            this.eventManager.broadcast(new EventWithContent('http.application.error', err))
          }
        }
      })
    );
  }
}
