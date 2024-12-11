import { Product } from './product';
import { User } from './user';

export interface Order {
  _id: string;
  total: string;
  address: string;
  phoneNumber: string;
  username: string;
  email: string;
  products: Product[];
  owner: User;
  _v: string;
}
