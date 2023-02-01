import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, tap, switchMap }from 'rxjs/operators';
import { Observable, throwError, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  refreshingAccessToken: boolean;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=> {
        console.log(error);
        if (error.status === 401 && !this.refreshingAccessToken){
          return this.refreshAccessToken().pipe(switchMap(() => {
            request = this.addAuthHeader(request);
            return next.handle(request);
          }),
          catchError((error: any) => {
            console.log(error);
            this.authService.logout();
            return empty();
          })
          )
          this.authService.logout();
        }
        return throwError(error);
      })
    ) 
  }

  refreshAccessToken() {
    this.refreshingAccessToken = true;
    return this.authService.getNewAccessToken().pipe(
      tap(() => {
        this.refreshingAccessToken = false;
        console.log("AccessToken Refreshed.");
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();
    if (token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  }
}
