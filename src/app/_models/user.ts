import { Fee } from './fee';
import {Deserializable} from './deserializable';


export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    password2: string; // ToDO: implement confirm password
    schoolName: string ;
    logo: string;
    description: string;
    address: string;
    tel: number;
    region: string;
  //  approval: string;
    bvn: string;
  //  bank: string;
    accountNo: number;
    fees: Fee[];

}

 // Todo: bank drop field
