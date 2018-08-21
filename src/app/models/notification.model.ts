import { User } from "./user.model";

export class Notification{
    constructor(
    public title?: string,
    public type?: string,
    public text?: string, 
    public userTo?: User,
    public broadcast?: boolean,
    public creationDate?:Date,
    public status?:  boolean,
    public _id?:string
    ){

    }
}