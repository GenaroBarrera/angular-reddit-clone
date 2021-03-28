import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';

@Injectable({
  providedIn: 'root'
})
/**
 * So we have some routes, which are supposed to be secured. 
 * That means those routes should only be accessible when the user is logged in. 
 * In Angular, we have concept called Guards which tells the router whether to allow the navigation to a particular route or not. 
 * There are different types of Guards but we will use the CanActivate guard in our scenario.
 */
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * The AuthGuard class is implementing the CanActivate interface, 
   * inside the canActivate() method, we are checking if the user is logged in or not.
   * @param route 
   * @param state 
   * @returns 
   */
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.authService.isLoggedIn();
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/login'); //If the user is not logged in, we are redirecting to the Login Page.
    }
    return true;
  }
  
}
