import { instance } from './_axios';

export const POST = async (url: string, data: object,token?:string|any) => {
  return await instance.post(url, data,{
    headers:{Authorization:token}
  });
};

export const GET = async (url: string, token?:string|any) => {
  const res = await instance.get(url, {
    headers: { Authorization: token },
  });

  return res.data;
};
export const PATCH = async (url: string, data: object,token?:string|any) => {
  return await instance.patch(url, data,{
    headers:{Authorization:token}
  });
};
export const PUT = async (url: string, data: object,token?:string|any) => {
  return await instance.put(url, data,{
    headers:{Authorization:token}
  });
};
export const DELETE = async (url: string,token?:string|any) => {
  return await instance.delete(url,{
    headers:{Authorization:token}
  });
};
