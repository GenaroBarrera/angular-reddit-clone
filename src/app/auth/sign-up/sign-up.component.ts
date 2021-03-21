import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './sign-up-request.payload';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  /**
   * The definite assignment assertion is a feature that allows a ! to be placed after instance property 
   * and variable declarations to relay to TypeScript that a variable is indeed assigned for all intents and purposes, 
   * even if TypeScript’s analyses cannot detect so.
   */
  signupForm!: FormGroup; //it's being init in ngOnInit() wtf
  signupRequestPayload!: SignupRequestPayload;
  
  //We injected the Router and ToastrService classes into our SignUpComponent
  //TODO: what is the router object being injected and how does it work?
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { 
    this.signupRequestPayload = { //I don't know why this was missing from the tutorial!?
      username: '',
      email: '',
      password: ''
    };
  }

  /**
   * On Line-11, we declared a variable called as signupForm which is of type FormGroup. 
   * This is the starting point to handle form-input in our Login Page. 
   * Next inside the ngOnInit() we initialized this signupForm variable 
   * by assigning it to a new FormGroup which takes two FormControl objects email, username, and password.
   */
  ngOnInit() {
    /**
     * Now let’s add validations to our Reactive forms inside our Signup component.
     * First, update the FormControl constructor arguments inside both sign-up.component.ts files.
     * 
     * We have added Validators.required for each field 
     * and especially for the email field inside the signupForm we also added Validators.email
     * (look up what the validators do)
     */
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  /**
   * So you can see that we have first injected the AuthService into our component 
   * and we used this inside our signup() method, 
   * we subscribed to the Observable which is returned from AuthService.signup(), 
   * if we receive success response then we print Signup Successful if not we print Signup Failed
   * 
   * Inside the signup method, if we received success response, 
   * we are using the injected router object to navigate to the Login page 
   * and notice that we are adding a query param registered:true to communicate with the LoginComponent that registration is successful
   */
  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email')?.value; //should I use a ! or ?
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;

    /**
     * Now let’s add enable routing from Signup page to Login Page on successful Registration, 
     * if the registration fails, we should see an error on the top right corner of the screen with the Toastr error message.
     */
    this.authService.signup(this.signupRequestPayload).subscribe(() => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      }, () => {
        //TODO: I need to understand how to subscribe to an observable and the flow of statements taking place here
        this.toastr.error('Registration Failed! Please try again'); //If we received a failure response, we will display an error notification.
      });
  }
}
