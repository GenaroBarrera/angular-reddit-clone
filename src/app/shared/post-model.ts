//Let’s create a class called PostModel which contains all the fields in the response from getAllPosts() REST API call.
export class PostModel { //is there a better way to create a model in angular? should I make it an interface?
    id!: number; //should I be satisfied with using ! on each field
    postName!: string;
    url!: string;
    description!: string;
    voteCount!: number;
    userName!: string;
    subredditName!: string;
    commentCount!: number;
    duration!: string;
    upVote!: boolean;
    downVote!: boolean;
}