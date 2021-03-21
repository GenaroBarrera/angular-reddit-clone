/**
 * Now let’s refer to the REST API documentation we created in the previous article, 
 * by looking at the below images we understand what kind of Payload 
 * we have to send to the backend as part of the Signup REST API call.
 * 
 * Let’s create the classes SignupRequestPayload with fields you see in the above image.
 * (referring to the rest api documentation)
 */
export interface SignupRequestPayload {
    username: string;
    email: string;
    password: string;
}