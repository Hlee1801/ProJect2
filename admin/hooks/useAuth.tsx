import React from 'react';
import create from 'zustand';
import Router, { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { Login, Logout, checkToken } from 'utils/service';
import { routes } from 'utils/routes';
import { ILogin, IAdmin, User } from 'utils/interface';
import { useLocalStorage } from '@mantine/hooks';
interface AuthState {
  auth: boolean;
  user: any;
  login: (data: ILogin) => void;
  logout: (token: string) => void;
}
const useAuth = create<AuthState>((set) => ({
  auth: false,
  user: {},
  login: async (data) => {
    try {
      const res = await Login(data);
      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res?.data));
        set((state) => ({
          ...state,
          user: res?.data,
          auth: true,
        }));
      }
    } catch (err: any) {
      showNotification({
        title: 'Thông báo',
        message: `${err?.response?.data?.msg}`,
        color: 'red',
      });
    }
  },
  logout: async (token) => {
    try {
      const res = await Logout(token);
      if (res.status === 200) {
        localStorage.removeItem('user');
        set((state) => ({
          ...state,
          user: null,
          auth: false,
        }));
      }
    } catch (err: any) {
      showNotification({
        title: 'Thông báo',
        message: `${err?.response?.data?.msg}`,
        color: 'red',
      });
    }
  },
}));
export default useAuth;
