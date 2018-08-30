import { Associate } from './associate.model';
export class User {
    constructor(
        public name?:string,      
        public role?:string,
        public password?:string,
        public username?:string,
        public _id?:string       
    ){}
}