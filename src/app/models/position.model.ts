import { Associate } from "./associate.model";

export class Position {
  constructor(
    public position_number?:number,
    public payAmmount?:number,
    public paymentDate?:Date,
    public paymentNumber?:string,
    public paymentBaucher?:string,
    public email?:string,
    public isFirst?:boolean,
    public associate?:Associate,
    public _id?:string
  ){}
}