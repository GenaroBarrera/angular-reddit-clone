/**
 * We need to create a class which acts as the request payload for Create Comments API, 
 * I am going to create a file named comment-payload.ts under a new folder named comments
 */
export class CommentPayload{
    text!: string;
    postId!: number;
    username?:string;
    duration?: string;
}