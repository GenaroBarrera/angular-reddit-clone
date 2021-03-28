  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VotePayload } from './vote-button/vote-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  /**
   * Inside the VoteService class, we first injected the HttpClient class, 
   * and inside the vote() method which takes the VotePayload object as input, 
   * we are making a POST call to our REST API.
   * @param votePayload 
   * @returns 
   */
  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/votes/', votePayload);
  }
}
