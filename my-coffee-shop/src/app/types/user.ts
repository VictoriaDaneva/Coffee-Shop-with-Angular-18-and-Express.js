import { Product } from './product';

export interface User {
  _id: string;
  imageUrl?: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  wishlist: Product[];
  __v: number;
}

export interface UserForAuth {
  _id: string; // Instead of _id
  imageUrl?: string;
  username: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  password: string;
}

export interface ProfileDetails {
  id: string;
  imageUrl: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
}
