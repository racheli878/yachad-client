import type User from "./userModel";

export default interface UserAndToken{
    token:string,
    user:User
}