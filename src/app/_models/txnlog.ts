import {Fee} from './fee' ;
import {User} from './user' ;
import {Payee} from './payee' ;

export interface  Transaction {
  id: number;
  to: User[];
  from: Payee[];
  fee: Fee[];
  comment: string;
  payDate: any;
}

// TODO: autogen txn id
