import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private angularFireAuth: AngularFireAuth) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    let accessToken = '';

    await this.angularFireAuth.auth.currentUser.getIdToken(true).then(token => (accessToken = token));
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    return next.handle(request).toPromise();
  }
}
