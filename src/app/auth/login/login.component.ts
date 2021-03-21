import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError!: boolean;
  registerSuccessMessage!: string;

  /**
   * Now in our LoginComponent, we inject Router and ToastrService objects,
   * additionally we injected ActivatedRoute class to access the route parameters.
   */ 
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  /**
   * Inside the ngOnInit() the method, we are subscribing to the queryParams from the activatedRoute object 
   * and in case we receive a query parameter with value for registered as true, then we display the success notification – “Signup Successful” 
   * and set the value for the field registerSuccessMessage
   */
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    /**
     * Lastly, after successful Login, we are navigating to the root URL – ‘/’ 
     * and then enabling the Success Notification with the message – “Login Successful”.
     */
    this.authService.login(this.loginRequestPayload).subscribe(data => {
        this.isError = false;
        this.router.navigateByUrl(''); //should it be '/' to route to home?
        this.toastr.success('Login Successful');
        /**
         * In our login.component.html file, we already added the below block of code, 
         * which displays an error message if Login Fails.
         * (Why do we handle login failed through the html? can't we do it here with toastr as well?, keep consistency)
         */
       }, error => {
        this.isError = true;
        throwError(error);
      });
  }
}
