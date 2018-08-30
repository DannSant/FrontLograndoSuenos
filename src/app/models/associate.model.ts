import { Bank } from './bank.model';
import { State } from './state.model';
import { User } from './user.model';
export class Associate {
    constructor(       
        public personalEmail?:string, 
        public cellphone?:string,
        public bank?:Bank,
        public account?:string, 
        public clabe?: string, 
        public card?: string,
        public curp?: string,
        public rfc?:string,
        public address?:string,
        public birthDate?:Date,       
        public state?: State, 
        public creationDate?:Date,
        public user?:User,      
        public _id?:string
    ){}
}