
import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Array<PostModel> = [];

  /**
   * So we added an @Input to our component with variable posts which is of type PostModel[], 
   * now we have to move the logic to read all the posts to the home page component,
   * let’s update the home.component.ts file with the below code
   * @param postService 
   */
  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    });
  }

  ngOnInit(): void {
  }

}