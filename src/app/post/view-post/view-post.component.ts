import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post!: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments!: CommentPayload[];

  /**
   * Inside the ViewPostComponent, we are first injecting the PostService and ActivatedRouter classes, 
   * and inside the constructor, we access the incoming query-param id and assign it to the postId variable.
   * 
   * We first declared the variable commentForm of type FormGroup and initialized it inside the constructor. 
   * There is a FormControl assigned to the FormGroup, which is initialized to an empty value 
   * and we have also defined a Validator, which makes sure that the given value is not empty.
   * @param postService 
   * @param activateRoute 
   * @param commentService 
   * @param router 
   */
  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    //Next, we declared and initialized the CommentPayload object, we will use this when making a POST call to the Comment API.
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  /**
   * We declared the method postComment(), which reads the value for FormControl variable – text from the FormGroup – commentForm. 
   * We then assign the value to the text field of the CommentPayload object.
   * 
   * Then we are calling the postComment() method inside the CommentService, which returns an Observable, 
   * so we subscribe to it and when we receive a success response we are resetting the text variable to an empty value.
   */
  postComment() {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text')?.setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  /**
   * After that, we are reading the post from the PostService using the postService.getPost() method,
   * which returns an Observable<PostModel>
   * 
   * We subscribe to the response and assign the response, to the post variable, 
   * if there is an error, then we throw an error using the throwError method.
   * 
   * We also have the method getPostById() which are reading the post information and assigning it to the post variable
   */
  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  /**
   * We are calling the method getCommentsForPost() 
   * inside the constructor where we are calling the getAllCommentsForPost() from CommentService.
   * 
   * As this returns an Observable we are subscribing to it and assigning the response to the comments variable.
   */
  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

}
