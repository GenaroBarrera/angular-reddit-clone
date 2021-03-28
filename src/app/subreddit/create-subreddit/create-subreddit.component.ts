import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubredditModel } from '../subreddit-response';
import { Router } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {
  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;
  title = new FormControl('');
  description = new FormControl('');

  /**
   * First things first, we declared a FormGroup with variable name createSubredditForm, 
   * along with the fields title and description 
   * and we are initializing this FormGroup inside the constructor.
   * 
   * We also declared and initialized the SubredditModel we created in the last article.
   * @param router 
   * @param subredditService 
   */
  constructor(private router: Router, private subredditService: SubredditService) {
    this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit() {
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  /**
   * We have the createSubreddit() method which reads the FormControl values for fields title and description 
   * and assigning it to the SubredditModel object.
   * 
   * Next, we are calling the createSubreddit() method inside the SubredditService and subscribing to the response, 
   * once we receive a success response we are navigating to the route /list-subreddits
   */
  createSubreddit() {
    this.subredditModel.name = this.createSubredditForm.get('title')?.value;
    this.subredditModel.description = this.createSubredditForm.get('description')?.value;
    this.subredditService.createSubreddit(this.subredditModel).subscribe(data => {
      this.router.navigateByUrl('/list-subreddits');
    }, error => {
      throwError(error);
    })
  }
}
