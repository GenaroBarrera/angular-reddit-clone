import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from './create-post.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;
  postPayload: CreatePostPayload;
  subreddits!: Array<SubredditModel>;

  constructor(private router: Router, private postService: PostService,
    private subredditService: SubredditService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    }
  }

  /**
   * We declared and initialized the createPostForm variable of type FormGroup inside the ngOnInit()
   * Inside the FormGroup declaration we defined all the fields which our Form has 
   * and we also added Validators to this FormControl, which just a basic validation whether the provided text is not empty.
   */
  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    /**
     * Next, we are reading all the Subreddit information as we have to display them in the dropdown when creating the post, 
     * after reading them from the SubredditService, we are assigning the response to a subreddits variable.
     */
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });
  }

  /**
   * Next, we have the createPost() method which first reads the FormControl values and creates the CreatePostPayload object.
   * 
   * Once we have the necessary data, we call the createPost() method inside the SubredditService, we subscribe to the response, 
   * and once we receive a success response we navigate to the home page, or else we throw an error.
   */
  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName')?.value;
    this.postPayload.url = this.createPostForm.get('url')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  /**
   * Lastly, we have a discardPost() method which re-directs us also to the home page.
   */
  discardPost() {
    this.router.navigateByUrl('/');
  }

}
