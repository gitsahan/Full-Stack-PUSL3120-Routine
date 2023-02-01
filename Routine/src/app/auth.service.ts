import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

  login (email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSesion(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log(" Has logged-in");
      })
    )
  }

  signup (email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSesion(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log(" Has Signed-up");
      })
    )
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId(){
    return localStorage.getItem('user_Id');
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  setAccessToken(accessToken: string) {
    return localStorage.setItem('x-access-token', accessToken);
  }

  private setSesion(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  logout() {
    this.removeSesion();
    this.router.navigateByUrl('/log-in');
  }

  private removeSesion() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh=token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(tap((res: HttpResponse<any>)=>{
      this.setAccessToken(res.headers.get('x-access-token'));
    })
    )
  }
}
