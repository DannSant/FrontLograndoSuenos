import { User } from "./user.model";

export class Notification{
    constructor(
    title: string,
    type: string,
    text: string, 
    userTo: User,
    broadcast: boolean,
    creationDate:Date,
    status:  boolean,
    _id:string
    ){

    }
}