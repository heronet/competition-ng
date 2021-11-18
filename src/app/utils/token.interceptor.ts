import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.apiService.authData$.subscribe(authData => {
      if(authData) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authData.token}`
          }
        })
      } else {
        this.router.navigateByUrl("/auth");
      }
    });
    return next.handle(request);
  }
}
