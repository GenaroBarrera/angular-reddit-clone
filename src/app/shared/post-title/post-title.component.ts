import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css'],
  encapsulation: ViewEncapsulation.None,
})

/**
 * In our UserProfileComponent, we want to display the posts which are created by the User, 
 * for this, we can re-use the PostTileComponent we created in the previous article.
 * 
 * But in PostTileComponent, if you observe we are reading all the posts and displaying them, 
 * instead of reading all the posts inside the constructor we should pass on the posts which we want to see inside this component as an input, 
 * let’s refactor the post-tile.component.ts file
 */
export class PostTitleComponent implements OnInit {

  faComments = faComments;
  /**
   * So we added an @Input to our component with variable posts which is of type PostModel[], 
   * now we have to move the logic to read all the posts to the home page component,
   * let’s update the home.component.ts file with the below code
   */
  @Input()
  posts!: PostModel[];

  /**
  * Inside the post-tile.component.ts we first injected the Router class from @angular/router
  * and added the method goToPost() where we are navigating to the URL ‘/view-post/:id”
  */
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}