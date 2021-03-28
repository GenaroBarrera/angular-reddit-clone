import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';
import { VoteService } from '../vote.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
/**
 * Inside the VotebuttonComponent and vote-button.component.html we can see new tags called fa-icon and CSS classes faArrowUp and faArrowDown. 
 * These are coming from Fort Awesome. 
 * Let’s add the below dependencies to our package.json file and run npm install to download these dependencies to our project.
 */
export class VoteButtonComponent implements OnInit {

  @Input()
  post!: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor!: string;
  downvoteColor!: string;
  isLoggedIn!: boolean;

  //We first injected the VoteService, AuthService, PostService and ToastrService classes through the constructor.
  constructor(private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService, private toastr: ToastrService) {

    //We declared and initialized the VotePayload object inside the constructor.
    //fixed the "this var can't be undefined by adding a ? on the fields in vote-payload.ts"
    this.votePayload = {
      voteType: undefined, 
      postId: undefined
    }
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  /**
   * Then we have the upvotePost() and downvotePost() methods, 
   * where we are setting the VoteType for the VotePayload object, 
   * and calling the vote() method inside the component.
   */
  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  /**
   * This vote() method, is setting the value for the postId field, which is coming as input, 
   * and after that, we are calling the vote() method of the VoteService class, which returns an Observable.
   */
  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  /**
   * We subscribe to the returned Observable, and in the case of a success response, 
   * we are updating the Vote Details, like the VoteCount and also an indication whether the post is either upVoted or downVoted by the user.
   */
  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }
}