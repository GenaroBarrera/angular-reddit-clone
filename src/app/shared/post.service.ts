import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
/**
 * To test our Refresh Token functionality, we need to make calls to some secured API from our Angular application, 
 * for that let’s create Home Page Component and here let’s retrieve all the Posts we already have in our database.
 * 
 * Inside the PostService class, we have to call the REST API which exposes us all the posts in our application, 
 * if we look at the Swagger REST API Documentation we created as part of Part 10
 */
export class PostService {

  constructor(private http: HttpClient) { }

  /**
   * So now we are calling the getAllPosts() from our PostService class and we are storing the response in Array<PostModel>, 
   * let’s now inject the PostService inside the home.component.ts file.
   * @returns 
   */
  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/posts/', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-user/' + name);
  }
}
