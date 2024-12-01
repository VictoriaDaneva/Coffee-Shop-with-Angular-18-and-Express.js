import { User } from './user';

export interface Product {
  _id: string;
  imageUrl: string;
  title: string;
  price: string;
  type: string;
  description: string;
  likes: string[];
  owner: User;
  _v: string;
}

export interface ProductDetails {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  type: string;
  description: string;
}
