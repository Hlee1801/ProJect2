import { Request } from 'express';
import { Document } from 'mongoose';
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  gender: string;
  phoneNumber: number;
  avatar: string;
  address: string;
  role: string;
  rf_token?: string;
  type: string;
  _doc: object;
}
export interface IRoom extends Document {
  room_name: string;
  room_type: string;
  location: string;
  photo: string[];
  room_price: number;
  rating: number;
  desc: string;
  featured: string[];
}

export interface INewUser {
  fullName: string;
  email: string;
  password: string;
  gender: string;
  phoneNumber: number;
  address: string;
}
export interface IDecodedToken {
  id?: string;
  payload?: object | any;
  newRegister?: INewUser;
  newBooking?: IBooking;
  iat: number;
  exp: number;
}
export interface IUserParams {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface IReqAuth extends Request {
  user?: IUser;
}
export interface IHistory extends Document {
  userId: string;
  roomID: number;
  mota: string;
  files: string;
  _doc: object;
}
export interface IBooking extends Document {
  room: string;
  email: string;
  user: string;
  start_date: Date | object;
  end_date: Date | object;
  billing: number;
  status: string;
  adult_quantity: number;
  children_quantity: number;
  customer_name: string;
  room_name: string;
  _doc: object;
}
export interface INoti extends Document {
  // user: string;
  content: string;
  state: boolean;
}
export interface IComment extends Document {
  user_id: string;
  room_id: string;
  content: string;
  reply: string[];
  reply_user: string;
  root: string;
  rating: number;
  _doc: Object;
}
