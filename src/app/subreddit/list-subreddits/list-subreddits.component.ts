
import { Component, OnInit } from '@angular/core';
import { SubredditModel } from '../subreddit-response';
import { SubredditService } from '../subreddit.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddits!: Array<SubredditModel>;
  constructor(private subredditService: SubredditService) { }

  /**
   * This should be easy to understand, we are now calling the getAllSubreddits() method inside the SubredditService inside the ngOnInit() of the component, 
   * subscribing to the response and assigning it to the subreddits object which is of type Array<SubredditModel>
   * 
   * If we receive an error response, we throw an error using the throwError(error) method of rxjs
   */
  ngOnInit() {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    })
  }
}
