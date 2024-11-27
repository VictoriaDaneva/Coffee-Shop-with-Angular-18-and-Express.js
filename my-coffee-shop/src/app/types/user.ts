export interface User {
  _id: string;
  tel: string;
  email: string;
  username: string;
  phoneNumber?: string;
  address?: string;
  password: string;
  __v: number;
}

export interface UserForAuth {
  username: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  password: string;
  id: string;
}
