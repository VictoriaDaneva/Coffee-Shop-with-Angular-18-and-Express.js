import { User } from './user';

export interface Product {
  _id: string;
  imageUrl: string;
  title: string;
  price: string;
  type: string;
  author: string;
  description: string;
  likes: string[];
  owner: User;
  _v: string;
}
