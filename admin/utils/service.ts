import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { routes } from './routes';
import { encode, ParsedUrlQuery } from 'querystring';
import { ILogin, IRoom, ImageUp, ListType } from './interface';
import { TokenType } from './interface';
import { instance } from './_axios';
export const Login = async (data: ILogin) => {
  return await instance.post(routes.api.login, data);
};
export const Logout = async (token: string | any) => {
  return await instance.get(routes.api.logout, {
    headers: { Authorization: token },
  });
};
export const refreshToken = async () => {
  return await instance.get(routes.api.refreshToken);
};
export const getUserById = async (id: string) => {
  return await instance.get(`${routes.api.user}${id}`);
};
export const getAllUserProfile = async () => {
  return await instance.get(routes.api.user);
};

export const getRoomList = async () => {
  const res = await instance.get(routes.api.room);
  return res.data;
};
export const getBookingList=async()=>{
  const res=await instance.get(routes.api.booking_list)
  return res.data
}
export async function deleteRoom(id: string) {
  return await instance.delete(routes.api.room + '/' + id);
}
export async function checkToken(token: string) {
  const decoded: TokenType = jwt_decode(token);
  if (decoded.exp >= Date.now() / 1000) return;
  const res = await instance.get(routes.api.refreshToken);
  return res.data.access_token;
}

export const imageUpload = async (file: File[]) => {
  let imgArr: ImageUp[] = [];
  for (const item of file) {
    const formData = new FormData();
    formData.append('file', item);
    formData.append('upload_preset', 'ml_default');
    formData.append('cloud_name', 'dji8eaf4q');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dji8eaf4q/upload',
      {
        method: 'POST',
        body: formData,
      },
    );

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
