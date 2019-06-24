import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
 constructor(private injector: Injector) { }
//TODO
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return next.handle(request)
     .pipe(
       retry(1),
       catchError((error: HttpErrorResponse) => {
         //const rollbar = this.injector.get(RollbarService);
         let errorMessage = '';
         if (error.error instanceof ErrorEvent) {
           // client-side error
           errorMessage = `Error: ${error.error.message}`;
         } else {
           // server-side error
           errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
         }
         
         return throwError(errorMessage);
       })
     )
 }
}