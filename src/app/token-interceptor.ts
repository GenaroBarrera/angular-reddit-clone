import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response.payload';

@Injectable({
    providedIn: 'root'
})
/**
 * In Part 8, when our JWT is expired, our Backend application provides us a special Token called Refresh Token which can be used to request new JWT’s.
 * So that means we have to intercept each HTTP request we are making to our Backend application 
 * and check whether the JWT is expired (or) about to be expired, 
 * in that case, we will make a REST call to our backend to generate new JWT and set the Authorization Header with Bearer Scheme.
 */
export class TokenInterceptor implements HttpInterceptor {

    /**
     * If the token refresh process has not already started, then the isTokenRefreshing variable will be false by default, 
     * and a null value will be assigned to refreshTokenSubject object.
     * 
     * When the token refresh process started, then we set the isTokenRefreshing variable to true 
     * and once we receive the response we pass the JWT as the value for our refreshTokenSubject
     */
    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService) { }

    /**
     * Inside the intercept method, we receive the JWT through authService.getJwtToken(), 
     * if the Token is valid, we add the token to the Authorization Header which contains a value according to the Bearer scheme.
     * @param req 
     * @param next 
     * @returns 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }
        const jwtToken = this.authService.getJwtToken();

        if (jwtToken) {
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse
                    && error.status === 403) {
                    return this.handleAuthErrors(req, next);
                } else {
                    return throwError(error);
                }
            }));
        }
        return next.handle(req);

    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {
        /**
         * If the token refresh process has not already started, then the isTokenRefreshing variable will be false by default, 
         * and a null value will be assigned to refreshTokenSubject object.
         * 
         * When the token refresh process started, then we set the isTokenRefreshing variable to true 
         * and once we receive the response we pass the JWT as the value for our refreshTokenSubject
         * 
         * Once the token refresh process is completed, we will finish the processing with next.handle
         */
        if (!this.isTokenRefreshing) { 
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject
                        .next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req,
                        refreshTokenResponse.authenticationToken)); //TODO: what exactly is next.handle?
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwtToken()))
                })
            );
        }
    }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization',
                'Bearer ' + jwtToken)
        });
    }

}