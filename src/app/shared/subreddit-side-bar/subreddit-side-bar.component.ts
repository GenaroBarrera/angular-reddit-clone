
import { Component, OnInit } from '@angular/core';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {
  subreddits: Array<SubredditModel> = [];
  displayViewAll!: boolean;

  /**
   * We are reading all the Subreddits from our Backend through the getAllSubreddits() inside SubredditService, 
   * let’s wireup this call to SubredditSideBarComponent
   * 
   * So everything seems good, but we have to limit the number of Subreddits we can display in the Subreddit Sidebar section, 
   * let’s add some logic to display only the first 3 subreddits inside the section, 
   * and if there are more than 3 entries we will show a View All button.
   * @param subredditService 
   */
  constructor(private subredditService: SubredditService) {
    this.subredditService.getAllSubreddits().subscribe(data => {
      /**
       * We introduced a flag called displayViewAll to limit the number of subreddits displayed in the sidebar.
       * If the number of subreddits >= 4 then we set the value of displayViewAll to true.
       */
      if (data.length > 3) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }

  ngOnInit(): void { }

}
