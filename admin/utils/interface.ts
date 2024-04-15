import { ReactNode } from 'react';

export interface ILogin {
  email?: string | any;
  password?: string | any;
}
export interface itemsNavigations {
  id: number;
  name: string;
  icon: any;
  route: string;
}

export interface Navigations {
  name: string;
  items: itemsNavigations[];
}
export interface Table {
  data: ReactNode;
}

export interface ListType {
  roomID?: string | any;
  roomName?: string;
  roomType?: string;
  roomPrice?: number;
  roomPhoto?: string[] | any;
  roomLocate?: string;
  roomDesc?: string | any;
  roomFeature?: string[] | any;
}
export interface IRoom extends ListType {
  _id?: string | any;
  room_name: string;
  room_type: string;
  location: string;
  photo: string[];
  room_price: number | undefined;
  rating?: number | undefined;
  desc: string;
  featured: string[];
}
export type TokenType = {
  id: string;
  exp: number;
  iat: number;
};
export interface IAdmin {
  user: {
    access_token: string;
    msg: string;
    user: {
      fullName: string;
      role: string;
    };
  };
}
export type ImageUp = {
  public_id: string;
  url: string;
};

export interface User extends ILogin {
  _id?: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  address: string;
  role: string;
  avatar?: string;
}
