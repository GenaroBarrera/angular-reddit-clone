import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/**
 * from part 17
 * The next task is to implement Logout in our Angular application, 
 * implementing Logout on the frontend is a simple task, 
 * we just have to delete the stored Auth and Refresh Tokens from the Local Storage.
 * 
 * After that, we will make an API call to the backend to delete the Refresh Tokens 
 * so that it wont be possible to rotate the JWT’s.
 * 
 * We already have the HTML code ready in our header.component.html file, 
 * we just have to implement the logic inside the header.component.ts file
 */
 export class HeaderComponent implements OnInit {
  faUser = faUser;
  isLoggedIn!: boolean;
  username!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  /**
   * The logout() method inside the header.component.ts is calling the logout() method inside the AuthService.
   */
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}