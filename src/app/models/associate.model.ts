export class Associate {
    constructor(
        public id?:number,
        public name?:string,
        public email?:string, 
        public cellphone?:string,
        public bank?:string,
        public account?:string, 
        public clabe?: string, 
        public card?: string,
        public curp?: string,
        public rfc?:string,
        public address?:string,
        public birthDate?:Date,
        public hasPayment?:boolean, 
        public payAmmount?:number,
        public paymentDate?:Date,
        public paymentNumber?:string,
        public paymentBaucher?:string,
        public state?: string, 
        public creationDate?:Date,
        public _id?:string
    ){}
}