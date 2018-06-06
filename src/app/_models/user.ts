import { Fee } from './fee';
import {Deserializable} from './deserializable';


export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    // password2: string; // ToDO: implement confirm password
    school_name: string ;
    logo: string;
    description: string;
    address: string;
    tel: number;
    region: string;
  // approval: number;
    bvn: string;
  //  bank: string;
    account_number: number;
}

 // Todo: bank drop field
